import * as fs from 'fs'
import { Context } from './walkers/context.walker';
import Container from './impl/startup';
import DMachine from './impl/machine';
import { AppContext, IAppContext } from './core/config';



if(process.argv.length < 5)
    throw new Error("You must provide: 'target-script', 'coverage-script', 'workload-script'" )

const code = fs.readFileSync(process.argv[2]).toString();
const cv = fs.readFileSync(process.argv[3]).toString();
const wl = fs.readFileSync(process.argv[4]).toString();

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

