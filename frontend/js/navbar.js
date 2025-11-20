import { API_BASE_URL } from './api_resolver.js';
export const navLinks = {
    public: {
        home: { text: 'Home', href: '/html/index.html' },
        all_games: { text: 'Games', href: '/html/Games/listaGames.html' },
    },
    developer: {
        my_games: { text: 'My Games', href: '/html/Games/home_page_games.html' },
        create_game: { text: 'Create Game', href: '/html/Games/criaGames.html' },
    },
    reviewer: {
        my_games: { text: 'My Reviews', href: '/html/ReviewslistaReviews.html' },
    },
    authActions: {
        login: { text: 'Login', href: '/html/Seguranca/login.html' },
        register: { text: 'Register', href: '/html/Seguranca/signup.html' },
        logout: { text: 'Logout', href: '/html/Seguranca/logout.html' },
    }
};
async function fetchCurrentUser() {
    const token = localStorage.getItem('authToken');
    if (!token)
        return null;
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
    }
    catch (error) {
        console.error('Failed to fetch user:', error);
        return null;
    }
}
function renderNavbar(user) {
    const navbarContainer = document.getElementById('navbar-container');
    if (!navbarContainer)
        return;
    let links = Object.values(navLinks.public);
    const authLinks = [];
    if (user) {
        const isDeveloper = user.groups.some(g => g.name.toLowerCase() === 'developer');
        const isReviewer = user.groups.some(g => g.name.toLowerCase() === 'reviewer');
        if (isDeveloper) {
            links.push(...Object.values(navLinks.developer));
        }
        if (isReviewer) {
            links.push(...Object.values(navLinks.reviewer));
        }
        authLinks.push(navLinks.authActions.logout);
    }
    else {
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
//# sourceMappingURL=navbar.js.map