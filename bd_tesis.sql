-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 10, 2017 at 04:33 AM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bd_tesis`
--

-- --------------------------------------------------------

--
-- Table structure for table `comunaxbarrio`
--

CREATE TABLE `comunaxbarrio` (
  `ID` int(11) NOT NULL,
  `ID_InfoGeneral` int(11) NOT NULL,
  `Comuna` varchar(10) NOT NULL,
  `Barrio` varchar(30) NOT NULL,
  `Actividad` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comunaxbarrio`
--

INSERT INTO `comunaxbarrio` (`ID`, `ID_InfoGeneral`, `Comuna`, `Barrio`, `Actividad`) VALUES
(44, 18, '2', '13', 'Control larvario');

-- --------------------------------------------------------

--
-- Table structure for table `fococdh`
--

CREATE TABLE `fococdh` (
  `Tipo` varchar(30) NOT NULL,
  `Bueno` int(11) NOT NULL,
  `Regular` int(11) NOT NULL,
  `Malo` int(11) NOT NULL,
  `Total` int(11) NOT NULL,
  `EnUso` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Lugar` varchar(30) NOT NULL,
  `IDFoco` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fococdh`
--

INSERT INTO `fococdh` (`Tipo`, `Bueno`, `Regular`, `Malo`, `Total`, `EnUso`, `Cantidad`, `Lugar`, `IDFoco`) VALUES
('Toldillo', 12, 31, 21, 45, 21, 0, '', 43),
('Sumidero', 0, 0, 0, 0, 0, 12, 'fasd', 82),
('Floreros/Plantas en agua', 0, 0, 0, 0, 0, 12, 'dasda', 84),
('Llantas', 0, 0, 0, 0, 0, 451, 'srae', 84),
('Adulto', 12, 31, 2, 45, 0, 0, '', 89);

-- --------------------------------------------------------

--
-- Table structure for table `focoinfeccion`
--

CREATE TABLE `focoinfeccion` (
  `ID` int(11) NOT NULL,
  `Tipo` varchar(30) NOT NULL,
  `Estado` varchar(20) DEFAULT NULL,
  `Larvas` varchar(30) DEFAULT NULL,
  `Pupas` varchar(30) DEFAULT NULL,
  `Habitantes` int(11) DEFAULT NULL,
  `Clave` varchar(20) DEFAULT NULL,
  `tipoDeposito` varchar(30) DEFAULT NULL,
  `TieneAgua` varchar(30) DEFAULT NULL,
  `L` int(11) DEFAULT NULL,
  `P` int(11) DEFAULT NULL,
  `Medidatanque` int(11) DEFAULT NULL,
  `Tratamiento` varchar(30) NOT NULL,
  `Eliminados` int(11) DEFAULT NULL,
  `Tratados` int(11) DEFAULT NULL,
  `Larvicida` double DEFAULT NULL,
  `Insecticida` varchar(30) NOT NULL,
  `Cantidad` int(11) DEFAULT NULL,
  `idInfoGeneral` int(11) NOT NULL,
  `Ubicacion` varchar(40) NOT NULL,
  `Nombre` varchar(30) DEFAULT NULL,
  `Apellido` varchar(30) DEFAULT NULL,
  `Cedula` varchar(30) DEFAULT NULL,
  `RazonSocial` varchar(50) DEFAULT NULL,
  `ObservacionCDH` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `focoinfeccion`
--

INSERT INTO `focoinfeccion` (`ID`, `Tipo`, `Estado`, `Larvas`, `Pupas`, `Habitantes`, `Clave`, `tipoDeposito`, `TieneAgua`, `L`, `P`, `Medidatanque`, `Tratamiento`, `Eliminados`, `Tratados`, `Larvicida`, `Insecticida`, `Cantidad`, `idInfoGeneral`, `Ubicacion`, `Nombre`, `Apellido`, `Cedula`, `RazonSocial`, `ObservacionCDH`) VALUES
(52, 'Vivienda', NULL, NULL, NULL, 0, 'Renuente', '', '', 0, 0, 0, '', 0, 0, 0, '', NULL, 17, '3.42 - -76.52', NULL, NULL, NULL, NULL, NULL),
(53, 'Vivienda', NULL, NULL, NULL, 0, 'Renuente', '', '', 0, 0, 0, '', 0, 0, 0, '', NULL, 12, '3.41 - -76.52', NULL, NULL, NULL, NULL, NULL),
(54, 'Vivienda', NULL, NULL, NULL, 0, 'Renuente', '', '', 0, 0, 0, '', 0, 0, 0, '', NULL, 12, '43.47 - -80.52', NULL, NULL, NULL, NULL, NULL),
(55, 'Sumidero', 'Ninguno', 'Aedex', 'Culex', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'tratado', NULL, NULL, NULL, 'op2', 5, 12, '3.42 - -76.53', NULL, NULL, NULL, NULL, NULL),
(56, 'Vivienda', NULL, NULL, NULL, 0, 'Renuente', '', '', 0, 0, 0, '', 0, 0, 0, '', NULL, 12, '43.47 - -80.52', NULL, NULL, NULL, NULL, NULL),
(57, 'Vivienda', NULL, NULL, NULL, 0, 'Renuente', '', '', 0, 0, 0, '', 0, 0, 0, '', NULL, 12, '43.47 - -80.52', NULL, NULL, NULL, NULL, NULL),
(58, 'Vivienda', NULL, NULL, NULL, 0, 'Renuente', '', '', 0, 0, 0, '', 0, 0, 0, '', NULL, 12, '43.47 - -80.52', NULL, NULL, NULL, NULL, NULL),
(59, 'Vivienda', NULL, NULL, NULL, 0, 'Renuente', '', '', 0, 0, 0, '', 0, 0, 0, '', NULL, 18, '43.47 - -80.52', NULL, NULL, NULL, NULL, NULL),
(60, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 13, '3.42 - -76.53', 'ad', 'ad', 'ad', 'ad', 'aklsnskd'),
(61, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'asda', 'dasd', 'dasda', 'das', 'das'),
(62, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'das', 'dads', 'adas', 'das', ''),
(63, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'dasda', 'sdasd', 'asdasd', 'asdas', ''),
(64, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'das', 'dasda', 'sdasd', 'asdasda', ''),
(65, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'erewrewewr', 'rewerwr', 'erwrewer', 'erwrew', ''),
(66, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'erasas', 'asa', 'weqwdas', 'qewq', ''),
(67, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'qeqw', 'as', 'dasd', 'xcz<a', ''),
(68, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'easd', 'as', 'd123', 'asda', ''),
(69, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'dasd', 'adsda', 'faas', 'asas', ''),
(70, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'adsas', 'dasda', 'sdasd', 'asdas', ''),
(71, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'sadas', 'dasdasd', 'asd', 'asdas', ''),
(72, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'sadasd', 'asdas', 'dasdas', 'das', ''),
(73, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'asdas', 'dasda', 'sdasdas', 'dasda', ''),
(74, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'adsd', 'asd', 'asdasda', 'das', ''),
(75, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', '1231', 'eqwe', 'qewe', 'qweq', ''),
(76, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'dasd', 'asdas', 'dasdas', 'dasda', ''),
(77, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', '231', 'dsasdas', 'dasd', 'asdas', ''),
(78, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'fasda', 'dasd', 'asdas', 'das', ''),
(79, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'dasda', 'sdasd', 'asdas', 'dasda', ''),
(80, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'asddsa', 'dasdas', 'dasdas', 'dasda', ''),
(81, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'sfsdfs', 'dfs', 'sdfa', 'rwq', ''),
(82, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'dsfdas', 'qeswda', 'eqwedasd', 'asd', ''),
(83, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'rewrwe', 'sdfas', 'dasd', 'asdas', ''),
(84, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'fasdas', 'das', 'dasda', 'sdas', ''),
(85, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'fsdf', 'sdfs', 'dfsd', 'fsd', ''),
(86, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'fda', 'sadsd', 'ads', 'ada', ''),
(87, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'fdadsa', 'sdasdas', 'das', 'dasdas', ''),
(88, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'dasda', 'sdas', 'dasda', 'sdasda', ''),
(89, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'dasdas', 'dasdas', 'asdasda', 'dasdas', '');

-- --------------------------------------------------------

--
-- Table structure for table `informaciongeneral`
--

CREATE TABLE `informaciongeneral` (
  `ID` int(11) NOT NULL,
  `ID_Usuario` int(11) NOT NULL,
  `Municipio` varchar(30) NOT NULL,
  `Fecha` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `informaciongeneral`
--

INSERT INTO `informaciongeneral` (`ID`, `ID_Usuario`, `Municipio`, `Fecha`) VALUES
(18, 11, 'Palmira', '09-02-2017');

-- --------------------------------------------------------

--
-- Table structure for table `insecticidas`
--

CREATE TABLE `insecticidas` (
  `Nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `insecticidas`
--

INSERT INTO `insecticidas` (`Nombre`) VALUES
('Op1'),
('Op2');

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `cedula` int(11) NOT NULL,
  `nombres` varchar(20) NOT NULL,
  `apellidos` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`cedula`, `nombres`, `apellidos`, `password`) VALUES
(11, 'us', 'us', '6512bd43d9caa6e02c990b0a82652dca'),
(12, 'Probando', 'Ret', '12'),
(13, 'ab', 'cd', '13'),
(90, 'probando', 'probando', '99'),
(1234, 'a', 'a', '1234'),
(1144031675, 'felipe', 'rojas', '1234');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comunaxbarrio`
--
ALTER TABLE `comunaxbarrio`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `focoinfeccion`
--
ALTER TABLE `focoinfeccion`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `informaciongeneral`
--
ALTER TABLE `informaciongeneral`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`cedula`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comunaxbarrio`
--
ALTER TABLE `comunaxbarrio`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
--
-- AUTO_INCREMENT for table `focoinfeccion`
--
ALTER TABLE `focoinfeccion`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;
--
-- AUTO_INCREMENT for table `informaciongeneral`
--
ALTER TABLE `informaciongeneral`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
