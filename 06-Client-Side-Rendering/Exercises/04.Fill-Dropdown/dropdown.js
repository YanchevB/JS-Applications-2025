import { html, render } from "./node_modules/lit-html/lit-html.js";

function addItem() {
    const url = 'http://localhost:3030/jsonstore/advanced/dropdown';
    const selectRef = document.getElementById('menu');

    window.addEventListener('load', onLoad);

    document.querySelector('form').addEventListener('submit', onSubmit);

    const temp = (data) => html`
        <option value=${data?._id}>${data.text}</option>
    `

    async function onLoad(e) {
        const response = await fetch(url);
        const data = await response.json();

        const allOptions = html `${Object.values(data).map(option => temp(option))}`
        render(allOptions, selectRef);
    }

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const item = Object.fromEntries(formData);

        if (!item) {
            return;
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)
        }

        await fetch(url, options);
        await onLoad();
        e.target.reset();
    }
}

addItem();