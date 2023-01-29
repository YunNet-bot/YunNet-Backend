#!/bin/bash

function stringContain() { [ -z "$1" ] || { [ -z "${2##*$1*}" ] && [ -n "$2" ];};}
function dockerUp() {
  echo "Init testing compose containers..."
  docker-compose -f docker-compose.yml down && docker-compose --profile test -f docker-compose.yml up -d
}
function dockerDown() {
  echo "Stopping all compose containers..."

  docker-compose --profile all -f docker-compose.yml down
  return $?
}

[ -d templates ] || mkdir templates

unitCmd="ts-mocha --paths 'test/unit/**/*.ts' --timeout 10000 --exit"
unitCoverCmd="nyc --report-dir coverage/unit $unitCmd"
inteCmd="ts-mocha --require 'test/integrate/hook.spec.ts' --paths 'test/integrate/**/*.ts' --timeout 10000 --exit"
inteCoverCmd="nyc --report-dir coverage/integrate $inteCmd"
covCmd="nyc $unitCmd && nyc --no-clean $inteCmd && nyc report --report-dir coverage/all"
cmd="$unitCmd && $inteCmd"

if [[ $1 == "unit"* ]]; then
  if [[ $1 == *":coverage" ]]; then
    eval $unitCoverCmd
  else
    eval $unitCmd
  fi
  testExitCode=$?
else
  dockerDown
  dockerUp
  if [[ $1 == "integrate" ]]; then
    eval $inteCmd
  elif [[ $1 == "integrate:coverage" ]]; then
    eval $inteCoverCmd
  elif [[ $1 == "coverage" ]]; then
    eval $covCmd
  else
    eval $cmd
  fi
  testExitCode=$?
  dockerDown
  dockerDownExitCode=$?
fi

exit $testExitCode || $dockerDownExitCode
