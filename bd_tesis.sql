-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 01, 2017 at 01:51 AM
-- Server version: 10.1.22-MariaDB
-- PHP Version: 7.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
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
(66, 39, '7', '', 'Encuesta larvaria'),
(67, 40, '4', '', 'Encuesta larvaria'),
(68, 41, '5', '', 'Encuesta larvaria'),
(77, 49, '17', '', 'Encuesta larvaria');

-- --------------------------------------------------------

--
-- Table structure for table `depositosvivienda`
--

CREATE TABLE `depositosvivienda` (
  `ID` int(11) NOT NULL,
  `deposito` varchar(50) NOT NULL,
  `tieneAgua` varchar(30) NOT NULL,
  `I` int(11) NOT NULL DEFAULT '0',
  `P` int(11) NOT NULL DEFAULT '0',
  `L` int(11) NOT NULL DEFAULT '0',
  `medidaTanque` int(11) NOT NULL DEFAULT '0',
  `eliminado` varchar(30) NOT NULL,
  `tratado` varchar(30) NOT NULL,
  `larvicida` int(11) NOT NULL DEFAULT '0',
  `IDFoco` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `depositosvivienda`
--

INSERT INTO `depositosvivienda` (`ID`, `deposito`, `tieneAgua`, `I`, `P`, `L`, `medidaTanque`, `eliminado`, `tratado`, `larvicida`, `IDFoco`) VALUES
(8, 'Llantas', 'True', 0, 5, 4, 0, 'False', '', 10, 342),
(9, 'Botellas', 'True', 0, 1, 3, 0, 'False', '', 14, 342),
(10, 'Criaderos naturales', 'True', 0, 2, 5, 0, 'False', '', 16, 346);

-- --------------------------------------------------------

--
-- Table structure for table `fococdh`
--

CREATE TABLE `fococdh` (
  `ID` int(11) NOT NULL,
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

-- --------------------------------------------------------

--
-- Table structure for table `focoinfeccion`
--

CREATE TABLE `focoinfeccion` (
  `ID` int(11) NOT NULL,
  `Tipo` varchar(30) NOT NULL,
  `Estado` varchar(20) DEFAULT NULL,
  `Tratamiento` varchar(30) NOT NULL,
  `Larvas` varchar(30) DEFAULT NULL,
  `Pupas` varchar(30) DEFAULT NULL,
  `Habitantes` int(11) DEFAULT NULL,
  `Clave` varchar(20) DEFAULT NULL,
  `Insecticida` varchar(30) DEFAULT NULL,
  `Cantidad` int(11) DEFAULT '0',
  `idInfoGeneral` int(11) NOT NULL,
  `Ubicacion` varchar(40) NOT NULL,
  `Nombre` varchar(30) DEFAULT NULL,
  `Apellido` varchar(30) DEFAULT NULL,
  `Cedula` varchar(30) DEFAULT NULL,
  `RazonSocial` varchar(50) DEFAULT NULL,
  `ObservacionCDH` varchar(255) DEFAULT NULL,
  `plazo` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `focoinfeccion`
--

INSERT INTO `focoinfeccion` (`ID`, `Tipo`, `Estado`, `Tratamiento`, `Larvas`, `Pupas`, `Habitantes`, `Clave`, `Insecticida`, `Cantidad`, `idInfoGeneral`, `Ubicacion`, `Nombre`, `Apellido`, `Cedula`, `RazonSocial`, `ObservacionCDH`, `plazo`) VALUES
(338, 'Sumidero', 'Ninguno', 'Tratado', 'Aedex', '', NULL, NULL, 'Insecticida 1', 10, 40, '3.3868734,-76.54275319999999', NULL, NULL, NULL, NULL, NULL, 0),
(339, 'Sumidero', 'Ninguno', 'Tratado', 'Culex', '', NULL, NULL, 'Insecticida 1', 5, 40, '3.3868734,-76.54275319999999', NULL, NULL, NULL, NULL, NULL, 0),
(340, 'Sumidero', 'Seco', '', '', '', NULL, NULL, NULL, 0, 40, '3.3869042000000005,-76.5427508', NULL, NULL, NULL, NULL, NULL, 0),
(341, 'Sumidero', 'Ninguno', 'Tratado', 'Aedex', 'Mixto', NULL, NULL, 'Insecticida 1', 8, 40, '3.3869042000000005,-76.5427508', NULL, NULL, NULL, NULL, NULL, 0),
(342, 'Vivienda', NULL, '', NULL, NULL, 1, 'Positiva', NULL, NULL, 40, '3.3868558,-76.5426976', 'aaa', 'aaa', '11223344', NULL, NULL, 0),
(343, 'Vivienda', NULL, '', NULL, NULL, 0, 'Cerrada', NULL, NULL, 40, '3.3870622999999997,-76.54281950000001', '', '', '', NULL, NULL, 0),
(344, 'Vivienda', NULL, '', NULL, NULL, 0, 'Renuente', NULL, NULL, 41, '3.536851322771849,-76.31100498139858', '', '', '', NULL, NULL, 0),
(345, 'Sumidero', 'Ninguno', 'Tratado', 'Aedex', 'Culex', NULL, NULL, 'Insecticida 1', 5, 41, '3.544432839749819,-76.31397888064384', NULL, NULL, NULL, NULL, NULL, 0),
(346, 'Vivienda', NULL, '', NULL, NULL, 2, 'Positiva', NULL, NULL, 41, '3.5293125777405434,-76.30256339907646', 'bbb', 'bbb', '223311', NULL, NULL, 0),
(383, 'Sumidero', 'Seco', '', '', '', NULL, NULL, NULL, 0, 49, '3.387478679494333,-76.54059737920761', NULL, NULL, NULL, NULL, NULL, 0);

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
(39, 1144031675, 'Cali', '13-04-2017'),
(40, 12345678, 'Cali', '13-04-2017'),
(41, 14232456, 'Palmira', '13-04-2017'),
(49, 1144031675, 'Cali', '30-05-2017');

-- --------------------------------------------------------

--
-- Table structure for table `insecticidas`
--

CREATE TABLE `insecticidas` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(30) NOT NULL,
  `Usuario_Ingresado` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `insecticidas`
--

INSERT INTO `insecticidas` (`ID`, `Nombre`, `Usuario_Ingresado`) VALUES
(8, 'Insecticida 1', '1144031675');

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `cedula` int(11) NOT NULL,
  `nombres` varchar(20) NOT NULL,
  `apellidos` varchar(20) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rolUsuario` varchar(30) NOT NULL,
  `IDSupervisor` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`cedula`, `nombres`, `apellidos`, `correo`, `password`, `rolUsuario`, `IDSupervisor`) VALUES
(1234, 'prueba', 'prueba', 'prueba', 'c893bad68927b457dbed39460e6afd62', 'false', 0),
(12345678, 'Jhon', 'Doe', 'prueba@prueba.com', '4c25b32a72699ed712dfa80df77fc582', 'false', 0),
(14232456, 'Bruce', 'Wayne', 'batman@batman.com', 'e8315caa4eb8c2a2625d4e97dbba100a', 'false', 1144031675),
(31121343, 'Barry', 'Allen', 'flash@flash.com', 'f9d900b378f3389d07fd328278715788', 'false', 0),
(1144031121, 'Clark', 'Kent', 'superman@superman.com', '4019a6a75a58f96cfb6a73a883c2f5ba', 'false', 0),
(1144031675, 'Felipe', 'Rojas', 'feliperojas12@hotmail.com', '9facbf452def2d7efc5b5c48cdb837fa', 'true', 0),
(1144072122, 'Camila', 'Polanco', 'mariac1594@hotmail.com', '263bce650e68ab4e23f28263760b9fa5', 'false', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comunaxbarrio`
--
ALTER TABLE `comunaxbarrio`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `depositosvivienda`
--
ALTER TABLE `depositosvivienda`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `fococdh`
--
ALTER TABLE `fococdh`
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
-- Indexes for table `insecticidas`
--
ALTER TABLE `insecticidas`
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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;
--
-- AUTO_INCREMENT for table `depositosvivienda`
--
ALTER TABLE `depositosvivienda`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `fococdh`
--
ALTER TABLE `fococdh`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `focoinfeccion`
--
ALTER TABLE `focoinfeccion`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=384;
--
-- AUTO_INCREMENT for table `informaciongeneral`
--
ALTER TABLE `informaciongeneral`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;
--
-- AUTO_INCREMENT for table `insecticidas`
--
ALTER TABLE `insecticidas`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
