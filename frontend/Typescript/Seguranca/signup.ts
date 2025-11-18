// --- Configuration ---
const API_BASE_URL = "https://organic-space-invention-4wvpj6q95q7hqwgw-8000.app.github.dev";

/**
 * Main function that runs when the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form') as HTMLFormElement;
    const submitButton = document.getElementById('submit-button') as HTMLButtonElement;
    const resultDiv = document.getElementById('result') as HTMLDivElement;

    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        submitButton.disabled = true;
        resultDiv.textContent = 'Criando conta...';

        const formData = new FormData(signupForm);
        const signupData = {
            username: formData.get('username') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            group: formData.get('group') as string,
        };

        try {
            // This URL must match the one for your UserRegistrationView
            const response = await fetch(`${API_BASE_URL}/seguranca/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupData),
            });

            const data = await response.json();

            if (!response.ok) {
                // Display detailed error from the API (e.g., "Username already exists")
                const errorMessage = data.error || JSON.stringify(data);
                throw new Error(errorMessage);
            }

            // --- Success ---
            resultDiv.innerHTML = `<p class="success">✓ Conta criada com sucesso! Você será redirecionado para a página de login.</p>`;

            // Redirect to the login page after a short delay
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2500);

        } catch (error) {
            const message = error instanceof Error ? error.message : "Ocorreu um erro desconhecido.";
            resultDiv.innerHTML = `<p class="error">✗ Erro: ${message}</p>`;
            submitButton.disabled = false; // Re-enable button on error
        }
    });
});