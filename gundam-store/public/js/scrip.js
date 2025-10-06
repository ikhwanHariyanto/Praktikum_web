document.addEventListener("DOMContentLoaded", () => {
    // Initialize login form functionality
    const loginForm = document.querySelector('#login-form');
    const usernameInput = document.querySelector('#username');
    const passwordInput = document.querySelector('#password');
    const loginButton = document.querySelector('#login-button');
    const notificationArea = document.querySelector('.notification-area');

    // Handle form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (validateForm(username, password)) {
            submitLogin(username, password);
        } else {
            showNotification('Please fill in both fields.', 'warning');
        }
    });

    // Validate form inputs
    function validateForm(username, password) {
        return username !== '' && password !== '';
    }

    // Submit login data to the server
    function submitLogin(username, password) {
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
                showNotification('Login successful! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'public/index.php'; // Redirect to main page
                }, 2000);
            } else {
                showNotification(data.message || 'Login failed. Please try again.', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('An error occurred. Please try again later.', 'error');
        });
    }

    // Show notification messages
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notificationArea.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
});