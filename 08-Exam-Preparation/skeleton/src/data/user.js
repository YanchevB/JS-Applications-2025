import { api } from "./request.js";
import { clearUserData, setUserData } from "../utils/utils.js";

const endpoints = {
  login: '/users/login',
  register: '/users/register',
  logout: '/users/logout'
}

async function login(email, password) {
  const result = await api.post(endpoints.login, { email, password });

  const userData = {
    id: result._id,
    email: result.email,
    accessToken: result.accessToken
  }

  setUserData(userData);
}

async function register(email, password) {
  const result = await api.post(endpoints.register, { email, password });

  const userData = {
    id: result._id,
    accessToken: result.accessToken
  }

  setUserData(userData);
}

async function logout() {
  await api.get(endpoints.logout);
  clearUserData();
}

export const user = {
  login,
  register,
  logout
}