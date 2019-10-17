import * as fs from 'fs'
import * as path from 'path';
import { Context } from './walkers/context.walker';
import Container from './impl/startup';
import DMachine from './impl/machine';
import { AppContext, IAppContext } from './core/config';
import NodeSandbox from './core/sandboxes/node.sandbox';
import BrowserSandbox from './core/sandboxes/browser.sandbox';
import SanboxExecutor from './core/sandbox.executor';
import OneByOneGenerator from './impl/population_generator/one-by-one.generator';
import AllGenerator from './impl/population_generator/all.generator';
import PopulationGenerator from './impl/population_generator/populator.generator';

var program = require('commander');
 
const sandboxTypes = 
{
    'node': NodeSandbox,
    'browser': BrowserSandbox
};


const populatorTypes = 
{
    'one2one': OneByOneGenerator,
    'all': AllGenerator
};

function absolute(dir){
    return path.join(process.cwd(), dir);
}


program
  .version('0.0.1', '-v', '--version')
  .usage('[options] <project path>')
  .option('-t --target <target>', 'Target application path')
  .option('-c --coverage <coverage>', 'Coverage script path (i.e. bash script for server workload, etc)')
  .option('-m --minumum <minimum>', 'Minimum tree size to translate')
  .option('-m --maximum <maximum>', 'Maximum tree size to translate')
  .option('-p --policy <policy>', 'Translation policy, simple for only onle random subtree, middle for translating the 50% of found trees and paranoic for the 100% of foudn trees')
  .option('-s --sandbox <sandbox>', 'Sandbox wrapper: Node or Browser')
  .parse(process.argv);
 

if(!program.target)
    throw new Error("Target script is required. -t <target>")

if(!program.coverage)
    throw new Error("Target script is required. -c <coverage>")

if(!program.workload)
    throw new Error("Target script is required. -w <workload>")

AppContext.minSize = program.minimum || AppContext.minSize;
AppContext.maxSize = program.maximum || AppContext.maxSize;
AppContext.mutationThreshold = program.threshold || AppContext.mutationThreshold;

if(program.sandbox){
    if(!(program.sandbox in sandboxTypes)){
        throw new Error("Unknown sandbox type. Please provide a valid sandbox name: 'node' 'browser'")
    }

    Container.bind<SanboxExecutor>("Sandbox").to(sandboxTypes[program.sandbox]).inSingletonScope();
}
else{
    Container.bind<SanboxExecutor>("Sandbox").to(BrowserSandbox).inSingletonScope();
}

if(program.populator){
    if(!(program.populator in populatorTypes)){

        throw new Error("Unknown populator type. Please provide a valid sandbox name: 'one2one' 'all'")
    }

    Container.bind<PopulationGenerator>("Populator").to(populatorTypes[program.populator]).inSingletonScope();
}
else{
    Container.bind<PopulationGenerator>("Populator").to(OneByOneGenerator).inSingletonScope();
}



// arguments minimum, maximum and threshold 


const context: Context = {
    path: program.target,
    cvPath: program.coverage
}




Container.bind<Context>("Context")
.toConstantValue(context);



Container.bind<IAppContext>("IAppContext").toConstantValue(AppContext);


const machine = Container.resolve(DMachine);

console.log("Analysing...", program.target)

machine.process()


