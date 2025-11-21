/**
 * Centralized navigation links for the entire application.
 * This ensures consistency and makes it easy to update routes.
 */
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
        my_reviews: { text: 'My Reviews', href: '/html/Reviews/listaReviews.html' },
        create_review: { text: 'Create Review', href: '/html/Reviews/criaReview.html' },
    },
    authActions: {
        login: { text: 'Login', href: '/html/Seguranca/login.html' },
        register: { text: 'Register', href: '/html/Seguranca/signup.html' },
        logout: { text: 'Logout', href: '/html/Seguranca/logout.html' },
    }
};