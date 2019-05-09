from json import dumps, loads
import os

def processLineByLine(file1, file2):


    c1 = open(file1, 'r').read().split('\n')
    c2 = open(file2, 'r').read().split('\n')

    if len(c1) != len(c2):
        print "Different byte code length"
    
    for i in range(min(len(c1), len(c2))):
        l1, l2 = c1[i], c2[i]

        if l1 != l2:
            print l1, l2, i
            break

def updateBag(file, bag):

    lines1 = open(file, 'r').read().split('\n')

    for i in range(len(lines1)):
        line = lines1[i]
        #print bag
        if line not in bag:
            bag[line] = len(bag.keys()) + 1
    
    lines1 = map(lambda d: bag[d], lines1)

    #print lines1
    return lines1
    
def processFolder(path):
    bag = dict()

    originalTr = []
    overall = []
    info = []
    
    for root, dirs, files in os.walk(path):
        if 'original.bytecode.txt' in files and not originalTr:
            print "Taking original"
            original = files[files.index('original.bytecode.txt')]
            originalTr = updateBag('%s/%s'%(root, original), bag)
        
        if 'mutation.bytecode.txt' in files:
            mutation = files[files.index('mutation.bytecode.txt')]
            overall.append(updateBag('%s/%s'%(root, mutation), bag))
            info.append(loads(open('%s/%s'%(root, 'translation-info.json'), 'r').read()))
            print '\r', root,
    return dict(seqs = [originalTr] + overall, info = info)

if __name__ == "__main__":
   
    open("result.json", 'w').write(dumps(processFolder("/Users/javiercabrera/Documents/Develop/WJMachine/out/sha256.js")))
    