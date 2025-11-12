solution();

async function solution() {
    try {
        const BASE_URL = 'http://localhost:3030/jsonstore/advanced/articles/list';
        const section = document.getElementById('main');

        const response = await fetch(BASE_URL);
        const data = await response.json();

        Object.values(data).forEach(article => {
            section.innerHTML += `
            <div class="accordion">
            <div class="head">
                <span>${article.title}</span>
                <button class="button" id="${article._id}">More</button>
            </div>
            <div class="extra" display="none">
            </div>
        </div>`
        })

        Array.from(document.querySelectorAll('button')).forEach(btn => btn.addEventListener('click', onToggle));

        async function onToggle(e) {
            const btn = e.target;
            const div = e.target.parentElement;
            const extraInfo = div.nextElementSibling;
            const id = e.target.id;

            const response = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${id}`);

            const data = await response.json();

            if (btn.textContent === 'More') {
                extraInfo.style.display = 'block';
                extraInfo.innerHTML = `<p>${data.content}</p>`
                btn.textContent = 'Less';
            } else {
                extraInfo.style.display = 'none';
                btn.textContent = 'More';
            }
        }
    } catch (error) {
        alert(error);   
    }
    
}