
import * as parser from '@babel/parser';
import * as fs from 'fs';
import { BaseNode } from '@babel/types';
import GenericWalker from '../walkers/generic.walker';

const code = fs.readFileSync(process.argv[2]).toString();

const walker = new GenericWalker({code, path:process.argv[2], wlPath:''})

const ast = parser.parse(code);

walker.walk(ast);

const nodes = [];
const links = [];

let counter = 0;

type ITree = {
    children: ITree[];
    size: number,
    type:string,
}

function walk(tree: ITree & BaseNode, parentId?: number){

    counter += 1;

    const id = counter - 1;

    if(!!parentId || parentId === 0){
        links.push({
            source: id,
            target: parentId,
            //value: 1
        })
    }

    nodes.push({
        id: id,
        text: `${tree.type} ${tree.size}` || 'undefined',
        value: 4
        //weight: 1
    })

    for(var ch of tree.children){
        walk(ch as any, id)
    }

}

walk(ast as any);

fs.writeFileSync("web/data.json", JSON.stringify({nodes, links}, null, 4))