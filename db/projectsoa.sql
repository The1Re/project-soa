-- Create database if not exists
CREATE DATABASE IF NOT EXISTS `projectsoa`;
USE `projectsoa`;

-- Create `amulet` table
CREATE TABLE `amulet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `templeName` varchar(255) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Create `orderdetail` table
CREATE TABLE `orderdetail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productId` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Create `productorder` table
CREATE TABLE `productorder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cusId` varchar(255) NOT NULL,
  `totalPrice` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Create `user` table
CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Set AUTO_INCREMENT for tables
ALTER TABLE `amulet` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `orderdetail` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `productorder` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

-- Commit the transaction
COMMIT;
