import { dataService } from "./dataService.js";
import { showHome } from "./homeView.js";
import { userUtils } from "./userUtils.js";

const section = document.querySelectorAll('section');
const detailsView = document.getElementById('movie-example');
const editView = document.getElementById('edit-movie');

export function showDetailsViewHandler(e) {
  e.preventDefault();
  const id = e.target.dataset.id;
  showDetailsView(id);
}

async function showDetailsView(id) {
  section.forEach(section => section.style.display = 'none');
  detailsView.style.display = 'block';

  const data = await dataService.getMovieById(id);
  const isOwner = userUtils.isOwner(data._ownerId);
  const likeCount = await dataService.getLikeCount(id);
  showMovie(data, isOwner, likeCount);
}

function showMovie(data, isOwner, likeCount) {
  detailsView.innerHTML = `
  <div class="container">
    <div class="row bg-light text-dark">
      <h1>Movie title: ${data.title}</h1>
      <div class="wrapper">
        <div class="col-md-8">
          <img class="img-thumbnail" src=${data.img} alt="Movie" />
        </div>
        <div class="col-md-4 text-center">
          <h3 class="my-3">Movie Description</h3>
          <p>
            ${data.description}
          </p>
          ${isOwner ? 
            `<a class="btn btn-danger" data-action='delete' data-id=${data._id} href="#">Delete</a>
            <a class="btn btn-warning" data-action='edit' data-id=${data._id} href="#">Edit</a>
            <span class="enrolled-span">Liked ${likeCount}</span>`: ''}
          ${!isOwner ? `<a class="btn btn-primary" data-action='like' data-id=${data._id} href="#">Like</a>` : ''}
        </div>
      </div>
    </div>
  </div>
  `
  detailsView.querySelector('a[data-action="delete"]')?.addEventListener('click', deleteMovie);
  detailsView.querySelector('a[data-action="edit"]')?.addEventListener('click', editMovie);
  detailsView.querySelector('a[data-action="like"]')?.addEventListener('click', onLike);
}

async function deleteMovie(e) {
  e.preventDefault();
  const id = e.target.dataset.id;
  await dataService.del(id);
  showHome();
}

async function editMovie(e) {
  e.preventDefault();
  const id = e.target.dataset.id;
  const movie = await dataService.getMovieById(id);

  section.forEach(section => section.style.display = 'none');
  editView.style.display = 'block';

  editView.innerHTML = `
  <form class="text-center border border-light p-5" action="#" method="">
    <h1>Edit Movie</h1>
    <div class="form-group">
      <label for="title">Movie Title</label>
      <input id="title" type="text" class="form-control" placeholder="Movie Title" value=${movie.title} name="title" />
    </div>
    <div class="form-group">
      <label for="description">Movie Description</label>
      <input class="form-control" placeholder="Movie Description..." value=${movie.description} name="description" id="description" />
    </div>
    <div class="form-group">
      <label for="imageUrl">Image url</label>
      <input id="imageUrl" type="text" class="form-control" placeholder="Image Url" value=${movie.img} name="img" />
    </div>
    <button type="submit" data-id=${movie._id} class="btn btn-primary">Submit</button>
  </form>
  `
  const form = editView.querySelector('form');
  form.dataset.id = movie._id;
  
  form.addEventListener('submit', onSubmit);
}

async function onLike(e) {
  e.preventDefault();
  const id = e.target.dataset.id;
  const userId = userUtils.getId();

  dataService.addLike({movieId: id, userId: userId});
}

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const id = e.target.dataset.id;

  const { title, description, img } = Object.fromEntries(formData);

  await dataService.updateMovies(id ,{ title, description, img });
  showDetailsView(id);
}