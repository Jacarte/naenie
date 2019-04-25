
export type IAppContext = {

    outDir: string;

    instrumnetationName: string;
    watName: string;
    wasmName: string;
    sandBoxName: string;

    minSize: number;
    maxSize: number;
    mutationThreshold: number;
}

export const AppContext: IAppContext = {
    outDir: 'out',
    instrumnetationName: 'instrumented.js',
    watName: 'module.wat',
    wasmName: 'module.wasm',
    sandBoxName: 'sandbox.js',
    minSize: 5,
    maxSize: 20,
    mutationThreshold: 0.5
}