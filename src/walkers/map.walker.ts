import { IWalker } from '../core/walker';
import { BaseNode, NumericLiteral, BinaryExpression, BooleanLiteral, identifier, returnStatement } from '@babel/types';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import generate from '@babel/generator';
import { ILogger } from '../core/logger';
import ContextWalker from './context.walker';
import { sortTypes, ReturningType, NodeTypes } from '../utils/object';
import { TypesMap, ConvertionMap } from '../impl/emisor';
import { IAppContext } from '../core/config';


/**
 * Wrapp ast nodes with extra information, such as subtree size, and generic children array property
 */
@injectable()
export default class MapWalker extends ContextWalker<BaseNode, BaseNode>{
    
    @inject("ILogger")
    public logger: ILogger;


    @inject("IAppContext")
    public appContext: IAppContext;

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
                    op: 'conv', val: `${TypesMap[type.ntype]}.${ConvertionMap[type.ntype][childType.ntype]}`, returningType: new NodeTypes(type)
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
        return operator.match(/>|<|>=|<=|&|&&|\|\||\|\^/)
    }

    isComparissonOperator(operator: string){
        return operator.match(/==|===|!=|!==/)
    }

    generateOpCodes(ast){
        this.analyzeChild(ast.left, ast.leftRT);

        this.analyzeChild(ast.right, ast.rightRT);

        Object.assign(ast, { opcode: 
            [
                ...ast.left.opcode, ...this.getConvertion(ast, ast.left, true) , 
                ...ast.right.opcode,...this.getConvertion(ast, ast.right, false),
                { val: ast.operator, op:'ins', returningType: ast.returningType }
            ] })
    }

    public walkAux(ast: any, parent: any | null): BaseNode {


        if(this.visited.indexOf(ast) !== -1){
        //|| ast.size < this.appContext.minSize || ast.size > this.appContext.maxSize){
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
            //case 'LogicalExpression':
                const bin = ast as any;
                
                this.walkAux(bin.left, bin);
                this.walkAux(bin.right, bin);

                if(bin.left.returningType.isEmpty && bin.leftRT){
                    bin.left.returningType = bin.leftRT;
                }

                if(bin.right.returningType.isEmpty && bin.rightRT){
                    bin.right.returningType = bin.rightRT;
                }

                if(bin.returningType.isHomogeneus){
                    if( bin.left.returningType.isHomogeneus
                        && bin.right.returningType.isHomogeneus
                    ){
                        // Convert to parameter if it has no returningType or returningType is not number nor boolean
                        this.generateOpCodes(bin)
                    }
                    else{
                        //if(bin.left.returningType.isHomogeneus && )
                        this.logger.warning("We are not supporting equality comparers between complex types yet: ")
                        this.logger.debug( bin.repr)
                        this.logger.warning(` ${this.context.path}:${ast.loc.start.line}:${ast.loc.start.column}`, '\n')
                    }
                }
                else{
                    this.logger.info("Not evaluated, maybe its a shorcut or it wasn't evaluated in the coverage stage : ")
                    this.logger.debug(bin.repr)
                    this.logger.warning(` ${this.context.path}:${ast.loc.start.line}:${ast.loc.start.column}`, '\n')
                    //this.logger.warning("Operator ", log.operator, '\n')
                    //this.logger.warning("Returning type ", JSON.stringify(log.returningType.types), '\n')
                }

                break;
            default:
                this.genericWalk(ast, parent);
        }

        return ast
    }
}