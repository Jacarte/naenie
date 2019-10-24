import { IWalker } from '../core/walker';
import { injectable, inject } from 'inversify';


export type Context = {
    cvScript: string;
    path: string;
    exclude?: RegExp;
    instrumentationFolder: string;
    timeout: number;

    policy: 'simple' | 'paranoic' | 'insane';
}

@injectable()
export default abstract class ContextWalker<Tin, Tout> implements IWalker<Tin, Tout>{
    
    walk(obj: Tin): Tout {
        throw new Error("Method not implemented.");
    }

    @inject("Context")
    public context: Context;


    public setContext(context: Context){
        this.context = context;
    }

    public getContext(): Context{
        return this.context
    }
}