const taskBtn = document.getElementById('taskBtn');
const taskList = document.getElementById('taskList');
const expensiveResult = document.getElementById('expensiveResult');

const myWorker = new Worker("worker.js");

taskBtn.addEventListener('click', () => {
    let li = document.createElement('li');
    li.innerText = 'New Element added'
    taskList.appendChild(li);
})


const expensiveTaskBtn = document.getElementById('expensiveTask');
expensiveTaskBtn.addEventListener('click', expensiveOperation)

function expensiveOperation() {
    console.log('loading')

    // without web worker - running expensive operation in the main thread --- START
    // let result = expensiveFun()
    // expensiveResult.innerText = result;
    // without web worker - running expensive operation in the main thread --- END

// -------------------------------------------------------------------------------------------

    // with Web worker --- START
        callWebWoker();
    // with Web worker --- END
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
