const taskBtn = document.getElementById('taskBtn');
const taskList = document.getElementById('taskList');
const expensiveResult = document.getElementById('expensiveResult');
const expensiveTaskBtn = document.getElementById('expensiveTask');

const terminateBtn = document.getElementById('terminateTask');
let myWorker;

function webWorkerCreation(){
    myWorker = new Worker("worker.js");
}

taskBtn.addEventListener('click', () => {
    let li = document.createElement('li');
    li.innerText = 'New Element added'
    taskList.appendChild(li);
})


expensiveTaskBtn.addEventListener('click', expensiveOperation)
terminateBtn.addEventListener('click', terminateWebWorker)



function expensiveOperation() {
    console.log('loading')

    // without web worker - running expensive operation in the main thread.
        // let result = expensiveFun()
        // expensiveResult.innerText = result;
    // without web worker - running expensive operation in the main thread.

// -------------------------------------------------------------------------------------------

    // with Web worker
        webWorkerCreation()
        callWebWoker();
    // with Web worker
}

function expensiveFun() {
    let result = 0;
    for (let i = 0; i < 9999999999; i++) {
        result = i;
    }
    return result
}

function callWebWoker(){
    myWorker.postMessage('expensive task');
    myWorker.onmessage = function (event) {
        console.log('Received message from worker:', event.data);
        expensiveResult.innerText = event.data;
    };
}

function terminateWebWorker(){
    myWorker.terminate();
    console.log('web worker is terminated')
}
