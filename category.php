<?php
session_start();
require_once __DIR__ . "/php/config/db.php";

$cat = isset($_GET["cat"]) ? trim($_GET["cat"]) : "";

/* ✅ categories allowed */
$allowedCats = ["phones", "computers", "gaming", "accessories"];

if ($cat !== "" && !in_array($cat, $allowedCats)) {
    die("❌ Invalid category");
}

/* ✅ Query */
if ($cat === "") {
    $sql = "SELECT * FROM products ORDER BY id DESC";
    $stmt = mysqli_prepare($conn, $sql);
} else {
    $sql = "SELECT * FROM products WHERE category = ? ORDER BY id DESC";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "s", $cat);
}

mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Category - ElectroMarket</title>

  <link rel="stylesheet" href="css/style.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>

<body>

<header>
  <div class="container header-content">

    <!-- Logo -->
    <div class="logo">
      <i class="fa-solid fa-code"></i>
      <span>ElectroMarket</span>
    </div>

    <!-- Navigation -->
    <nav>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="category-item-card.html" class="active">Categories</a></li>
        <li><a href="sell-items.html">Sell Item</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>

    <!-- Cart + Auth -->
    <div class="header-right-buttons">

      <button class="btn btn-outline cart-button" onclick="window.location.href='cart.html'">
        <i class="fa-solid fa-cart-shopping"></i> Cart
        <span class="cart-count" id="cart-count">0</span>
      </button>

      <div class="auth-buttons">
        <!-- ✅ IMPORTANT: use PHP pages not html -->
        <a href="login.php" class="btn btn-outline">
          <i class="fa-solid fa-right-to-bracket"></i> Login
        </a>
        <a href="signup.php" class="btn btn-primary">
          <i class="fa-solid fa-user-plus"></i> Sign Up
        </a>
      </div>

    </div>

  </div>
</header>


<section class="section">
  <div class="container">

    <div class="section-title">
      <h2>
        <?php if($cat === ""): ?>
          All Products
        <?php else: ?>
          Category: <?= htmlspecialchars($cat) ?>
        <?php endif; ?>
      </h2>
      <p>Browse items listed by users</p>
    </div>

    <!-- ✅ Filters -->
    <div class="category-filters" style="margin-bottom: 30px;">
      <a class="filter-btn <?= ($cat==="" ? "active" : "") ?>" href="category.php">
        <i class="fas fa-layer-group"></i> All
      </a>
      <a class="filter-btn <?= ($cat==="phones" ? "active" : "") ?>" href="category.php?cat=phones">
        <i class="fas fa-mobile-alt"></i> Phones
      </a>
      <a class="filter-btn <?= ($cat==="computers" ? "active" : "") ?>" href="category.php?cat=computers">
        <i class="fas fa-laptop"></i> Computers
      </a>
      <a class="filter-btn <?= ($cat==="gaming" ? "active" : "") ?>" href="category.php?cat=gaming">
        <i class="fas fa-gamepad"></i> Gaming
      </a>
      <a class="filter-btn <?= ($cat==="accessories" ? "active" : "") ?>" href="category.php?cat=accessories">
        <i class="fas fa-headphones"></i> Accessories
      </a>
    </div>

    <!-- ✅ Products -->
    <div class="products">

      <?php if(mysqli_num_rows($result) === 0): ?>
        <div style="text-align:center; padding: 50px; width:100%; grid-column: 1/-1;">
          <h3>No products found</h3>
          <p style="color:#64748b;">Try another category or add new products.</p>
        </div>
      <?php else: ?>

        <?php while($row = mysqli_fetch_assoc($result)) { ?>
          <?php
            $img = $row["image_path"];

            /* ✅ IMPORTANT FIX: if DB stores relative path */
            if ($img && strpos($img, "uploads/") === 0) {
              $img = $img;
            }

            /* ✅ if empty image */
            if (!$img) {
              $img = "https://via.placeholder.com/600x400?text=No+Image";
            }
          ?>

          <div class="product-card">
            <div class="product-image">
              <img src="<?= htmlspecialchars($img) ?>" alt="<?= htmlspecialchars($row['name']) ?>">
              <span class="product-badge"><?= htmlspecialchars($row['item_condition']) ?></span>
            </div>

            <div class="product-info">
              <h3><?= htmlspecialchars($row['name']) ?></h3>
              <p><?= htmlspecialchars($row['description']) ?></p>

              <div class="product-price">
                <span class="price">$<?= number_format((float)$row['price'], 2) ?></span>
                <span style="color:#64748b; font-size:0.9rem;"><?= htmlspecialchars($row['category']) ?></span>
              </div>

              <div class="product-actions">
                <button class="btn btn-primary btn-small"
                  onclick="addToCart(
                    '<?= $row['id'] ?>',
                    '<?= addslashes($row['name']) ?>',
                    '<?= $row['price'] ?>',
                    '<?= addslashes($row['image_path']) ?>'
                  )">
                  <i class="fas fa-shopping-cart"></i> Add
                </button>
              </div>
            </div>
          </div>

        <?php } ?>

      <?php endif; ?>

    </div>

  </div>
</section>

<footer>
  <div class="container">
    <div class="copyright">
      <p>&copy; <?= date("Y") ?> ElectroMarket. All rights reserved.</p>
    </div>
  </div>
</footer>

<!-- ✅ Cart JS -->
<script src="js/cart.js"></script>

</body>
</html>
