
export type IAppContext = {

    outDir: string;
    minSize: number;
    maxSize: number;
    mutationThreshold: number;
    returnWASMCallbackName:string;

    childrensAllowed: boolean; // It means allow translations of children not only the most high level node.

}

export const AppContext: IAppContext = {
    outDir: 'out',
    returnWASMCallbackName: 'Fuxuhuuooi',
    minSize: 3,
    maxSize: 10000, // +oo
    mutationThreshold: 1,
    childrensAllowed: true
}