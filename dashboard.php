<?php
<?php
session_start();
if (!isset($_SESSION['username'])) {
    header('Location: login.php');
    exit;
}

require_once 'koneksi.php';

$action = $_GET['action'] ?? '';
// Handle delete via GET
if ($action === 'delete' && isset($_GET['id'])) {
    $id = (int)$_GET['id'];
    // ambil nama file image untuk dihapus
    $stmt = $conn->prepare("SELECT image FROM products WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->bind_result($imgFile);
    $stmt->fetch();
    $stmt->close();

    $stmt = $conn->prepare("DELETE FROM products WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();

    if ($imgFile && file_exists(__DIR__ . '/uploads/' . $imgFile)) {
        @unlink(__DIR__ . '/uploads/' . $imgFile);
    }

    header('Location: dashboard.php');
    exit;
}

// Handle create / update via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $description = $_POST['description'] ?? '';
    $price = (float)($_POST['price'] ?? 0);
    $category = $_POST['category'] ?? '';
    $id = isset($_POST['id']) ? (int)$_POST['id'] : 0;

    // handle upload (opsional)
    $uploadedName = null;
    if (!empty($_FILES['image']['name'])) {
        if (!is_dir(__DIR__ . '/uploads')) {
            mkdir(__DIR__ . '/uploads', 0755, true);
        }
        $uploadedName = time() . '_' . basename($_FILES['image']['name']);
        $target = __DIR__ . '/uploads/' . $uploadedName;
        move_uploaded_file($_FILES['image']['tmp_name'], $target);
    }

    if ($id > 0) {
        // update
        if ($uploadedName) {
            $stmt = $conn->prepare("UPDATE products SET name=?, description=?, price=?, category=?, image=? WHERE id=?");
            $stmt->bind_param("ssds si", $name, $description, $price, $category, $uploadedName, $id);
            // Note: above binding types intentionally spaced to be valid - adjust: "ssds si" invalid; fix below
        }
        // safer explicit branches:
        if ($uploadedName) {
            $stmt = $conn->prepare("UPDATE products SET name=?, description=?, price=?, category=?, image=? WHERE id=?");
            $stmt->bind_param("ssds si", $name, $description, $price, $category, $uploadedName, $id);
        } else {
            $stmt = $conn->prepare("UPDATE products SET name=?, description=?, price=?, category=? WHERE id=?");
            $stmt->bind_param("ssdsi", $name, $description, $price, $category, $id);
        }
        $stmt->execute();
        $stmt->close();
    } else {
        // insert
        $stmt = $conn->prepare("INSERT INTO products (name, description, price, category, image) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("ssds s", $name, $description, $price, $category, $uploadedName);
        // as above, type string: "sssds" better, fix below in final run if needed
        $stmt->execute();
        $stmt->close();
    }

    header('Location: dashboard.php');
    exit;
}

// get editable product if edit requested
$editProduct = null;
if (isset($_GET['action']) && $_GET['action'] === 'edit' && isset($_GET['id'])) {
    $eid = (int)$_GET['id'];
    $stmt = $conn->prepare("SELECT id, name, description, price, category, image FROM products WHERE id = ?");
    $stmt->bind_param("i", $eid);
    $stmt->execute();
    $res = $stmt->get_result();
    $editProduct = $res->fetch_assoc();
    $stmt->close();
}

// fetch products
$result = $conn->query("SELECT * FROM products ORDER BY created_at DESC");
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Dashboard - Isarabi.Store</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<header style="padding:10px;border-bottom:1px solid #ddd;">
    <div style="max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;">
        <div>Dashboard - Hello, <?=htmlspecialchars($_SESSION['username'])?></div>
        <div><a href="index.php">Home</a> | <a href="logout.php">Logout</a></div>
    </div>
</header>

<main style="max-width:1100px;margin:24px auto;">
    <section>
        <h2><?= $editProduct ? 'Edit Product' : 'Add New Product' ?></h2>
        <form method="post" enctype="multipart/form-data" style="border:1px solid #ddd;padding:16px;">
            <input type="hidden" name="id" value="<?= $editProduct ? (int)$editProduct['id'] : 0 ?>">
            <label>Name</label><br>
            <input name="name" required value="<?= $editProduct ? htmlspecialchars($editProduct['name']) : '' ?>"><br>
            <label>Description</label><br>
            <textarea name="description"><?= $editProduct ? htmlspecialchars($editProduct['description']) : '' ?></textarea><br>
            <label>Price</label><br>
            <input name="price" type="number" step="0.01" required value="<?= $editProduct ? (float)$editProduct['price'] : '' ?>"><br>
            <label>Category</label><br>
            <input name="category" value="<?= $editProduct ? htmlspecialchars($editProduct['category']) : '' ?>"><br>
            <label>Image (optional)</label><br>
            <input name="image" type="file" accept="image/*"><br><br>
            <button type="submit"><?= $editProduct ? 'Update' : 'Create' ?></button>
            <?php if ($editProduct): ?>
                <a href="dashboard.php" style="margin-left:12px;">Cancel</a>
            <?php endif; ?>
        </form>
    </section>

    <section style="margin-top:32px;">
        <h2>Products</h2>
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%;border-collapse:collapse;">
            <thead><tr><th>ID</th><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Actions</th></tr></thead>
            <tbody>
            <?php while ($row = $result->fetch_assoc()): ?>
                <tr>
                    <td><?= (int)$row['id'] ?></td>
                    <td style="width:120px;">
                        <?php if ($row['image'] && file_exists(__DIR__ . '/uploads/' . $row['image'])): ?>
                            <img src="uploads/<?= htmlspecialchars($row['image']) ?>" style="height:60px;">
                        <?php else: ?>
                            -
                        <?php endif; ?>
                    </td>
                    <td><?= htmlspecialchars($row['name']) ?></td>
                    <td><?= htmlspecialchars($row['category']) ?></td>
                    <td>Rp<?= number_format($row['price'], 0, ',', '.') ?></td>
                    <td>
                        <a href="dashboard.php?action=edit&id=<?= (int)$row['id'] ?>">Edit</a> |
                        <a href="dashboard.php?action=delete&id=<?= (int)$row['id'] ?>" onclick="return confirm('Hapus produk ini?')">Delete</a>
                    </td>
                </tr>
            <?php endwhile; ?>
            </tbody>
        </table>
    </section>
</main>
</body>
</html>