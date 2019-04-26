# JS to WASM diversification machine (Naenie proof of concept)

Naenie (*Many* in high valyrian words) tries to generate valid code mutations for JavaScript code using calls between WASM and JS as the mutation operator.

![Workflow](docs/imgs/workflow.png)

Taking a JavaScript input file we can obtain the abstract syntax tree (AST) for it. Babel parser output an AST structure base on () spec. Basically, this tool extends those nodes with extra information. First, we analyze the static information from the JavaScript code like literal numbers, strings, booleans, etc. After that, we evaluate an instrumented version of the input code with some provided code to explore the script execution, resolving types in nodes evaluation. Later, the subtrees that can be translated to a Web Assembly Text (**WAT**) function are detected. The final step is to generate Web assembly binary code (**WASM**) and validate it.

The final output is a JavaScript file with its WASM complement.

Also, we implement a "sandbox" wrapper to test the generated code in a browser or node with some workload with the two implementations: the original one and the mutated one.

Basically, we have three inputs for the tool:
1. The file to be mutated
2. The coverage script to evaluate de input script finding the maximum coverage
3. The workload script to evaluate the mutation against the original one.

And two outputs:
1. The mutated javascript code who calls WASM code to complement it
2. The complement WASM code

![Example](docs/imgs/result2.png)

## How to use it?



## Stones on the road

- TODO: Write about javascript hard to analyse, mention core javascript semantic paper
- //https://github.com/dcodeIO/webassembly/issues/26 Javascript does not support int64 function signature for wasm
- Shortcuts
- Statical analysis
- Runtime analysis


## Concrete objectives
- Arithmetic expressions

## Future work lines
- Function calls from WASM to JS
- 

### Type inferring

### How to extend it ?

- TODO : Implement a walker example

## How to use it ?

- TODO write about dependency injection and how it works in this tool, pipeline explanation
- AppContext (Tool execution configuration)
- Context (Input configuration)

### Parametrization
- TODO: min tree size
- TODO: max tree size
- TODO: threshold to translate nodes

### Translation

- TODO

### Sandbox
- Node sandbox
- Browser sandbox

## Output

- Output structure

## Profiling

- Browser
  - Launch local server on output directory
  - Chrome basic
  - Firefox basic
  
- Node with perf in linux

## Results
- Test subjects
  - quicksort
  - zip 
  - sudoku
  - md5
  - rsa
  - rc4
  - canny
  - lcs
  - laguerre
  - linreg
  - mandelbrot
  - sha256
  
- Mutation output
  - Garbage collection calls as noise
- Mutated candidate performance and overhead
  - Execution time
  - Memory
  - CPU

