/**
 * Base URL for all API requests.
 * Centralizing this makes it easy to update if the backend URL changes.
 */
const isGitHubPages = window.location.hostname.includes('github.io');
const codespace_name = 'https://organic-space-invention-4wvpj6q95q7hqwgw-8000.app.github.dev';
const actual_backend = 'https://ricleta.pythonanywhere.com';
export const API_BASE_URL = isGitHubPages ? actual_backend : codespace_name;
/**
 * A utility function to make authenticated API requests.
 * It retrieves the auth token from localStorage and adds it to the request headers.
 * @param url The URL to fetch (can be a relative path from the API_BASE_URL).
 * @param options The options for the fetch request.
 * @returns The response from the server.
 */
export async function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem('authToken');
    if (!token) {
        // Redirect to login or show an error if no token is found.
        window.location.href = '/login.html'; // Assuming you have a login page
        throw new Error("Authentication token not found. Please log in.");
    }
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
        ...options.headers,
    };
    return fetch(url, { ...options, headers });
}
//# sourceMappingURL=api_resolver.js.map