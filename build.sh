#! /bin/bash

set -eux

rm -rf client/public/api
cp -r server/src/api client/public/api

cd client
npm run build
