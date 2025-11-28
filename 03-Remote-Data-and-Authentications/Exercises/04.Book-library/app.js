import { html, render } from './node_modules/lit-html/lit-html.js';

const BASE_URL = 'http://localhost:3030/jsonstore/collections/books/';

const tableRoot = document.getElementById('tableRoot');
const formRoot = document.getElementById('formRoot');

const tableTemp = (books) => html`
  <button id="loadBooks" @click=${onLoadAllBooks}>LOAD ALL BOOKS</button>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${books?.map(book => html`${bookTemp(book)}`)}
      </tbody>
    </table>`

const createFormTemp = () => html`
  <form id="add-form" @submit=${onCreateHandler}>
      <h3>Add book</h3>
      <label>TITLE</label>
      <input type="text" name="title" placeholder="Title...">
      <label>AUTHOR</label>
      <input type="text" name="author" placeholder="Author...">
      <input type="submit" value="Submit">
  </form>`

const editFormTemp = (data, id) => html`
  <form id="edit-form" @submit=${onEditHandler}>
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title..." value=${data.title}>
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author..." value=${data.author}>
    <input type="hidden" name='id' value=${id}>
    <input type="submit" value="Save">
  </form>`

const bookTemp = (data) => html`
  <tr>
    <td>${data.title}</td>
    <td>${data.author}</td>
    <td>
      <button @click=${onEdit} data-id=${data.id}>Edit</button>
      <button @click=${onDelete} data-id=${data.id}>Delete</button>
    </td>
  </tr>`

render(tableTemp(), tableRoot);
render(createFormTemp(), formRoot);

async function onLoadAllBooks(e) {
  const response = await fetch(BASE_URL);
  const data = await response.json();

  Object.entries(data).forEach(([id, obj]) => obj.id = id);

  const books = Object.values(data);
  render(tableTemp(books), tableRoot);
}

function onCreateHandler(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  const { title, author } = Object.fromEntries(formData);

  if (!title || !author) {
    return;
  }

  e.target.reset();
  saveBook({ title, author });
}

async function saveBook(data) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  await fetch(BASE_URL, options);
  onLoadAllBooks();
}

async function onEditHandler(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  const { title, author, id } = Object.fromEntries(formData);

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, author })
  }

  await fetch(BASE_URL + id, options);

  onLoadAllBooks();
  render(createFormTemp(), formRoot);
}

async function onEdit(e) {
  const id = e.target.dataset.id;
  const response = await fetch(BASE_URL + id);
  const data = await response.json();

  render(editFormTemp(data, id), formRoot);
}

async function onDelete(e) {
  const id = e.target.dataset.id;

  const options = {
    method: 'DELETE',

  }

  await fetch(BASE_URL + id, options);
  onLoadAllBooks();
}