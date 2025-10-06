<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Dummy credentials for demonstration
    $username = 'user';
    $password = 'password';

    // Get the submitted username and password
    $submittedUsername = $_POST['username'] ?? '';
    $submittedPassword = $_POST['password'] ?? '';

    // Check if the credentials match
    if ($submittedUsername === $username && $submittedPassword === $password) {
        // Start a session and store the username
        $_SESSION['username'] = $submittedUsername;
        header('Location: dashboard.php');
        exit;
    } else {
        $error = 'Invalid username or password';
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <h2>Login</h2>
    <?php if (isset($error)): ?>
        <p style="color: red;"><?php echo $error; ?></p>
    <?php endif; ?>
    <form action="" method="POST">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        <br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <br>
        <button type="submit">Login</button>
    </form>
</body>
</html>