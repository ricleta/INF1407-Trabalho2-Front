import { API_BASE_URL, fetchWithAuth, Game, Review } from "../api_resolver.js";

/**
 * Formats a date string from YYYY-MM-DD to DD/MM/YYYY.
 * @param dateString The date string to format.
 * @returns The formatted date string.
 */
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    // Adjust for timezone offset to prevent date from changing
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() + userTimezoneOffset);
    return adjustedDate.toLocaleDateString('pt-BR');
}

/**
 * Main function that runs when the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', async () => {
    const gamesTableBody = document.getElementById('my-games-list') as HTMLTableSectionElement;
    const loadingMessage = document.getElementById('loading-message') as HTMLDivElement;
    const authLinks = document.getElementById('auth-links') as HTMLSpanElement;

    // Show authenticated links if token exists
    if (localStorage.getItem('authToken')) {
        authLinks.style.display = 'inline';
    }

    loadingMessage.textContent = 'Carregando seus jogos...';

    try {
        // Fetch games from an endpoint dedicated to the authenticated user's games.
        const response = await fetchWithAuth(`${API_BASE_URL}/games/mygames/`);

        if (!response.ok) {
            throw new Error(`Falha ao carregar jogos: ${response.statusText}`);
        }

        const games: Game[] = await response.json();
        loadingMessage.style.display = 'none';

        if (games.length === 0) {
            gamesTableBody.innerHTML = '<tr><td colspan="5">Você não cadastrou nenhum jogo.</td></tr>';
            return;
        }

        // Clear any existing content and render games
        gamesTableBody.innerHTML = '';
        games.forEach(game => {
            const row = gamesTableBody.insertRow();
            row.innerHTML = `
                <td>${game.title}</td>
                <td>${game.platforms}</td>
                <td>${game.description}</td>
                <td>${formatDate(game.release_date)}</td>
                <td>
                    <a href="criaGames.html?id=${game.id}">Editar</a> |
                    <a href="deletaGames.html?id=${game.id}">Excluir</a>
                </td>
            `;

            // If there are reviews, create and append the reviews sub-table
            if (game.reviews && game.reviews.length > 0) {
                const reviewsRow = gamesTableBody.insertRow();
                reviewsRow.classList.add('reviews-row');
                const cell = reviewsRow.insertCell();
                cell.colSpan = 5; // Span across all columns
                cell.innerHTML = `
                    <h4>Avaliações para ${game.title}</h4>
                    <table class="reviews-table">
                        <thead><tr><th>Usuário</th><th>Nota</th><th>Comentário</th></tr></thead>
                        <tbody>
                            ${game.reviews.map(review => `
                                <tr>
                                    <td>${review.user.username}</td>
                                    <td>${review.rating}</td>
                                    <td>${review.comment}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;
            }
        });

    } catch (error) {
        const message = error instanceof Error ? error.message : "Um erro desconhecido ocorreu.";
        loadingMessage.innerHTML = `<p class="error">Erro: ${message}</p>`;
    }
});
