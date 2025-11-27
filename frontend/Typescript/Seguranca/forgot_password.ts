import { API_BASE_URL } from "../api_resolver.js";
import { navLinks } from "../routes.js";

/**
 * Main function that runs when the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    const changePasswordForm = document.getElementById('forgot-password-form') as HTMLFormElement;
    const submitButton = document.getElementById('submit-button') as HTMLButtonElement;
    const resultDiv = document.getElementById('result') as HTMLDivElement;

    changePasswordForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        submitButton.disabled = true;
        resultDiv.textContent = 'Sending reset email...';

        const formData = new FormData(changePasswordForm);
        const email = formData.get('email') as string;

        try {
            const response = await fetch(`${API_BASE_URL}/seguranca/forgot_password/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle errors from the API
                const errorMessage = data.email?.[0] || data.error || 'An unknown error occurred.';
                throw new Error(errorMessage);
            }

            // --- Success ---
            const temporaryPassword = data.temporary_password;
            if (temporaryPassword) {
                resultDiv.innerHTML = `<p class="success">✓ Your temporary password has been generated. Please use it to log in.</p>`;
                alert(`Your new password is: ${temporaryPassword}`);
                window.location.href = navLinks.authActions.login.href;
            }
        } catch (error) {
            resultDiv.innerHTML = `<p class="error">✗ ${(error as Error).message}</p>`;
        } 
        finally {
            submitButton.disabled = false;
        }
    });
});