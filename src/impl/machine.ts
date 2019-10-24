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
import * as net from "net";

import { fork, ForkOptions, ChildProcess, spawn } from 'child_process';
import * as path from 'path';

const PROCESS =  process;

type RUNTIME_CALL = {method: string, args: any[]};

export type MetaTree = {
    trees: BaseNode[],
    src: string;
    containerFolder: string;
    fileName: string;
    instSrc: string;
    relativePath: string;
};

export type Forest = {
    [key:string]: MetaTree
}

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

    forest: Forest = { }

    @inject("Populator")
    public populator: PopulationGenerator;

    private getFileName(name:string){
        const chunks = name.split("/")

        return chunks[chunks.length - 1]
    }

    public secondStage(){
        
        let outDir = `${this.appContext.outDir}/${getFileName(this.context.path)}`;
        //const original = this.original;
        //const copy = this.copy;

        // Removing instrumentation folder
        if(fs.existsSync(this.context.instrumentationFolder))
            require("rimraf").sync(this.context.instrumentationFolder)


        if(fs.existsSync(this.appContext.outDir))
            require("rimraf").sync(this.appContext.outDir)

        fs.mkdirSync(this.appContext.outDir)

        if(fs.existsSync(outDir))
            require("rimraf").sync(outDir)

        fs.mkdirSync(outDir)

//        fs.writeFileSync(`${outDir}/${this.appContext.instrumnetationName}`, generate(copy).code)

        const totalNodes = Object.keys(this.runtimeInstrumentation.nodes_hash).length
        const visitedNodes = 
        Object.keys(this.runtimeInstrumentation.nodes_hash).map(t => this.runtimeInstrumentation.nodes_hash[t])
        .filter(t => t.visited).length;

        this.logger.debug("Instrumented nodes: ", totalNodes, "\n")
        this.logger.debug("Instrumented nodes coverage: ", visitedNodes, "\n")
        this.logger.debug("Instrumented nodes coverage percent: ", 1.0*visitedNodes/totalNodes * 100, "%", "\n")
        //this.logger.debug("Root nodes count: ", (original as any).size, "\n")

        this.logger.info("Merging runtime and static analysis\n");
        this.mergeRuntime.node_hash = this.runtimeInstrumentation.nodes_hash;


        // Merge every AST

        for(let file in this.forest){

            // file == metaTree.instSrc
            const metaTree = this.forest[file];
            const [original, copy] = metaTree.trees;

            this.mergeRuntime.setNamespace(file)
            this.mergeRuntime.walk(original)

            this.logger.info("Translating JS to WASM...", file, '\n');

            this.mapWalker.setNamespace(metaTree.src)
            this.mapWalker.walk(original);

            this.logger.info("Catching translatable subtrees...\n");

            this.tagsWalker.walk(original);


            this.logger.debug("Candidates nodes count...", metaTree.src, " ", this.tagsWalker.candidates.length, "\n")
    
            this.populator.generate(
                this.tagsWalker.candidates,
                outDir,
                metaTree,
                this.tagsWalker
            )
        }

    }


    public process(){
        
        const self = this;
        // Cleaning out dir
        this.logger.debug(`Cleaning out dir...`)

        if(self.appContext.outDir)
            require("rimraf").sync(self.appContext.outDir)

        fs.mkdirSync(self.appContext.outDir)

        const registryName = 'Qeakaouoeois'; 

        this.logger.debug(`Walking ${this.context.path}\n`)

        // Clean out dir

        this.logger.debug(`Cleaning inst dir...`)

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

                if(file.endsWith(".js")){ // TODO add validation with parsing not with file extension

                    // Instrumenting code
                    this.runtimeInstrumentation.setRegistryName(registryName)

                    const instrumentation = this.processSingle(content, `${self.context.instrumentationFolder}/${root}/${file}`)

                    instrumentation[1].program.body.unshift(
                        variableDeclaration("const", 
                        [variableDeclarator(identifier(registryName) as any, callExpression(identifier("require") as any, [
                            stringLiteral("./instrumentation_core.js") as any]
                        ))])
                    );


                    // [original, copy]
                    this.forest[`${self.context.instrumentationFolder}/${root}/${file}`] = {
                        trees: instrumentation,
                        src: `${absolute}/${file}`,
                        containerFolder: root.replace("./", ""),
                        relativePath: `${root.replace("./", "")}/${file}`,
                        fileName: file,
                        instSrc: `${self.context.instrumentationFolder}/${root}/${file}`
                    }

                    fs.writeFileSync(`${self.context.instrumentationFolder}/${root}/${file}`, generate(instrumentation[1]).code)
                }else{
                    fs.writeFileSync(`${self.context.instrumentationFolder}/${root}/${file}`, content)
                    fs.writeFileSync(`${self.appContext.outDir}/${root}/${file}`, content)
                }
            }
            catch(e){
                this.logger.error(e.message)
            }
        })

        this.logger.debug("Creating fork child\n")


        const currDir = PROCESS.cwd()

        PROCESS.chdir(this.context.instrumentationFolder)

        const program = path.resolve(this.context.cvScript);

        const parameters = [];
        const options: ForkOptions = {
            stdio: [ 'pipe', 'pipe', 'pipe', 'ipc' ]
        };


        const child = fork(program, parameters, options);

        child.on('message', message => {

            const data: RUNTIME_CALL = JSON.parse(message)

            this[data.method](...data.args)
            //child.send('Hi');
        });

        //this.child = child;

        PROCESS.chdir(currDir)
        setTimeout(this.processData.bind(this), Math.max(3,this.context.timeout)*1000);

    }

    public processSingle(code, file){

        
        this.logger.info(`Parsing ${file} 1/2\n`)

        let original = parser.parse(code);
        
        this.logger.info(`Parsing ${file} 2/2\n`)

        let copy = parser.parse(code);

        this.logger.info("Walking generic and static analysis\n");

        this.genericWalker.setContent(code)
        this.genericWalker.walk(original)
        
        this.runtimeInstrumentation.setNamespace(file)

        this.runtimeInstrumentation.walk(copy)

        return [original, copy];
    }



    processData(){

        this.logger.debug(`Closing child...`, '\n')
       
        //this.child.kill("SIGINT")

        this.secondStage()
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