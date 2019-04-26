import { IWalker } from '../core/walker';
import { BaseNode, catchClause, callExpression, identifier, stringLiteral } from '@babel/types';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import generate from '@babel/generator';
import generateRandomWASMWrapperName from '../utils/generator';
import { ILogger } from '../core/logger';
import { Context } from './context.walker';
import { BaseEmisor, TypesMap, OpsMap } from '../impl/emisor';
import { ReturningType, sortTypes } from '../utils/object';
import { IAppContext } from '../core/config';

/**
 * Wrapp ast nodes with extra information, such as subtree size, and generic children array property
 */
@injectable()
export default class TagsWalker implements IWalker<BaseNode, void>{
    
    @inject("ILogger")
    logger: ILogger;


    @inject("IAppContext")
    appContext: IAppContext;

    

    walk(obj: BaseNode): void {
        return this.walkAux(obj, null);
    }

    private isNode(tbd: any): tbd is BaseNode{
        return tbd.type != null
    }

    @inject("Emisor")
    public emisor: BaseEmisor;


    replaceIn(parent: any, isArray: boolean, key: string, value: any, indexOf: number){


        if(!isArray)
            parent[key] = value;
        else
            parent[key][indexOf] = value;
        
    }

    getRandomize(){
        const next = Math.random();

        return next < this.appContext.mutationThreshold;
    }

    generateWASM(node): any{

        let parameterCount = 0;
        let parameters = {};
        let nodes = [];

        const functionName = generateRandomWASMWrapperName();
        this.emisor.writeComment(node.repr.replace("\n", " "));
        this.emisor.writeComment(`Subtree size ${node.size}`);
        

        // Writing parameters, TODO improve this code

        for(var ins of node.opcode){

            switch(ins.op){
                case 'input':

                    if(!(ins.val in parameters)){
                        parameters[ins.val] = {
                            index: parameterCount++,
                            type: ins.returningType,
                        }
                        nodes.push(ins.node);
        
                    }
                    break
            }
        }
        this.emisor.openFunction(functionName);
        for(var k in parameters){
            const mostRepresentative = parameters[k].type;

            if(mostRepresentative.length > 0)
                this.emisor.declareParameter(``, TypesMap[mostRepresentative.first().ntype] )
            else
                this.emisor.declareParameter(``, 'i64')
            
        }

        this.emisor.declareResult(TypesMap[node.returningType.first().ntype])

        for(var ins of node.opcode){
            const mostRepresentative = ins.returningType.first();
            
            // TODO implement architecture over this operations
            
            switch(ins.op){
                case 'input':
                    
                    let index = parameters[ins.val].index;
                    //this.emisor.writeComment(ins.val)
                    this.emisor.writeInstruction("get_local", `${index}`)
                    break;
                case 'const':
                    //out += `i32.const ${ins.val}`
                    this.emisor.writeInstruction(`${TypesMap[mostRepresentative.ntype]}.const`, ins.val)
                    break;

                case 'ins':
                    this.emisor.writeInstruction(`${TypesMap[mostRepresentative.ntype]}.${OpsMap[ins.val]}`)
                    break;
                case 'conv':
                    this.emisor.writeInstruction(ins.val)
                    break;
            }

        }

        this.emisor.closeFunction();

        this.emisor.writeExportFunction(functionName);


        return callExpression(identifier(`ww.${functionName}`),nodes);
    }

    public walkAux(ast: any, parent: BaseNode | null): void {

        let visited = [];
        let queue = [ast];

        // BFS, get the first one translatable node and translate it
        while(queue.length > 0){
            const current = queue.shift();

            if(visited.indexOf(current) !== -1)
                continue;

            visited.push(current)

            for(var k in current){
            
                if(k === 'children')
                    continue;

                let value = current[k];
                let isArray = true;
    
                if (!(value instanceof Array)) {
                    value = [value]
                    isArray = false;
                }
        
                for(let i = 0; i < value.length; i++){
                    const simple = value[i];

                    if(!!simple && this.isNode(simple)){
                        if((simple.type as any) !== 'CommentLine'){
                            const simpleAny = simple as any;
                            if(!!simpleAny.opcode && simpleAny.opcode.length > 0)
                            {
                                simpleAny.translatable = true;

                                if(simpleAny.size > this.appContext.minSize && simpleAny.size < this.appContext.maxSize)// Between sizes: Avoid single nodes or huge ones
                                {
                                    if(this.getRandomize()){ // Randomization threshold

                                        const replacement = this.generateWASM(simpleAny)
                                        this.replaceIn(current, isArray, k, replacement, i);
                                    }
                                }


                                continue;
                            }
                            else{
                                queue.push(simple)
                            }
                        }
                    }
                }
            }

            this.logger.debug(`\r${visited.length}`)
        }

        visited = null;
        queue = null;
    }
}