### 说明
- 1.只支持node环境，暂不支持网页端；
- 2.工程输出的默认对象为Pool，同时也输出Task和Thread对象；
- 3.Pool为线程池，需要传入一个参数，就是需要启用线程的个数，最好为当前cpu的盒数；
- 4.使用Thread可以启用线程，使用Thread启用线程时必须传入Task对象；
- 5.测试用例在tes目录下。
- 6.Pool.queue传入函数的返回值为对象或者Promise对象，为对象时，对象中不能有Function类型；

### 使用示例
```javascript
// const Pool = require('../build/index').default;
import Pool from '@jd/thread-pool';
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
        },{x: i})
        // console.log(worker1.then)
        worker[`worker${i}`].then((res)=>{
            console.log('test', res);
        })
    }
}catch(e){
    console.log(e)
}


pool.terminate()
```