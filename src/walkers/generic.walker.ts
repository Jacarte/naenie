import { IWalker } from '../core/walker';
import { BaseNode, NumericLiteral } from '@babel/types';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import generate from '@babel/generator';
import ContextWalker from './context.walker';
import { getType, NodeTypes } from '../utils/object';
import { Context } from './context.walker';

/**
 * Wrapp ast nodes with extra information, such as subtree size, and generic children array property
 */
@injectable()
export default class GenericWalker extends ContextWalker<BaseNode, BaseNode>{
    
    walk(obj: BaseNode): BaseNode {
        return this.walkAux(obj, null);
    }

    private isNode(tbd: any): tbd is BaseNode{
        return tbd.type != null
    }


    visited = [];
    
    public walkAux(ast: BaseNode, parent: BaseNode | null): BaseNode {

        const result = {
            children: [],
            size: 1,
            parent: null,
            repr: this.context.code.substr(ast.start, ast.end - ast.start),
            returningType: null
        }

        if(this.visited.indexOf(ast) !== -1)
            return Object.assign(ast, result);
        
        this.visited.push(ast);

        for(var k in ast){
            
            let value = ast[k];

            if (!(value instanceof Array)) {
                value = [value]
            }
    
            for(var simple of value){
                if(!!simple && this.isNode(simple)){
                    if((simple.type as any) !== 'CommentLine'){
                        var child =  this.walkAux(simple, ast) as any
                        result.children.push(child)
                        result.size += child.size;
                    }
                }
            }
        }

        result.returningType = this.getReturningType(ast);

        Object.assign(ast, result);

        return ast
    }

    getReturningType(ast: BaseNode): NodeTypes{

        switch(ast.type){
            case 'BooleanLiteral':
            case 'NumericLiteral':
                const value = (ast as any).value;
                return new NodeTypes(getType(value));

            case 'StringLiteral':

                return new NodeTypes({
                    base: 'string',
                    ntype: 'string',
                    priority: -2
                });

            case 'UpdateExpression':
                
                return new NodeTypes({
                    base: 'numer',
                    ntype: 'number',
                    priority: 0
                });

            default: 
                return new NodeTypes();
        }

    }
}