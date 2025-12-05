import { clearUserData, getUserData } from "../utils/utils.js";

const hostname = 'http://localhost:3030';

async function request(method, url, data) {
  const options = {
    method,
    headers: {}
  }

  if (data !== undefined) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  const userData = getUserData();

  if (userData) {
    options.headers['X-Authorization'] = userData.accessToken;
  }

  const res = await fetch(hostname + url, options);

  if (!res.ok) {
    const error = await res.json();
    console.error(error.message);

    if (error.message === 'Invalid access token') {
      clearUserData();
    }

    throw error;
  }

  if (res.status === 204) {
    return res;
  }

  return res.json();
}

function get(url) {
  return request('GET', url);
}

function post(url, data) {
  return request('POST', url, data);
}

function put(url, data) {
  return request('PUT', url, data);
}

function del(url) {
  return request('DELETE', url);
}

export const api = {
  get,
  post,
  put,
  del
}