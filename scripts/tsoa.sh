#!/bin/sh

echo "Generating tsoa Route"
tsoa routes
# npm run tsoa:route

echo "Generating tsoa spec"
tsoa spec
# npm run tsoa:spec
cp $PWD/dist/swagger.json $PWD/src/swagger.json
