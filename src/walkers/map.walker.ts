import { IWalker } from '../core/walker';
import { BaseNode, NumericLiteral, BinaryExpression, BooleanLiteral, identifier, returnStatement } from '@babel/types';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import generate from '@babel/generator';
import { ILogger } from '../core/logger';
import ContextWalker from './context.walker';
import { sortTypes, ReturningType, NodeTypes } from '../utils/object';
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

        let type = node.returningType.first();
        let childType = child.returningType.first();

        if(!childType){ // PATCH
            if(isLeft && node.leftRT)
                childType = node.leftRT.first();
            else if(node.rightRT)
                childType = node.rightRT.first();
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

    analyzeChild(node, RT){
        if(!node.opcode){
            // Declare as input variable

            const opcode = { op: 'input', val: node.repr, node: identifier(node.repr), 
            returningType: node.returningType }

            if(RT)
                opcode.returningType = RT;
            
            node.opcode = [opcode]
        }
    }

    isBasicLogicalOperator(operator: string){
        return operator.match(/>|<|>=|<=/)
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
            
            case 'LogicalExpression':
            /*else{
                    this.logger.warning("Not evaluated, maybe its a shorcut:", bin.repr, ` ${this.context.path} (${ast.loc.start.line}:${ast.loc.start.column})`, '\n')
                } */
                
                const log = ast as any;

                if(log.returningType.hasType("boolean")
                && log.returningType.isHomogeneus){

                    if(this.isBasicLogicalOperator(log.operator)){
                        this.analyzeChild(log.left, log.leftRT);

                        this.analyzeChild(log.right, log.rightRT);
    
                        Object.assign(ast, { opcode: 
                            [
                                ...log.left.opcode, ...this.getConvertion(log, log.left, true) , 
                                ...log.right.opcode,...this.getConvertion(log, log.right, false),
                                { val: ast.operator, op:'ins', returningType: log.returningType }
                            ] })
                    }
                    // Convert to parameter if it has no returningType or returningType is not number nor boolean
                    
                }
                break;
                break;

            case 'BinaryExpression':
            //case 'LogicalExpression':


                const bin = ast as any;
                
                this.walkAux(bin.left, bin);
                this.walkAux(bin.right, bin);

                /*if(bin.returningType.length == 0)
                    */
                if(bin.returningType.hasType("number")
                && bin.returningType.isHomogeneus){
                    // Convert to parameter if it has no returningType or returningType is not number nor boolean

                    this.analyzeChild(bin.left, bin.leftRT);

                    this.analyzeChild(bin.right, bin.rightRT);

                    Object.assign(ast, { opcode: 
                        [
                            ...bin.left.opcode, ...this.getConvertion(bin, bin.left, true) , 
                            ...bin.right.opcode,...this.getConvertion(bin, bin.right, false),
                            { val: ast.operator, op:'ins', returningType: bin.returningType }
                        ] })
                }
                break;
            default:
                this.genericWalk(ast, parent);
        }

        return ast
    }
}