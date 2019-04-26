import os
import sys
import subprocess
import shutil



def main():


    cases = [
        'sudoku',
        'zip',
        'mandelbrot',
        'nested',
        'qs',
        'sha256'
    ]


    outDir = 'tests/out'

    # build if dist does not exists

    if not os.path.exists("dist/naenie.js"):
        subprocess.call(["npm", "run", "compile"])

    for case in cases:
        caseFolder = 'tests/cases/%s'%(case)

        result = subprocess.call(["node", "dist/naenie.js",
         "-t","%s/%s.js"%(caseFolder,case),
         "-c","%s/%s.cv.js"%(caseFolder,case),
         "-w","%s/%s.wl.js"%(caseFolder,case)])

        # Deleting previous out folder for this case
        if os.path.exists("%s/%s"%(outDir,case)):
            shutil.rmtree('%s/%s'%(outDir,case))

        if result != 0:
            raise Exception("Executing command error on '%s' case (%s)"%(case, caseFolder))

        # moving results
        shutil.copytree('out', '%s/%s'%(outDir, case))

if __name__ == "__main__":
    main()

