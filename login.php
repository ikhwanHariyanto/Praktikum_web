<?php
<?php
session_start();

// jika sudah login -> dashboard
if (isset($_SESSION['username'])) {
    header('Location: dashboard.php');
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = trim($_POST['username'] ?? '');
    $pass = trim($_POST['password'] ?? '');

    // contoh autentikasi sederhana
    if ($user === 'admin' && $pass === '123') {
        $_SESSION['username'] = $user;
        header('Location: dashboard.php');
        exit;
    } else {
        $error = 'Username atau password salah';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Login - Isarabi.Store</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<form method="post" style="max-width:360px;margin:60px auto;padding:20px;border:1px solid #ddd;">
    <h2>Login</h2>
    <?php if ($error): ?><div style="color:#c00;"><?=htmlspecialchars($error)?></div><?php endif; ?>
    <label>Username</label>
    <input name="username" type="text" required autofocus>
    <label>Password</label>
    <input name="password" type="password" required>
    <button type="submit">Login</button>
</form>
</body>
</html>