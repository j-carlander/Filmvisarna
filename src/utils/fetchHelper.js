import sessionService from "./sessionService";

export function fetchHelper(url, method, body) {
  const fetchOptions = {
    method,
    headers: { "Content-Type": "application/json" },
  };

  if (method.toLowerCase() !== "get") {
    fetchOptions.body = JSON.stringify(body);
  }

  const token = sessionService.getToken();

  if (token !== null) {
    fetchOptions.headers.authorization = `Bearer ${token}`;
  }

  return fetch("/api" + url, fetchOptions);
}
