import { expect } from 'chai';

import { Context } from '../src/walkers/context.walker';
import Container from '../src/impl/startup';
import DMachine from '../src/impl/machine';
import { AppContext, IAppContext } from '../src/core/config';
import SanboxExecutor from '../src/core/sandbox.executor';
import NodeSandbox from '../src/core/sandboxes/node.sandbox';
import PopulationGenerator from '../src/impl/population_generator/populator.generator';
import ProbabilityPopulator from '../src/impl/population_generator/probability.populator';
import { BaseEmisor, FileEmisor } from '../src/impl/emisor';


Container.bind<SanboxExecutor>("Sandbox").to(NodeSandbox).inSingletonScope();
Container.bind<IAppContext>("IAppContext").toConstantValue(AppContext);
Container.bind<PopulationGenerator>("Populator").to(ProbabilityPopulator).inSingletonScope();


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
      cvScript: 'node',
      cvScriptArgs: ['server.js'],
      instrumentationFolder: 'instrumentation',
      timeout: 10,
      policy: 'simple'
    }

      
      
      Container.bind<Context>("Context")
      .toConstantValue(context);
      
    
    const machine = Container.resolve(DMachine);

    machine.process()
  });

});
