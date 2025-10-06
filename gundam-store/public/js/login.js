document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector('#loginForm');
    const usernameInput = document.querySelector('#username');
    const passwordInput = document.querySelector('#password');
    const errorMessage = document.querySelector('#error-message');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        errorMessage.textContent = '';

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === '' || password === '') {
            errorMessage.textContent = 'Please fill in both fields.';
            return;
        }

        // Simulate an AJAX request to the server for authentication
        fetch('src/auth.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = 'public/index.php'; // Redirect to main page on success
            } else {
                errorMessage.textContent = data.message || 'Login failed. Please try again.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            errorMessage.textContent = 'An error occurred. Please try again later.';
        });
    });
});