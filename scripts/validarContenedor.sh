#!/bin/bash

contador=$(docker ps | grep -c "$1")

if [ "$contador" -eq 1 ]; then
    echo "Container found"
    exit 1
fi
if [ "$contador" -gt 1 ]; then
    echo "Multiple containers found"
    exit 2
else
    echo "Container not found"
    exit 0
fi

