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
            // 1. Create the main Game row
            const row = gamesTableBody.insertRow();
            row.appendChild(createElement('td', game.title));
            row.appendChild(createElement('td', game.platforms));
            row.appendChild(createElement('td', game.description));
            row.appendChild(createElement('td', formatDate(game.release_date)));
            row.appendChild(createElement('td', game.developer.username));
            // 2. Create the Reviews row (if reviews exist)
            if (game.reviews && game.reviews.length > 0) {
                const reviewsRow = gamesTableBody.insertRow();
                reviewsRow.classList.add('reviews-row'); // Add class for potential styling
                const cell = reviewsRow.insertCell();
                cell.colSpan = 5; // Span across all 5 columns of the main table
                // Build the nested table HTML
                cell.innerHTML = `
                    <div style="margin: 10px 20px; padding: 10px; background-color: #f9f9f9; border-radius: 5px;">
                        <h4 style="margin-top: 0;">Avaliações:</h4>
                        <table class="reviews-table" style="width: 100%; border-collapse: collapse;">
                            <thead>
                                <tr style="background-color: #e9ecef;">
                                    <th style="padding: 5px;">Usuário</th>
                                    <th style="padding: 5px;">Nota</th>
                                    <th style="padding: 5px;">Comentário</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${game.reviews.map(review => `
                                    <tr>
                                        <td style="padding: 5px; border-bottom: 1px solid #ddd;">${review.user.username}</td>
                                        <td style="padding: 5px; border-bottom: 1px solid #ddd;">${review.rating}</td>
                                        <td style="padding: 5px; border-bottom: 1px solid #ddd;">${review.comment}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `;
            }
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Um erro desconhecido ocorreu.";
        loadingMessage.innerHTML = `<p class="error">Erro: ${message}</p>`;
    }
});
//# sourceMappingURL=home_page_games.js.map