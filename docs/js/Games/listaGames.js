import { API_BASE_URL } from "../api_resolver.js";
/**
 * Formats a date string from YYYY-MM-DD to DD/MM/YYYY.
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() + userTimezoneOffset);
    return adjustedDate.toLocaleDateString('pt-BR');
}
/**
 * Creates and returns a DOM element with the given tag, text, and classes.
 */
function createElement(tag, textContent, classList) {
    const element = document.createElement(tag);
    if (textContent)
        element.textContent = textContent;
    if (classList)
        element.classList.add(...classList);
    return element;
}
/**
 * Main function that runs when the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', async () => {
    const gamesTableBody = document.getElementById('games-list-body');
    const loadingMessage = document.getElementById('loading-message');
    loadingMessage.textContent = 'Carregando jogos...';
    try {
        // Fetch all games from the API
        const response = await fetch(`${API_BASE_URL}/games/`);
        if (!response.ok) {
            throw new Error(`Falha ao carregar jogos: ${response.statusText}`);
        }
        const games = await response.json();
        loadingMessage.style.display = 'none';
        if (games.length === 0) {
            const row = gamesTableBody.insertRow();
            const cell = row.insertCell();
            cell.colSpan = 5;
            cell.textContent = 'Nenhum jogo cadastrado.';
            return;
        }
        // Render games using DOM manipulation
        games.forEach(game => {
            const row = gamesTableBody.insertRow();
            row.appendChild(createElement('td', game.title));
            row.appendChild(createElement('td', game.platforms));
            row.appendChild(createElement('td', game.description));
            row.appendChild(createElement('td', formatDate(game.release_date)));
            row.appendChild(createElement('td', game.developer.username));
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Um erro desconhecido ocorreu.";
        loadingMessage.innerHTML = `<p class="error">Erro: ${message}</p>`;
    }
});
//# sourceMappingURL=listaGames.js.map