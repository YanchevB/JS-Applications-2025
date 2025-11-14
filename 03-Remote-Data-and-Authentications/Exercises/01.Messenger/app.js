function attachEvents() {
    const BASE_URL = 'http://localhost:3030/jsonstore/messenger';
    const textarea = document.getElementById('messages');
    const authorRef = document.querySelector('input[name="author"]');
    const messageRef = document.querySelector('input[name="content"]');

    document.getElementById('submit').addEventListener('click', onSubmit);
    document.getElementById('refresh').addEventListener('click', onRefresh);

    async function onSubmit(e) {
        e.preventDefault();
        const author = authorRef.value;
        const content = messageRef.value;

        if (!author || !content) {
            return
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({author, content})
        }

        const response = await fetch(BASE_URL, options);

        authorRef.value = '';
        messageRef.value = '';
    }

    async function onRefresh(e) {
        e.preventDefault();
        const response = await fetch(BASE_URL);

        if (response.status !== 200) {
            return;
        }

        const data = await response.json();

        let buff = ''
        Object.values(data).forEach(({author, content}) => buff += `${author}: ${content}\n`)
        
        textarea.value = buff.trim();
    }

}

attachEvents();