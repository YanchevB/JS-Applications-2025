async function lockedProfile() {
    const main = document.getElementById('main');

    const BASE_URL = 'http://localhost:3030/jsonstore/advanced/profiles';
    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const response = await fetch(BASE_URL, options);
        const data = await response.json();

        main.innerHTML = '';

        Object.entries(data).forEach(([_, body], index) => {
            const userIndex = index + 1
            main.innerHTML += `
            <div class="profile">
                <img src="./iconProfile2.png" class="userIcon" />
                <label>Lock</label>
                <input type="radio" name="user${userIndex}Locked" value="lock" checked>
                <label>Unlock</label>
                <input type="radio" name="user${userIndex}Locked" value="unlock"><br>
                <hr>
                <label>Username</label>
                <input type="text" name="user${userIndex}Username" value="${body.username}" disabled readonly />
                <div class="user1Username">
                    <hr>
                    <label>Email:</label>
                    <input type="email" name="user${userIndex}Email" value="${body.email}" disabled readonly />
                    <label>Age:</label>
                    <input type="number" name="user${userIndex}Age" value="${body.age}" disabled readonly />
                </div>

                <button>Show more</button>
            </div>`
        })

        const userInfo = document.querySelectorAll('.user1Username');
        Array.from(userInfo).forEach(user => user.style.display = 'none');

        const btns = document.querySelectorAll('button');
        Array.from(btns).forEach(button => button.addEventListener('click', onClick));
    } catch (error) {
        alert(error);
    }

    function onClick(e) {
        const button = e.target;
        const profile = e.target.parentElement;
        const userInfo = profile.querySelector('.user1Username');
        const selectedValue = profile.querySelector('input[type="radio"]:checked')?.value;

        if (selectedValue === 'lock') {
            return;
        }

        if (button.textContent === 'Show more') {
            userInfo.style.display = 'block';
            button.textContent = 'Hide it';
        } else if (button.textContent === 'Hide it'){
            userInfo.style.display = 'none';
            button.textContent = 'Show more';
        }
    }
}