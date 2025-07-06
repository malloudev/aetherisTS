import { EventEmitter } from 'eventemitter3';
import { Worker } from 'worker_threads';
import { availableParallelism } from 'os';

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
      
      this._workers = Array.from(workerNum, (_, i) => {
         const shardsForThisWorker = shardsPerWorker + ((i < (totalShardCount % workerNum)) ? 1 : 0);
         
         return new Worker('./worker.js', { workerData: {
            shards: remainingShards.splice(0, shardsForThisWorker),
         }});
      });
   }
}