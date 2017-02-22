-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 22, 2017 at 04:17 AM
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
(47, 21, '20', 'fds', 'Encuesta larvaria');

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
('Llantas', 0, 0, 0, 0, 0, 1, 'ds', 98);

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
  `ObservacionCDH` varchar(255) DEFAULT NULL,
  `plazo` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `focoinfeccion`
--

INSERT INTO `focoinfeccion` (`ID`, `Tipo`, `Estado`, `Larvas`, `Pupas`, `Habitantes`, `Clave`, `tipoDeposito`, `TieneAgua`, `L`, `P`, `Medidatanque`, `Tratamiento`, `Eliminados`, `Tratados`, `Larvicida`, `Insecticida`, `Cantidad`, `idInfoGeneral`, `Ubicacion`, `Nombre`, `Apellido`, `Cedula`, `RazonSocial`, `ObservacionCDH`, `plazo`) VALUES
(52, 'Vivienda', NULL, NULL, NULL, 0, 'Renuente', '', '', 0, 0, 0, '', 0, 0, 0, '', NULL, 17, '3.42 - -76.52', NULL, NULL, NULL, NULL, NULL, 0),
(53, 'Vivienda', NULL, NULL, NULL, 0, 'Renuente', '', '', 0, 0, 0, '', 0, 0, 0, '', NULL, 12, '3.41 - -76.52', NULL, NULL, NULL, NULL, NULL, 0),
(54, 'Vivienda', NULL, NULL, NULL, 0, 'Renuente', '', '', 0, 0, 0, '', 0, 0, 0, '', NULL, 12, '43.47 - -80.52', NULL, NULL, NULL, NULL, NULL, 0),
(55, 'Sumidero', 'Ninguno', 'Aedex', 'Culex', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'tratado', NULL, NULL, NULL, 'op2', 5, 12, '3.42 - -76.53', NULL, NULL, NULL, NULL, NULL, 0),
(56, 'Vivienda', NULL, NULL, NULL, 0, 'Renuente', '', '', 0, 0, 0, '', 0, 0, 0, '', NULL, 12, '43.47 - -80.52', NULL, NULL, NULL, NULL, NULL, 0),
(57, 'Vivienda', NULL, NULL, NULL, 0, 'Renuente', '', '', 0, 0, 0, '', 0, 0, 0, '', NULL, 12, '43.47 - -80.52', NULL, NULL, NULL, NULL, NULL, 0),
(58, 'Vivienda', NULL, NULL, NULL, 0, 'Renuente', '', '', 0, 0, 0, '', 0, 0, 0, '', NULL, 12, '43.47 - -80.52', NULL, NULL, NULL, NULL, NULL, 0),
(59, 'Vivienda', NULL, NULL, NULL, 0, 'Renuente', '', '', 0, 0, 0, '', 0, 0, 0, '', NULL, 18, '43.47 - -80.52', NULL, NULL, NULL, NULL, NULL, 0),
(60, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 13, '3.42 - -76.53', 'ad', 'ad', 'ad', 'ad', 'aklsnskd', 0),
(61, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'asda', 'dasd', 'dasda', 'das', 'das', 0),
(62, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'das', 'dads', 'adas', 'das', '', 0),
(63, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'dasda', 'sdasd', 'asdasd', 'asdas', '', 0),
(64, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'das', 'dasda', 'sdasd', 'asdasda', '', 0),
(65, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'erewrewewr', 'rewerwr', 'erwrewer', 'erwrew', '', 0),
(66, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'erasas', 'asa', 'weqwdas', 'qewq', '', 0),
(67, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'qeqw', 'as', 'dasd', 'xcz<a', '', 0),
(68, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'easd', 'as', 'd123', 'asda', '', 0),
(69, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'dasd', 'adsda', 'faas', 'asas', '', 0),
(70, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'adsas', 'dasda', 'sdasd', 'asdas', '', 0),
(71, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'sadas', 'dasdasd', 'asd', 'asdas', '', 0),
(72, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'sadasd', 'asdas', 'dasdas', 'das', '', 0),
(73, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'asdas', 'dasda', 'sdasdas', 'dasda', '', 0),
(74, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'adsd', 'asd', 'asdasda', 'das', '', 0),
(75, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', '1231', 'eqwe', 'qewe', 'qweq', '', 0),
(76, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'dasd', 'asdas', 'dasdas', 'dasda', '', 0),
(77, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', '231', 'dsasdas', 'dasd', 'asdas', '', 0),
(78, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'fasda', 'dasd', 'asdas', 'das', '', 0),
(79, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'dasda', 'sdasd', 'asdas', 'dasda', '', 0),
(80, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'asddsa', 'dasdas', 'dasdas', 'dasda', '', 0),
(81, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'sfsdfs', 'dfs', 'sdfa', 'rwq', '', 0),
(82, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'dsfdas', 'qeswda', 'eqwedasd', 'asd', '', 0),
(83, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'rewrwe', 'sdfas', 'dasd', 'asdas', '', 0),
(84, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'fasdas', 'das', 'dasda', 'sdas', '', 0),
(85, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'fsdf', 'sdfs', 'dfsd', 'fsd', '', 0),
(86, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'fda', 'sadsd', 'ads', 'ada', '', 0),
(87, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'fdadsa', 'sdasdas', 'das', 'dasdas', '', 0),
(88, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'dasda', 'sdas', 'dasda', 'sdasda', '', 0),
(89, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 18, '43.47 - -80.52', 'dasdas', 'dasdas', 'asdasda', 'dasdas', '', 0),
(90, 'Sumidero', 'Ninguno', 'Mixto', 'Sin Larvas', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tratado sin inspeccionar', NULL, NULL, NULL, 'op3', 34, 19, '3.43 - -76.52', NULL, NULL, NULL, NULL, NULL, 0),
(91, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 19, '43.47 - -80.52', 'adsa', 'sdasd', 'asdas', 'das', '', 0),
(92, 'Vivienda', NULL, NULL, NULL, 0, 'Renuente', '', '', 0, 0, 0, '', 0, 0, 0, '', NULL, 19, '43.47 - -80.52', NULL, NULL, NULL, NULL, NULL, 0),
(93, 'Sumidero', 'Ninguno', 'Aedex', 'Aedex', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tratado sin inspeccionar', NULL, NULL, NULL, 'Array', 0, 19, '43.47 - -80.52', NULL, NULL, NULL, NULL, NULL, 0),
(94, 'Sumidero', 'Ninguno', 'Culex', 'Culex', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tratado sin inspeccionar', NULL, NULL, NULL, 'Array', 0, 19, '43.47 - -80.52', NULL, NULL, NULL, NULL, NULL, 0),
(95, 'Sumidero', 'Con aceite', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'tratado', NULL, NULL, NULL, 'Array', 0, 19, '43.47 - -80.52', NULL, NULL, NULL, NULL, NULL, 0),
(96, 'Sumidero', 'Seco', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tratado sin inspeccionar', NULL, NULL, NULL, 'Op1', 12, 19, '43.47 - -80.52', NULL, NULL, NULL, NULL, NULL, 0),
(97, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 21, '43.47 - -80.52', 'adsas', 'dasdas', 'dasda', 'sdasd', 'dasdas', 9),
(98, 'CDH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, 21, '43.47 - -80.52', 'Probando', 'Plazo', '19801', 'Petardos SA', '', 20);

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
(21, 11, 'Cali', '21-02-2017');

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
(11, 'us', 'us', '6512bd43d9caa6e02c990b0a82652dca', '', NULL),
(12, 'Probando', 'Ret', '12', '', NULL),
(13, 'ab', 'cd', '13', '', NULL),
(90, 'probando', 'probando', '99', '', NULL),
(98, 'Pedro', 'Perez', '6512bd43d9caa6e02c990b0a82652dca', 'true', NULL),
(119, 'peter', 'anguila', '6512bd43d9caa6e02c990b0a82652dca', 'true', NULL),
(1234, 'a', 'a', '1234', '', NULL),
(81900, '91782', '9as', '6512bd43d9caa6e02c990b0a82652dca', 'false', NULL),
(1144031675, 'felipe', 'rojas', '1234', '', NULL),
(1878985612, 'Probando', 'Registro', '81dc9bdb52d04dc20036dbd8313ed055', 'false', NULL);

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;
--
-- AUTO_INCREMENT for table `focoinfeccion`
--
ALTER TABLE `focoinfeccion`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;
--
-- AUTO_INCREMENT for table `informaciongeneral`
--
ALTER TABLE `informaciongeneral`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
