
import * as fs from 'fs';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { IAppContext } from '../core/config';

export const TypesMap = {
    'number': 'i32',
    'lnumber': 'i64',
    'float': 'f32',
    'lfloat': 'f64',
    'boolean': 'i32'
}


export const ConvertionMap = {
    'number': {
        'float': 'trunc_s/f32',
        'lfloat': 'trunc_s/f64',
        'lnumber': 'expand_s/i64'
    },
    'lnumber': {
        'float': 'trunc_s/f32',
        'lfloat': 'trunc_s/f64',
        'number': 'extend_s/i32'
    },
    'float': {
        'number': 'convert_s/i32',
        'lnumber': 'convert_s/i64',
        'lfloat': 'demote_s/f64'
    },
    'lfloat': {
        'number': 'convert_s/i32',
        'lnumber': 'convert_s/i64',
        'float': 'promote_s/f32'
    }

}

export const OpsMap = {
    '+': 'add',
    '-': 'sub',
    '*': 'mul',
    '/': 'div',
    '%': 'rem_s',

    '||': 'or',
    '&&': 'and',

    '<<': 'shl',
    '>>': 'shr_u',
    '|': 'or',
    '&': 'and',
    '^': 'xor',

    '==': 'eq',
    '===': 'eq',
    '!=': 'ne',
    '!==': 'ne',
    '<': 'lt_u',
    '>': 'gt_u',
    '<=': 'le_u',
    '>=': 'ge_u'
}
@injectable()
export abstract class BaseEmisor{

    abstract write(instruction: string);

    indent = 0;

    i(){
        this.indent++;

        return this.writeIndent();
    }

    d(){
        this.indent--;

        return this.writeIndent();
    }


    writeIndent(){
        let result = '\n';

        for(var i = 0; i < this.indent; i++)
            result += '\t';
        
        return result;
    }

    openModule(){
        this.write(`(module ${this.i()}`)
    }

    closeModule(){
        this.write(`${this.d()})`)
    }

    writeExportFunction(functionName){
        this.write(`${this.writeIndent()}(export "${functionName}" (func $${functionName}))`)
    }

    openFunction(functionName){
        this.write(`${this.writeIndent()}(func $${functionName} `)
    }

    declareParameter(varName, type){
        this.write(`(param ${varName} ${type}) `);
    }

    declareResult(type){
        this.write(`(result ${type}) ${this.i()}`);
    }

    writeComment(val){
        this.write(`${this.writeIndent()};;${val}${this.writeIndent()}`);
    }

    writeInstruction(opcode, ...parameters: any[]){
        this.write(`${opcode}`);

        for(var parameter of parameters)
            this.write(` ${parameter}`);

        this.write(this.writeIndent())
    }

    closeFunction(){
        this.write(`${this.d()})`);
    }
}

@injectable()
export class FileEmisor extends BaseEmisor{
    
    fd;

    @inject("IAppContext")
    context: IAppContext;


    
    write(instruction: string) {
        if(!this.fd)
            this.fd = fs.openSync(`${this.context.outDir}/${this.context.watName}`, 'w');

        fs.writeSync(this.fd, instruction)
    }

}