; ((doc, storage, location) => {
    const list = doc.querySelector('#list');
    const message = doc.querySelector('#message');
    const sendBtn = doc.querySelector('#send');

    const ws = new WebSocket('ws:localhost:8000');

    let username = '';

    const init = () => {
        bindEvent();
    }

    function bindEvent() {
        sendBtn.addEventListener('click', handleSendBtnClick, false);
        ws.addEventListener('open', handleOpen, false);
        ws.addEventListener('close', handleClose, false);
        ws.addEventListener('error', handleError, false);
        ws.addEventListener('message', handleMessage, false);
    }

    function handleSendBtnClick() {
        console.log('send message');

        const msg = message.value;

        if (!msg.trim().length) {
            return;
        }

        ws.send(JSON.stringify({
            user: username,
            dateTime: new Date().getTime(),
            message: msg
        }))

        message.value = '';
    }

    function handleOpen(event) {
        console.log('websocket open', event);

        username = storage.getItem('username');
        if (!username) {
            location.href = '../html/entry.html';
        }
    }

    function handleClose(event) {
        console.log('websocket close', event);
    }

    function handleError(event) {
        console.log('websocket error', event);
    }

    function handleMessage(event) {
        console.log('websocket message', event);
        console.log(event);


        let data;
        var reader = new FileReader();
        reader.readAsText(event.data, 'utf-8');
        reader.onload = function (e) {
            data = JSON.parse(reader.result);
            console.log(data);
            list.appendChild(createChild(data));
        }

    }

    function createChild(data) {
        console.log('weimin test: ', data)
        const { user, dateTime, message } = data;
        const liItem = doc.createElement('li');

        liItem.innerHTML = `
        <p>
            <span>${user}</span>
            <i>${new Date(dateTime)}</i>
        </p>
        <p>${message}</p>
        `;

        return liItem;
    }

    init();
})(document, localStorage, location)