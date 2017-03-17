-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 17, 2017 at 03:01 AM
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
(50, 24, '21', '12', 'Encuesta larvaria'),
(51, 25, '1', 'sada', 'Encuesta larvaria'),
(52, 26, '2', 'askldndkla', 'Control larvario'),
(53, 27, '4', 'Hgb', 'Control larvario'),
(54, 27, '10', 'Uy', 'Control larvario'),
(55, 28, '22', '98', 'Control larvario'),
(56, 29, '3', 'asdas', 'Control larvario'),
(57, 30, '2', '', ''),
(58, 31, '4', '81-3', 'Control larvario'),
(59, 32, '4', '45', 'EvaluaciÃ³n de control'),
(60, 33, '3', '', 'Encuesta larvaria'),
(61, 34, '3', '', 'Encuesta larvaria'),
(62, 35, '5', '', 'Encuesta larvaria'),
(63, 36, '3', '', 'Control larvario');

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
(4, 'Tanques Bajos', 'True', 0, 3, 1, 23, 'False', 'True', 40, 9),
(5, 'Llantas', 'True', 12, 0, 0, 0, 'True', '', 12, 14),
(6, 'Tanques Bajos', 'False', 41, 0, 0, 12, 'False', '', 51, 14),
(7, 'Tanques Bajos', 'True', 0, 2, 1, 12, 'True', '', 41, 299);

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

--
-- Dumping data for table `fococdh`
--

INSERT INTO `fococdh` (`ID`, `Tipo`, `Bueno`, `Regular`, `Malo`, `Total`, `EnUso`, `Cantidad`, `Lugar`, `IDFoco`) VALUES
(1, 'Toldillo', 12, 31, 21, 45, 21, 0, '', 43),
(2, 'Sumidero', 0, 0, 0, 0, 0, 12, 'fasd', 82),
(3, 'Floreros/Plantas en agua', 0, 0, 0, 0, 0, 12, 'dasda', 84),
(4, 'Llantas', 0, 0, 0, 0, 0, 451, 'srae', 84),
(5, 'Adulto', 12, 31, 2, 45, 0, 0, '', 89),
(6, 'Llantas', 0, 0, 0, 0, 0, 12, 'sda', 91),
(7, 'Tanques bajos', 0, 0, 0, 0, 0, 1, 'dasda', 0),
(8, 'Llantas', 0, 0, 0, 0, 0, 1, 'ds', 98),
(9, 'Adulto', 1, 12, 3, 16, 0, 0, '', 4),
(10, 'Llantas', 0, 0, 0, 0, 0, 1, '1', 309),
(11, 'Tarros-baldes (< 55 gal)', 0, 0, 0, 0, 0, 1, 'Te', 327),
(12, 'Tarros-baldes (< 55 gal)', 0, 0, 0, 0, 0, 2, 'Yo', 327);

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
(300, 'Sumidero', 'Seco', '', '', '', NULL, NULL, NULL, 0, 30, '3.459630301635156,-76.4858167967285', NULL, NULL, NULL, NULL, NULL, 0),
(301, 'Vivienda', NULL, '', NULL, NULL, 0, 'Renuente', NULL, NULL, 30, '3.459569300529532,-76.48577449672848', '', '', '', NULL, NULL, 0),
(302, 'Vivienda', NULL, '', NULL, NULL, 0, 'Renuente', NULL, NULL, 30, '3.459569300529532,-76.48577449672848', '', '', '', NULL, NULL, 0),
(303, 'Vivienda', NULL, '', NULL, NULL, 0, 'Renuente', NULL, NULL, 30, '3.4596189014285255,-76.48585169672849', '', '', '', NULL, NULL, 0),
(304, 'Vivienda', NULL, '', NULL, NULL, 0, 'Renuente', NULL, NULL, 30, '3.4595639004316747,-76.48577579672849', '', '', '', NULL, NULL, 0),
(305, 'Vivienda', NULL, '', NULL, NULL, 0, 'Cerrada', NULL, NULL, 30, '3.4833824485238836,-76.48290755332027', '', '', '', NULL, NULL, 0),
(306, 'Vivienda', NULL, '', NULL, NULL, 0, 'Cerrada', NULL, NULL, 30, '3.4187148316943956,-76.51931335449217', '', '', '', NULL, NULL, 0),
(307, 'Sumidero', 'Seco', '', '', '', NULL, NULL, NULL, 0, 30, '43.465187,-80.522372', NULL, NULL, NULL, NULL, NULL, 0),
(308, 'Sumidero', 'Seco', '', '', '', NULL, NULL, NULL, 0, 30, '43.465187,-80.522372', NULL, NULL, NULL, NULL, NULL, 0),
(309, 'CDH', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, 30, '3.4235127845770252,-76.5151934814453', 'da', 'as', '1312', '2', '', 12),
(310, 'Sumidero', 'Ninguno', 'Tratado', 'Culex', 'Culex', NULL, NULL, 'Op2', 12, 30, '3.4767489,-76.4987311', NULL, NULL, NULL, NULL, NULL, 0),
(311, 'Sumidero', 'Tapado', '', '', '', NULL, NULL, NULL, 0, 30, '3.4767159,-76.49872739999999', NULL, NULL, NULL, NULL, NULL, 0),
(312, 'Vivienda', NULL, '', NULL, NULL, 0, 'Cerrada', NULL, NULL, 30, '3.4767159,-76.49872739999999', '', '', '', NULL, NULL, 0),
(313, 'Vivienda', NULL, '', NULL, NULL, 0, 'Cerrada', NULL, NULL, 30, '3.4767300999999997,-76.4986971', '', '', '', NULL, NULL, 0),
(314, 'Sumidero', 'Seco', '', '', '', NULL, NULL, NULL, 0, 30, '3.4767262000000003,-76.4986649', NULL, NULL, NULL, NULL, NULL, 0),
(315, 'Sumidero', 'Seco', '', '', '', NULL, NULL, NULL, 0, 30, '3.4767262000000003,-76.4986649', NULL, NULL, NULL, NULL, NULL, 0),
(316, 'Sumidero', 'Seco', '', '', '', NULL, NULL, NULL, 0, 30, '3.4767278999999998,-76.4987271', NULL, NULL, NULL, NULL, NULL, 0),
(317, 'Vivienda', NULL, '', NULL, NULL, 0, 'Cerrada', NULL, NULL, 30, '43.465187,-80.522372', '', '', '', NULL, NULL, 0),
(318, 'Vivienda', NULL, '', NULL, NULL, 0, 'Renuente', NULL, NULL, 30, '43.465187,-80.522372', '', '', '', NULL, NULL, 0),
(319, 'Sumidero', 'Seco', '', '', '', NULL, NULL, NULL, 0, 30, '3.4767447,-76.4987467', NULL, NULL, NULL, NULL, NULL, 0),
(320, 'Sumidero', 'Seco', '', '', '', NULL, NULL, NULL, 0, 30, '3.4767447,-76.4987467', NULL, NULL, NULL, NULL, NULL, 0),
(321, 'Sumidero', 'Tapado', '', '', '', NULL, NULL, NULL, 0, 30, '3.4767447,-76.4987467', NULL, NULL, NULL, NULL, NULL, 0),
(322, 'Sumidero', 'Seco', '', '', '', NULL, NULL, NULL, 0, 30, '43.465187,-80.522372', NULL, NULL, NULL, NULL, NULL, 0),
(323, 'Sumidero', 'Seco', '', '', '', NULL, NULL, NULL, 0, 31, '3.4212851665828827,-76.51751091003416', NULL, NULL, NULL, NULL, NULL, 0),
(324, 'Sumidero', 'Seco', '', '', '', NULL, NULL, NULL, 0, 31, '3.429253160906158,-76.52240325927733', NULL, NULL, NULL, NULL, NULL, 0),
(325, 'Sumidero', 'Tapado', '', '', '', NULL, NULL, NULL, 0, 31, '3.4766238,-76.4986892', NULL, NULL, NULL, NULL, NULL, 0),
(326, 'Vivienda', NULL, '', NULL, NULL, 0, 'Renuente', NULL, NULL, 31, '3.4325088814223066,-76.52034332275389', '', '', '', NULL, NULL, 0),
(327, 'CDH', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, 31, '3.47668133,-76.49866333', 'W', 'I', '3288', 'T', '', 32),
(328, 'Sumidero', 'Seco', '', '', '', NULL, NULL, NULL, 0, 32, '3.4260831065934894,-76.51579429626463', NULL, NULL, NULL, NULL, NULL, 0),
(329, 'Sumidero', 'Seco', '', '', '', NULL, NULL, NULL, 0, 32, '3.4277966507697344,-76.51176025390623', NULL, NULL, NULL, NULL, NULL, 0),
(330, 'Sumidero', 'Tapado', '', '', '', NULL, NULL, NULL, 0, 32, '3.4215421996926714,-76.51562263488768', NULL, NULL, NULL, NULL, NULL, 0),
(331, 'Sumidero', 'Seco', '', '', '', NULL, NULL, NULL, 0, 32, '3.4235127845770252,-76.51287605285643', NULL, NULL, NULL, NULL, NULL, 0),
(332, 'Sumidero', 'Tapado', '', '', '', NULL, NULL, NULL, 0, 32, '3.4223132986083757,-76.51733924865721', NULL, NULL, NULL, NULL, NULL, 0),
(333, 'Sumidero', 'Seco', '', '', '', NULL, NULL, NULL, 0, 32, '3.4210281334041523,-76.51459266662596', NULL, NULL, NULL, NULL, NULL, 0),
(334, 'Sumidero', 'Seco', '', '', '', NULL, NULL, NULL, 0, 32, '3.420685422391964,-76.51382019042967', NULL, NULL, NULL, NULL, NULL, 0),
(335, 'Vivienda', NULL, '', NULL, NULL, 0, 'Cerrada', NULL, NULL, 33, '3.486193351453617,-76.50875189055171', '', '', '', NULL, NULL, 0),
(336, 'Sumidero', 'Seco', '', '', '', NULL, NULL, NULL, 0, 34, '3.4766049999999997,-76.4987067', NULL, NULL, NULL, NULL, NULL, 0),
(337, 'Vivienda', NULL, '', NULL, NULL, 0, 'Cerrada', NULL, NULL, 34, '3.4766945999999996,-76.49878799999999', '', '', '', NULL, NULL, 0);

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
(24, 11, 'Cali', '28-02-2017'),
(25, 11, 'Palmira', '01-03-2017'),
(26, 11, 'Palmira', '03-03-2017'),
(27, 11, 'Palmira', '04-03-2017'),
(28, 11, 'Cali', '05-03-2017'),
(29, 11, 'Cartago', '06-03-2017'),
(30, 11, 'Cali', '07-03-2017'),
(31, 11, 'Cali', '08-03-2017'),
(32, 11, 'Cali', '09-03-2017'),
(33, 119, 'Cali', '12-03-2017'),
(34, 11, 'Cali', '13-03-2017'),
(35, 119, 'Cali', '13-03-2017'),
(36, 11, 'Cali', '16-03-2017');

-- --------------------------------------------------------

--
-- Table structure for table `insecticidas`
--

CREATE TABLE `insecticidas` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `insecticidas`
--

INSERT INTO `insecticidas` (`ID`, `Nombre`) VALUES
(1, 'Op1'),
(2, 'Op2');

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
  `IDSupervisor` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`cedula`, `nombres`, `apellidos`, `password`, `rolUsuario`, `IDSupervisor`) VALUES
(1, 'adsa', 'dasda', '6512bd43d9caa6e02c990b0a82652dca', 'false', 0),
(11, 'us', 'us', '6512bd43d9caa6e02c990b0a82652dca', 'true', 0),
(12, 'Probando', 'Ret', '12', '', 0),
(13, 'ab', 'cd', '13', '', 0),
(90, 'probando', 'probando', '99', '', 0),
(98, 'Pedro', 'Perez', '6512bd43d9caa6e02c990b0a82652dca', 'true', 0),
(111, '11', '111', '698d51a19d8a121ce581499d7b701668', 'false', 11),
(119, 'peter', 'anguila', '6512bd43d9caa6e02c990b0a82652dca', 'true', 11),
(1234, 'a', 'a', '1234', '', 11),
(12345, 'Probando', 'TimeOut2', '6512bd43d9caa6e02c990b0a82652dca', 'false', 0),
(65783, 'No sale', 'El mensaje', '827ccb0eea8a706c4c34a16891f84e7b', 'false', 0),
(81900, '91782', '9as', '6512bd43d9caa6e02c990b0a82652dca', 'false', 11),
(90181, 'Debe Ir', 'Con Null', '81dc9bdb52d04dc20036dbd8313ed055', 'false', 0),
(102983, 'Otra', 'Vez', '912e79cd13c64069d91da65d62fbb78c', 'false', 0),
(120981, 'Poto', 'Pato', '827ccb0eea8a706c4c34a16891f84e7b', 'false', 0),
(123456, 'Probando', 'TimeOut', '6f04f0d75f6870858bae14ac0b6d9f73', 'false', 0),
(131231, 'ProbandoID', 'Otra vez', '8d4646eb2d7067126eb08adb0672f7bb', 'false', 0),
(132987, 'Aaay Pa2', 'Carajito', '9996535e07258a7bbfd8b132435c5962', 'false', 0),
(153617, 'MÃ³vil', 'Css', '00c66aaf5f2c3f49946f15c1ad2ea0d3', 'false', 0),
(167152, 'Probando', 'Estilos', 'ef1dc416e22dd93120421fab1a338f31', 'false', 0),
(198764, 'Probando', 'Modal', '81dc9bdb52d04dc20036dbd8313ed055', 'false', 0),
(231312, 'dasd', 'asdas12', '7b354881033eaad8e420662a1e3ce30e', 'false', 0),
(875471, 'Debe', 'Salir', '827ccb0eea8a706c4c34a16891f84e7b', 'false', 0),
(986701, 'Probando Otros', 'Modales', '6512bd43d9caa6e02c990b0a82652dca', 'false', 0),
(987651, 'ProbandoID', 'Supervisor', '36290c4064073ec57141d6ce1389316f', 'false', 0),
(1283791, 'Poto', 'Pito', '827ccb0eea8a706c4c34a16891f84e7b', 'false', 0),
(1290371, 'Probando', 'DiseÃ±o', '14cfdb59b5bda1fc245aadae15b1984a', 'false', 0),
(7861287, 'Centrar', 'Verticalmente', '120705de7e61c5b322ad798b8ef225a7', 'false', 0),
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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;
--
-- AUTO_INCREMENT for table `depositosvivienda`
--
ALTER TABLE `depositosvivienda`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `fococdh`
--
ALTER TABLE `fococdh`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `focoinfeccion`
--
ALTER TABLE `focoinfeccion`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=338;
--
-- AUTO_INCREMENT for table `informaciongeneral`
--
ALTER TABLE `informaciongeneral`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT for table `insecticidas`
--
ALTER TABLE `insecticidas`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
