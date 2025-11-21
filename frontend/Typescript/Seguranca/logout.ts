import { navLinks } from "../routes.js";

document.addEventListener('DOMContentLoaded', () => {
    const confirmButton = document.getElementById('confirm-logout') as HTMLButtonElement;

    if (!confirmButton) {
        console.error("Botão de confirmação de logout não encontrado.");
        return;
    }
    
    confirmButton.addEventListener('click', () => {
        // Clear the authentication token from local storage
        localStorage.removeItem('authToken');
        
        // Redirect to the home page after logging out
        window.location.href = navLinks.public.home.href;
    });
});
