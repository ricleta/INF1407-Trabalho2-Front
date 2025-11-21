import { API_BASE_URL, fetchWithAuth, Review } from '../api_resolver.js';
import { navLinks } from '../routes.js';

/**
 * Fetches the details of a specific review to display in the confirmation message.
 * @param reviewId The ID of the review to fetch.
 * @returns The review object or null if not found.
 */
async function fetchReviewForConfirmation(reviewId: string): Promise<Review | null> {
    const url = `${API_BASE_URL}/reviews/${reviewId}/`;
    try {
        const response = await fetchWithAuth(url);
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch review for deletion confirmation:", error);
        return null;
    }
}

/**
 * Handles the deletion of a review.
 * @param reviewId The ID of the review to delete.
 */
async function handleDelete(reviewId: string): Promise<void> {
    const confirmButton = document.getElementById('confirm-delete-btn') as HTMLButtonElement;
    confirmButton.textContent = 'Excluindo...';
    confirmButton.disabled = true;

    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/reviews/${reviewId}/`, {
            method: 'DELETE',
        });

        if (response.status === 204) { // No Content
            alert('Avaliação excluída com sucesso!');
            window.location.href = navLinks.reviewer.my_reviews.href;
        } else {
            const errorData = await response.json();
            alert(`Erro ao excluir avaliação: ${JSON.stringify(errorData)}`);
            confirmButton.textContent = 'Confirmar Exclusão';
            confirmButton.disabled = false;
        }
    } catch (error) {
        console.error('Failed to delete review:', error);
        alert('Ocorreu um erro na exclusão. Por favor, tente novamente.');
        confirmButton.textContent = 'Confirmar Exclusão';
        confirmButton.disabled = false;
    }
}

// Main execution block
document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const reviewId = urlParams.get('id');
    const confirmationContainer = document.getElementById('confirmation-container') as HTMLElement;

    if (!reviewId || !confirmationContainer) {
        const container = document.getElementById('delete-container') as HTMLElement;
        container.innerHTML = '<p class="error">ID da avaliação não especificado ou container não encontrado.</p>';
        return;
    }

    const review = await fetchReviewForConfirmation(reviewId);
    if (review) {
        (document.getElementById('confirmation-message') as HTMLElement).textContent = `Deseja realmente excluir a avaliação de "${review.game.title}"?`;
    } else {
        (document.getElementById('confirmation-message') as HTMLElement).textContent = 'Não foi possível carregar os detalhes da avaliação. Deseja continuar com a exclusão?';
    }

    (document.getElementById('confirm-delete-btn') as HTMLButtonElement).addEventListener('click', () => handleDelete(reviewId));
    (document.getElementById('cancel-btn') as HTMLAnchorElement).href = navLinks.reviewer.my_reviews.href;
});