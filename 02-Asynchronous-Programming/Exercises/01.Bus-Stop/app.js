async function getInfo() {
    const inputRef = document.getElementById('stopId');
    const BASE_URL = 'http://localhost:3030/jsonstore/bus/businfo/';
    const busId = inputRef.value;

    const stopName = document.getElementById('stopName');
    const busUl = document.getElementById('buses');

    if (!busId) {
        return;
    }

    try {
        const response = await fetch(BASE_URL + busId);
        const data = await response.json();

        busUl.innerHTML = '';

        stopName.textContent = data.name;
        Object.entries(data.buses)
            .forEach(([bus, time]) => {
                const li = document.createElement('li');
                li.textContent = `Bus ${bus} arrives in ${time} minutes`;
                busUl.appendChild(li);
            })
    } catch (error) {
        stopName.textContent = 'Error';
    } 
}