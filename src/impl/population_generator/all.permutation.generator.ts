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
export default class AllPermutations extends PopulationGenerator{

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

        // TODO

    }


}