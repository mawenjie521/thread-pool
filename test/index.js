const Pool = require('../build/index').default;
const pool = new Pool(4);
const worker={};
try{
    for(var i = 0; i < 20; i++){
        worker[`worker${i}`] = pool.queue(function(context){
            const time = new Date().getTime();
            let t = 0;
            while(t<2000){
                t = new Date().getTime()-time;
            }
            console.log(context.x)
            if(context.x==5){
                throw new Error('this is error')
            }
            return 10+context.x;
        },{x: i, fn: ()=>{console.log('this is fn')}})
        // console.log(worker1.then)
        worker[`worker${i}`].then((res)=>{
            console.log('test', res);
        }, (e)=>{
            console.log('this is promise', e);
        })

        // console.log(worker[`worker${i}`].toString());
    }
}catch(e){
    console.log('this is catch', e)
}

// pool.queue传入的执行函数返回只可以为Promise对象
const fsres = pool.queue(()=>{
    const fs = require('fs');
    const path = require('path');
    return new Promise((resolve, reject)=>{
        console.log(__dirname)
        fs.readFile(path.join(__dirname, 'worker.js'),(err, data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data.toString())
            }
        })
    })
});
fsres.then((res)=>{
    console.log('this is fs data', res);
}, (e)=>{
    console.log('this is errror', e);
})

pool.terminate()