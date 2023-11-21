/**
 * Service for accessing, setting and clearing the token stored in session storage.
 */

function getToken() {
  return sessionStorage.getItem("token");
}

function setToken(token) {
  sessionStorage.setItem("token", token);
}

function clearSession() {
  sessionStorage.clear();
}

export default { getToken, setToken, clearSession };
