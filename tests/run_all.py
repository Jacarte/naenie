import os
import sys
import subprocess
import shutil


import SimpleHTTPServer, BaseHTTPServer
import SocketServer
import threading
import time
import urllib2


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


def main():


    cases = [
        #'md5',
        #'sudoku',
        #'zip',
        'mandelbrot',
        'nested',
        'qs',
        #'sha256'
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

        # Running chrome cpu profiling


        #web_dir = os.path.join(os.path.dirname(__file__), 'web')
        previous = os.getcwd()
        os.chdir('%s/%s'%(outDir, case))


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
            "tests/out/%s"%(case),
            'mutated'
        ])


        subprocess.call([
            "npm","run",
            "chrome",
            "http://localhost:8010/original.html",
            "tests/out/%s"%(case),
            'original'
        ])


        server.stop_server()

        print(previous)
        os.chdir(previous)

if __name__ == "__main__":
    main()

