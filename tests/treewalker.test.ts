
import * as parser from '@babel/parser';
import GenericWalker from '../walkers/generic.walker';


const code = 'function a(b){ b--; }'
const walker = new GenericWalker({code, path:'', wlPath:''})

const ast = parser.parse(code);

walker.walk(ast);

var cache = [];
const result = JSON.stringify(ast, function(key, value) {
    if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
            // Duplicate reference found
            try {
                // If this value does not reference a parent it can be deduped
                return JSON.parse(JSON.stringify(value));
            } catch (error) {
                // discard key if value cannot be deduped
                return;
            }
        }
        // Store value in our collection
        cache.push(value);
    }
    return value;
});
cache = null;

// console.log(result);