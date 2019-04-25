- automated-chrome-profiling (This is the one for the proof)
    - Let's say you want to evaluate the performance of some clientside JavaScript and want to automate it. Let's kick off our measurement in Node.js and collect the performance metrics from Chrome. Oh yeah.

    We can use the Chrome debugging protocol and go directly to how Chrome's JS sampling profiler interacts with V8. So much power here, so we'll use chrome-remote-interface as a nice client in front of the protocol:

    Protocols:
    - CPU profiling
        ```js
        {
            nodes: {
              id: number,
                callFrame: {
                    functionName: string,
                    scriptId: string,
                    url: string,
                    lineNumber: number,
                    columnNumber: number
                },
                hitCount: number,
                children: number[],
                positionTicks?: {
                    line: number,
                    ticks: number
                }[]
            }[],

            startTime: number,
            endTime: number,
            samples: number[],
            timeDeltas: number[]
        }
        ```
    - Trace summary:
    ```js
    {
        [id:string]:{
            sum: number,
            count: number,
            min: number,
            max: number
        }
    }[]
    ```
- V8:
  ```bash
  ./chrome --no-sandbox --js-flags="--prof --log-timer-events" mail.google.com & sleep 10; kill $!
  ```

  - MACOS
    - Start python server in mutated output directory
    - Run Profiling
    ```bash
    /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --no-sandbox --js-flags="--prof --log-timer-events" --no-default-browser-check -user-data-dir=/Users/javiercabrera/Documents/Develop/v8p http://localhost:8000/original.html & sleep 10; kill $!
    ```
    - Find the sure you have the isolate-***.log or v8.log file created during profiling. It was created in the folder you launched that command from. 

    - https://github.com/thlorenz/v8-profiling to plot the logs
