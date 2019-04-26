import os
import sys
import subprocess
import shutil



def main():
    cases = [
        'mandelbrot',
        'nested',
        'qs',
        'sha256'
    ]


    mainScript = 'scripts/main.ts'
    outDir = 'tests/out'

    for case in cases:
        caseFolder = 'tests/cases/%s'%(case)
        result = subprocess.call(["npm", "run", "ts", mainScript,
         "%s/%s.js"%(caseFolder,case),
         "%s/%s.cv.js"%(caseFolder,case),
         "%s/%s.wl.js"%(caseFolder,case)])

        # Deleting previous out folder for this case
        if os.path.exists("%s/%s"%(outDir,case)):
            shutil.rmtree('%s/%s'%(outDir,case))

        if result != 0:
            raise Exception("Executing command error on '%s' case (%s)"%(case, caseFolder))

        # moving results
        shutil.copytree('out', '%s/%s'%(outDir, case))

if __name__ == "__main__":
    main()

