import { isMainThread, parentPort, workerData } from 'worker_threads';

import { WorkerData } from './manager';
import { Shard } from '../gateway/shard';

const { shards }: WorkerData = WorkerData;
