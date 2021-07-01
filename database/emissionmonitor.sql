-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 01, 2021 at 07:49 PM
-- Server version: 5.7.21
-- PHP Version: 5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `emissionmonitor`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `token` varchar(100) NOT NULL,
  `dateadded` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`username`, `password`, `name`, `token`, `dateadded`) VALUES
('admin', 'admin@123', 'Administrator', 'dcje0QJDbZwmvJaOsh8UuYysoddeKyXi45RZESCey2XLhtySqSaDr97NpFYN5KD0syx8AQqk93ZFVl9rXenoatf2zKqH9PdVwqbk', '2021-06-28 13:02:16');

-- --------------------------------------------------------

--
-- Table structure for table `fueltype`
--

DROP TABLE IF EXISTS `fueltype`;
CREATE TABLE IF NOT EXISTS `fueltype` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `factor` decimal(3,1) NOT NULL,
  `dateadded` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fueltype`
--

INSERT INTO `fueltype` (`ID`, `name`, `factor`, `dateadded`) VALUES
(1, 'Petrol', '3.0', '2021-06-30 23:28:31'),
(2, 'Diesel', '7.0', '2021-06-30 23:28:31');

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
CREATE TABLE IF NOT EXISTS `session` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `fuel_ID` int(11) NOT NULL,
  `distance` decimal(50,3) NOT NULL,
  `emission_quantity` decimal(50,3) NOT NULL,
  `dateadded` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `username` (`username`),
  KEY `fuel_ID` (`fuel_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `session`
--

INSERT INTO `session` (`ID`, `username`, `fuel_ID`, `distance`, `emission_quantity`, `dateadded`) VALUES
(1, 'petegeorge20005@gmail.com', 1, '1000.000', '600.000', '2021-06-30 23:59:17'),
(2, 'petegeorge20005@gmail.com', 1, '1000.000', '600.000', '2021-07-01 20:41:33'),
(3, 'petegeorge20005@gmail.com', 1, '1000.000', '600.000', '2021-07-01 20:41:37');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `token` varchar(100) NOT NULL,
  `dateadded` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`username`, `password`, `name`, `token`, `dateadded`) VALUES
('petegeorge20005@gmail.com', 'P@$$w0rd', 'Uche', 'b2mcOrZDsbNuywXugrJlEGbyjJ9btiGd7y4amWn5tquvNYdY9SODXYMAtxaDZGJN5GV2iL8WulyPFXfQIcvciCl2yV7isrZmJ09g', '2021-06-28 13:01:53');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
