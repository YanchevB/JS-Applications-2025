

function storeUserData(data) {
  const id = data._id;
  const accessToken = data.accessToken;
  
  sessionStorage.setItem('userData', JSON.stringify({id, accessToken}));
}

function getUserId() {
  const userData = sessionStorage.getItem('userData');
  const id = userData && JSON.parse(userData).id;
  return id;
}

function getAccessToken() {
  const userData = sessionStorage.getItem('userData');
  const accessToken = userData && JSON.parse(userData).accessToken;
  return accessToken;
}

function clearUserData() {
  sessionStorage.removeItem('userData')
}

export const userUtils = {
  storeUserData,
  getUserId,
  getAccessToken,
  clearUserData
}