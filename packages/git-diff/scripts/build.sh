#!/bin/bash

# The script unifies the build scripts.
#
# It's the entry point for the build process.

set -ex

tsc --project tsconfig.build.json
