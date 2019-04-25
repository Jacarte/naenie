# JS to WASM diversification machine (Naenie)

## Architecture words

![Workflow](docs/imgs/workflow.png)

Taking a JavaScript input file we can obtain the abstract syntax tree (AST) for it. 

## Stones on the road

- TODO: Write about javascript hard to analyse, mention core javascript semantic paper

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
  - Mandelbrot
  - Jquery
  - ...
- Mutation output
  - Garbage collection calls as noise
- Mutated candidate performance and overhead
  - Execution time
  - Memory
  - CPU

