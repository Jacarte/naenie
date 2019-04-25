
import * as fs from 'fs'
import { Context } from '../walkers/context.walker';
import Container from '../impl/startup';
import DMachine from '../impl/machine';
import { AppContext, IAppContext } from '../core/config';
import generateRandomWASMWrapperName from '../utils/generator';

console.log("Reading file");

const code = fs.readFileSync(process.argv[2]).toString();
const wl = fs.readFileSync(process.argv[3]).toString();

//console.log(generateRandomWASMWrapperName(50))

const context: Context = {
    path: process.argv[2],
    code,
    wlPath: process.argv[3],
    wlCode: wl
}


Container.bind<Context>("Context")
.toConstantValue(context);

Container.bind<IAppContext>("IAppContext").toConstantValue(AppContext);


const machine = Container.resolve(DMachine);

machine.process(context)

/*
type ITree = {
    children: ITree[];
    size: number,
    type:string,
    value:number,
    returningType: [],
    repr: string,
    opcode: string,
    translatable: boolean,
    instrumented: boolean,
    sign
}

function walk(tree: ITree & BaseNode): ITree{


    const result: ITree = {
        children: [],
        type: tree.type,
        size: 1,
        value: 1,
        returningType: tree.returningType,
        repr: `${tree.repr}`,
        opcode: tree.opcode,
        translatable: tree.translatable,
        instrumented: tree.instrumented,
        sign: tree.sign
    }

    if(tree.returningType)
        result.returningType = tree.returningType;

    if(tree.children)
        for(var ch of tree.children){
            const child = walk(ch as any)
            result.children.push(child);
            result.size += child.size;
        }

    return result
}

logger.debug("Writing d3 tree file...", "\n")
const root = walk(original as any);

fs.writeFileSync("web/tree.json", JSON.stringify(root, null, 4))

//console.log(generate(original).code)

*/