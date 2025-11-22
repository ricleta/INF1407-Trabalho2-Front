const repoName = 'inf1407-trabalho2-front';
const isGitHubPages = window.location.hostname.includes('github.io');
const basePath = isGitHubPages ? `/${repoName}` : '';
export const navLinks = {
    public: {
        home: { text: 'Home', href: `${basePath}/index.html` },
        all_games: { text: 'Games', href: `${basePath}/Games/listaGames.html` },
    },
    developer: {
        my_games: { text: 'My Games', href: `${basePath}/Games/home_page_games.html` },
        create_game: { text: 'Create Game', href: `${basePath}/Games/criaGames.html` },
    },
    reviewer: {
        my_reviews: { text: 'My Reviews', href: `${basePath}/Reviews/listaReviews.html` },
        create_review: { text: 'Create Review', href: `${basePath}/Reviews/criaReview.html` },
    },
    authActions: {
        login: { text: 'Login', href: `${basePath}/Seguranca/login.html` },
        register: { text: 'Register', href: `${basePath}/Seguranca/signup.html` },
        logout: { text: 'Logout', href: `${basePath}/Seguranca/logout.html` },
    }
};
//# sourceMappingURL=routes.js.map