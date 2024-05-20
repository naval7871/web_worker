function expensiveFun(){
    let result = 0;
    for(let i=0; i<9999999999; i++){
        result =  i;
    }
    return result
}


onmessage = function (event) {
    console.log('Received message from main thread:', event.data);

    console.log(event.data)
    // Perform some heavy computation
    const result = expensiveFun();
  
    // Send the result back to the main thread
    postMessage(result);
  };