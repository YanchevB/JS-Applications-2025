function app() {
  document.getElementById('logout').addEventListener('click', onLogout);
  const userSection = document.getElementById('user');
  const guestSection = document.getElementById('guest');
  const userName = document.querySelector('span');
  const loadBtn = document.querySelector('aside button');
  const addForm = document.getElementById('addForm');
  const addBtn = document.querySelector('fieldset .add')
  const catchesSection = document.getElementById('catches');

  loadBtn.addEventListener('click', onLoadCatches);
  addForm.addEventListener('submit', onAdd);

  const endpoints = {
    logout: 'http://localhost:3030/users/logout',
    catches: 'http://localhost:3030/data/catches',
    createCatch: 'http://localhost:3030/data/catches',
    deleteCatch: 'http://localhost:3030/data/catches/',
    updateCatch: 'http://localhost:3030/data/catches/'
  }

  let userData = JSON.parse(sessionStorage.getItem('userData'));
  updateNav();

  async function onLogout(e) {
    const options = {
      method: 'GET',
      headers: {
        'X-Authorization': userData.accessToken
      }
    }

    await fetch(endpoints.logout, options);
    sessionStorage.clear();
    userData = '';

    updateNav();
    onLoadCatches();
  }

  function updateNav() {
    if (userData) {
      guestSection.style.display = 'none';
      userSection.style.display = 'inline-block'
      userName.textContent = userData.email;
      addBtn.disabled = false;
    } else {
      userSection.style.display = 'none'
      guestSection.style.display = 'inline-block';
      userName.textContent = 'guest';
      addBtn.disabled = true;
    }
  }

  async function onLoadCatches(e) {
    const response = await fetch(endpoints.catches);
    if (response.status !== 200) {
      return;
    }
    const data = await response.json();
    catchesSection.innerHTML = '';
    
    showCatches(data);
  }

  async function onAdd(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const {angler, weight, species, location, bait, captureTime} = Object.fromEntries(formData);

    if (!angler || !weight || !species || !location || !bait || !captureTime) {
      return;
    }

    await createCatches({ angler, weight, species, location, bait, captureTime });

    e.target.reset();
    onLoadCatches();
  }

  async function createCatches(data) {
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userData.accessToken
      },
      body: JSON.stringify(data)
    }

    await fetch(endpoints.createCatch, option);
  }

  function showCatches(data) {
    data.forEach(x => {
      const container = document.createElement('div');
      container.classList.add('catch');
      const content = createContent(x);

      container.innerHTML = content;

      container.querySelector('button.update').addEventListener('click', onUpdate);
      container.querySelector('button.delete').addEventListener('click', onDelete);
      catchesSection.appendChild(container);
    })
  }

  async function onUpdate(e) {
    const id = e.target.dataset.id;
    const inputs = Array.from(e.target.parentElement.querySelectorAll('input'));
    const [anglerRef, weightRef, speciesRef, locationRef, baitRef, captureTimeRef] = inputs; 

    const data = {
      angler: anglerRef.value,
      weight: weightRef.value,
      species: speciesRef.value,
      location: locationRef.value,
      bait: baitRef.value,
      captureTime: captureTimeRef.value
    }
    
    await updateCatch(data, id);
    onLoadCatches();
  }

  async function updateCatch(data, id) {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userData.accessToken
      },
      body: JSON.stringify(data)
    }

    await fetch(endpoints.updateCatch + id, options);
  }

  async function onDelete(e) {
    const id = e.target.dataset.id;
    const options = {
      method: 'DELETE',
      headers: {
        'X-Authorization': userData.accessToken
      }
    }
    await fetch(endpoints.deleteCatch + id, options);
    onLoadCatches();
  }

  function createContent(data) {
    return `
      <label>Angler</label>
      <input type="text" class="angler" value=${data.angler}>
      <label>Weight</label>
      <input type="text" class="weight" value=${data.weight}>
      <label>Species</label>
      <input type="text" class="species" value=${data.species}>
      <label>Location</label>
      <input type="text" class="location" value=${data.location}>
      <label>Bait</label>
      <input type="text" class="bait" value=${data.bait}>
      <label>Capture Time</label>
      <input type="number" class="captureTime" value=${data.captureTime}>
      <button class="update" data-id=${data?._id} ${userData?._id !== data?._ownerId ? 'disabled' : ""}>Update</button>
      <button class="delete" data-id=${data?._id} ${userData?._id !== data?._ownerId ? 'disabled' : ""}>Delete</button>
    `
  }
} 

app();