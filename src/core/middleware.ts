import { BaseNode } from '@babel/types'
import { Context, ExtendedNode } from './types';

export interface IMiddleware<T extends BaseNode>{
    process(path: Context<T & ExtendedNode>): void;
}