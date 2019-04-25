import * as parser from '@babel/parser';
import * as fs from 'fs';
import GenericWalker from '../walkers/generic.walker';
import RuntimeInstrumentWalker from '../walkers/runtime.instrument.walker';
import generate from '@babel/generator';

const code = fs.readFileSync(process.argv[2]).toString();

const walker = new GenericWalker()
//const returningWalker = new ReturningWalker()
//const evaluation = new MicroEvaluationWalker()
const instrumentorWalker = new RuntimeInstrumentWalker()
instrumentorWalker.setSrc(code);

const ast = parser.parse(code);

walker.walk(ast);
//returningWalker.walk(ast);
//evaluation.walk(ast);
instrumentorWalker.walk(ast)

const out = generate(ast).code

console.log(out)

const registry = instrumentorWalker;

eval(out)

for(var hash in registry.nodes_hash){
    const node = registry.nodes_hash[hash];

    console.log(node.returningType, node.returningValue)
}