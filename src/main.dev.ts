import * as fs from 'fs'
import { Context } from './walkers/context.walker';
import Container from './impl/startup';
import DMachine from './impl/machine';
import { AppContext, IAppContext } from './core/config';
import SanboxExecutor from './core/sandbox.executor';
import BrowserSandbox from './core/sandboxes/browser.sandbox';


const code = fs.readFileSync(process.argv[2]).toString();
const cv = fs.readFileSync(process.argv[3]).toString();
const wl = fs.readFileSync(process.argv[4]).toString();

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



Container.bind<SanboxExecutor>("Sandbox").to(BrowserSandbox).inSingletonScope();
Container.bind<IAppContext>("IAppContext").toConstantValue(AppContext);


const machine = Container.resolve(DMachine);

machine.process()


