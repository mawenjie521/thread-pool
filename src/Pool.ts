import Thread from './Thread';
import Task from './Task';
import {ITask} from './types/ITask';
import {IThread} from './types/IThread';
import {status} from './constants';
import {IPool} from './types/IPool';

class Pool implements IPool{
    workers: IThread[];
    tasks: ITask[];
    terminatecb: any;
    constructor(threadNum: Number){
        this.workers=[]
        this.tasks = [];
        this.initWorkers(threadNum);
        this.terminatecb = null;
    }

    initWorkers(threadNum: Number){
        for(let i = 0; i < threadNum; i++){
            this.workers.push(new Thread());
        }
    }

    queue(fn: ITask['fn'], context: any){
        const task = new Task(fn, context);
        this.tasks.push(task);
        this.schedule();
        return task;
    }

    private schedule(){
        let pendingWorkers = this.workers.filter((worker)=>worker.status === status.DONE);
        while(pendingWorkers.length>0 && this.tasks.length>0){
            const task = this.tasks.shift();
            const worker = pendingWorkers[0];
            worker.run(task as ITask);
            worker.then(()=>{
                this.schedule();
            })
            pendingWorkers = this.workers.filter((worker)=>worker.status === status.DONE);
        }
        this.tasks.length === 0 && this.terminatecb?.();
    }

    terminate(force?: Boolean){
        if(force){
            this.workers.forEach(worker=>{
                worker.terminate(force);
            })
        }else{
            if(this.tasks.length<=0){
                this.workers.forEach(worker=>{
                    worker.terminate();
                })
            }else{
                this.terminatecb=()=>{
                    this.terminate();
                }
            }
        }
    }
}

export default Pool;