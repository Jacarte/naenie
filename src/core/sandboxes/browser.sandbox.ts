import { injectable, inject } from "inversify";
import SanboxExecutor from '../sandbox.executor';
import { Context } from "../../walkers/context.walker";
import generate from "@babel/generator";
import * as fs from 'fs';
import {render} from 'mustache';
import { IAppContext } from "../config";

@injectable()
export default class BrowserSandbox extends SanboxExecutor{

    @inject("Context")
    context: Context;

    @inject("IAppContext")
    appContext: IAppContext;

    instrument(mutatedCode: string, outPath: string, wasmPath: any) {

        const view = {
            wasmfile:this.appContext.wasmName,
            //wlcode: this.context.wlCode,
            mutatedCode,
            //original: this.context.code,
            wasmCBName: this.appContext.returnWASMCallbackName
        }

        
        const original = render(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Original</title>
</head>
<body>  
<script>
    fetch('{{{wasmfile}}}').then(response =>
        response.arrayBuffer()
    ).then(bytes =>
        WebAssembly.instantiate(bytes)
    ).then(function {{{wasmCBName}}}(results){

        const ww = results.instance.exports;

        {{{original}}}

        console.profile("Original")
        {{{wlcode}}}
        console.profileEnd("Original")
    });
    </script>
</body>
</html>
            `, view);

        fs.writeFileSync(`${outPath}/original.html`, original);


        const prime = render(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Mutation</title>
</head>
<body>  
    <script>
        fetch('{{{wasmfile}}}').then(response =>
            response.arrayBuffer()
        ).then(bytes =>
            WebAssembly.instantiate(bytes)
        ).then(function {{{wasmCBName}}}(results){

            const ww = results.instance.exports;

            {{{mutatedCode}}}

            console.profile("Mutation")
            {{{wlcode}}}
            console.profileEnd("Mutation")
        });
    </script>
</body>
</html>
        `, view);


        fs.writeFileSync(`${outPath}/mutation.html`, prime);
    
        fs.writeFileSync(`${outPath}/mutation.js`, view.mutatedCode);

    }
    
}