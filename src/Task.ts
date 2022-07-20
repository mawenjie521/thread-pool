import {v4} from 'uuid';
import {ITask} from './types/ITask';

class Task implements ITask{
    id: string;
    context: any;
    resolve: (res: any)=>any;
    reject: (e: any)=>any;
    fn: (context: any)=>void;
    constructor(fn: ITask['fn'], context: any, resolve: ITask['resolve'], reject: ITask['reject']){
        this.id=v4();
        this.context = JSON.stringify(context);
        this.fn = fn;
        this.resolve=resolve;
        this.reject = reject;
    }
}

export default Task;