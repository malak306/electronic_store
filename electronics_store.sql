-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 18, 2026 at 01:49 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `electronics_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `item_condition` varchar(50) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `category`, `price`, `item_condition`, `image_path`, `created_at`) VALUES
(1, 'iPhone 14 Pro', '.knkl', 'phones', 9021.00, 'like-new', 'uploads/products/product_1768686277_2493.jpg', '2026-01-17 21:44:37'),
(2, 'computer', 'nnnnnnnnnnnnnn', 'computers', 2.99, 'new', 'uploads/products/product_1768687920_3045.jpg', '2026-01-17 22:12:00'),
(3, 'hamza', 'very good items', 'phones', 299.00, 'like-new', 'uploads/products/product_1768729616_9473.jpg', '2026-01-18 09:46:56'),
(4, 'home phone', 'very beautiful home phone', 'phones', 10.00, 'new', 'uploads/products/product_1768730367_8694.jpeg', '2026-01-18 09:59:27'),
(5, 'gaming pc', 'powerful', 'gaming', 1000.00, 'like-new', 'uploads/products/product_1768730888_2716.jpg', '2026-01-18 10:08:08'),
(6, 'bse', 'cat zalabia', 'gaming', 30.00, 'good', 'uploads/products/product_1768731439_8192.jpg', '2026-01-18 10:17:19');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`) VALUES
(1, 'malak', 'rafeamalak69@gmail.com', '$2y$10$DHXilyKSh1hTVn33t4psJuBfuz/0nB8S4WfvNq1b3l768rTUl2fSW', '2026-01-16 20:52:14'),
(2, 'dodo', 'm.rafea@luminuslearner.com', '$2y$10$4NsGnhHezZ.UfEbV0rtyxeiF39PSdo2X.AbXccG2E.3exdZwDlNOK', '2026-01-16 21:07:14'),
(3, 'lena', '23038624@student.ltuc.com', '$2y$10$dxHVbOF4MltfFuAD9Q9TWuKmVUCZRGFz15aO8kBiPOy07BZGzEUmy', '2026-01-16 21:28:29'),
(4, 'rere', '11118624@student.ltuc.com', '$2y$10$VcGb59TtpnvV8PgReyk5ROmzn2.YmMNiAQPsQi9/AbBOvRymVEVVq', '2026-01-17 20:47:06'),
(5, 'hamza', 'hamza@gmail.com', '$2y$10$EpHeXT20b45mQ0XEmzzJAOMIgmXz9LjMIH2oyg5BkLO6Z2UKhrX1K', '2026-01-18 09:44:28'),
(6, 'ABDALLAH', 'DDJJGG@GMAIL.COM', '$2y$10$Hk.vs77FpVKpj2XP0c3Ao.CMH4qEXJMK1Ou5piepgvuIdByZgvpVq', '2026-01-18 10:14:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

