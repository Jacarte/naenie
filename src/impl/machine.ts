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
import PopulationGenerator from './population_generator/populator.generator';
import { POINT_CONVERSION_COMPRESSED } from 'constants';


const PROCESS =  process;

type RUNTIME_CALL = {method: string, args: any[]};

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

    //@inject("Populator")
    //public populator: PopulationGenerator;

    public secondStage(){
        this.logger.info("Second stage")

        /*let outDir = `${this.appContext.outDir}/${getFileName(this.context.path)}`;
        const original = this.original;
        const copy = this.copy;

        if(fs.existsSync(this.appContext.outDir))
            require("rimraf").sync(this.appContext.outDir)


        fs.mkdirSync(this.appContext.outDir)

        if(fs.existsSync(outDir))
            require("rimraf").sync(outDir)

        fs.mkdirSync(outDir)

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

        
        this.tagsWalker.walk(original);

        this.logger.debug("Candidates nodes count...",this.tagsWalker.candidates.length, "\n")

        // Generate mutations

        this.populator.generate(
            this.tagsWalker.candidates,
            outDir,
            this.logger,
            this.emisor,
            this.tagsWalker,
            this.tools,
            this.appContext,
            this.context,
            this.sandbox,
            original
        )*/
    }

    server: http.Server;
    socket: Socket;

    public process(){
        
        const registryName = 'Qeakaouoeois'; 
        const self = this;

        this.logger.debug(`Walking ${this.context.path}\n`)

        // Clean out dir

        this.logger.debug(`Cleaning out dir...`)

        if(self.context.instrumentationFolder)
            require("rimraf").sync(self.context.instrumentationFolder)

        fs.mkdirSync(self.context.instrumentationFolder)

        fs.copyFileSync(`src/core/instrumentation/instrumentation_api.js`, `${self.context.instrumentationFolder}/instrumentation_core.js`)

        function walk(path: string, dir, cb: (root: string, absolute:string, file: string) => void){

            if(self.context.exclude && self.context.exclude.test(path)){
                return
            }

            const contents = fs.readdirSync(path)

            for(var content of contents){
                if(fs.statSync(`${path}/${content}`).isDirectory()){

                    if(!fs.existsSync(`${self.context.instrumentationFolder}/${dir}/${content}`))
                        fs.mkdirSync(`${self.context.instrumentationFolder}/${dir}/${content}`)

                    walk(`${path}/${content}`, `${dir}/${content}`, cb)
                }
                else{
                    cb(dir, path, content)
                }
            }

        }

        walk(this.context.path, '.', (root, absolute, file) => {
            
            // Instrument code ...


            try{
                const content = fs.readFileSync(`${absolute}/${file}`).toString()

                if(file.endsWith(".js")){

                    // Instrumenting code
                    this.runtimeInstrumentation.setRegistryName(registryName)
                    const instrumentation = this.processSingle(content, `${self.context.instrumentationFolder}/${root}/${file}`)

                    instrumentation[1].program.body.unshift(
                        variableDeclaration("const", 
                        [variableDeclarator(identifier(registryName) as any, callExpression(identifier("require") as any, [
                            stringLiteral("./instrumentation_core.js") as any]
                        ))])
                    );


                    this.forest[`${self.context.instrumentationFolder}/${root}/${file}`] = instrumentation[1]

                    fs.writeFileSync(`${self.context.instrumentationFolder}/${root}/${file}`, generate(instrumentation[1]).code)
                }else
                    fs.writeFileSync(`${self.context.instrumentationFolder}/${root}/${file}`, content)
            }
            catch(e){
                this.logger.error(e.message)
            }
        })

        this.logger.debug("Opening coverage listener server")
        
        this.server = http.createServer((request, res) => {
            if (request.method == 'POST') {
                var body = ''
                request.on('data', function(data) {
                  body += data
                })
                request.on('end', function() {

                    const data: RUNTIME_CALL = JSON.parse(body)

                    console.log(data)

                    self[data.method](...data.args)
                })
              }
        });
        
        this.server.on('connection', function (socket) {
            // Add a newly connected socket
            
            this.socker = socket;
        
            // Extend socket lifetime for demo purposes
            //socket.setTimeout(4000);
        });
  

        this.server.listen(8082, "127.0.0.1", () => {
            this.logger.debug(`Listening in feedback server, port ${8082}...`)
            var exec = require('child_process').exec;

            // Execute instumented code
            
            
            const currDir = PROCESS.cwd()

            PROCESS.chdir(this.context.instrumentationFolder)

            exec(`${this.context.cvScript}`,  (error, stdout, stderr) => {
                
                this.logger.debug("Listening in feedback server...")

                this.logger.debug("\n", stdout, "\n")

                //console.log(error, stderr)
                if(error){
                    this.logger.error("\n", error, "\n")
                }
            });

            PROCESS.chdir(currDir)


            setTimeout(this.processData.bind(this), Math.max(3,this.context.timeout)*1000);
        });
    }

    forest: { [key:string]: BaseNode} = { }

    public processSingle(code, file){

        
        this.logger.info(`Parsing ${file} 1/2\n`)

        let original = parser.parse(code);
        
        this.logger.info(`Parsing ${file} 2/2\n`)

        let copy = parser.parse(code);

        this.logger.info("Walking generic and static analysis\n");

        this.genericWalker.walk(original)
        
        this.runtimeInstrumentation.setNamespace(file)

        this.runtimeInstrumentation.walk(copy)

        return [original, copy];
    }



    processData(){

        this.logger.debug(`Closing feedback server after ${this.context.timeout} seconds...`)
        
        this.server.close(cb => {

            console.log(cb)

            if(this.socket)
                this.socket.destroy()

            
            this.logger.debug("Server closed...",'\n')

            this.secondStage()
        })
    }

    // FEDBACK PROCESSING

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