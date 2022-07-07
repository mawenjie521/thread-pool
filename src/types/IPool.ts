import {IThread} from "./IThread";
import {ITask} from './ITask';

export interface IPool{
    workers: IThread[];
    tasks: ITask[];
    terminatecb: any;
    initWorkers: (threadNum: Number)=>void;
    queue: (fn: ITask['fn'], context: any)=>void;
    terminate: (force?: Boolean)=>void;
}