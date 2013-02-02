#!/usr/bin/env python

import shapefile
from pyproj import Proj
# FYI the Projection Data is in Feet and needs to be manually converted to meters
import sys

def feet2meters(feet):
    return feet * 0.3048

nowa = Proj(init='epsg:2926')

sf = shapefile.Reader(sys.argv[1])

shapes = sf.shapes()
records = sf.records()

for shape, record in zip(sf.shapes(), sf.records()):
    if record[0] == sys.argv[2]:
        long, lat = nowa(feet2meters(shape.points[0][0]), feet2meters(shape.points[0][1]), inverse=True)
        print lat, ',', long, ',', record[4]

