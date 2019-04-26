import * as fs from 'fs'
import { Context } from './walkers/context.walker';
import Container from './impl/startup';
import DMachine from './impl/machine';
import { AppContext, IAppContext } from './core/config';
import NodeSandbox from './core/sandboxes/node.sandbox';
import BrowserSandbox from './core/sandboxes/browser.sandbox';
import SanboxExecutor from './core/sandbox.executor';

var program = require('commander');
 
const sandboxTypes = 
{
    'node': NodeSandbox,
    'browser': BrowserSandbox
};

program
  .version('0.0.1', '-v', '--version')
  .usage('[options] <files...>')
  .option('-t --target <target>', 'Target script path')
  .option('-c --coverage <coverage>', 'Coverage script path')
  .option('-w --workload <workload>', 'Workload script path')
  .option('-m --minumum <minimum>', 'Minimum tree size to translate')
  .option('-M --maximum <maximum>', 'Maximum tree size to translate')
  .option('-u --threshold <threshold>', 'Probability to translate subtree')
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
    if(!(program.sandobx in sandboxTypes)){
        throw new Error("Unknown sandbox type. Please provide a valid sandbox name: 'node' 'browser'")
    }

    Container.bind<SanboxExecutor>("Sandbox").to(sandboxTypes[program.sandbox]).inSingletonScope();
}
else{
    Container.bind<SanboxExecutor>("Sandbox").to(BrowserSandbox).inSingletonScope();
}

const code = fs.readFileSync(program.target).toString();
const cv = fs.readFileSync(program.coverage).toString();
const wl = fs.readFileSync(program.workload).toString();

// arguments minimum, maximum and threshold 


const context: Context = {
    path: process.argv[2],
    code,
    wlPath: process.argv[3],
    wlCode: wl,
    cvCode: cv,
    cvPath: process.argv[4]
}


Container.bind<Context>("Context")
.toConstantValue(context);



Container.bind<IAppContext>("IAppContext").toConstantValue(AppContext);


const machine = Container.resolve(DMachine);

machine.process(context)


