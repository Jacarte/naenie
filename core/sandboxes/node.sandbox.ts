import { injectable, inject } from "inversify";
import SanboxExecutor from '../sandbox.executor';
import { Context } from "../../walkers/context.walker";
import generate from "@babel/generator";
import * as fs from 'fs';
import {render} from 'mustache';

@injectable()
export default class NodeSandbox extends SanboxExecutor{

    @inject("Context")
    context: Context;

    instrument(mutatedCode: string, outPath: string, wasmPath: any) {

        const view = {
            wasmfile:wasmPath,
            wlcode: this.context.wlCode,
            mutatedCode
        }

        const text = render(`
const fs = require("fs");

function toUint8Array(buf) {
    var u = new Uint8Array(buf.length)
    for (var i = 0; i < buf.length; ++i) {
    u[i] = buf[i]
    }
    return u
}

async function main() {
    // Fetch the file and compile it
    const buffer = toUint8Array(fs.readFileSync('{{{wasmfile}}}'))

    const mod = await WebAssembly.compile(buffer);
    const ww = await new WebAssembly.Instance(mod).exports;

    {{{mutatedCode}}}

    {{{wlcode}}}
}

main()
            `, view);

        fs.writeFileSync(outPath, text);
    }
    
}