import { EventEmitter } from 'eventemitter3';
import { Worker } from 'worker_threads';
import { filedirnameFromCaller } from 'filedirname';
import { availableParallelism } from 'os';
import { join } from 'path';

export interface WorkerData {
   shards: number[]
}

export class WorkerThreadsManager extends EventEmitter {
   private readonly _workers: Worker[];
   
   constructor(totalShardCount: number) {
      super();
      
      const workerNum = Math.min(totalShardCount, availableParallelism());
      const shardsPerWorker = Math.floor(totalShardCount / workerNum);
      
      const remainingShards = [ ...Array(totalShardCount).keys() ];
      
      this._workers = Array.from({ length: workerNum }, (_, i) => {
         const shardsForThisWorker = shardsPerWorker + ((i < (totalShardCount % workerNum)) ? 1 : 0);
         
         return new Worker(join(filedirnameFromCaller()[1], 'worker.js'), { workerData: {
            shards: remainingShards.splice(0, shardsForThisWorker),
         }});
      });
   }
}