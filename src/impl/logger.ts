import { ILogger } from "../core/logger";
import 'reflect-metadata';
import {injectable} from 'inversify';

@injectable()
export default class Logger implements ILogger{

    debug(...args: any[]): void {
        args.forEach(c => process.stdout.write(this.green(c)))
    }    
    info(...args: any[]): void {
        args.forEach(c => process.stdout.write(c))
    }
    warning(...args: any[]): void {
        args.forEach(c => process.stdout.write(this.yellow(c)))
    }
    error(...args: any[]): void {
        args.forEach(c => process.stdout.write(this.red(c)))
    }

    green(val){

        return `\x1b[32m${val}\x1b[0m`
    }


    yellow(val){
        return `\x1b[33m${val}\x1b[0m`
    }

    red(val){

        return `\x1b[31m${val}\x1b[0m`
    }

}