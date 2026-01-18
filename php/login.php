<?php
session_start();
require_once "config/db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: ../login.html");
    exit();
}

$usernameOrEmail = trim($_POST["username"] ?? "");
$password = $_POST["password"] ?? "";

if ($usernameOrEmail === "" || $password === "") {
    die("❌ Please fill all fields. <a href='../login.html'>Back</a>");
}

$sql = "SELECT * FROM users WHERE username=? OR email=? LIMIT 1";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "ss", $usernameOrEmail, $usernameOrEmail);
mysqli_stmt_execute($stmt);
$res = mysqli_stmt_get_result($stmt);

if (mysqli_num_rows($res) === 0) {
    die("❌ Denied! User not found. <a href='../login.html'>Back</a>");
}

$user = mysqli_fetch_assoc($res);

if (!password_verify($password, $user["password"])) {
    die("❌ Denied! Wrong password. <a href='../login.html'>Back</a>");
}

// success
$_SESSION["user"] = [
    "id" => $user["id"],
    "username" => $user["username"],
    "email" => $user["email"]
];

header("Location: ../index.html");
exit();
?>
