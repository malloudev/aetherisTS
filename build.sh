# This script is made to build this project for release without any symlinks
# NodeJs is required for building only

# Remove old project files
rm -rf ./dist/cjs ./dist/mjs ./dist/types &&
mkdir ./dist/cjs ./dist/mjs ./dist/types &&

# Typescript compilation, both mjs and cjs
node ./node_modules/typescript/bin/tsc --project ./dist/cjs.tsconfig.json > /dev/null &
node ./node_modules/typescript/bin/tsc --project ./dist/mjs.tsconfig.json &
wait