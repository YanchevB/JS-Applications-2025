import { dataService } from "./dataService.js";
import { showHome, updateNav } from "./homeView.js";

const sections = document.querySelectorAll('section');
const createSection = document.getElementById('add-movie');
document.getElementById('add-movie-form').addEventListener('submit', onSubmit);

export function showCreateView(e) {
  e.preventDefault();
  sections.forEach(section => section.style.display = 'none');
  createSection.style.display = 'block';
}

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  const {title, description, img} = Object.fromEntries(formData);

  if (!title, !description, !img) {
    return;
  }

  await dataService.addMovie({title, description, img});
  showHome();
  updateNav();
}