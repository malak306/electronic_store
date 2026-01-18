<?php
$host = "db";
$user = "appuser";
$pass = "apppass";
$dbname = "electronics_store";

$conn = mysqli_connect($host, $user, $pass, $dbname);

if (!$conn) {
    die("Database connection failed: " . mysqli_connect_error());
}
?>
