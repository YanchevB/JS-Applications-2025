

async function requester(method, url, data){

  const option = {
    method: method
  }

  const headers = {
    'Content-Type': 'application/json'
  }

  option.headers = headers;

  if (data) {
    const body = JSON.stringify(data);
    option.body = body;
  }

  try {

    const response = await fetch(url, option);

    if (response.status === 204) {
      return response;
    }

    if (response.status !== 200) {
      alert('Error');
      return response;
    }

    const data = await response.json();
    return data

  } catch (error) {

    return alert(error);
  }
}

const get = (url) => requester('GET', url);
const post = (url, data) => requester('POST', url, data);
const update = (url, data) => requester('PUT', url, data);
const del = (url) => requester('DELETE', url);

export const api = {
  get,
  post,
  update,
  del
}