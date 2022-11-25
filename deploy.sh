#!/usr/bin/env sh

set -e

git pull
git add -A
git commit -m 'update'
git push 
