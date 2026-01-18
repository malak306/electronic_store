<?php
session_start();
require_once __DIR__ . "/config/db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: ../sell-items.html");
    exit();
}

$name        = trim($_POST["product_name"] ?? "");
$description = trim($_POST["product_description"] ?? "");
$category    = trim($_POST["category"] ?? "");
$price       = floatval($_POST["price"] ?? 0);
$condition   = trim($_POST["product_condition"] ?? "");

/* ✅ Validate fields */
if ($name === "" || $description === "" || $category === "" || $price <= 0 || $condition === "") {
    die("❌ Please fill all fields. <a href='../sell-items.html'>Back</a>");
}

/* ✅ Upload validation */
if (!isset($_FILES["product_image"]) || $_FILES["product_image"]["error"] !== 0) {
    die("❌ Please upload an image. <a href='../sell-items.html'>Back</a>");
}

/* ✅ project root */
$projectRoot = realpath(__DIR__ . "/..");
if (!$projectRoot) {
    die("❌ Project root not found.");
}

/* ✅ Upload folders */
$uploadBase = $projectRoot . DIRECTORY_SEPARATOR . "uploads";
$uploadDir  = $uploadBase . DIRECTORY_SEPARATOR . "products";
$publicPath = "uploads/products/";

/* ✅ If uploads exists but not folder */
if (file_exists($uploadBase) && !is_dir($uploadBase)) {
    die("❌ ERROR: '$uploadBase' exists but it's NOT a folder. Delete/rename it manually.");
}
if (file_exists($uploadDir) && !is_dir($uploadDir)) {
    die("❌ ERROR: '$uploadDir' exists but it's NOT a folder. Delete/rename it manually.");
}

/* ✅ Create folders safely */
if (!is_dir($uploadBase)) {
    if (!mkdir($uploadBase, 0777, true)) {
        die("❌ Failed to create uploads folder. Check permissions.");
    }
}

if (!is_dir($uploadDir)) {
    if (!mkdir($uploadDir, 0777, true)) {
        die("❌ Failed to create products folder: $uploadDir");
    }
}

/* ✅ Allowed image types */
$ext = strtolower(pathinfo($_FILES["product_image"]["name"], PATHINFO_EXTENSION));
$allowed = ["jpg", "jpeg", "png", "webp"];

if (!in_array($ext, $allowed)) {
    die("❌ Allowed image types: JPG, JPEG, PNG, WEBP. <a href='../sell-items.html'>Back</a>");
}

/* ✅ Create image name */
$imageName = "product_" . time() . "_" . rand(1000, 9999) . "." . $ext;
$fullPath  = $uploadDir . DIRECTORY_SEPARATOR . $imageName;

/* ✅ Move uploaded file */
if (!move_uploaded_file($_FILES["product_image"]["tmp_name"], $fullPath)) {
    die("❌ Failed to upload image. <a href='../sell-items.html'>Back</a>");
}

/* ✅ Save in database */
$image_path = $publicPath . $imageName;

$sql = "INSERT INTO products (name, description, category, price, item_condition, image_path)
        VALUES (?, ?, ?, ?, ?, ?)";

$stmt = mysqli_prepare($conn, $sql);
if (!$stmt) {
    die("❌ Prepare failed: " . mysqli_error($conn));
}

/* ✅ FIXED HERE: price must be (d) not (i) */
mysqli_stmt_bind_param($stmt, "sssdss", $name, $description, $category, $price, $condition, $image_path);

if (mysqli_stmt_execute($stmt)) {
    header("Location: ../sell-items.html?success=1");
    exit();
} else {
    die("❌ DB Error: " . mysqli_error($conn));
}
?>
