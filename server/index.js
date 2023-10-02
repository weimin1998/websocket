const ws = require('ws');

; ((ws) => {
    // ws:localhost:8000
    const server = new ws.Server({ port: 8000 });

    const init = () => {
            bindEvent();
    }

    function bindEvent() {
        server.on('opne', handleOpen);
        server.on('close', handleClose);
        server.on('error', handleError);
        server.on('connection', handleConnection);
    }

    function handleOpen() {
        console.log('websocket open');
    }

    function handleClose() {
        console.log('websocket close');
    }

    function handleError() {
        console.log('websocket error');
    }

    function handleConnection(ws) {
        console.log('websocket connection');
        ws.on('message', handleMessage);
    }

    function handleMessage(msg) {
        const msgString = JSON.parse(msg);
        console.log(msgString);

        server.clients.forEach(function (client){
            client.send(msg);
        });
    }

    init();
})(ws)