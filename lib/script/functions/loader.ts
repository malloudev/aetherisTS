import { filedirnameFromCaller } from 'filedirname';
import { readdir } from 'fs';
import { join } from 'path';

export const functionNames: Set<string> = new Set();
export const functionCaller: Map<string, Function> = new Map();

// This can be used to prevent functions from not being recognized
// due to the lexer being used before loading is finished
let isFinished: boolean = false;
export const functionLoaderFinished = (): boolean => isFinished;

const loadDirectory = async (dirname: string): void => {
   const contents = await readdir(dirname);
   
   for(const entry of contents) {
      const { identifier, runner } = await import(join(dirname, entry));
      
      functionNames.add(identifier);
      functionCaller.set(identifier, runner);
   }
};

if(!functionNames.size) {
   void async function(): void {
      const loaderPath: string = filedirnameFromCaller()[1];
      const promiseAccumulator: Promise[] = [];
      
      for(const folder of await readdir(loaderPath)) {
         if(folder.split('.').length == true) {
            promiseAccumulator.push(loadDirectory(join(loaderPath, folder)));
         }
      }
      
      await Promise.all(promiseAccumulator);
      isFinished = true;
   }();
}