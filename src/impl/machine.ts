import * as parser from '@babel/parser';
import traverse from "@babel/traverse";
import generate from '@babel/generator';
import { ILogger } from "../core/logger";
import { BaseNode, variableDeclaration, variableDeclarator, callExpression, identifier, stringLiteral } from "@babel/types";
import { ExtendedNode } from '../core/types';
import { injectable, inject } from "inversify";
import { Context } from '../walkers/context.walker';
import NodeSandbox from '../core/sandboxes/node.sandbox';
import SanboxExecutor from "../core/sandbox.executor";
import GenericWalker from "../walkers/generic.walker";
import RuntimeInstrumentWalker from "../walkers/runtime.instrument.walker";
import MergeRuntime from '../walkers/mergeRuntime.walker';
import MapWalker from '../walkers/map.walker';
import TagsWalker from '../walkers/emit.walker';
import { AppContext, IAppContext } from '../core/config';
import * as fs from 'fs';
import { BaseEmisor } from './emisor';
import { isObject } from "util";
import WebTTools from '../core/wabt.tools';
import generateRandomWASMWrapperName from "../utils/generator";
import * as http from 'http';
import { getFileName, NodeTypes, getType } from '../utils/object';
import { Socket } from 'net';



@injectable()
export default class DMachine{

    @inject("ILogger")
    public logger: ILogger;

    @inject("Sandbox")
    public sandbox: SanboxExecutor

    @inject(GenericWalker)
    public genericWalker: GenericWalker

    @inject(RuntimeInstrumentWalker)
    public runtimeInstrumentation: RuntimeInstrumentWalker

    @inject(MergeRuntime)
    public mergeRuntime: MergeRuntime

    @inject(MapWalker)
    public mapWalker: MapWalker

    @inject(TagsWalker)
    public tagsWalker: TagsWalker

    @inject("IAppContext")
    public appContext: IAppContext


    @inject("Context")
    public context: Context

    @inject(WebTTools)
    tools: WebTTools;

    @inject("Emisor")
    public emisor: BaseEmisor;

    public secondStage(){

        const outDir = this.appContext.outDir;
        const original = this.original;
        const copy = this.copy;

        fs.writeFileSync(`${outDir}/${this.appContext.instrumnetationName}`, generate(copy).code)

        const totalNodes = Object.keys(this.runtimeInstrumentation.nodes_hash).length
        const visitedNodes = 
        Object.keys(this.runtimeInstrumentation.nodes_hash).map(t => this.runtimeInstrumentation.nodes_hash[t])
        .filter(t => t.visited).length;

        this.logger.debug("Instrumented nodes: ", totalNodes, "\n")
        this.logger.debug("Instrumented nodes coverage: ", visitedNodes, "\n")
        this.logger.debug("Instrumented nodes coverage percent: ", 1.0*visitedNodes/totalNodes * 100, "%", "\n")
        this.logger.debug("Root nodes count: ", (original as any).size, "\n")

        this.logger.info("Merging runtime and static analysis\n");
        this.mergeRuntime.node_hash = this.runtimeInstrumentation.nodes_hash;

        this.mergeRuntime.walk(original)

        this.logger.info("Translating JS to WASM...\n");

        this.mapWalker.walk(original);

        this.logger.info("Catching translatable subtrees\n");
        
        this.emisor.openModule();

        this.tagsWalker.walk(original);

        this.emisor.closeModule();

        this.tools.compileWat(
            `${outDir}/${this.appContext.watName}`,
            `${outDir}/${this.appContext.wasmName}`)


        this.tools.validateWasm(`${outDir}/${this.appContext.wasmName}`)
        
        this.sandbox.instrument(
            generate(original).code,
            `${outDir}/${this.appContext.sandBoxName}`,
            `${outDir}/${this.appContext.wasmName}`
            )
    }

    original: any;
    copy: any;

    server: http.Server;
    socket: Socket;

    public process(){

        
        this.logger.info("Parsing file 1/2\n")

        let original = parser.parse(this.context.code);
        this.original = original;

        this.logger.info("Parsing file 2/2\n")

        let copy = parser.parse(this.context.code);
        this.copy = copy;

        this.logger.info("Walking generic and static analysis\n");

        this.genericWalker.walk(original);

        this.logger.info("Walking instrumentation\n");

        const registryName = 'Qeakaouoeois'; // hard to collison name in runtime instrumentation
        
        this.runtimeInstrumentation.setRegistryName(`${registryName}`);
        this.runtimeInstrumentation.walk(copy);


        this.logger.info("Evaluating instrumentation on runtime\n");

        this.logger.debug(`Starting local server on https://127.0.0.1:${this.appContext.instrumentationPort}\n`);

        if(fs.existsSync("instrumentation"))
            require("rimraf").sync("instrumentation")

        fs.mkdirSync("instrumentation")
        
        copy.program.body.unshift(
            variableDeclaration("const", 
            [variableDeclarator(identifier(registryName) as any, callExpression(identifier("require") as any, [
                stringLiteral("./instrumentation_api.js") as any]
            ))])
        );

        fs.writeFileSync(`instrumentation/${getFileName(this.context.path)}`, generate(this.copy).code)
        
        const coverageAST = parser.parse(this.context.cvCode);
        
        coverageAST.program.body.unshift(
            variableDeclaration("const", 
            [variableDeclarator(identifier(registryName) as any, callExpression(identifier("require") as any, [
                stringLiteral("./instrumentation_api.js") as any]
            ))])
        );

        coverageAST.program.body.push(
            callExpression(identifier(`${registryName}.close`) as any, []) as any
        )        

        fs.writeFileSync(`instrumentation/main.js`, generate(coverageAST).code)


        fs.copyFileSync("src/core/instrumentation/instrumentation_api.js", "instrumentation/instrumentation_api.js")

        const self = this;
        this.server = http.createServer((request, res) => {
            if (request.method == 'POST') {
                var body = ''
                request.on('data', function(data) {
                  body += data
                })
                request.on('end', function() {
                    self.processData(JSON.parse(body))
                })
              }
        });
        
        this.server.on('connection', function (socket) {
            // Add a newly connected socket
            
            this.socker = socket;
        
            // Extend socket lifetime for demo purposes
            socket.setTimeout(4000);
        });
  

        this.server.listen(8081, "127.0.0.1", () => {
            this.logger.debug("Executed instrumented code...")
            var exec = require('child_process').exec;
            exec(`node instrumentation/main.js`,  (error, stdout, stderr) => {
                this.logger.debug("\n", stdout, "\n")

                console.log(error, stderr)
                if(error){
                    this.logger.error("\n", error, "\n")
                }
            });
        });

    }



    processData(runtimeInfo: {method: string, args: any[]}){

        
        if(runtimeInfo.method === "close"){


            this.logger.debug("Parsing event queue...")
            console.log(JSON.stringify(runtimeInfo))
            const data: {method:string, args: any[]}[] = runtimeInfo.args[0];

            for(var event of data){
                this[event.method](...event.args)
            }

            this.server.close(cb => {

                if(this.socket)
                    this.socket.destroy()

                
                this.logger.debug("Server closed...",'\n')

                this.secondStage()
            })

            return;
        }

    }

    rightOperator(hash, value){
        const entry = this.runtimeInstrumentation.nodes_hash[hash];

        if(!entry.rightRT)
            entry.rightRT = new NodeTypes();

        
        const returning = getType(value);

        entry.rightRT.insertType(returning);
        
    }
    leftOperator(hash, value){

        const entry = this.runtimeInstrumentation.nodes_hash[hash];

        if(!entry.leftRT)
            entry.leftRT = new NodeTypes();

        
        const returning = getType(value);

        entry.leftRT.insertType(returning);
        
        return value;

    }

    genericRecord(hash, value, repr){

        const returning = getType(value);

        const entry = this.runtimeInstrumentation.nodes_hash[hash];

        entry.returningType.insertType(returning);
        entry.sign = value < 0? -1: 1;
    
        entry.visited++;
        entry.visitOrder = RuntimeInstrumentWalker.visitOrder++; 
    }


    _wrapUpdateExpression(hash, value, repr){
        this.genericRecord(hash, value, repr)
    }


    _wrapFunCall(hash, value, repr){
        this.genericRecord(hash, value, repr)
    }

}