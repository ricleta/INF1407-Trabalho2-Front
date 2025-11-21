import { API_BASE_URL, fetchWithAuth } from '../api_resolver.js';
import { navLinks } from '../routes.js';
/**
 * Fetches the details of a specific review to display in the confirmation message.
 * @param reviewId The ID of the review to fetch.
 * @returns The review object or null if not found.
 */
async function fetchReviewForConfirmation(reviewId) {
    const url = `${API_BASE_URL}/reviews/${reviewId}/`;
    try {
        const response = await fetchWithAuth(url);
        if (!response.ok)
            return null;
        return await response.json();
    }
    catch (error) {
        console.error("Failed to fetch review for deletion confirmation:", error);
        return null;
    }
}
/**
 * Handles the deletion of a review.
 * @param reviewId The ID of the review to delete.
 */
async function handleDelete(reviewId) {
    const confirmButton = document.getElementById('confirm-delete-btn');
    confirmButton.textContent = 'Excluindo...';
    confirmButton.disabled = true;
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/reviews/${reviewId}/`, {
            method: 'DELETE',
        });
        if (response.status === 204) { // No Content
            alert('Avaliação excluída com sucesso!');
            window.location.href = navLinks.reviewer.my_reviews.href;
        }
        else {
            const errorData = await response.json();
            alert(`Erro ao excluir avaliação: ${JSON.stringify(errorData)}`);
            confirmButton.textContent = 'Confirmar Exclusão';
            confirmButton.disabled = false;
        }
    }
    catch (error) {
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
    const confirmationContainer = document.getElementById('confirmation-container');
    if (!reviewId || !confirmationContainer) {
        const container = document.getElementById('delete-container');
        container.innerHTML = '<p class="error">ID da avaliação não especificado ou container não encontrado.</p>';
        return;
    }
    const review = await fetchReviewForConfirmation(reviewId);
    if (review) {
        document.getElementById('confirmation-message').textContent = `Deseja realmente excluir a avaliação de "${review.game.title}"?`;
    }
    else {
        document.getElementById('confirmation-message').textContent = 'Não foi possível carregar os detalhes da avaliação. Deseja continuar com a exclusão?';
    }
    document.getElementById('confirm-delete-btn').addEventListener('click', () => handleDelete(reviewId));
    document.getElementById('cancel-btn').href = navLinks.reviewer.my_reviews.href;
});
//# sourceMappingURL=deletaReview.js.map