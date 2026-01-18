<?php
$host = "localhost";
$user = "root";
$pass = ""; // ✅ لأننا صفرنا الباسورد
$dbname = "electronics_store";

$conn = mysqli_connect($host, $user, $pass, $dbname);

if (!$conn) {
    die("Database connection failed: " . mysqli_connect_error());
}
?>

<?php
$host = "localhost";
$user = "root";
$pass = ""; // ✅ لأننا صفرنا الباسورد
$dbname = "electronics_store";

$conn = mysqli_connect($host, $user, $pass, $dbname);

if (!$conn) {
    die("Database connection failed: " . mysqli_connect_error());
}
?>
