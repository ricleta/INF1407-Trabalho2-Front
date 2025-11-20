/**
 * Base URL for all API requests.
 * Centralizing this makes it easy to update if the backend URL changes.
 */
export declare const API_BASE_URL = "https://organic-space-invention-4wvpj6q95q7hqwgw-8000.app.github.dev";
export interface Review {
    id: number;
    user: {
        username: string;
    };
    rating: number;
    comment: string;
}
export interface Game {
    id: number;
    title: string;
    platforms: string;
    description: string;
    release_date: string;
    developer: {
        username: string;
    };
    reviews: Review[];
}
export interface User {
    id: number;
    username: string;
    groups: {
        name: string;
    }[];
}
/**
 * A utility function to make authenticated API requests.
 * It retrieves the auth token from localStorage and adds it to the request headers.
 * @param url The URL to fetch (can be a relative path from the API_BASE_URL).
 * @param options The options for the fetch request.
 * @returns The response from the server.
 */
export declare function fetchWithAuth(url: string, options?: RequestInit): Promise<Response>;
//# sourceMappingURL=api_resolver.d.ts.map