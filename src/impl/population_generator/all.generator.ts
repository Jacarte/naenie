import PopulationGenerator from './populator.generator';
import { injectable } from 'inversify';
import { ILogger } from '../../core/logger';
import * as fs from 'fs'
import { BaseEmisor } from '../emisor';
import TagsWalker from '../../walkers/emit.walker';
import WebTTools from '../../core/wabt.tools';
import { IAppContext } from '../../core/config';
import { Context } from '../../walkers/context.walker';
import BrowserSandbox from '../../core/sandboxes/browser.sandbox';
import SanboxExecutor from '../../core/sandbox.executor';
import generate from '@babel/generator';

@injectable()
export default class AllGenerator extends PopulationGenerator{

    generate(candidates: import("../../walkers/emit.walker").TranslationCandidate[], 
    outDir: string, 
    logger: ILogger, 
    emisor: BaseEmisor, 
    tagsWalker: TagsWalker,
    tools: WebTTools,
    appContext: IAppContext,
    context: Context,
    sandbox: SanboxExecutor,
    original: any
    ): void {

        let index = 0;
        
        const newOutDir = `${outDir}/complete_hybrid`


        if(fs.existsSync(newOutDir))
            require("rimraf").sync(newOutDir)

        fs.mkdirSync(newOutDir);

        emisor.reset(newOutDir);

        emisor.openModule();

        for(var node of candidates){


            const replacement = tagsWalker.generateWASM(node.node);

            tagsWalker.replaceIn(node.parent, node.isArray, node.key, replacement, node.index);

            
            index += 1;
        }

        emisor.closeModule();
        
        tools.compileWat(
            `${newOutDir}/${appContext.watName}`,
            `${newOutDir}/${appContext.wasmName}`)


        tools.validateWasm(`${newOutDir}/${appContext.wasmName}`)

        sandbox.instrument(
            generate(original).code,
            `${newOutDir}`,
            `${newOutDir}/${appContext.wasmName}`
            )

    }


}