#!/usr/bin/env bash

# compile bundle.js
cd web
DIFF_ENV=production webpack --progress

cd ../server
eb deploy