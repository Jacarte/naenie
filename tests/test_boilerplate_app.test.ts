import { expect } from 'chai';

import { Context } from '../src/walkers/context.walker';
import Container from '../src/impl/startup';
import DMachine from '../src/impl/machine';
import { AppContext, IAppContext } from '../src/core/config';
import SanboxExecutor from '../src/core/sandbox.executor';
import NodeSandbox from '../src/core/sandboxes/browser.sandbox';


Container.bind<SanboxExecutor>("Sandbox").to(NodeSandbox).inSingletonScope();
Container.bind<IAppContext>("IAppContext").toConstantValue(AppContext);



/*describe('machine', function() {
  it('walking directory', function() {
    

      const context: Context = {
        path: './tests/apps/hackathon-starter',
        cvPath: '/tests/apps/hackathon-starter',
        exclude: /node_modules/
      }
      
      
      Container.bind<Context>("Context")
      .toConstantValue(context);
      
    
    const machine = Container.resolve(DMachine);

    machine.process()
  });

});*/



describe('machine', function() {
  it('walking directory 2', function() {
    

      
    const context: Context = {
      path: './tests/apps/time-attack',
      cvScript: 'node server.js',
      instrumentationFolder: 'instrumentation',
      timeout: 10
    }

      
      
      Container.bind<Context>("Context")
      .toConstantValue(context);
      
    
    const machine = Container.resolve(DMachine);

    machine.process()
  });

});
