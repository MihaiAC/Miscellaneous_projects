#!/bin/bash

if [[ -n "$1" ]]; then
    echo "Hello $1"
else
    echo "Hello world"
fi
exit 0