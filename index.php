<?php session_start(); ?>
<header>
    <div class="container">
        <a href="#" class="logo" style="display: flex; align-items: center; gap: 14px;">
            <img src="img/logo.png" alt="Logo" style="height: 60px; width: 60px; object-fit: contain;">
            <span style="font-size: 1.5rem; font-weight: 700; letter-spacing: 1px;">Isarabi.Store</span>
        </a>
        <div class="search-bar">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search">
        </div>
        <nav>
            <ul>
                <li><a href="#" class="active">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Blog</a></li>
            </ul>
        </nav>
        <div class="header-icons">
            <a href="#"><i class="bi bi-heart"></i></a>
            <a href="#"><i class="bi bi-cart-plus"></i></a>
            <?php if (isset($_SESSION['username'])): ?>
                <span style="margin-left:10px;">Hi, <?= htmlspecialchars($_SESSION['username']) ?></span>
                <a href="dashboard.php" style="margin-left:10px;">Dashboard</a>
                <a href="logout.php" style="margin-left:6px;">Logout</a>
            <?php else: ?>
                <a href="login.php" style="margin-left:10px;"><i class="bi bi-person"></i> Login</a>
            <?php endif; ?>
        </div>  
    </div>
</header>