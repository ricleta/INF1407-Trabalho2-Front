import { API_BASE_URL, fetchWithAuth, Review } from '../api_resolver.js';

/**
 * Fetches reviews for the currently logged-in user.
 * @returns A promise that resolves to an array of reviews.
 */
async function fetchMyReviews(): Promise<Review[]> {
    // The API endpoint for fetching reviews for the current user.
    const url = `${API_BASE_URL}/reviews/?my_reviews=true`;

    try {
        const response = await fetchWithAuth(url);

        if (!response.ok) {
            // Handle non-successful responses
            if (response.status === 401) {
                console.error("Authentication error: Please log in again.");
                // The fetchWithAuth function should handle redirection to login.
            } else {
                console.error(`Error fetching reviews: ${response.statusText}`);
            }
            return []; // Return an empty array on error
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch reviews:", error);
        return []; // Return an empty array on network or other errors
    }
}

/**
 * Renders the fetched reviews into the table on the page.
 * @param reviews An array of review objects.
 */
function renderReviews(reviews: Review[]): void {
    const tableBody = document.getElementById('reviews-table-body');
    if (!tableBody) {
        console.error("Table body for reviews not found.");
        return;
    }

    // Clear any existing content
    tableBody.innerHTML = '';

    if (reviews.length === 0) {
        // Display a message if there are no reviews
        tableBody.innerHTML = `
            <tr>
                <td colspan="5">Nenhuma avaliação cadastrada</td>
            </tr>
        `;
        return;
    }

    // Populate the table with review data
    reviews.forEach(review => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${review.game.title}</td>
            <td>${review.rating}</td>
            <td>${review.comment}</td>
            <td>${new Date(review.created_at).toLocaleDateString('pt-BR')}</td>
            <td>
                <a class="btn btn-primary" href="/html/Reviews/criaReview.html?id=${review.id}">Editar</a> |
                <a class="btn btn-danger" href="/html/Reviews/deletaReview.html?id=${review.id}">Excluir</a>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Main execution block when the DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    const reviews = await fetchMyReviews();
    renderReviews(reviews);
});
