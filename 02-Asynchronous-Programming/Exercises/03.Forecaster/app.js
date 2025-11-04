function attachEvents() {
    const locationRef = document.getElementById('location');
    const forecast = document.getElementById('forecast');
    document.getElementById('submit').addEventListener('click', onSubmit);
    const current = document.getElementById('current');
    const upcoming = document.getElementById('upcoming');

    const BASE_URL = 'http://localhost:3030/jsonstore/forecaster/';
    const endpoints = {
        location: () => 'locations',
        today: (str) => `today/${str}`,
        upcoming: (str) => `upcoming/${str}`
    }

    const symbolEnum = {
        'Sunny': '&#x2600',
        'Partly sunny': '&#x26C5',
        'Overcast': '&#x2601',
        'Rain': '&#x2614',
        'Degrees': '&#176'
    }

    async function onSubmit(e) {
        forecast.style.display = 'block';
        try {
            const response = await fetch(BASE_URL + endpoints.location());
            const data = await response.json();
            const userLocation = locationRef.value;

            const userPref = data.find(x => x.name === userLocation);
            const code = userPref.code;

            fillToday(code);
            fillUpcoming(code);
        } catch (error) {
            forecast.textContent = 'Error'
        }
    }

    async function fillToday(code) {
        try {
            const response = await fetch(BASE_URL + endpoints.today(code));
            const data = await response.json();
            generateToday(data);
        } catch (error) {
            forecast.textContent = 'Error'
        }
    }

    async function fillUpcoming(code) {
        try {
            const response = await fetch(BASE_URL + endpoints.upcoming(code));
            const data = await response.json();
            generateUpcoming(data); 
        } catch (error) {
            forecast.textContent = 'Error'   
        }
    }

    function generateToday(data) {
        const div = document.createElement('div');
        div.classList.add('condition');
        const sp1 = generateSpan(['condition', 'symbol'], symbolEnum[data.forecast.condition]);
        const spanContainer = generateSpan(['condition']);
        const spName = generateSpan(['forecast-data'], data.name);
        const spDegrees = generateSpan(['forecast-data'], `${data.forecast.low}${symbolEnum['Degrees']}/${data.forecast.high}${symbolEnum['Degrees']}`);
        const spCondition = generateSpan(['forecast-data'], data.forecast.condition);

        spanContainer.appendChild(spName);
        spanContainer.appendChild(spDegrees);
        spanContainer.appendChild(spCondition);

        div.appendChild(sp1);
        div.appendChild(spanContainer)

        current.appendChild(div);
    }

    function generateUpcoming(data) {
        const div = document.createElement('div');
        div.classList.add('forecast-info');
        data.forecast.forEach(x => {
            const spanContainer = generateSpan(['upcoming']);
            const spSymbol = generateSpan(['symbol'], symbolEnum[x.condition]);
            const spDegrees = generateSpan(['forecast-data'], `${x.low}${symbolEnum['Degrees']}/${x.high}${symbolEnum['Degrees']}`);
            const spCondition = generateSpan(['forecast-data'], x.condition);

            spanContainer.appendChild(spSymbol);
            spanContainer.appendChild(spDegrees);
            spanContainer.appendChild(spCondition);

            div.appendChild(spanContainer);
            upcoming.appendChild(div);
        })
    }

    function generateSpan(classList, value) {
        const span = document.createElement('span');
        classList.forEach(x => span.classList.add(x));

        if (value) {
            span.innerHTML = value
        }
        return span;
    }
}

attachEvents();