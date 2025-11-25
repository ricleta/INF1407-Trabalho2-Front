cd frontend/
tsc
cd ..

cp ./frontend/* ./docs/ -r
rm -rf ./docs/Typescript/
rm ./docs/tsconfig.json