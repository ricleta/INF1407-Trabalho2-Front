import { API_BASE_URL, fetchWithAuth } from "../api_resolver.js";
import { navLinks } from "../routes.js";
/**
 * Main function that runs when the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', async () => {
    // --- Get DOM Elements ---
    const pageTitle = document.getElementById('page-title');
    const formTitle = document.getElementById('form-title');
    const gameForm = document.getElementById('game-form');
    const submitButton = document.getElementById('submit-button');
    const resultDiv = document.getElementById('result');
    // --- Determine Mode: Create or Update ---
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id');
    const isUpdateMode = gameId !== null;
    // --- Handle Update Mode ---
    if (isUpdateMode) {
        // Change UI text for updating
        const updateText = "Atualizar Jogo";
        pageTitle.textContent = updateText;
        formTitle.textContent = updateText;
        submitButton.textContent = updateText;
        // Fetch the existing game data to populate the form
        try {
            const response = await fetchWithAuth(`${API_BASE_URL}/games/${gameId}/`);
            if (!response.ok) {
                throw new Error('Falha ao carregar os dados do jogo.');
            }
            const game = await response.json();
            // Populate form fields
            document.getElementById('title').value = game.title;
            document.getElementById('platforms').value = game.platforms;
            document.getElementById('description').value = game.description;
            document.getElementById('release_date').value = game.release_date;
        }
        catch (error) {
            resultDiv.innerHTML = `<p class="error">Erro: ${error instanceof Error ? error.message : String(error)}</p>`;
            submitButton.disabled = true; // Disable form if data can't be loaded
        }
    }
    // --- Handle Form Submission ---
    gameForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default browser submission
        submitButton.disabled = true;
        resultDiv.textContent = 'Salvando...';
        // Collect form data
        const formData = new FormData(gameForm);
        const gameData = {
            title: formData.get('title'),
            platforms: formData.get('platforms'),
            description: formData.get('description'),
            release_date: formData.get('release_date'),
        };
        try {
            let response;
            if (isUpdateMode) {
                // --- API call for UPDATE ---
                response = await fetchWithAuth(`${API_BASE_URL}/games/${gameId}/`, {
                    method: 'PUT',
                    body: JSON.stringify(gameData),
                });
            }
            else {
                // --- API call for CREATE ---
                response = await fetchWithAuth(`${API_BASE_URL}/games/`, {
                    method: 'POST',
                    body: JSON.stringify(gameData),
                });
            }
            const responseData = await response.json();
            if (!response.ok) {
                // Display detailed error messages from the API
                throw new Error(`Falha ao salvar: ${JSON.stringify(responseData)}`);
            }
            // --- Success ---
            const successMessage = isUpdateMode ? 'Jogo atualizado com sucesso!' : 'Jogo criado com sucesso!';
            resultDiv.innerHTML = `<p class="success">✓ ${successMessage}</p>`;
            // Redirect to the game list after a short delay
            setTimeout(() => {
                window.location.href = navLinks.developer.my_games.href;
            }, 2000);
        }
        catch (error) {
            resultDiv.innerHTML = `<p class="error">✗ Erro: ${error instanceof Error ? error.message : String(error)}</p>`;
            submitButton.disabled = false; // Re-enable button on error
        }
    });
});
//# sourceMappingURL=criaGames.js.map