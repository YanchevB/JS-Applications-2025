import { api } from "../data/request.js";

//TO-DO: put correct endpoints
const endpoints = {
  getAll: '/data/shows?sortBy=_createdOn%20desc',
  getById: (id) => `/data/shows/${id}`,
  add: '/data/shows',
  searchByTitle: (query) => `/data/shows?where=title%20LIKE%20%22${query}%22`,
  edit: (id) => `/data/shows/${id}`,
  del: (id) => `/data/shows/${id}`
}

async function getAll() {
  return api.get(endpoints.getAll);
}

async function getById(id) {
  return api.get(endpoints.getById(id));
}

async function searchByTitle(query) {
  return api.get(endpoints.searchByTitle(query));
}

async function add(data) {
  return api.post(endpoints.add, data);
}

async function edit(id, data) {
  return api.put(endpoints.edit(id), data);
}

async function del(id) {
  return api.del(endpoints.del(id));
}

export const data = {
  getAll,
  getById,
  searchByTitle,
  add,
  edit,
  del
}