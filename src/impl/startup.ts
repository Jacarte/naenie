import { Container } from "inversify";
import { ILogger } from '../core/logger';
import Logger from "./logger";
import DMachine from "./machine";
import NodeSandbox from '../core/sandboxes/node.sandbox';
import SanboxExecutor from "../core/sandbox.executor";
import GenericWalker from "../walkers/generic.walker";
import TagsWalker from "../walkers/emit.walker";
import MapWalker from "../walkers/map.walker";
import MergeRuntime from "../walkers/mergeRuntime.walker";
import RuntimeInstrumentWalker from "../walkers/runtime.instrument.walker";
import { BaseEmisor, FileEmisor } from './emisor';
import WebTTools from '../core/wabt.tools';
import BrowserSandbox from '../core/sandboxes/browser.sandbox';

// Initialize dependency injector
// Register all services here

const myContainer = new Container();

myContainer.bind<ILogger>("ILogger").to(Logger).inSingletonScope();
myContainer.bind<SanboxExecutor>("Sandbox").to(BrowserSandbox).inSingletonScope();

//WebT tools
myContainer.bind<WebTTools>(WebTTools).toSelf().inSingletonScope();


// Emisor
myContainer.bind<BaseEmisor>("Emisor").to(FileEmisor).inSingletonScope();


// Walkers
myContainer.bind<GenericWalker>(GenericWalker).toSelf();
myContainer.bind<TagsWalker>(TagsWalker).toSelf();
myContainer.bind<MapWalker>(MapWalker).toSelf();
myContainer.bind<MergeRuntime>(MergeRuntime).toSelf();
myContainer.bind<RuntimeInstrumentWalker>(RuntimeInstrumentWalker).toSelf();

myContainer.bind<DMachine>(DMachine).toSelf().inSingletonScope();

export default myContainer;