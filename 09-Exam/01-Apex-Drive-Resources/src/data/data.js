import { api } from "../data/request.js";

//TO-DO: put correct endpoints
const endpoints = {
  getAll: '/data/cars?sortBy=_createdOn%20desc',
  getById: (id) => `/data/cars/${id}`,
  getByModel: (query) => `/data/cars?where=model%20LIKE%20%22${query}%22`,
  add: '/data/cars',
  edit: (id) => `/data/cars/${id}`,
  del: (id) => `/data/cars/${id}`
}

async function getAll() {
  return api.get(endpoints.getAll);
}

async function getById(id) {
  return api.get(endpoints.getById(id));
}

async function getByModel(query) {
  return api.get(endpoints.getByModel(query));
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
  getByModel,
  add,
  edit,
  del
}