import {status} from '../constants';
import {ITask} from './ITask';
export interface IThread{
    worker: any;
    id: string;
    status: status;
    cb: ()=>void;
    run: (task: ITask)=>void;
    then: (cb: ()=>void)=>void;
    terminate: (force?: Boolean)=>void;
}