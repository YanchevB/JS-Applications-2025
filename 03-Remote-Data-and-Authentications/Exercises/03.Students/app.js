const tbody = document.querySelector('tbody');
const studentsUrl = 'http://localhost:3030/jsonstore/collections/students';

window.addEventListener('load', onLoad);
document.getElementById('form').addEventListener('submit', onSubmit);

async function onLoad(e) {
  const response = await fetch(studentsUrl);
  const data = await response.json();

  tbody.innerHTML = '';
  Object.values(data).forEach(student => {
    const tr = document.createElement('tr');
    
    tr.innerHTML = `
      <td>${student.firstName}</td>
      <td>${student.lastName}</td>
      <td>${student.facultyNumber}</td>
      <td>${student.grade}</td>
    `;

    tbody.appendChild(tr);
  })
}

async function onSubmit(e) {
  e.preventDefault();
  const notification = document.querySelector('.notification')
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  const {firstName, lastName, facultyNumber, grade} = data;

  if (!firstName || !lastName || !facultyNumber || !grade) {
    notification.textContent = 'All fields are required!';
    return;
  }

  if (isNaN(facultyNumber) || isNaN(grade)) {
    notification.textContent = 'Faculty Number and Grade must be numbers!';
    return;
  }

  const newStudent = {
    firstName,
    lastName,
    facultyNumber,
    grade
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newStudent)
  }

  await fetch(studentsUrl, options);
  
  onLoad();

  notification.textContent = '';
  e.target.reset();
}