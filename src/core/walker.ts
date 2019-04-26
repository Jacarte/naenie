export interface IWalker<TIn, TOut>{

    walk(obj: TIn): TOut;

}