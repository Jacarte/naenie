import { injectable, inject } from "inversify";
import { ILogger } from './logger';

var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

@injectable()
export default class WebTTools{

    @inject("ILogger")
    logger: ILogger;

    compileWat(inPath, outPath){
        const self = this;
        exec(`./wabt/wat2wasm ${inPath} -o ${outPath}`, function callback(error, stdout, stderr){
            
            //if(error)
            //    self.logger.error(error);
            if(stdout)
                self.logger.debug(stdout);
        })
    }

    validateWasm(path){
        const self = this;
        exec(`./wabt/wasm-validate ${path}`, function callback(error, stdout, stderr){
            
            //f(error)
             //   self.logger.error(error);
            if(stdout)
                self.logger.debug(stdout);
        })
    }

}