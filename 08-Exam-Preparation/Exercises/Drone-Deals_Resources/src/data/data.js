import { api } from "../data/request.js";

const endpoints = {
  getAll: '/data/drones?sortBy=_createdOn%20desc',
  getById: (id) => `/data/drones/${id}`,
  add: '/data/drones',
  edit: (id) => `/data/drones/${id}`,
  del: (id) => `/data/drones/${id}`
}

async function getAll() {
  return api.get(endpoints.getAll);
}

async function getById(id) {
  return api.get(endpoints.getById(id));
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
  add,
  edit,
  del
}