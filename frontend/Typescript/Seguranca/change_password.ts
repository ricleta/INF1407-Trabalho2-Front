import { API_BASE_URL } from "../api_resolver.js";
import { navLinks } from "../routes.js";

/**
 * Main function that runs when the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    const changePasswordForm = document.getElementById('change-password-form') as HTMLFormElement;
    const submitButton = document.getElementById('submit-button') as HTMLButtonElement;
    const resultDiv = document.getElementById('result') as HTMLDivElement;
    const token = localStorage.getItem('authToken');

    // If user is not logged in, redirect them to the login page
    if (!token) {
        window.location.href = navLinks.authActions.login.href;
        return;
    }

    changePasswordForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        submitButton.disabled = true;
        resultDiv.textContent = 'Updating password...';

        const formData = new FormData(changePasswordForm);
        const old_password = formData.get('old_password') as string;
        const new_password1 = formData.get('new_password1') as string;
        const new_password2 = formData.get('new_password2') as string;

        if (new_password1 !== new_password2) {
            resultDiv.innerHTML = `<p class="error">✗ New passwords do not match.</p>`;
            submitButton.disabled = false;
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/seguranca/login/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify({ old_password, new_password1, new_password2 }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle errors from the API, e.g., incorrect old password
                const errorMessage = data.old_password?.[0] || data.error || 'An unknown error occurred.';
                throw new Error(errorMessage);
            }

            // --- Success ---
            // The API returns a new token upon successful password change.
            localStorage.setItem('authToken', data.token);

            resultDiv.innerHTML = `<p class="success">✓ Password changed successfully! </p>`;
            window.location.href = navLinks.public.home.href;
        } catch (error) {
            const message = error instanceof Error ? error.message : "An unknown error occurred.";
            resultDiv.innerHTML = `<p class="error">✗ Error: ${message}</p>`;
            submitButton.disabled = false; // Re-enable button on error
        }
    });
});