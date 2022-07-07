import {THREAD_MESSAGE} from '../constants';
import Error from '../Error';
import {codeStatus} from '../constants';
const { parentPort } = require('worker_threads');
let id: string;
parentPort.on(THREAD_MESSAGE, (msg: any)=>{
  id= msg.id;
  try{
    const res = eval(`(${msg.fn})(${msg.context})`);
    parentPort.postMessage({data: {code: codeStatus.success, content: res}, id: msg.id});
  }catch(e){
    parentPort.postMessage({data: new Error(codeStatus.error, e), id: id})
  }  
})

if (typeof process !== "undefined" && typeof process.on === "function" ) {
    process.on("uncaughtException", (e) => {
      parentPort.postMessage({data: new Error(codeStatus.error, e), id: id})
    })
    process.on("unhandledRejection", (error) => {
      if (error && typeof (error as any).message === "string") {
        parentPort.postMessage({data: new Error(codeStatus.error, error), id: id})
      }
    })
  }