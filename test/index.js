const Pool = require('../build/index').default;
const pool = new Pool(4);
const worker={};
try{
    for(var i = 0; i < 20; i++){
        worker[`worker${i}`] = pool.queue(function(context){
            // context.fn();
            return context.x;
        },{x: i, fn: ()=>{console.log('this is fn')}})
        // console.log(worker1.then)
        worker[`worker${i}`].then((res)=>{
            console.log('test', res);
        })
    }
}catch(e){
    console.log(e)
}


pool.terminate()