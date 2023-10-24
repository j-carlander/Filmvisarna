export function fetchHelper (url, method, body) {
    const fetchOptions = {
        method, headers: {"Content-Type": "application/json"}
    }
    if (method.toLowerCase() !== "get") {
        fetchOptions.body = JSON.stringify(body)
    }
    return fetch("/api" + url, fetchOptions)
}