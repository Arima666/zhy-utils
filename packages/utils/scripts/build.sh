#!/bin/bash

# The script unifies the build scripts.
#
# It's the entry point for the build process.

set -ex

./../../scripts/indices.js

tsc --project tsconfig.build.json
