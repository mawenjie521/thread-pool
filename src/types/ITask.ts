export interface ITask{
    id: string;
    context: any;
    resolve: (res: any)=>void;
    reject: (e: any)=>void;
    fn: (context: any)=>void;
}