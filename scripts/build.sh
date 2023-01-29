#!/bin/sh

echo "Lint..."
yarn lint

echo "Cleaning..."
sh $PWD/scripts/clean.sh

echo "Generating tsoa spec & routes..."
sh $PWD/scripts/tsoa.sh

echo "Building..."
tsc -p $PWD/build.tsconfig.json

echo "Build completed."
