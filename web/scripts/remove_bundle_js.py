#!/usr/bin/env python
import os, glob

PUBLIC_PATH = '../server/public'

for name in glob.glob(PUBLIC_PATH + '/bundle-*.js'):
  os.remove(name)
  print('Removing file: ' + name)