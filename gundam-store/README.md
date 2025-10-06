# Gundam Store Web Application

## Overview
The Gundam Store is a web application designed for fans of Gundam models and merchandise. This application allows users to browse products, manage their shopping cart, and log in to access personalized features.

## Project Structure
```
gundam-store
├── public
│   ├── index.php          # Main entry point for the web application
│   ├── login.php          # User login form
│   ├── js
│   │   ├── scrip.js       # JavaScript for main page interactions
│   │   └── login.js       # JavaScript for handling login functionality
│   └── css
│       └── style.css      # CSS styles for the application
├── src
│   ├── auth.php           # User authentication functions
│   └── db.php             # Database connection and query functions
└── README.md              # Project documentation
```

## Setup Instructions
1. **Clone the Repository**
   ```
   git clone <repository-url>
   cd gundam-store
   ```

2. **Install Dependencies**
   Ensure you have a web server (like Apache or Nginx) and PHP installed. You may also need to set up a database (e.g., MySQL) for user authentication.

3. **Configure Database**
   Update the `src/db.php` file with your database connection details.

4. **Access the Application**
   Open your web browser and navigate to `http://localhost/gundam-store/public/index.php` to view the application.

## Usage Guidelines
- **Login**: Users can log in using the `login.php` page. Enter your username and password to access your account.
- **Product Browsing**: The main page allows users to browse available Gundam products and add them to their cart.
- **Wishlist**: Users can add products to their wishlist for future reference.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.