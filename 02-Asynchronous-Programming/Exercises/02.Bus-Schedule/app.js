function solve() {
    const BASE_URL = 'http://localhost:3030/jsonstore/bus/schedule/';
    const info = document.querySelector('#info span');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    const stopInfo = {
        name: '',
        nextStop: 'depot'
    }

    async function depart() {
        try {
            const response = await fetch(BASE_URL + stopInfo.nextStop);
            const data = await response.json();
            stopInfo.name = data.name;
            stopInfo.nextStop = data.next;
            info.textContent = `Next stop: ${stopInfo.name}`;
            departBtn.disabled = true;
            arriveBtn.disabled = false;
        } catch (error) {
            info.textContent = 'Error';
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }
    }

    function arrive() {
        info.textContent = `Arriving at ${stopInfo.name}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();