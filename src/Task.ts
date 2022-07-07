import {v4} from 'uuid';
import {ITask} from './types/ITask';

class Task implements ITask{
    id: string;
    context: any;
    fn: (context: any)=>void;
    cb: (res: any)=>void;
    constructor(fn: ITask['fn'], context: any){
        this.id=v4();
        this.context = JSON.stringify(context);
        this.fn = fn;
        this.cb = ()=>{};
    }
    then(cb: ITask['cb']){
        this.cb = cb;
    }
}

export default Task;