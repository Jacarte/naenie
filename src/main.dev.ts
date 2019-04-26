import * as fs from 'fs'
import { Context } from './walkers/context.walker';
import Container from './impl/startup';
import DMachine from './impl/machine';
import { AppContext, IAppContext } from './core/config';


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



Container.bind<IAppContext>("IAppContext").toConstantValue(AppContext);


const machine = Container.resolve(DMachine);

machine.process(context)

