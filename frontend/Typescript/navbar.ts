import { API_BASE_URL } from './api_resolver.js';
import { navLinks } from './routes.js';
import { User } from './api_resolver.js';

async function fetchCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem('authToken');
    if (!token) return null;

    try {
        const response = await fetch(`${API_BASE_URL}/seguranca/login/`, {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            return await response.json();
        }

        // If token is invalid, clear it
        if (response.status === 401) {
            localStorage.removeItem('authToken');
        }
        return null;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        return null;
    }
}

function renderNavbar(user: User | null): void {
    const navbarContainer = document.getElementById('navbar-container');
    if (!navbarContainer) return;

    let links = Object.values(navLinks.public);
    const authLinks = [];

    if (user) {
        const isDeveloper = user.groups.some(g => g.name.toLowerCase() === 'developer');
        const isReviewer = user.groups.some(g => g.name.toLowerCase() === 'reviewer');

        if (isDeveloper) {
            const developerNavs = Object.values(navLinks.developer).filter(
                link => link.text !== navLinks.developer.delete_game.text
            );
            links.push(...developerNavs);
        }
        if (isReviewer) {
            // Exclude the delete link from the main navigation
            const reviewerNavs = Object.values(navLinks.reviewer).filter(
                link => link.text !== navLinks.reviewer.delete_review.text
            );
            links.push(...reviewerNavs);
        }
        authLinks.push(navLinks.authActions.logout);
    } else {
        authLinks.push(navLinks.authActions.login, navLinks.authActions.register);
    }

    const linksHtml = links.map(link => `<a href="${link.href}">${link.text}</a>`).join('');
    const authLinksHtml = authLinks.map(link => {
        const id = link.text === 'Logout' ? 'id="logout-btn"' : '';
        return `<a href="${link.href}" ${id}>${link.text}</a>`;
    }).join('');

    navbarContainer.innerHTML = `
        <nav>
            ${linksHtml}${authLinksHtml}
        </nav>
    `;

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn && logoutBtn.innerText === 'Logout') {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('authToken');
            window.location.href = navLinks.authActions.logout.href;
        });
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const user = await fetchCurrentUser();
    renderNavbar(user);
});