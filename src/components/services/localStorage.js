const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}

export function setAccessToken(token) {
  localStorage.setItem(ACCESS_TOKEN, token);
}

export function removeAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN);
}


