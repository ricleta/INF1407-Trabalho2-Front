import { API_BASE_URL } from "../api_resolver.js";
/**
 * Main function that runs when the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const submitButton = document.getElementById('submit-button');
    const resultDiv = document.getElementById('result');
    // If user is already logged in, redirect them
    if (localStorage.getItem('authToken')) {
        window.location.href = '/'; // Redirect to home page
        return;
    }
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        submitButton.disabled = true;
        resultDiv.textContent = 'Autenticando...';
        const formData = new FormData(loginForm);
        const username = formData.get('username');
        const password = formData.get('password');
        try {
            // This URL must point to the endpoint for your CustomAuthToken view (for logging in)
            const response = await fetch(`${API_BASE_URL}/seguranca/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (!response.ok) {
                // Handle failed login (e.g., 401 Unauthorized)
                throw new Error(data.detail || 'Usuário ou senha inválidos.');
            }
            // --- Success ---
            // Store the token in localStorage for future authenticated requests
            localStorage.setItem('authToken', data.token);
            resultDiv.innerHTML = `<p class="success">✓ Login bem-sucedido! Redirecionando...</p>`;
            // Redirect to the home page after a short delay
            setTimeout(() => {
                window.location.href = '/'; // Or a user dashboard page
            }, 1500);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Ocorreu um erro desconhecido.";
            resultDiv.innerHTML = `<p class="error">✗ Erro: ${message}</p>`;
            submitButton.disabled = false; // Re-enable button on error
        }
    });
});
//# sourceMappingURL=login.js.map