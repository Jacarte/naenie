import { IWalker } from '../core/walker';
import { BaseNode } from '@babel/types';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import generate from '@babel/generator';

/**
 * Wrapp ast nodes with extra information, such as subtree size, and generic children array property
 */
@injectable()
export default class MergeRuntime implements IWalker<BaseNode, BaseNode>{
    
    walk(obj: BaseNode): BaseNode {
        return this.walkAux(obj, null);
    }

    constructor(){
        
    }



    node_hash = {}

    private isNode(tbd: any): tbd is BaseNode{
        return tbd.type != null
    }

    public setNamespace(namespace: string){
        this.namespace = namespace;
    }

    namespace:string;


    visited = [];
    
    public walkAux(ast: BaseNode, parent: BaseNode | null): BaseNode {

        if(this.visited.indexOf(ast) !== -1)
            return ast;
        
        this.visited.push(ast);

        for(var k in ast){
            
            let value = ast[k];

            if (!(value instanceof Array)) {
                value = [value]
            }
    
            for(var simple of value){
                if(!!simple && this.isNode(simple)){
                    if((simple.type as any) !== 'CommentLine'){
                        this.walkAux(simple, ast) as any
                    }
                }
            }
        }

        const hash = `${this.namespace}:${ast.start}:${ast.end}:${ast.loc.start.column}:${ast.loc.start.line}:${ast.loc.end.column}:${ast.loc.end.line}`;
        //console.log(this.node_hash)
        if(!!this.node_hash[hash]){

            Object.assign(ast, this.node_hash[hash])
        }


        return ast;
    }
}