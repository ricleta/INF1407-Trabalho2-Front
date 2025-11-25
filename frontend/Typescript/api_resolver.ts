/**
 * Base URL for all API requests.
 * Centralizing this makes it easy to update if the backend URL changes.
 */
const isGitHubPages = window.location.hostname.includes('github.io');
const codespace_name = 'https://organic-space-invention-4wvpj6q95q7hqwgw-8000.app.github.dev';
const actual_backend = 'https://ricleta.pythonanywhere.com';
export const API_BASE_URL = isGitHubPages ? actual_backend : codespace_name;

// Define the structure of your data for type safety.
export interface Review {
    id: number;
    game: { title: string };
    user: { username: string };
    rating: number;
    comment: string;
    created_at: string;
}

export interface Game {
    id: number;
    title: string;
    platforms: string;
    description: string;
    release_date: string;
    developer: { username: string }; // Assuming the developer is a nested object with a username
    reviews: Review[];
}

export interface User {
    id: number;
    username: string;
    groups: { name: string }[];
}

/**
 * A utility function to make authenticated API requests.
 * It retrieves the auth token from localStorage and adds it to the request headers.
 * @param url The URL to fetch (can be a relative path from the API_BASE_URL).
 * @param options The options for the fetch request.
 * @returns The response from the server.
 */
export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
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