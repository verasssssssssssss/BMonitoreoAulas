-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-10-2023 a las 07:30:54
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `psensores`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `areatrabajo`
--

CREATE TABLE `areatrabajo` (
  `IdArea` int(4) NOT NULL,
  `NomArea` varchar(30) NOT NULL,
  `Visible` bigint(1) DEFAULT NULL,
  `IdUsuario` int(4) DEFAULT NULL,
  `IdSede` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `areatrabajo`
--

INSERT INTO `areatrabajo` (`IdArea`, `NomArea`, `Visible`, `IdUsuario`, `IdSede`) VALUES
(1, 'Edificio A', 0, 1, 1),
(2, 'Edificio Bebesita', 0, 2, 1),
(3, 'Edificio C', 1, 6, 1),
(4, 'Edificio humanidades', 1, NULL, 2),
(5, 'Sociales', 1, 4, 2),
(6, 'Salas f', 1, NULL, 2),
(7, 'Edificio D', 1, NULL, 1),
(8, 'Edifico G', 0, NULL, 1),
(9, 'H53', 0, 2, 1),
(10, 'Edificio K', 0, NULL, 1),
(11, 'juanin', 0, NULL, 1),
(12, 'Aulas FE', 0, NULL, 1),
(13, 'Edificio G', 1, 7, 1),
(14, 'adsa', 0, NULL, 1),
(15, 'adsa', 0, NULL, 1),
(16, 'adsa', 0, NULL, 1),
(17, 'adsa', 0, NULL, 1),
(18, 'adsa', 0, NULL, 1),
(19, 'adsa', 0, NULL, 1),
(20, 'adsa', 0, NULL, 1),
(21, 'A12', 0, NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aula`
--

CREATE TABLE `aula` (
  `IdAula` int(4) NOT NULL,
  `NomAula` varchar(20) NOT NULL,
  `CantidadAlumnos` int(3) DEFAULT NULL,
  `Visible` tinyint(1) DEFAULT NULL,
  `IdArea` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `aula`
--

INSERT INTO `aula` (`IdAula`, `NomAula`, `CantidadAlumnos`, `Visible`, `IdArea`) VALUES
(1, 'A4', 40, 1, 1),
(2, 'A3', 15, 1, 1),
(3, 'A4', 10, 1, 1),
(4, 'A5', 45, 0, 1),
(5, 'B14', 25, 0, 2),
(6, 'B2', 15, 1, 2),
(7, 'C12', 34, 1, 3),
(8, 'C2', 33, 1, 3),
(9, 'A1', 23, 1, 4),
(10, 'B3', 33, 1, 4),
(11, 'C3', 25, 1, 4),
(12, 'E3', 40, 1, 5),
(13, 'F1', 25, 1, 6),
(14, 'F2', 45, 1, 6),
(15, 'D1', 55, 1, 7),
(16, 'D2', 45, 1, 7),
(17, 'D3', 34, 0, 7),
(19, 'A10', 23, 0, 1),
(20, 'A23', 22, 0, 1),
(21, 'A31', 11, 0, 1),
(22, 'A12', 33, 1, 1),
(23, 'A55', 55, 1, 2),
(24, 'f25', 55, 0, 12),
(25, 'C3', 45, 1, 3),
(26, 'G1', 51, 1, 13),
(27, 'adsa', 40, 0, 13);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bloquehorario`
--

CREATE TABLE `bloquehorario` (
  `IdBloque` int(2) NOT NULL,
  `HoraInicio` varchar(30) NOT NULL,
  `HoraFin` varchar(30) NOT NULL,
  `VentanaHoraria` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `bloquehorario`
--

INSERT INTO `bloquehorario` (`IdBloque`, `HoraInicio`, `HoraFin`, `VentanaHoraria`) VALUES
(1, '08:10', '08:50', 0),
(2, '08:50', '09:30', 1),
(3, '09:40', '10:20', 0),
(4, '10:20', '11:00', 1),
(5, '11:10', '11:50', 0),
(6, '11:50', '12:30', 1),
(7, '12:40', '13:20', 0),
(8, '13:20', '14:00', 1),
(9, '14:10', '14:50', 0),
(10, '14:50', '15:30', 1),
(11, '15:40', '16:20', 0),
(12, '16:20', '17:00', 1),
(13, '17:10', '17:50', 0),
(14, '17:50', '18:30', 1),
(15, '18:40', '19:20', 0),
(16, '19:20', '20:00', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrera`
--

CREATE TABLE `carrera` (
  `IdCarrera` int(4) NOT NULL,
  `NomCarrera` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrera`
--

INSERT INTO `carrera` (`IdCarrera`, `NomCarrera`) VALUES
(1, 'ICI'),
(2, 'ICO'),
(3, 'PEE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudad`
--

CREATE TABLE `ciudad` (
  `IdCiudad` int(2) NOT NULL,
  `NomCiudad` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ciudad`
--

INSERT INTO `ciudad` (`IdCiudad`, `NomCiudad`) VALUES
(1, 'Chillán'),
(2, 'Concepción');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contiene`
--

CREATE TABLE `contiene` (
  `IdReserva` int(3) NOT NULL,
  `IdBloque` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contiene`
--

INSERT INTO `contiene` (`IdReserva`, `IdBloque`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

CREATE TABLE `curso` (
  `IdCurso` int(100) NOT NULL,
  `NomCurso` varchar(70) NOT NULL,
  `NomProfesor` varchar(100) NOT NULL,
  `IdCarrera` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `curso`
--

INSERT INTO `curso` (`IdCurso`, `NomCurso`, `NomProfesor`, `IdCarrera`) VALUES
(1, 'ARQUITECTURA DE SOFTWARE', 'Gastón Patricio Márquez Ortega', 1),
(2, 'INVESTIGACIÓN DE OPERACIONES', 'Virna Angélica Ortiz Araya', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datos`
--

CREATE TABLE `datos` (
  `IdDatos` int(11) NOT NULL,
  `Fecha` datetime NOT NULL,
  `Reportado` tinyint(1) NOT NULL,
  `Correcto` tinyint(1) NOT NULL,
  `IntensidadLuminica` float DEFAULT NULL,
  `NivelesDeCO2` float DEFAULT NULL,
  `Temperatura` float DEFAULT NULL,
  `Humedad` float DEFAULT NULL,
  `CapturaFotografica` varchar(500) DEFAULT NULL,
  `IdSensor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `datos`
--

INSERT INTO `datos` (`IdDatos`, `Fecha`, `Reportado`, `Correcto`, `IntensidadLuminica`, `NivelesDeCO2`, `Temperatura`, `Humedad`, `CapturaFotografica`, `IdSensor`) VALUES
(1, '2023-08-27 06:47:21', 1, 0, 12, 21, 321, 12, 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Sala_de_estudio_UBB_La_Castilla.jpg', 1),
(2, '2023-08-28 01:08:58', 1, 0, 12, 123, 21, 212, 'https://www.canal21tv.cl/wp/wp-content/uploads/2019/05/sala-clases.jpg', 1),
(3, '2023-09-12 18:32:51', 1, 0, 12, NULL, NULL, NULL, 'https://s10.s3c.es/imag/_v0/770x420/b/2/5/clase-vacia-4-coronavirus.jpg', 1),
(14, '2023-10-16 22:59:11', 0, 0, 800, 400, 25.5, 50, '', 1),
(15, '2023-10-16 22:59:15', 0, 0, 800, 400, 25.5, 50, '', 1),
(16, '2023-10-16 22:59:19', 0, 0, 800, 400, 25.5, 50, '', 1),
(17, '2023-10-16 22:59:24', 0, 0, 800, 400, 25.5, 50, '', 1),
(18, '2023-10-16 22:59:28', 0, 0, 800, 400, 25.5, 50, '', 1),
(19, '2023-10-16 22:59:32', 0, 0, 800, 400, 25.5, 50, '', 1),
(20, '2023-10-16 22:59:36', 0, 0, 800, 400, 25.5, 50, '', 1),
(21, '2023-10-16 22:59:41', 0, 0, 800, 400, 25.5, 50, '', 1),
(22, '2023-10-16 22:59:45', 0, 0, 800, 400, 25.5, 50, '', 1),
(23, '2023-10-16 22:59:49', 0, 0, 800, 400, 25.5, 50, '', 1),
(24, '2023-10-16 22:59:53', 0, 0, 800, 400, 25.5, 50, '', 1),
(25, '2023-10-16 22:59:57', 0, 0, 800, 400, 25.5, 50, '', 1),
(26, '2023-10-16 23:03:11', 0, 0, 800, 400, 25, 50, '', 1),
(27, '2023-10-16 23:03:15', 0, 0, 800, 400, 25, 50, '', 1),
(28, '2023-10-16 23:03:20', 0, 0, 700, 440, 35, 60, '', 1),
(29, '2023-10-16 23:03:24', 0, 0, 770, 460, 25, 50, '', 1),
(30, '2023-10-16 23:03:28', 0, 0, 900, 300, 55, 40, '', 1),
(31, '2023-10-16 23:03:32', 0, 0, 200, 200, 15, 15, '', 1),
(32, '2023-10-16 23:03:36', 0, 0, 800, 400, 20, 23, '', 1),
(33, '2023-10-16 23:03:40', 0, 0, 655, 500, 45, 60, '', 1),
(34, '2023-10-16 23:03:44', 0, 0, 800, 400, 55, 20, '', 1),
(35, '2023-10-16 23:03:49', 0, 0, 520, 466, 25, 44, '', 1),
(36, '2023-10-16 23:03:53', 0, 0, 700, 370, 15, 33, '', 1),
(37, '2023-10-16 23:03:58', 0, 0, NULL, NULL, 45, 10, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posee`
--

CREATE TABLE `posee` (
  `IdSede` int(3) NOT NULL,
  `IdCarrera` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `posee`
--

INSERT INTO `posee` (`IdSede`, `IdCarrera`) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reporte`
--

CREATE TABLE `reporte` (
  `IdReporte` int(9) NOT NULL,
  `FechaReporte` datetime(6) NOT NULL,
  `IdCarrera` int(3) NOT NULL,
  `IdCurso` int(4) NOT NULL,
  `IdUsuario` int(3) NOT NULL,
  `IdAula` int(3) NOT NULL,
  `IdDatos` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reporte`
--

INSERT INTO `reporte` (`IdReporte`, `FechaReporte`, `IdCarrera`, `IdCurso`, `IdUsuario`, `IdAula`, `IdDatos`) VALUES
(5, '2023-08-10 14:30:00.000000', 1, 1, 2, 2, 2),
(7, '2023-08-12 16:00:00.987654', 1, 1, 2, 2, 2),
(9, '2023-08-14 11:30:59.876543', 1, 1, 2, 2, 2),
(11, '2023-08-16 15:00:01.111111', 1, 1, 2, 2, 2),
(13, '2023-08-18 18:30:22.222222', 1, 1, 2, 2, 2),
(15, '2023-08-20 08:00:44.444444', 1, 1, 2, 2, 2),
(17, '2023-08-22 14:30:00.000000', 1, 1, 2, 2, 2),
(19, '2023-08-24 10:00:00.000000', 1, 1, 2, 2, 2),
(21, '2023-08-26 12:30:00.000000', 1, 1, 2, 2, 2),
(23, '2023-08-28 16:00:00.000000', 1, 1, 2, 2, 2),
(25, '2023-08-30 09:30:00.000000', 1, 2, 2, 2, 2),
(27, '2023-09-01 12:00:00.000000', 1, 2, 2, 2, 2),
(28, '2023-09-02 13:15:00.000000', 1, 2, 2, 1, 1),
(29, '2023-09-03 14:30:00.000000', 1, 2, 2, 2, 2),
(30, '2023-09-04 15:45:00.000000', 1, 2, 2, 1, 1),
(31, '2023-09-05 17:00:00.000000', 1, 2, 2, 2, 2),
(32, '2023-09-06 08:15:00.000000', 1, 2, 2, 1, 1),
(33, '2023-09-07 09:30:00.000000', 1, 2, 2, 2, 2),
(56, '2023-08-03 16:31:15.208218', 3, 2, 2, 9, 1),
(57, '2023-10-03 18:27:04.851000', 1, 2, 1, 1, 3),
(58, '2023-10-03 18:31:46.566000', 1, 2, 1, 1, 3),
(59, '2023-10-03 18:49:28.196000', 1, 2, 1, 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE `reserva` (
  `IdReserva` int(5) NOT NULL,
  `DiaClases` int(1) NOT NULL,
  `EnUso` tinyint(1) NOT NULL,
  `IdCurso` int(5) NOT NULL,
  `IdAula` int(3) NOT NULL,
  `IdSede` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reserva`
--

INSERT INTO `reserva` (`IdReserva`, `DiaClases`, `EnUso`, `IdCurso`, `IdAula`, `IdSede`) VALUES
(1, 1, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `IdRol` int(3) NOT NULL,
  `NomRol` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`IdRol`, `NomRol`) VALUES
(1, 'Coordinador de aula '),
(2, 'Encargado de aula'),
(3, 'Jefe de carrera'),
(4, 'Inactivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sede`
--

CREATE TABLE `sede` (
  `IdSede` int(2) NOT NULL,
  `NomSede` varchar(50) NOT NULL,
  `IdCiudad` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sede`
--

INSERT INTO `sede` (`IdSede`, `NomSede`, `IdCiudad`) VALUES
(1, 'Fernando May', 1),
(2, 'La Castilla', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sensor`
--

CREATE TABLE `sensor` (
  `IdSensor` int(3) NOT NULL,
  `FechaInstalacion` datetime(6) NOT NULL,
  `FechaMantenimiento` datetime(6) DEFAULT NULL,
  `IdAula` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sensor`
--

INSERT INTO `sensor` (`IdSensor`, `FechaInstalacion`, `FechaMantenimiento`, `IdAula`) VALUES
(1, '2023-08-08 14:18:26.287267', NULL, 1),
(2, '0000-00-00 00:00:00.000000', NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `IdUsuario` int(4) NOT NULL,
  `NomUsuario` varchar(30) NOT NULL,
  `ApeUsuario` varchar(40) NOT NULL,
  `Fotografia` varchar(2000) DEFAULT NULL,
  `Mail` varchar(60) NOT NULL,
  `Contrasenia` varchar(100) NOT NULL,
  `IdRol` int(4) NOT NULL,
  `IdSede` int(4) DEFAULT NULL,
  `IdCarrera` int(4) DEFAULT NULL,
  `IdCiudad` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`IdUsuario`, `NomUsuario`, `ApeUsuario`, `Fotografia`, `Mail`, `Contrasenia`, `IdRol`, `IdSede`, `IdCarrera`, `IdCiudad`) VALUES
(1, 'Oyarce', 'Sandra', 'https://firebasestorage.googleapis.com/v0/b/psensores-7c59e.appspot.com/o/Referencias%2Fd2.png?alt=media&token=d4caf01d-be4a-4c81-835d-4e3077489acf', 'sebastian.a.vera.m@gmail.com', '21321322', 1, NULL, NULL, 1),
(2, 'Cristian', 'Valenzuela', 'https://firebasestorage.googleapis.com/v0/b/psensores-7c59e.appspot.com/o/Encargados%2Fd2.png?alt=media&token=6fcbfd20-0de5-4537-836e-083fd1e1e63b&_gl=1*1f1lk2n*_ga*MTI5ODk0Mzc4OS4xNjgzOTIzMTM0*_ga_CW55HF8NVT*MTY5NjgxOTA2MC4xMi4xLjE2OTY4MTkxNzYuNy4wLjA.', '21@21', '2121', 2, 1, NULL, NULL),
(4, 'Jorge', 'Hormazábal ', NULL, 'jorge.hormazabal1901@alumnos.ubiobio.cl', 'Jorge', 2, 2, NULL, NULL),
(6, 'Matias', 'Vera', 'https://firebasestorage.googleapis.com/v0/b/psensores-7c59e.appspot.com/o/Encargados%2Fd3.png?alt=media&token=03488467-ea97-4049-8d5d-e4880cd951a5&_gl=1*1x6owph*_ga*MTI5ODk0Mzc4OS4xNjgzOTIzMTM0*_ga_CW55HF8NVT*MTY5NjgxOTA2MC4xMi4xLjE2OTY4MTkyMDcuNjAuMC4w', 'Matias@gmail.com', '12345678', 2, 1, NULL, NULL),
(7, 'Nicolás', 'Murúa', 'https://firebasestorage.googleapis.com/v0/b/psensores-7c59e.appspot.com/o/Referencias%2Fd4.png?alt=media&token=9ccee4be-2382-4d84-a54a-6869c3aefac3', 'nicolas.murua1701@alumnos.ubiobio.cl', 'Nicolás7', 2, 1, NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `areatrabajo`
--
ALTER TABLE `areatrabajo`
  ADD PRIMARY KEY (`IdArea`),
  ADD KEY `IdUsuario` (`IdUsuario`),
  ADD KEY `IdSede` (`IdSede`);

--
-- Indices de la tabla `aula`
--
ALTER TABLE `aula`
  ADD PRIMARY KEY (`IdAula`),
  ADD KEY `IdArea` (`IdArea`);

--
-- Indices de la tabla `bloquehorario`
--
ALTER TABLE `bloquehorario`
  ADD PRIMARY KEY (`IdBloque`);

--
-- Indices de la tabla `carrera`
--
ALTER TABLE `carrera`
  ADD PRIMARY KEY (`IdCarrera`);

--
-- Indices de la tabla `ciudad`
--
ALTER TABLE `ciudad`
  ADD PRIMARY KEY (`IdCiudad`);

--
-- Indices de la tabla `contiene`
--
ALTER TABLE `contiene`
  ADD KEY `IdReserva` (`IdReserva`),
  ADD KEY `IdBloque` (`IdBloque`);

--
-- Indices de la tabla `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`IdCurso`);

--
-- Indices de la tabla `datos`
--
ALTER TABLE `datos`
  ADD PRIMARY KEY (`IdDatos`),
  ADD KEY `IdSensor` (`IdSensor`);

--
-- Indices de la tabla `posee`
--
ALTER TABLE `posee`
  ADD KEY `IdSede` (`IdSede`),
  ADD KEY `IdCarrera` (`IdCarrera`);

--
-- Indices de la tabla `reporte`
--
ALTER TABLE `reporte`
  ADD PRIMARY KEY (`IdReporte`),
  ADD KEY `IdAula` (`IdAula`),
  ADD KEY `IdUsuario` (`IdUsuario`),
  ADD KEY `IdCarrera` (`IdCarrera`),
  ADD KEY `IdDatos` (`IdDatos`);

--
-- Indices de la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD PRIMARY KEY (`IdReserva`),
  ADD KEY `IdSede` (`IdSede`),
  ADD KEY `IdAula` (`IdAula`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`IdRol`);

--
-- Indices de la tabla `sede`
--
ALTER TABLE `sede`
  ADD PRIMARY KEY (`IdSede`),
  ADD KEY `IdCiudad` (`IdCiudad`);

--
-- Indices de la tabla `sensor`
--
ALTER TABLE `sensor`
  ADD PRIMARY KEY (`IdSensor`),
  ADD KEY `IdAula` (`IdAula`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`IdUsuario`),
  ADD KEY `IdRol` (`IdRol`),
  ADD KEY `IdSede` (`IdSede`),
  ADD KEY `IdCarrera` (`IdCarrera`),
  ADD KEY `IdCiudad` (`IdCiudad`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `areatrabajo`
--
ALTER TABLE `areatrabajo`
  MODIFY `IdArea` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `aula`
--
ALTER TABLE `aula`
  MODIFY `IdAula` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `bloquehorario`
--
ALTER TABLE `bloquehorario`
  MODIFY `IdBloque` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `carrera`
--
ALTER TABLE `carrera`
  MODIFY `IdCarrera` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `ciudad`
--
ALTER TABLE `ciudad`
  MODIFY `IdCiudad` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
  MODIFY `IdCurso` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `datos`
--
ALTER TABLE `datos`
  MODIFY `IdDatos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `reporte`
--
ALTER TABLE `reporte`
  MODIFY `IdReporte` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT de la tabla `reserva`
--
ALTER TABLE `reserva`
  MODIFY `IdReserva` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `IdRol` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `sede`
--
ALTER TABLE `sede`
  MODIFY `IdSede` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `sensor`
--
ALTER TABLE `sensor`
  MODIFY `IdSensor` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `IdUsuario` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `areatrabajo`
--
ALTER TABLE `areatrabajo`
  ADD CONSTRAINT `areatrabajo_ibfk_1` FOREIGN KEY (`IdSede`) REFERENCES `sede` (`IdSede`) ON UPDATE CASCADE,
  ADD CONSTRAINT `areatrabajo_ibfk_2` FOREIGN KEY (`IdUsuario`) REFERENCES `usuario` (`IdUsuario`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `aula`
--
ALTER TABLE `aula`
  ADD CONSTRAINT `aula_ibfk_1` FOREIGN KEY (`IdArea`) REFERENCES `areatrabajo` (`IdArea`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `contiene`
--
ALTER TABLE `contiene`
  ADD CONSTRAINT `contiene_ibfk_1` FOREIGN KEY (`IdReserva`) REFERENCES `reserva` (`IdReserva`) ON UPDATE CASCADE,
  ADD CONSTRAINT `contiene_ibfk_2` FOREIGN KEY (`IdBloque`) REFERENCES `bloquehorario` (`IdBloque`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `datos`
--
ALTER TABLE `datos`
  ADD CONSTRAINT `datos_ibfk_1` FOREIGN KEY (`IdSensor`) REFERENCES `sensor` (`IdSensor`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `posee`
--
ALTER TABLE `posee`
  ADD CONSTRAINT `posee_ibfk_1` FOREIGN KEY (`IdCarrera`) REFERENCES `carrera` (`IdCarrera`) ON UPDATE CASCADE,
  ADD CONSTRAINT `posee_ibfk_2` FOREIGN KEY (`IdSede`) REFERENCES `sede` (`IdSede`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `reporte`
--
ALTER TABLE `reporte`
  ADD CONSTRAINT `reporte_ibfk_1` FOREIGN KEY (`IdAula`) REFERENCES `aula` (`IdAula`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reporte_ibfk_2` FOREIGN KEY (`IdUsuario`) REFERENCES `usuario` (`IdUsuario`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reporte_ibfk_3` FOREIGN KEY (`IdCarrera`) REFERENCES `carrera` (`IdCarrera`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reporte_ibfk_4` FOREIGN KEY (`IdDatos`) REFERENCES `datos` (`IdDatos`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD CONSTRAINT `reserva_ibfk_1` FOREIGN KEY (`IdAula`) REFERENCES `aula` (`IdAula`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reserva_ibfk_2` FOREIGN KEY (`IdSede`) REFERENCES `sede` (`IdSede`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `sede`
--
ALTER TABLE `sede`
  ADD CONSTRAINT `sede_ibfk_1` FOREIGN KEY (`IdCiudad`) REFERENCES `ciudad` (`IdCiudad`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `sensor`
--
ALTER TABLE `sensor`
  ADD CONSTRAINT `sensor_ibfk_1` FOREIGN KEY (`IdAula`) REFERENCES `aula` (`IdAula`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`IdRol`) REFERENCES `rol` (`IdRol`) ON UPDATE CASCADE,
  ADD CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`IdSede`) REFERENCES `sede` (`IdSede`) ON UPDATE CASCADE,
  ADD CONSTRAINT `usuario_ibfk_3` FOREIGN KEY (`IdCarrera`) REFERENCES `carrera` (`IdCarrera`) ON UPDATE CASCADE,
  ADD CONSTRAINT `usuario_ibfk_4` FOREIGN KEY (`IdCiudad`) REFERENCES `ciudad` (`IdCiudad`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
