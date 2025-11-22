/**
 * Centralized navigation links for the entire application.
 * This ensures consistency and makes it easy to update routes.
 */
export const navLinks = {
    public: {
        home: { text: 'Home', href: '/index.html' },
        all_games: { text: 'Games', href: '/Games/listaGames.html' },
    },
    developer: {
        my_games: { text: 'My Games', href: '/Games/home_page_games.html' },
        create_game: { text: 'Create Game', href: '/Games/criaGames.html' },
    },
    reviewer: {
        my_reviews: { text: 'My Reviews', href: '/Reviews/listaReviews.html' },
        create_review: { text: 'Create Review', href: '/Reviews/criaReview.html' },
    },
    authActions: {
        login: { text: 'Login', href: '/Seguranca/login.html' },
        register: { text: 'Register', href: '/Seguranca/signup.html' },
        logout: { text: 'Logout', href: '/Seguranca/logout.html' },
    }
};