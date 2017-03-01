-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 01, 2017 at 02:22 AM
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
(44, 18, '2', '13', 'Control larvario'),
(45, 19, '3', 'fds', 'Encuesta larvaria'),
(46, 20, '3', '353', 'Control larvario'),
(47, 21, '20', 'fds', 'Encuesta larvaria'),
(48, 22, '21', 'wdefs', 'Encuesta larvaria'),
(49, 23, '2', 'dsadas', 'Control larvario'),
(50, 24, '21', '12', 'Encuesta larvaria');

-- --------------------------------------------------------

--
-- Table structure for table `depositosvivienda`
--

CREATE TABLE `depositosvivienda` (
  `ID` int(11) NOT NULL,
  `deposito` varchar(50) NOT NULL,
  `tieneAgua` varchar(30) NOT NULL,
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

INSERT INTO `depositosvivienda` (`ID`, `deposito`, `tieneAgua`, `P`, `L`, `medidaTanque`, `eliminado`, `tratado`, `larvicida`, `IDFoco`) VALUES
(4, 'Tanques Bajos', 'True', 3, 1, 23, 'False', 'True', 40, 9);

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
('Adulto', 12, 31, 2, 45, 0, 0, '', 89),
('Llantas', 0, 0, 0, 0, 0, 12, 'sda', 91),
('Tanques bajos', 0, 0, 0, 0, 0, 1, 'dasda', 0),
('Llantas', 0, 0, 0, 0, 0, 1, 'ds', 98),
('Adulto', 1, 12, 3, 16, 0, 0, '', 4);

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
  `Insecticida` varchar(30) NOT NULL,
  `Cantidad` int(11) DEFAULT NULL,
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
(1, 'Sumidero', 'Con aceite', '', '', '', NULL, NULL, 'Op1', 120, 24, '43.47 - -80.52', NULL, NULL, NULL, NULL, NULL, 0),
(2, 'Vivienda', NULL, '', NULL, NULL, 2, 'Negativa', '', NULL, 24, '43.47 - -80.52', NULL, NULL, NULL, NULL, NULL, 0),
(3, 'Sumidero', 'Ninguno', '', 'Aedex', 'Culex', NULL, NULL, 'Op2', 90, 24, '43.47 - -80.52', NULL, NULL, NULL, NULL, NULL, 0),
(4, 'CDH', NULL, '', NULL, NULL, NULL, NULL, '', NULL, 24, '43.47 - -80.52', 'ABcd', '19028', 'saqdas', 'ASKDNJANSK', 'adsdas', 34),
(5, 'Sumidero', 'Con aceite', 'Tratado sin inspeccionar', '', '', NULL, NULL, 'Op1', 321, 24, '43.47 - -80.52', NULL, NULL, NULL, NULL, NULL, 0),
(6, 'Vivienda', NULL, '', NULL, NULL, 1, 'Cerrada', '', NULL, 24, 'No se', 'Yo', 'Tu', '1231231', NULL, NULL, 0),
(7, 'Vivienda', NULL, '', NULL, NULL, 0, 'Renuente', '', NULL, 24, '43.47 - -80.52', '', '', '', NULL, NULL, 0),
(8, 'Vivienda', NULL, '', NULL, NULL, 0, 'Renuente', '', NULL, 24, '43.47 - -80.52', '', '', '', NULL, NULL, 0),
(9, 'Vivienda', NULL, '', NULL, NULL, 12, 'Positiva', '', NULL, 24, '43.47 - -80.52', 'Pedro', 'Perez', '109237', NULL, NULL, 0);

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
(18, 11, 'Palmira', '09-02-2017'),
(19, 11, 'Palmira', '11-02-2017'),
(20, 11, 'Palmira', '20-02-2017'),
(21, 11, 'Cali', '21-02-2017'),
(22, 11, 'Cali', '25-02-2017'),
(23, 11, 'Palmira', '27-02-2017'),
(24, 11, 'Cali', '28-02-2017');

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
  `password` varchar(255) NOT NULL,
  `rolUsuario` varchar(30) NOT NULL,
  `IDSupervisor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`cedula`, `nombres`, `apellidos`, `password`, `rolUsuario`, `IDSupervisor`) VALUES
(1, 'adsa', 'dasda', '6512bd43d9caa6e02c990b0a82652dca', 'false', 0),
(11, 'us', 'us', '6512bd43d9caa6e02c990b0a82652dca', 'true', NULL),
(12, 'Probando', 'Ret', '12', '', 0),
(13, 'ab', 'cd', '13', '', 0),
(90, 'probando', 'probando', '99', '', 0),
(98, 'Pedro', 'Perez', '6512bd43d9caa6e02c990b0a82652dca', 'true', 0),
(111, '11', '111', '698d51a19d8a121ce581499d7b701668', 'false', 0),
(119, 'peter', 'anguila', '6512bd43d9caa6e02c990b0a82652dca', 'true', 11),
(1234, 'a', 'a', '1234', '', 11),
(81900, '91782', '9as', '6512bd43d9caa6e02c990b0a82652dca', 'false', 11),
(90181, 'Debe Ir', 'Con Null', '81dc9bdb52d04dc20036dbd8313ed055', 'false', 0),
(120981, 'Poto', 'Pato', '827ccb0eea8a706c4c34a16891f84e7b', 'false', 0),
(132987, 'Aaay Pa2', 'Carajito', '9996535e07258a7bbfd8b132435c5962', 'false', 0),
(231312, 'dasd', 'asdas12', '7b354881033eaad8e420662a1e3ce30e', 'false', 0),
(1283791, 'Poto', 'Pito', '827ccb0eea8a706c4c34a16891f84e7b', 'false', 0),
(12345678, 'Wiily', 'Rex', '827ccb0eea8a706c4c34a16891f84e7b', 'false', 0),
(12837912, 'Pata', 'Pita', '827ccb0eea8a706c4c34a16891f84e7b', 'false', 0),
(90871296, 'sdas', 'das', '6512bd43d9caa6e02c990b0a82652dca', 'false', 0),
(192083109, 'Ayy Pa', 'Null', '827ccb0eea8a706c4c34a16891f84e7b', 'false', 0),
(1144031675, 'felipe', 'rojas', '1234', '', 0),
(1290378129, 'Papa', 'Pepe', 'e10adc3949ba59abbe56e057f20f883e', 'false', 0),
(1878985612, 'Probando', 'Registro', '81dc9bdb52d04dc20036dbd8313ed055', 'false', 0);

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
--
-- AUTO_INCREMENT for table `depositosvivienda`
--
ALTER TABLE `depositosvivienda`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `focoinfeccion`
--
ALTER TABLE `focoinfeccion`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `informaciongeneral`
--
ALTER TABLE `informaciongeneral`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
