import { expect } from 'chai';

import { Context } from '../src/walkers/context.walker';
import Container from '../src/impl/startup';
import DMachine from '../src/impl/machine';
import { AppContext, IAppContext } from '../src/core/config';
import SanboxExecutor from '../src/core/sandbox.executor';
import NodeSandbox from '../src/core/sandboxes/browser.sandbox';

const context: Context = {
  path: './tests/apps/nodejs-app-boilerplate',
  cvPath: '/tests/apps/nodejs-app-boilerplate'
}


Container.bind<Context>("Context")
.toConstantValue(context);



Container.bind<SanboxExecutor>("Sandbox").to(NodeSandbox).inSingletonScope();
Container.bind<IAppContext>("IAppContext").toConstantValue(AppContext);



describe('machine', function() {
  it('walking directory', function() {
    

    const machine = Container.resolve(DMachine);

    machine.process()
  });

});
