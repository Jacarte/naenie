
const fs = require("fs");
const deasync = require('deasync');

function toUint8Array(buf) {
    var u = new Uint8Array(buf.length)
    for (var i = 0; i < buf.length; ++i) {
        u[i] = buf[i]
    }
    return u
}

let done = false;
let ww = null;

async function load(src){


    const buffer = toUint8Array(await fs.readFileSync(src))

    const mod = await WebAssembly.compile(buffer);
    const bin = new WebAssembly.Instance(mod).exports;

    done = true;
    
    ww = bin
}

load("./server.js.wasm")

const blockEventLoop = (durationSeconds) => {
    console.log('START BLOCKING', Date.now());

    const endTime = Date.now() + (durationSeconds * 1000);

    while (Date.now() < endTime) {
        Math.random();
    }

    console.log('STOP BLOCKING', Date.now());
};

blockEventLoop(60)

console.log(ww)