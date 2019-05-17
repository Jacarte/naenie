import os
import sys
import subprocess
import shutil


import SimpleHTTPServer, BaseHTTPServer
import SocketServer
import threading
import time
import urllib2



def main():


    cases = [
        #'md5',
        #'sudoku',
        #'zip',
        #'mandelbrot',
        #'nested',
        #'qs',
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

        

if __name__ == "__main__":
    main()

