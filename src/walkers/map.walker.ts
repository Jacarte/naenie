import { IWalker } from '../core/walker';
import { BaseNode, NumericLiteral, BinaryExpression, BooleanLiteral, identifier, returnStatement } from '@babel/types';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import generate from '@babel/generator';
import { ILogger } from '../core/logger';
import ContextWalker from './context.walker';
import { sortTypes, ReturningType } from '../utils/object';
import { TypesMap, ConvertionMap } from '../impl/emisor';


/**
 * Wrapp ast nodes with extra information, such as subtree size, and generic children array property
 */
@injectable()
export default class MapWalker extends ContextWalker<BaseNode, BaseNode>{
    
    @inject("ILogger")
    public logger: ILogger;

    walk(obj: BaseNode): BaseNode {
        return this.walkAux(obj, null);
    }

    private isNode(tbd: any): tbd is BaseNode{
        return tbd.type != null
    }


    visited = [];
    
    as<T>(obj: any): T{
        return obj as T;
    }

    public genericWalk(ast: BaseNode, parent: BaseNode){
        
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

    }

    getConvertion(node, child, isLeft: boolean){

        let type = sortTypes(node.returningType)[0];
        let childType = sortTypes(child.returningType)[0];

        if(!childType){
            if(isLeft)
                childType = sortTypes(node.leftRT)[0];
            else
                childType = sortTypes(node.rightRT)[0];
        }

        if(!!childType && !!type){

            if(childType.ntype !== type.ntype){
                return [{
                    op: 'conv', val: `${TypesMap[type.ntype]}.${ConvertionMap[type.ntype][childType.ntype]}`, returningType: [type]
                }]
            }
        }

        return []
    }

    public walkAux(ast: any, parent: any | null): BaseNode {


        if(this.visited.indexOf(ast) !== -1){
            return ast;
        }
        
        this.visited.push(ast);

        switch(ast.type){

            case 'BooleanLiteral':
            case 'NumericLiteral':
                ast.opcode = [{ op: 'const', val: ast.value*1, returningType: ast.returningType }]
                break;

            case 'BinaryExpression':
            case 'LogicalExpression':


                const bin = ast as any ;//this.as<BinaryExpression>(ast);
                
                this.walkAux(bin.left, bin);
                this.walkAux(bin.right, bin);

                /*if(bin.returningType.length == 0)
                    console.log(bin.returningType, bin.repr, bin)
*/
                if(bin.returningType.findIndex(t => t.base == 'number') !== -1 
                || bin.returningType.findIndex(t => t.base == "boolean") !== -1){
                    // Convert to parameter if it has no returningType or returningType is not number nor boolean

                    if(!bin.left.opcode){
                        // Declare as input variable

                        const opcode = { op: 'input', val: bin.left.repr, node: identifier(bin.left.repr), 
                        returningType: bin.left.returningType }

                        if(bin.leftRT)
                            opcode.returningType = bin.leftRT;
                        
                        bin.left.opcode = [opcode]
                    }

                    if(!bin.right.opcode){

                        const opcode = { op: 'input', val: bin.right.repr, node: identifier(bin.right.repr), 
                        returningType: bin.right.returningType }

                        if(bin.rightRT)
                            opcode.returningType = bin.rightRT;
                        

                        bin.right.opcode = [opcode]
                    }


                    Object.assign(ast, { opcode: 
                        [
                            ...bin.left.opcode, ...this.getConvertion(bin, bin.left, true) , 
                            ...bin.right.opcode,...this.getConvertion(bin, bin.right, false),
                            { val: ast.operator, op:'ins', returningType: bin.returningType }
                        ] })
                }
                else{
                    this.logger.warning("Not evaluated, maybe its a shorcut:", bin.repr, ` ${this.context.path} (${ast.loc.start.line}:${ast.loc.start.column})`, '\n')
                }
                break;
            default:
                this.genericWalk(ast, parent);
        }

        return ast
    }
}