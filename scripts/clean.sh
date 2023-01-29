#!/bin/sh

echo "Clearning..."
distDir="$PWD/dist"
srcSwaggerPath="$PWD/src/swagger.json"

if [ -d "$distDir" ] ; then
  rm -r "$distDir"
  echo "- '$distDir' removed."
fi

if [ -f "$srcSwaggerPath" ] ; then
  rm "$srcSwaggerPath"
  echo "- '$srcSwaggerPath' removed."
fi

echo "- Everything removed"
