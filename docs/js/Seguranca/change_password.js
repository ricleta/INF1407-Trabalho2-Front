import { API_BASE_URL } from "../api_resolver.js";
import { navLinks } from "../routes.js";
/**
 * Main function that runs when the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    const changePasswordForm = document.getElementById('change-password-form');
    const submitButton = document.getElementById('submit-button');
    const resultDiv = document.getElementById('result');
    const token = localStorage.getItem('authToken');
    // If user is not logged in, redirect them to the login page
    if (!token) {
        window.location.href = navLinks.authActions.login.href;
        return;
    }
    changePasswordForm.addEventListener('submit', async (event) => {
        var _a;
        event.preventDefault();
        submitButton.disabled = true;
        resultDiv.textContent = 'Updating password...';
        const formData = new FormData(changePasswordForm);
        const old_password = formData.get('old_password');
        const new_password1 = formData.get('new_password1');
        const new_password2 = formData.get('new_password2');
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
                const errorMessage = ((_a = data.old_password) === null || _a === void 0 ? void 0 : _a[0]) || data.error || 'An unknown error occurred.';
                throw new Error(errorMessage);
            }
            // --- Success ---
            // The API returns a new token upon successful password change.
            localStorage.setItem('authToken', data.token);
            resultDiv.innerHTML = `<p class="success">✓ Password changed successfully! Please log in again.</p>`;
            // For security, log the user out and redirect to the login page after a short delay.
            setTimeout(() => {
                localStorage.removeItem('authToken'); // Ensure old session is cleared
                window.location.href = navLinks.authActions.login.href;
            }, 2500);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "An unknown error occurred.";
            resultDiv.innerHTML = `<p class="error">✗ Error: ${message}</p>`;
            submitButton.disabled = false; // Re-enable button on error
        }
    });
});
//# sourceMappingURL=change_password.js.map