function attachEvents() {
    const BASE_URL = 'http://localhost:3030/jsonstore/phonebook';
    const personRef = document.getElementById('person');
    const phoneRef = document.getElementById('phone');
    const ul = document.getElementById('phonebook');

    document.getElementById('btnLoad').addEventListener('click', onLoad);
    document.getElementById('btnCreate').addEventListener('click', onCreate);

    async function onLoad(e) {
        const response = await fetch(BASE_URL);
        if (response.status !== 200) {
            return;
        }
        const data = await response.json();
        ul.innerHTML = '';
        Object.values(data).forEach(entry => createRec(entry));
    }

    async function onCreate(e) {
        const person = personRef.value;
        const phone = phoneRef.value;

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({person, phone})
        }

        await fetch(BASE_URL, options);

        personRef.value = '';
        phoneRef.value = '';
    }

    function createRec(data) {
        const li = document.createElement('li');
        const btn = document.createElement('button');

        btn.textContent = 'Delete';
        btn.addEventListener('click', onDelete);

        li.textContent = `${data.person}: ${data.phone}`;
        li.appendChild(btn)
        li.dataset.id = data._id;

        ul.appendChild(li);
    }

    async function onDelete(e) {
        const id = e.target.parentElement.dataset.id;
        await fetch(BASE_URL + '/' + id, {method: 'DELETE'});
        onLoad();
    }
}

attachEvents();