import { api } from "./requester.js";
/**
 * Get all movies: /data/movies (GET)
 * Create movie: /data/movies (POST)
 * Update movie: /data/movies/:id (PUT)
 * Delete movie: /data/movies/:id (DELETE)
 * Get number of likes for a movie: /data/likes?where=movieId%3D%22{movieId}%22&distinct=_ownerId&count (GET)
 * Get like for a movie from specific user: /data/likes?where=movieId%3D%22{movieId}%22%20and%20_ownerId%3D%22{userId}%22 (GET)
 * Add a like: /data/likes (POST)
 */

const BASE_URL = 'http://localhost:3030';

const endpoints = {
  moviesCollections: '/data/movies',
  getMovieById: (id) => `/data/movies/${id}`,
  updateMovies: (id) => `/data/movies/${id}`,
  deleteMovies: (id) => `/data/movies/${id}`,
  likeCount: (movieId) => `/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`,
  getLikeForUser: (movieId, userId) => `/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`,
  addLike: `/data/likes`
}

function getAllMovies() {
  return api.get(BASE_URL + endpoints.moviesCollections)
}

function addMovie(data) {
  return api.post(BASE_URL + endpoints.moviesCollections, data);
}

function updateMovies(id, data) {
  return api.update(BASE_URL + endpoints.updateMovies(id), data);
}

function del(id) {
  return api.del(BASE_URL + endpoints.deleteMovies(id));
}

function getMovieById(id) {
  return api.get(BASE_URL + endpoints.getMovieById(id))
}

function getLikeCount(id) {
  return api.get(BASE_URL + endpoints.likeCount(id))
}

function addLike(data) {
  return api.post(BASE_URL + endpoints.addLike, data)
}

export const dataService = {
  getAllMovies,
  addMovie,
  updateMovies,
  del,
  getMovieById,
  getLikeCount,
  addLike
}