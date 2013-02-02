#!/usr/bin/env python

import json

f = open('data.json', 'r+')

data = {}

for line in f.readlines():
    j = json.loads(line)
    if j["LocAddr"]["latitude"] <= 47.818565 and j["LocAddr"]["longitude"] >= -117.622032 and j["LocAddr"]["latitude"] >= 47.600607 and j["LocAddr"]["longitude"] <= -117.045593 :
        try:
            data[j['Privilege']].append(j)
        except KeyError:
            data[j['Privilege']] = [j]        

f.close()

if True:
    print json.dumps(data,sort_keys=True)
else:
    total = 0
    for priv in sorted(data.keys()):
        print priv, len(data[priv])
        total = total + len(data[priv])
        
    print "total", total
