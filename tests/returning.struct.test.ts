import { NodeTypes } from '../src/utils/object';

const stru = new NodeTypes();

stru.insertType({
    base: 'number',
    ntype: 'i32',
    priority: 2
})


stru.insertType({
    base: 'number',
    ntype: 'i64',
    priority: 4
})


stru.insertType({
    base: 'number',
    ntype: 'float',
    priority: 1
})

stru.insertType({
    base: 'number',
    ntype: 'lfloat',
    priority: 2
})

console.log(stru.types)