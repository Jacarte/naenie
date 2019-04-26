import * as parser from '@babel/parser';
import traverse from "@babel/traverse";
import generate from '@babel/generator';
import { ILogger } from "../core/logger";
import { BaseNode } from "@babel/types";
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

    @inject(WebTTools)
    tools: WebTTools;

    @inject("Emisor")
    public emisor: BaseEmisor;

    public process(context: Context){

        const outDir = this.appContext.outDir;
        
        this.logger.info("Parsing file 1/2\n")

        let original = parser.parse(context.code);
        
        this.logger.info("Parsing file 2/2\n")

        let copy = parser.parse(context.code);
        
        this.logger.info("Walking generic and static analysis\n");

        this.genericWalker.walk(original);

        this.logger.info("Walking instrumentation\n");

        const registryName = 'Qeakaouoeoisiooeauesouixoeidrahecouspopaknuetuiupsiifo'; // hard to collison name in runtime instrumentation
        const Qeakaouoeoisiooeauesouixoeidrahecouspopaknuetuiupsiifo = this.runtimeInstrumentation;

        this.runtimeInstrumentation.setRegistryName(`${registryName}`);
        this.runtimeInstrumentation.walk(copy);

        this.logger.info("Evaluating instrumentation on runtime\n");



        eval(generate(copy).code + context.cvCode);

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

}