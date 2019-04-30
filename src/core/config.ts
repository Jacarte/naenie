
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

    childrensAllowed: boolean; // It means allow translations of children not only the most high level node.


    instrumentationPort: number;
}

export const AppContext: IAppContext = {
    outDir: 'out',
    instrumnetationName: 'instrumented.js',
    watName: 'module.wat',
    wasmName: 'module.wasm',
    sandBoxName: 'sandbox.js',
    returnWASMCallbackName: 'Fuxuhuuooi',
    minSize: 3,
    maxSize: 10000, // +oo
    mutationThreshold: 1,
    instrumentationPort: 8081,
    childrensAllowed: false
}