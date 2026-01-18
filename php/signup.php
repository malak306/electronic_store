<?php
session_start();
require_once "config/db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: ../signup.html");
    exit();
}

$username = trim($_POST["username"] ?? "");
$email    = trim($_POST["email"] ?? "");
$password = $_POST["password"] ?? "";
$confirm_password = $_POST["confirm_password"] ?? "";

// validations
if (strlen($username) < 3) {
    die("❌ Username must be at least 3 characters. <a href='../signup.html'>Back</a>");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("❌ Invalid email. <a href='../signup.html'>Back</a>");
}

if (strlen($password) < 6) {
    die("❌ Password must be at least 6 characters. <a href='../signup.html'>Back</a>");
}

if ($password !== $confirm_password) {
    die("❌ Passwords do not match. <a href='../signup.html'>Back</a>");
}

// check if username/email exists
$sql = "SELECT id FROM users WHERE username=? OR email=? LIMIT 1";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "ss", $username, $email);
mysqli_stmt_execute($stmt);
$res = mysqli_stmt_get_result($stmt);

if (mysqli_num_rows($res) > 0) {
    die("❌ Username or Email already exists. <a href='../signup.html'>Back</a>");
}

// hash password
$hashed = password_hash($password, PASSWORD_DEFAULT);

// insert
$insert = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
$stmt2 = mysqli_prepare($conn, $insert);
mysqli_stmt_bind_param($stmt2, "sss", $username, $email, $hashed);

if (mysqli_stmt_execute($stmt2)) {
    $_SESSION["user"] = [
        "id" => mysqli_insert_id($conn),
        "username" => $username,
        "email" => $email
    ];

    header("Location: ../index.html");
    exit();
} else {
    die("❌ Error: " . mysqli_error($conn));
}
?>
