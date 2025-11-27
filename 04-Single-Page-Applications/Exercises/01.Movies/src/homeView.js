import { showCreateView } from "./createView.js";
import { dataService } from "./dataService.js";
import { showDetailsViewHandler } from "./detailsView.js";
import { userUtils } from "./userUtils.js";

const sections = document.querySelectorAll('section');
const homeSection = document.getElementById('home-page');
const addBtn = document.getElementById('add-movie-button');
const movieContainer = document.getElementById('movie');
const movieList = document.getElementById('movies-list');

export function showHome() {
  sections.forEach(section => section.style.display = 'none');
  homeSection.style.display = 'block';

  if (userUtils.getUserData()) {
    addBtn.style.display = 'block';
    addBtn.querySelector('a').addEventListener('click', showCreateView);
  }

  movieContainer.style.display = 'block';
  showAllMovies();
}

async function showAllMovies() {
  movieList.innerHTML = '';
  const movies = await dataService.getAllMovies();
  movies.forEach(x => movieList.appendChild(createMovie(x)));
}

function createMovie(data) {
  const userData = userUtils.getUserData()
  const li = document.createElement('li');
  li.classList.add('card');
  li.classList.add('mb-4');
  li.innerHTML += `
    <img class="card-img-top" src=${data.img} alt="Card image cap" width="400" />
    <div class="card-body">
      <h4 class="card-title">${data.title}</h4>
      <a href="#">
      </a>
    </div>
    <div class="card-footer">
      ${!!userData ? 
        `<button type="button" data-id=${data._id} class="btn btn-info">Details</button>`
        :
        ''
      }
      
    </div>
`
!!userData && li.querySelector('button').addEventListener('click', showDetailsViewHandler)
return li
}

export function updateNav() {
  const welcomeMessage = document.getElementById('welcome-msg');
  const userLi = document.querySelectorAll('li.user');
  const guestLi = document.querySelectorAll('li.guest')
  const userData = userUtils.getUserData()

  if (userData) {
    guestLi.forEach(li => li.style.display = 'none');
    userLi.forEach(li => li.style.display = 'block');
    welcomeMessage.textContent = `Welcome ${userData.email}`
  } else {
    guestLi.forEach(li => li.style.display = 'block');
    userLi.forEach(li => li.style.display = 'none');
  }
}