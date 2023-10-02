; ((doc, storage, location) => {
    const usernameInput = doc.querySelector('#username');
    const entrybtn = doc.querySelector('#enter');

    const init = () => {
        bindEvent();
    }

    function bindEvent() {
        entrybtn.addEventListener('click', handleEnterBtnClick, false);
    }

    function handleEnterBtnClick() {
        const username = usernameInput.value.trim();

        if (username.length < 6) {
            alert("username cannot less than 6 chars!");
            return;
        }

        storage.setItem('username', username);
        location.href = '../html/index.html'
    }

    init();
})(document, localStorage, location)