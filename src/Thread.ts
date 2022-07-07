import {v4} from 'uuid';
import {ITask} from './types/ITask';
import {THREAD_MESSAGE, status} from './constants';
import {codeStatus} from './constants';
import Error from './Error';
import {IThread} from './types/IThread';

const {Worker} = require('worker_threads');
const path = require("path");

class Thread implements IThread{
    // taskQueue: ITask[];
    worker: any;
    id: string;
    status: status;
    cb: ()=>void;
    constructor(){
        this.id = v4();
        // this.taskQueue = [];
        this.status = status.DONE;
        this.worker = new Worker(path.join(__dirname, '/worker/worker.js'));
        this.cb=()=>{};
    }
    run(task: ITask){
        try{
            this.status = status.PENDING;
            this.worker.postMessage({fn: task.fn.toString(), id: task.id, context: task.context});
            this.worker.on(THREAD_MESSAGE, (msg: any)=>{
                if(task.id!==msg.id){
                    return;
                }
                task.cb(msg);
                this.status = status.DONE;
                this.cb();
            })
        }catch(e){
            task.cb({data: new Error(codeStatus.error, e)});
        }
    }
    then(cb: ()=>void){
        this.cb = cb;
    }

    terminate(force?: Boolean){
        if(force){
            this.worker.terminate();
        }else{
            if(this.status === status.PENDING){
                this.cb=()=>{
                    this.worker.terminate();
                }
            }else if(this.status === status.DONE){
                this.worker.terminate();
            }
        }
    }
}

export default Thread;