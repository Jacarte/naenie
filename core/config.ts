
export type IAppContext = {

    outDir: string;

    instrumnetationName: string;
    watName: string;
    wasmName: string;
    sandBoxName: string;

    minSize: number;
    maxSize: number;
    mutationThreshold: number;
    returnWASMCallbackName:string;
}

export const AppContext: IAppContext = {
    outDir: 'out',
    instrumnetationName: 'instrumented.js',
    watName: 'module.wat',
    wasmName: 'module.wasm',
    sandBoxName: 'sandbox.js',
    returnWASMCallbackName: 'Fuxuhuuooi',
    minSize: 5,
    maxSize: 20,
    mutationThreshold: 1
}