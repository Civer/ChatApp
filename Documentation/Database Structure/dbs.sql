-- phpMyAdmin SQL Dump
-- version 4.6.6deb4
-- https://www.phpmyadmin.net/
--
-- Host: ############################
-- Generation Time: Sep 18, 2019 at 09:37 AM
-- Server version: 5.7.27-log
-- PHP Version: 7.0.33-0+deb9u3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `##############`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userId` int(11) NOT NULL,
  `loginName` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `mail` varchar(150) NOT NULL,
  `lastLoginDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `creationDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isVerified` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `userSession`
--

CREATE TABLE `userSession` (
  `sessionId` int(11) NOT NULL,
  `sessionKey` varchar(100) NOT NULL,
  `userId` int(11) NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `creationDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastUpdated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `expirationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `verificationToken`
--

CREATE TABLE `verificationToken` (
  `tokenId` int(11) NOT NULL,
  `token` varchar(100) NOT NULL,
  `userId` int(11) NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `creationDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expirationDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `userSession`
--
ALTER TABLE `userSession`
  ADD PRIMARY KEY (`sessionId`);

--
-- Indexes for table `verificationToken`
--
ALTER TABLE `verificationToken`
  ADD PRIMARY KEY (`tokenId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `userSession`
--
ALTER TABLE `userSession`
  MODIFY `sessionId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `verificationToken`
--
ALTER TABLE `verificationToken`
  MODIFY `tokenId` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
