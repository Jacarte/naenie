import TagsWalker, { TranslationCandidate } from '../../walkers/emit.walker';
import { ILogger } from '../../core/logger';
import { BaseEmisor } from '../emisor';
import WebTTools from '../../core/wabt.tools';
import { IAppContext } from '../../core/config';
import { Context } from 'vm';
import SanboxExecutor from '../../core/sandbox.executor';
import { injectable } from 'inversify';

@injectable()
export default abstract class PopulationGenerator{
    abstract generate(
        candidates: TranslationCandidate[], 
        outDir: string, 
        logger: ILogger, 
        emisor: BaseEmisor, 
        tagsWalker: TagsWalker,
        tools: WebTTools,
        appContext: IAppContext,
        context: Context,
        sandbox: SanboxExecutor,
        original: any
        ):void;
}