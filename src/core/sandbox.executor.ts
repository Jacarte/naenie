import { Context } from '../walkers/context.walker';
import { injectable } from 'inversify';

@injectable()
export default abstract class SanboxExecutor{
    abstract instrument(mutatedCode: string, outPath: string, wasmPath);
}