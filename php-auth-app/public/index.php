<?php
// public/index.php

// Include the session management functions
require_once '../src/auth/session.php';

// Start the session
session_start();

// Check if the user is already logged in
if (isset($_SESSION['username'])) {
    // Redirect to the dashboard if logged in
    header('Location: ../src/dashboard.php');
    exit();
}

// Redirect to the login page if not logged in
header('Location: ../src/login.php');
exit();
?>