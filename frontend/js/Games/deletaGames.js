import { API_BASE_URL, fetchWithAuth } from "../api_resolver.js";
import { navLinks } from "../routes.js";
/**
 * Main function that runs when the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', async () => {
    // --- Get DOM Elements ---
    const gameTitleSpan = document.getElementById('game-title');
    const confirmButton = document.getElementById('confirm-delete');
    const cancelButton = document.getElementById('cancel-delete');
    const resultDiv = document.getElementById('result');
    // --- Get Game ID from URL ---
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id');
    if (!gameId) {
        resultDiv.innerHTML = `<p class="error">Erro: ID do jogo não fornecido.</p>`;
        confirmButton.disabled = true;
        return;
    }
    // --- Fetch Game Title for Confirmation Message ---
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/games/${gameId}/`);
        if (!response.ok) {
            throw new Error('Jogo não encontrado ou falha ao carregar.');
        }
        const game = await response.json();
        gameTitleSpan.textContent = game.title;
    }
    catch (error) {
        resultDiv.innerHTML = `<p class="error">Erro: ${error instanceof Error ? error.message : String(error)}</p>`;
        confirmButton.disabled = true;
    }
    // --- Handle Delete Confirmation ---
    confirmButton.addEventListener('click', async () => {
        confirmButton.disabled = true;
        resultDiv.textContent = 'Excluindo...';
        try {
            // Assumes the API supports DELETE /games/{id}/
            const response = await fetchWithAuth(`${API_BASE_URL}/games/${gameId}/`, {
                method: 'DELETE',
            });
            if (response.status !== 204) { // 204 No Content is the typical success status for DELETE
                throw new Error('Falha ao excluir o jogo.');
            }
            // --- Success ---
            resultDiv.innerHTML = `<p class="success">✓ Jogo excluído com sucesso! Redirecionando...</p>`;
            setTimeout(() => {
                window.location.href = navLinks.developer.my_games.href; // Redirect to the user's game list
            }, 2000);
        }
        catch (error) {
            resultDiv.innerHTML = `<p class="error">✗ Erro: ${error instanceof Error ? error.message : String(error)}</p>`;
            confirmButton.disabled = false;
        }
    });
});
//# sourceMappingURL=deletaGames.js.map