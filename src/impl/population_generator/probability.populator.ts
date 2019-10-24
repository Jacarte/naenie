import PopulationGenerator from './populator.generator';
import { injectable, inject } from 'inversify';
import { ILogger } from '../../core/logger';
import { BaseEmisor } from '../emisor';
import TagsWalker from '../../walkers/emit.walker';
import WebTTools from '../../core/wabt.tools';
import { IAppContext } from '../../core/config';
import { Context } from '../../walkers/context.walker';
import SanboxExecutor from '../../core/sandbox.executor';
import * as fs from 'fs'
import generate from '@babel/generator';
import { MetaTree } from '../machine';
import { resolve } from 'url';

@injectable()
export default class ProbabilityPopulator extends PopulationGenerator {


    @inject("Emisor")
    public emisor: BaseEmisor;

    @inject("IAppContext")
    public appContext: IAppContext


    @inject("Context")
    public context: Context

    @inject(WebTTools)
    public tools: WebTTools;


    @inject("ILogger")
    public logger: ILogger;

    @inject("Sandbox")
    public sandbox: SanboxExecutor;


    generate(
        candidates: import("../../walkers/emit.walker").TranslationCandidate[], 
        outDir: string, 
        meta: MetaTree,
        tagsWalker: TagsWalker): void {

        let index = 0;
            
        const newOutDir = `${outDir}/${meta.containerFolder}`.replace("/.", "")

        if(candidates.length > 0){


            if(!fs.existsSync(newOutDir))
                fs.mkdirSync(newOutDir);

            this.emisor.reset(newOutDir, meta.fileName);

            this.emisor.openModule();

            for(var node of candidates){

                
                const replacement = tagsWalker.generateWASM(node.node, meta);

                tagsWalker.replaceIn(node.parent, node.isArray, node.key, replacement, node.index);
                
                index += 1;
            }

            this.emisor.closeModule();
            
            console.log(`${newOutDir}/${meta.fileName}.wast`,
            `${newOutDir}/${meta.fileName}.wasm`)

            this.tools.compileWat(
                `${newOutDir}/${meta.fileName}.wast`,
                `${newOutDir}/${meta.fileName}.wasm`)


            this.tools.validateWasm(`${newOutDir}/${meta.src}.wasm`)

            this.sandbox.instrument(
                generate(meta.trees[0]).code,
                `${newOutDir}/${meta.fileName}`,
                `./${meta.fileName}.wasm`
                )
        }
        else{

            this.logger.warning("This file has no candidates...", meta.src, '. Copying original file\n');
            // TODO copy file

            if(!fs.existsSync(`${newOutDir}`))
                fs.mkdirSync(`${newOutDir}`)

            fs.copyFileSync(meta.src, `${newOutDir}/${meta.fileName}`)
        }
    }
}
