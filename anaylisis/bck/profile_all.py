import os
import sys
import subprocess
import shutil


import SimpleHTTPServer, BaseHTTPServer
import SocketServer
import threading
import time
import urllib2

import re

from json import loads, dumps


import numpy as np
import matplotlib.pyplot as plt

def getNgramAt(s, i, n):
    return s[i: n + i]

def getNgramSet(s, n):

    result = []

    for i in range(len(s) - n + 1):
        result.append(" ".join(map(lambda x: x.__str__(), getNgramAt(s, i, n))))

    return set(result)

def getDistance(set1, set2, comparisson):

    return 1 - len(set1 & set2)/1.0/comparisson(set1, set2)

def getSimilarityMatrix(sequences, n, comparisson):

    return [[ getDistance(
        getNgramSet(s1, n),
        getNgramSet(s2, n),
        comparisson
    ) for s2 in sequences ] for s1 in sequences]



class HTTPServer(BaseHTTPServer.HTTPServer):

    _continue = True

    def serve_until_shutdown(self):
        while self._continue:
            self.handle_request()

    def shutdown(self):
        self._continue = False
        # We fire a last request at the server in order to take it out of the
        # while loop in `self.serve_until_shutdown`.
        try:
            urllib2.urlopen(
                'http://%s:%s/' % (self.server_name, self.server_port))
        except urllib2.URLError:
            # If the server is already shut down, we receive a socket error,
            # which we ignore.
            pass
        self.server_close()

class SilentRequestHandler(BaseHTTPServer.BaseHTTPRequestHandler):

    def log_message(self, format, *args):
        pass


class HTTPServerLayer(object):

    host = 'localhost'

    def setUp(self, port):
        self.server = None
        self.port = port
        self.start_server()

    def start_server(self):
        self.server = HTTPServer((self.host, self.port), SimpleHTTPServer.SimpleHTTPRequestHandler)
        self.server_thread = threading.Thread(
            target=self.server.serve_until_shutdown)
        self.server_thread.daemon = True
        self.server_thread.start()
        # Kludge: Wait a little as it sometimes takes a while to get the server
        # started.
        time.sleep(0.25)

    def stop_server(self):
        if self.server is None:
            return
        self.server.shutdown()
        self.server_thread.join()

    def tearDown(self):
        self.stop_server()

def processSamples(path, wrapperName, functionName, traceMP):

    json = loads(open(path, 'r').read())

    print traceMP
    # create map from function ids

    mp = {

    }


    functionId = -1

    counter = len(traceMP.keys())

    for node in json["nodes"]:
        name = node['callFrame']['functionName']

        if name == functionName:
            functionId = node["id"]
            
        mp[node['id']] = name

        if name not in traceMP:
            traceMP[name] = counter + 1
            counter += 1


    # Getting important parts of samples, avoiding idle time
    start = 0
    end = 0
    for index, s in enumerate(json["samples"]):
        
        if s >= functionId and s == 0 :
            start = index
        if s >= functionId :
            end = index

    trace = map(lambda s: traceMP[mp[s]],json["samples"][start:end])
    return trace


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


    outputDir = 'out'
    for case in cases:

        dirs = os.listdir("out/%s.js"%(case))
        previous = os.getcwd()
        os.chdir("out/%s.js"%(case))

        traces = []
        overall = []
        print dirs
        alpha = {

        }

        for dirIndex in range(len(dirs)):
            
            d = dirs[dirIndex]
            print dirIndex, len(dirs)

            fullPath = d#'%s/%s.js/%s'%(outputDir,case, d)

            print fullPath
            if not os.path.isdir(fullPath):
                continue
            # moving results
            # shutil.copytree('out', '%s/%s'%(outDir, case))

            # Running chrome cpu profiling


            #web_dir = os.path.join(os.path.dirname(__file__), 'web')
            previous = os.getcwd()
            os.chdir(fullPath)


            PORT = 8010

            server = HTTPServerLayer()
            server.setUp(PORT)

            print "Serving at port", PORT

            #server.start_server()

            print "Launching chrome..."

            subprocess.call([
                "npm","run",
                "chrome",
                "http://localhost:8010/mutation.html",
                "out/%s.js/%s"%(case, d),
                'mutated'
            ])


            subprocess.call([
                "npm","run",
                "chrome",
                "http://localhost:8010/original.html",
                "out/%s.js/%s"%(case, d),
                'original'
            ])


            server.stop_server()


            if len(traces) == 0:
                traces.append(processSamples('profile-original.cpuprofile', 'Fuxuhuuooi', case, alpha))

            trace = processSamples('profile-original.cpuprofile', 'Fuxuhuuooi', case, alpha)
            traces.append(trace)

            if len(trace) > 0:
                overall.append(d)
            #if len(trace) > 0:
            #    traces.append(trace)

            print(previous)
            os.chdir(previous)
        
        # n-grams
        
        print "Saving traces for...", case

        f = open("%s.traces.json"%(case,), 'w')
        f.write(dumps(traces))
        f.close()

        f = open("%s.population.json"%(case,), 'w')
        f.write(dumps(overall))
        f.close()

        stds = []

        print "Sample sizes ", map(lambda x: len(x), traces)
        to = 20 #min(map(lambda x: len(x), traces))/10

        for i in range(1, to):
            print i,
            m = getSimilarityMatrix(
                traces,
                i,
                lambda set1, set2: max(len(set1), len(set2))
            )

            x = np.matrix(m)

            stds.append(x.std())

            '''for i in range(len(m)):
                for j in range(len(m)):
                    print m[i][j],
                print seqs[i]'''

        plt.plot(range(1, to), stds)
        plt.show()

        os.chdir(previous)

if __name__ == "__main__":
    main()

    #processSamples('out/mandelbrot.js/mutated13/profile-original.cpuprofile', 'Fuxuhuuooi', 'mandelbrot')

