import { IWalker } from '../core/walker';
import { BaseNode, NumericLiteral, returnStatement, CallExpression, cloneDeep, identifier, callExpression, UpdateExpression, Node, ReturnStatement, stringLiteral, LogicalExpression, binaryExpression, logicalExpression } from '@babel/types';
/// <reference path="../../node_modules/inversify/dts/inversify.d.ts"/>
import { injectable, inject } from 'inversify';
import { ILogger } from '../core/logger';
import { ExtendedNode } from '../core/types';
import { MemberExpression } from 'babel-types';
import ContextWalker from './context.walker';
import { getType, ReturningType, NodeTypes } from '../utils/object';

/**
 * Wrapp ast nodes with extra information, such as subtree size, and generic children array property
 */
@injectable()
export default class RuntimeInstrumentWalker extends ContextWalker<BaseNode, BaseNode>{
    
    @inject("ILogger")
    public logger: ILogger;

    walk(obj: BaseNode): BaseNode {
        return this.walkAux(obj, null);
    }


    private isNode(tbd: any): tbd is BaseNode{

        return tbd.type != null
    }

    static visitOrder = 0;

    visited = [];
    
    nodes_hash : {
        [id:string]: {
                
                returningType: NodeTypes,
                leftRT?: NodeTypes,
                rightRT?: NodeTypes,
                instrumented?: boolean,
                visitOrder?: number,
                visited: number,
                sign?: number
            }
    } = {

    }

    public walkAux(ast: BaseNode, parent: BaseNode | null): BaseNode {
        if(this.visited.indexOf(ast) !== -1)
            return ast;
        
        this.visited.push(ast);

        for(var k in ast){
            
            let value = ast[k];
            let isArray = true;

            if (!(value instanceof Array)) {
                value = [value];
                isArray = false
            }
            for(let i = 0; i < value.length; i++){
                let simple = value[i];
                if(!!simple && this.isNode(simple)){
                    if((simple.type as any) !== 'CommentLine'){

                        const child = this.walkAux(simple, ast) as any

                        const hash = this.hashIt(child);
                        
                        const replacement = this.instrument(child, ast, hash);
                        
                        if(!!replacement){
                            // Register instrumentation
                            this.nodes_hash[hash] = {
                                
                                visitOrder: 0,
                                instrumented: true,
                                returningType: new NodeTypes(),
                                visited: 0
                                
                            };

                            if(isArray){
                                ast[k][i] = replacement;
                            }
                            else{
                                ast[k] = replacement;
                            }
                        }
                    }
                }
            }
        }

        return ast
    }

    hashIt(child: BaseNode): string{
        if(!child.start)
            return undefined;

        return `${child.start}:${child.end}:${child.loc.start.column}:${child.loc.start.line}:${child.loc.end.column}:${child.loc.end.line}`;
    }

    wrap(ast, hash){

        if(!hash)
            return ast;
        
        return 
    }

    instrument(ast: BaseNode, parent: BaseNode, hash: string){

        switch(ast.type){
            /*case 'CallExpression':
                return callExpression(identifier(`${this.getRegistryName()}._wrapFunCall`) as any, 
                [stringLiteral(hash), ast as any]);*/

            case 'UpdateExpression':
                return callExpression(identifier(`${this.getRegistryName()}._wrapUpdateExpression`) as any, 
                [stringLiteral(hash), ast as any]);

            case 'BinaryExpression':
            case 'LogicalExpression':
                const bin = ast as any;

                const func: any = ast.type === 'BinaryExpression'? binaryExpression: logicalExpression;

                return callExpression(identifier(`${this.getRegistryName()}.genericRecord`) as any, 
                [stringLiteral(hash), func(bin.operator, 
                    callExpression(identifier(`${this.getRegistryName()}.leftOperator`) as any, [stringLiteral(hash),(ast as any).left]),
                    callExpression(identifier(`${this.getRegistryName()}.rightOperator`) as any, [stringLiteral(hash),(ast as any).right]))]);
                
                
                //return ;

           /* case 'MemberExpression':
                if(parent.type == 'CallExpression')
                    return;

                const member = (ast as any);
                return callExpression(identifier(`${this.getRegistryName()}.genericRecord`) as any, 
                [stringLiteral(hash), member]);

            case 'ReturnStatement':
                const r = (ast as any) as ReturnStatement;
                return returnStatement(callExpression(identifier(`${this.getRegistryName()}.genericRecord`) as any, 
                [stringLiteral(hash), r.argument]));*/

        }
    }

    registryName: string = ''

    setRegistryName(name: string){
        this.registryName = name;
    }

    getRegistryName():string{
        return this.registryName;
    }

    dehash(hash: string): {  start: number, end: number, startColumn: number, startLine: number, endColumn: number, endLine: number }{
        const re = /(\d+):(\d+):(\d+):(\d+):(\d+):(\d+)/

        const match = hash.match(re);

        return {
            start: Number(match[1]),
            end: Number(match[2]),
            startColumn: Number(match[3]),
            startLine: Number(match[4]),
            endColumn: Number(match[5]),
            endLine: Number(match[6])
        }
    }
}