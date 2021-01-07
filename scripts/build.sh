#!/bin/sh

echo "Lint..."
yarn lint

echo "Build Mode: $1"
sh $PWD/scripts/clean.sh

echo "Generating tsoa Route"
tsoa routes
# npm run tsoa:route

if [ "${1}" = "swagger" ]; then
  echo "Generating tsoa spec"
  tsoa spec
  # npm run tsoa:spec
fi

echo "Building..."
tsc -p $PWD/build.tsconfig.json
#npm run build:tsc

echo "Build completed."
