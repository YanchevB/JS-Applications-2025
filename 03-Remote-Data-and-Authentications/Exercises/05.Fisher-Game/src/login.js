
function login() {
  document.querySelector('form').addEventListener('submit', onSubmit);

  function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const {email, password} = Object.fromEntries(formData);

    if (!email || !password) {
      return alert('Invalid username or password');
    }

    onLogin({email, password});
  }

  async function onLogin(data) {
    const url = 'http://localhost:3030/users/login';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    const response = await fetch(url, options);
    if (response.status !== 200) {
      return;
    }

    const userData = await response.json();

    sessionStorage.setItem('userData', JSON.stringify(userData));
    window.location = 'index.html';
  }
}

login();