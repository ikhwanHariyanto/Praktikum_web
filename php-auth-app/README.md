# PHP Authentication Application

This project is a simple PHP authentication application that demonstrates user login, session management, and logout functionality. It consists of several key components that work together to provide a basic authentication system.

## Project Structure

```
php-auth-app
├── src
│   ├── login.php        # Login form for user authentication
│   ├── dashboard.php    # User dashboard, accessible only when logged in
│   ├── logout.php       # Handles user logout and session destruction
│   └── auth
│       └── session.php  # Manages session-related functions
├── public
│   └── index.php        # Entry point for the application
├── README.md            # Project documentation
```

## Setup Instructions

1. **Clone the Repository**: 
   Clone this repository to your local machine using:
   ```
   git clone <repository-url>
   ```

2. **Navigate to the Project Directory**:
   ```
   cd php-auth-app
   ```

3. **Configure Your Web Server**:
   Ensure your web server (e.g., Apache, Nginx) is configured to serve the `public` directory as the document root.

4. **Access the Application**:
   Open your web browser and navigate to `http://localhost/index.php` to access the application.

## Usage

- **Login**: 
  - Navigate to the login page and enter your username and password.
  - Upon successful login, you will be redirected to the dashboard.

- **Dashboard**: 
  - The dashboard displays a welcome message and is only accessible to logged-in users.
  - If you are not logged in, you will be redirected to the login page.

- **Logout**: 
  - Click the logout link to end your session and return to the login page.

## Features

- Simple user authentication using PHP sessions.
- Session management to keep track of logged-in users.
- Redirects to ensure users cannot access protected pages without logging in.

## License

This project is open-source and available under the MIT License.