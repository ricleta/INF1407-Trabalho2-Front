import { API_BASE_URL, fetchWithAuth } from '../api_resolver.js';
import { navLinks } from '../routes.js';
/**
 * Fetches all games from the API to populate the selection dropdown.
 * @returns A promise that resolves to an array of games.
 */
async function fetchAllGames() {
    const url = `${API_BASE_URL}/games/`;
    try {
        // Use fetchWithAuth for consistency, as creating/updating reviews requires login.
        const response = await fetchWithAuth(url);
        if (!response.ok) {
            console.error(`Error fetching games: ${response.statusText}`);
            return [];
        }
        return await response.json();
    }
    catch (error) {
        console.error("Failed to fetch games:", error);
        return [];
    }
}
/**
 * Fetches the details of a specific review by its ID.
 * @param reviewId The ID of the review to fetch.
 * @returns A promise that resolves to the review object.
 */
async function fetchReviewDetails(reviewId) {
    const url = `${API_BASE_URL}/reviews/${reviewId}/`;
    try {
        const response = await fetchWithAuth(url);
        if (!response.ok)
            throw new Error('Failed to fetch review details.');
        return await response.json();
    }
    catch (error) {
        console.error("Error fetching review details:", error);
        return null;
    }
}
/**
 * Populates the game selector dropdown with the fetched games.
 * @param games An array of game objects.
 */
function populateGameSelector(games) {
    const selector = document.getElementById('game');
    if (!selector)
        return;
    if (games.length === 0) {
        selector.disabled = true;
        selector.innerHTML = '<option>Nenhum jogo encontrado</option>';
        return;
    }
    selector.innerHTML = '<option value="">Selecione um jogo</option>'; // Placeholder
    games.forEach(game => {
        const option = document.createElement('option');
        option.value = game.id.toString();
        option.textContent = game.title;
        selector.appendChild(option);
    });
}
/**
 * Handles the submission of the new review form.
 * @param event The form submission event.
 * @param gameId The ID of the game being reviewed.
 */
async function handleFormSubmit(event, reviewId) {
    event.preventDefault();
    const form = event.target;
    const isUpdateMode = reviewId !== null;
    // In update mode, the game ID is stored in a data attribute.
    // In create mode, it's from the select dropdown.
    const gameId = isUpdateMode
        ? document.getElementById('game-display').dataset.gameId
        : form.elements.namedItem('game').value;
    const rating = form.elements.namedItem('rating').value;
    const comment = form.elements.namedItem('comment').value;
    const reviewData = {
        game_id: parseInt(gameId, 10),
        rating: parseInt(rating, 10),
        comment: comment,
    };
    const url = isUpdateMode
        ? `${API_BASE_URL}/reviews/${reviewId}/`
        : `${API_BASE_URL}/reviews/`;
    const method = isUpdateMode ? 'PUT' : 'POST';
    try {
        const response = await fetchWithAuth(url, {
            method: method,
            body: JSON.stringify(reviewData),
        });
        if (response.ok) {
            const successMessage = isUpdateMode ? 'Avaliação atualizada com sucesso!' : 'Avaliação criada com sucesso!';
            alert(successMessage);
            window.location.href = navLinks.reviewer.my_reviews.href; // Redirect to my reviews
        }
        else {
            const errorData = await response.json();
            alert(`Erro ao criar avaliação: ${JSON.stringify(errorData)}`);
        }
    }
    catch (error) {
        console.error('Failed to submit review:', error);
        alert('Ocorreu um erro. Por favor, tente novamente.');
    }
}
// Main execution block
document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const reviewId = urlParams.get('id');
    const isUpdateMode = reviewId !== null;
    const pageTitle = document.getElementById('page-title');
    const formLegend = document.getElementById('form-legend');
    const submitButton = document.getElementById('submit-button');
    const gameSelectorContainer = document.getElementById('game-selector-container');
    const gameDisplayContainer = document.getElementById('game-display-container');
    if (isUpdateMode) {
        // --- UPDATE MODE ---
        pageTitle.textContent = 'Atualizar Avaliação';
        formLegend.textContent = 'Editar Avaliação';
        submitButton.textContent = 'Atualizar';
        // Hide game selector and show static display
        gameSelectorContainer.style.display = 'none';
        gameDisplayContainer.style.display = 'block';
        const review = await fetchReviewDetails(reviewId);
        if (review) {
            document.getElementById('rating').value = review.rating.toString();
            document.getElementById('comment').value = review.comment;
            const gameDisplay = document.getElementById('game-display');
            gameDisplay.textContent = review.game.title;
            gameDisplay.dataset.gameId = review.game.id; // Assuming review.game has an id
        }
        else {
            document.getElementById('review-form-container').innerHTML = '<p>Erro: Não foi possível carregar a avaliação para edição.</p>';
        }
    }
    else {
        // --- CREATE MODE ---
        pageTitle.textContent = 'Criar Avaliação';
        formLegend.textContent = 'Nova Avaliação';
        submitButton.textContent = 'Criar Avaliação';
        const games = await fetchAllGames();
        populateGameSelector(games);
    }
    const form = document.getElementById('review-form');
    form === null || form === void 0 ? void 0 : form.addEventListener('submit', (event) => handleFormSubmit(event, reviewId));
});
//# sourceMappingURL=criaReview.js.map