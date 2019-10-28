import requests
import time
import _thread
from threading import Thread

def encode(vals):
    return "&".join(
        map(lambda x, y: 'var%s=%s'%(x[1], x[0]),
        zip(vals, range(0, len(vals)))
        , vals))

def getInfo(vals, result):
    start = time.time() # inseconds
    requests.get('http://localhost:8080/info')
    end = time.time()

    result[0] = end - start


def getCheck(encoded):
    r = requests.get('http://localhost:8080/check?%s'%(encoded, ))
    #print(encoded)

def goForit(vals):
    encoded = encode(vals)

    #print(vals)
    result = [None]

    t1 = Thread(target=getCheck, args=(encoded, ))
    t2 = Thread(target=getInfo, args=(vals, result))

    t1.start()
    t2.start()

    t1.join()
    t2.join()
    return result[0]

def evaluate(vals):

    MAX = 50
    cumul = 0

    for _ in range(1, MAX + 1):
        cumul += goForit(vals)

    mean = cumul/MAX

    print("\\{%s\\} %ss \\\\"%(",".join(map(lambda x: x.__str__(), vals)), mean))  


# var correct = [4, 12, 77, 98, 35];

# latex

print(" ")
# first
print("\makecell{")
evaluate([1, 1, 1, 1, 1])
evaluate([2, 2, 2, 2, 2])
evaluate([3, 3, 3, 3, 3])
evaluate([4, 4, 4, 4, 3])
evaluate([5, 5, 5, 5, 4])
evaluate([6, 6, 6, 6, 5])
evaluate([7, 7, 7, 7, 7])
print("}")

print(" ")

# second

print("\makecell{")
evaluate([4, 9, 1, 1, 1])
evaluate([4, 10, 2, 2, 2])
evaluate([4, 11, 3, 3,3])
evaluate([4, 12, 4, 4, 4])
evaluate([4, 13, 5, 5, 5])
evaluate([4, 14, 6, 6, 6])
evaluate([4, 15, 7, 7, 7])
print("}")


print(" ")

# third

print("\makecell{")
evaluate([4, 12, 70, 4, 4])
evaluate([4, 12, 72, 4, 4])
evaluate([4, 12, 77, 4, 4])
evaluate([4, 12, 79, 4, 5])
evaluate([4, 12, 80, 4, 4])
evaluate([4, 12, 81, 4, 4])
print("}")

print(" ")

# fourth
print("\makecell{")
evaluate([4, 12, 77, 96, 4])
evaluate([4, 12, 77, 97, 4])
evaluate([4, 12, 77, 98, 4])
evaluate([4, 12, 77, 100, 4])
evaluate([4, 12, 77, 101, 4])
evaluate([4, 12, 77, 102, 4])
print("}")

print(" ")

# fifth
print("\makecell{")
evaluate([4, 12, 77, 98, 31])
evaluate([4, 12, 77, 98, 32])
evaluate([4, 12, 77, 98, 33])
evaluate([4, 12, 77, 98, 34])
evaluate([4, 12, 77, 98, 35])
evaluate([4, 12, 77, 98, 36])
evaluate([4, 12, 77, 98, 37])
print("}")