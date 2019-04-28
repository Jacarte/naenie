
import sys
from json import dumps, loads


def process(path, functionName):

    content = open(path, 'r').read()

    json = loads(content)
    samples = []

    id = -1
    prevId = -1
    print "Detecting functionName..."
    children = []

    for node in json["nodes"]:
        frame = node["callFrame"]

        if frame["functionName"] == functionName:
            id = node["id"]
            if 'children' in node:
                children = node["children"]
            break

    print "Function id %s"%(id), "children", children
    l = len(json["samples"])
    start = 0
    end = 0
    
    ranges = []
    
    for index in range(len(json["samples"]) - 1):
        s = json["samples"][index]
        next = json["samples"][index + 1]
        if s < next and next == id:
            ranges.append([index])
        if s > next and s == id and len(ranges) > 0 and len(ranges[-1]) == 1:
            ranges[-1].append(index  + 1)


    ranges = filter(lambda t: len(t) == 2, ranges)
    sorted(ranges, key= lambda x: x[1] - x[0])


    print ranges[0], ranges[-1]

    start, end = ranges[0]
        
    print "Setting range to %s-%s"%(start, end), l

    print "Resampling..."

    json["samples"] = json["samples"][start: end]
    json["timeDeltas"] = json["timeDeltas"][start: end]

    f = open("%s.res.cpuprofile"%(path), 'w')
    f.write(dumps(json))

    f.close()

if __name__ == "__main__":
    process("tests/out/mandelbrot/profile-mutated.cpuprofile", "mandelbrot")
    process("tests/out/mandelbrot/profile-original.cpuprofile", "mandelbrot")

