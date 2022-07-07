export interface ITask{
    id: string;
    context: any;
    fn: (context: any)=>void;
    cb: (res: any)=>void;
    then: (res: any)=>void;
}