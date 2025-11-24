function register() {
  document.querySelector('#register-view form').addEventListener('submit', onSubmit);

  function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const {email, password, rePass} = Object.fromEntries(formData);

    if (!email || !password) {
      return alert('Email and password are required!');
    }

    if (password !== rePass) {
      return alert('Passwords must match!');
    }

    createUser({email, password}); 
  }

  async function createUser(data) {
    const url = 'http://localhost:3030/users/register';
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

register();