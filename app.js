const express = require('express');
const Queue = require('bull')
const app = express();

const port = 4167;
const myQueue = new Queue('myQueue', 'redis://127.0.0.1:6379');


// async function runQueue() {
// await new Promise(resolve => setTimeout(resolve, 5000));

// }

for (let i=0; i<=50; i++) {
    // runQueue();
    myQueue.add({name: `task ${i}`});

}


myQueue.process(1, async(job) => {

await new Promise(resolve => setTimeout(resolve, 5000));
console.log(`Process job has been completed successfully: ${job.data.name}`);

})

app.listen(port, () => {
    console.log('app is listening');
})

