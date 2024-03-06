CREATE DATABASE  IF NOT EXISTS `db_ynwa` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `db_ynwa`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: db_ynwa
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ctg_marcas`
--

DROP TABLE IF EXISTS `ctg_marcas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ctg_marcas` (
  `id_marca` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `descripcion_marca` varchar(255) NOT NULL,
  `estado_marca` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_marca`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ctg_marcas`
--

LOCK TABLES `ctg_marcas` WRITE;
/*!40000 ALTER TABLE `ctg_marcas` DISABLE KEYS */;
INSERT INTO `ctg_marcas` VALUES (1,'Nike',1),(2,'Adidas',1),(3,'Puma',1),(4,'Vans',1),(5,'Converse',1),(6,'New Balance',1),(7,'Reebok',1),(8,'Skechers',1),(9,'Fila',1),(10,'Under Armour',1),(11,'Timberland',1),(12,'Dr. Martens',1),(13,'Clarks',1),(14,'Salomon',1),(15,'Merrell',1),(16,'Crocs',1),(17,'Birkenstock',1),(18,'Havaianas',1),(19,'Gucci',1),(20,'Balenciaga',1),(21,'Prada',1),(22,'Versace',1),(23,'Valentino',1),(24,'Jimmy Choo',1),(25,'Dior',1);
/*!40000 ALTER TABLE `ctg_marcas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ctg_tallas`
--

DROP TABLE IF EXISTS `ctg_tallas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ctg_tallas` (
  `id_talla` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `descripcion_talla` varchar(255) NOT NULL,
  `estado_talla` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_talla`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ctg_tallas`
--

LOCK TABLES `ctg_tallas` WRITE;
/*!40000 ALTER TABLE `ctg_tallas` DISABLE KEYS */;
INSERT INTO `ctg_tallas` VALUES (1,'4',1),(2,'4.5',1),(3,'5',1),(4,'5.5',1),(5,'6',1),(6,'6.5',1),(7,'7',1),(8,'7.5',1),(9,'8',1),(10,'8.5',1),(11,'9',1),(12,'9.5',1),(13,'10',1),(14,'10.5',1),(15,'11',1),(16,'11.5',1),(17,'12',1),(18,'12.5',1),(19,'13',1),(20,'13.5',1),(21,'14',1),(22,'14.5',1),(23,'15',1),(24,'15.5',1),(25,'16',1);
/*!40000 ALTER TABLE `ctg_tallas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ctg_tipo_noticias`
--

DROP TABLE IF EXISTS `ctg_tipo_noticias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ctg_tipo_noticias` (
  `id_tipo_noticia` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `descripcion_tipo_noticia` varchar(255) NOT NULL,
  `estado_tipo_noticia` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_tipo_noticia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ctg_tipo_noticias`
--

LOCK TABLES `ctg_tipo_noticias` WRITE;
/*!40000 ALTER TABLE `ctg_tipo_noticias` DISABLE KEYS */;
/*!40000 ALTER TABLE `ctg_tipo_noticias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prc_clientes`
--

DROP TABLE IF EXISTS `prc_clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prc_clientes` (
  `id_cliente` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `usuario_cliente` varchar(30) NOT NULL,
  `clave_cliente` varchar(30) NOT NULL,
  `nombre_cliente` varchar(255) DEFAULT NULL,
  `apellido_cliente` varchar(255) DEFAULT NULL,
  `email_cliente` varchar(100) NOT NULL,
  `pin_cliente` varchar(6) NOT NULL,
  `estado_cliente` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `usuario_cliente` (`usuario_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prc_clientes`
--

LOCK TABLES `prc_clientes` WRITE;
/*!40000 ALTER TABLE `prc_clientes` DISABLE KEYS */;
INSERT INTO `prc_clientes` VALUES (1,'cliente01','claveCliente01','Ana','González','ana.gonzalez@example.com','123456',1),(2,'cliente02','claveCliente02','Pedro','López','pedro.lopez@example.com','234567',1),(3,'cliente03','claveCliente03','María','Rodríguez','maria.rodriguez@example.com','345678',1),(4,'cliente04','claveCliente04','Carlos','Martínez','carlos.martinez@example.com','456789',1),(5,'cliente05','claveCliente05','Laura','Hernández','laura.hernandez@example.com','567890',1),(6,'cliente06','claveCliente06','Juan','Gómez','juan.gomez@example.com','678901',1),(7,'cliente07','claveCliente07','Sofía','Pérez','sofia.perez@example.com','789012',1),(8,'cliente08','claveCliente08','Fernando','Sánchez','fernando.sanchez@example.com','890123',1),(9,'cliente09','claveCliente09','Lucía','Flores','lucia.flores@example.com','901234',1),(10,'cliente10','claveCliente10','Diego','Ramírez','diego.ramirez@example.com','012345',1),(11,'cliente11','claveCliente11','Valeria','Torres','valeria.torres@example.com','123450',1),(12,'cliente12','claveCliente12','Javier','García','javier.garcia@example.com','234561',1),(13,'cliente13','claveCliente13','Marcela','Vargas','marcela.vargas@example.com','345612',1),(14,'cliente14','claveCliente14','Andrés','Luna','andres.luna@example.com','456123',1),(15,'cliente15','claveCliente15','Carolina','Ríos','carolina.rios@example.com','561234',1),(16,'cliente16','claveCliente16','Roberto','Cortés','roberto.cortes@example.com','612345',1),(17,'cliente17','claveCliente17','Luisa','Ortega','luisa.ortega@example.com','123456',1),(18,'cliente18','claveCliente18','Santiago','Herrera','santiago.herrera@example.com','234567',1),(19,'cliente19','claveCliente19','Camila','Iglesias','camila.iglesias@example.com','345678',1),(20,'cliente20','claveCliente20','Alejandro','Mendoza','alejandro.mendoza@example.com','456789',1),(21,'cliente21','claveCliente21','Isabella','Cabrera','isabella.cabrera@example.com','567890',1),(22,'cliente22','claveCliente22','Gabriel','Santos','gabriel.santos@example.com','678901',1),(23,'cliente23','claveCliente23','Mariana','Cruz','mariana.cruz@example.com','789012',1),(24,'cliente24','claveCliente24','Hugo','Guzmán','hugo.guzman@example.com','890123',1),(25,'cliente25','claveCliente25','Valentina','Silva','valentina.silva@example.com','901234',1);
/*!40000 ALTER TABLE `prc_clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prc_comentarios`
--

DROP TABLE IF EXISTS `prc_comentarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prc_comentarios` (
  `id_comentario` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_detalle` int(10) unsigned NOT NULL,
  `contenido_comentario` text NOT NULL,
  `puntuacion_comentario` int(10) unsigned NOT NULL,
  `fecha_comentario` timestamp NOT NULL DEFAULT current_timestamp(),
  `estado_comentario` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_comentario`),
  KEY `fk_comentario_detalle` (`id_detalle`),
  CONSTRAINT `fk_comentario_detalle` FOREIGN KEY (`id_detalle`) REFERENCES `prc_detalle_pedidos` (`id_detalle`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prc_comentarios`
--

LOCK TABLES `prc_comentarios` WRITE;
/*!40000 ALTER TABLE `prc_comentarios` DISABLE KEYS */;
INSERT INTO `prc_comentarios` VALUES (1,1,'Excelente producto, muy satisfecho con mi compra.',5,'2024-03-06 04:33:19',1),(2,2,'El tamaño no era el esperado, un poco pequeño.',3,'2024-03-06 04:33:19',1),(3,3,'Buena calidad, lo recomendaría a otros compradores.',4,'2024-03-06 04:33:19',1),(4,4,'Entrega rápida y el producto en perfecto estado.',5,'2024-03-06 04:33:19',1),(5,5,'No cumple con mis expectativas, baja calidad.',2,'2024-03-06 04:33:19',1),(6,6,'El color no es exactamente como se muestra en la imagen.',3,'2024-03-06 04:33:19',1),(7,7,'Muy buena atención al cliente, resolvieron mis dudas.',4,'2024-03-06 04:33:19',1),(8,8,'El precio es un poco elevado para la calidad del producto.',3,'2024-03-06 04:33:19',1),(9,9,'Excelente servicio, volvería a comprar sin duda.',5,'2024-03-06 04:33:19',1),(10,10,'Tardó más de lo esperado en llegar, pero el producto es bueno.',4,'2024-03-06 04:33:19',1),(11,11,'El producto llegó con defectos, solicité un reemplazo.',2,'2024-03-06 04:33:19',1),(12,12,'Buena relación calidad-precio, lo recomendaría.',4,'2024-03-06 04:33:19',1),(13,13,'El envío tuvo problemas y llegó con retraso.',2,'2024-03-06 04:33:19',1),(14,14,'El producto es exactamente lo que esperaba, muy contento.',5,'2024-03-06 04:33:19',1),(15,15,'Las costuras del producto se deshicieron rápidamente.',2,'2024-03-06 04:33:19',1),(16,16,'El pedido llegó incompleto, falta un artículo.',1,'2024-03-06 04:33:19',1),(17,17,'Buena atención al cliente, resolvieron mi problema.',4,'2024-03-06 04:33:19',1),(18,18,'El producto es de buena calidad, lo recomendaría.',4,'2024-03-06 04:33:19',1),(19,19,'El envío llegó en perfectas condiciones y dentro del plazo.',5,'2024-03-06 04:33:19',1),(20,20,'No cumple con las especificaciones descritas en la página.',2,'2024-03-06 04:33:19',1),(21,21,'El producto es tal como se muestra en la imagen, muy satisfecho.',5,'2024-03-06 04:33:19',1),(22,22,'El precio es elevado, esperaba una mejor calidad.',3,'2024-03-06 04:33:19',1),(23,23,'Excelente atención al cliente, respondieron rápidamente.',5,'2024-03-06 04:33:19',1),(24,24,'El envío tuvo demoras y el producto llegó dañado.',1,'2024-03-06 04:33:19',1),(25,25,'El producto es de buena calidad, lo recomendaré a mis amigos.',4,'2024-03-06 04:33:19',1);
/*!40000 ALTER TABLE `prc_comentarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prc_detalle_pedidos`
--

DROP TABLE IF EXISTS `prc_detalle_pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prc_detalle_pedidos` (
  `id_detalle` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_pedido` int(10) unsigned NOT NULL,
  `id_modelo_talla` int(10) unsigned NOT NULL,
  `cantidad_detalle_pedido` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id_detalle`),
  KEY `fk_detalle_pedido` (`id_pedido`),
  KEY `fk_detalle_modelo` (`id_modelo_talla`),
  CONSTRAINT `fk_detalle_modelo` FOREIGN KEY (`id_modelo_talla`) REFERENCES `prc_modelo_tallas` (`id_modelo_talla`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_detalle_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `prc_pedidos` (`id_pedido`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prc_detalle_pedidos`
--

LOCK TABLES `prc_detalle_pedidos` WRITE;
/*!40000 ALTER TABLE `prc_detalle_pedidos` DISABLE KEYS */;
INSERT INTO `prc_detalle_pedidos` VALUES (1,1,1,2),(2,2,2,1),(3,3,12,1),(4,4,14,2),(5,5,20,1),(6,6,25,2),(7,7,6,2),(8,8,11,1),(9,9,15,2),(10,10,19,3),(11,11,23,1),(12,12,24,2),(13,13,1,1),(14,14,2,3),(15,14,5,1),(16,15,12,1),(17,16,14,2),(18,17,20,1),(19,18,25,2),(20,19,6,2),(21,20,11,1),(22,21,15,2),(23,22,19,3),(24,23,23,1),(25,24,25,2),(26,25,4,2);
/*!40000 ALTER TABLE `prc_detalle_pedidos` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER actualizar_stock AFTER INSERT ON prc_detalle_pedidos
FOR EACH ROW
BEGIN
    DECLARE stock_actual INT;
    DECLARE cantidad_pedido INT;

    SELECT stock_modelo_talla INTO stock_actual FROM prc_modelo_tallas WHERE id_modelo_talla = NEW.id_modelo_talla;
    SELECT cantidad_detalle_pedido INTO cantidad_pedido FROM prc_detalle_pedidos WHERE id_detalle = NEW.id_detalle;

    UPDATE prc_modelo_tallas SET stock_modelo_talla = stock_actual - cantidad_pedido WHERE id_modelo_talla = NEW.id_modelo_talla;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `prc_modelo_tallas`
--

DROP TABLE IF EXISTS `prc_modelo_tallas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prc_modelo_tallas` (
  `id_modelo_talla` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_talla` int(10) unsigned NOT NULL,
  `id_modelo` int(10) unsigned NOT NULL,
  `stock_modelo_talla` int(10) unsigned NOT NULL,
  `precio_modelo_talla` float unsigned NOT NULL,
  PRIMARY KEY (`id_modelo_talla`),
  KEY `fk_mt_modelo` (`id_modelo`),
  KEY `fk_mt_talla` (`id_talla`),
  CONSTRAINT `fk_mt_modelo` FOREIGN KEY (`id_modelo`) REFERENCES `prc_modelos` (`id_modelo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_mt_talla` FOREIGN KEY (`id_talla`) REFERENCES `ctg_tallas` (`id_talla`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prc_modelo_tallas`
--

LOCK TABLES `prc_modelo_tallas` WRITE;
/*!40000 ALTER TABLE `prc_modelo_tallas` DISABLE KEYS */;
INSERT INTO `prc_modelo_tallas` VALUES (1,1,1,7,99.99),(2,1,2,1,129.99),(3,1,3,15,89.99),(4,2,4,6,79.99),(5,2,5,2,109.99),(6,2,6,8,69.99),(7,3,7,20,79.99),(8,3,8,10,99.99),(9,3,9,18,69.99),(10,4,10,6,89.99),(11,4,11,0,119.99),(12,4,12,8,79.99),(13,5,13,15,69.99),(14,5,14,1,99.99),(15,5,15,8,59.99),(16,6,16,10,99.99),(17,6,17,5,129.99),(18,6,18,15,89.99),(19,7,19,2,79.99),(20,7,20,1,109.99),(21,7,21,12,69.99),(22,8,22,20,79.99),(23,8,23,8,99.99),(24,8,24,16,69.99),(25,9,25,0,89.99);
/*!40000 ALTER TABLE `prc_modelo_tallas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prc_modelos`
--

DROP TABLE IF EXISTS `prc_modelos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prc_modelos` (
  `id_modelo` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_marca` int(10) unsigned DEFAULT NULL,
  `descripcion_modelo` varchar(255) NOT NULL,
  `foto_modelo` longtext NOT NULL,
  `estado_modelo` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id_modelo`),
  KEY `fk_modelo_marca` (`id_marca`),
  CONSTRAINT `fk_modelo_marca` FOREIGN KEY (`id_marca`) REFERENCES `ctg_marcas` (`id_marca`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prc_modelos`
--

LOCK TABLES `prc_modelos` WRITE;
/*!40000 ALTER TABLE `prc_modelos` DISABLE KEYS */;
INSERT INTO `prc_modelos` VALUES (1,1,'Nike Air Force 1','ruta/a/foto1.jpg',1),(2,1,'Nike Air Max 90','ruta/a/foto2.jpg',1),(3,1,'Nike Roshe Run','ruta/a/foto3.jpg',1),(4,2,'Adidas Stan Smith','ruta/a/foto4.jpg',1),(5,2,'Adidas Superstar','ruta/a/foto5.jpg',1),(6,2,'Adidas Gazelle','ruta/a/foto6.jpg',1),(7,3,'Puma Suede Classic','ruta/a/foto7.jpg',1),(8,3,'Puma Basket Classic','ruta/a/foto8.jpg',1),(9,3,'Puma Roma','ruta/a/foto9.jpg',1),(10,4,'Vans Old Skool','ruta/a/foto10.jpg',1),(11,4,'Vans Authentic','ruta/a/foto11.jpg',1),(12,4,'Vans Era','ruta/a/foto12.jpg',1),(13,5,'Converse Chuck Taylor All Star','ruta/a/foto13.jpg',1),(14,5,'Converse One Star','ruta/a/foto14.jpg',1),(15,5,'Converse Jack Purcell','ruta/a/foto15.jpg',1),(16,6,'New Balance 574','ruta/a/foto16.jpg',1),(17,6,'New Balance 990','ruta/a/foto17.jpg',1),(18,6,'New Balance Fresh Foam','ruta/a/foto18.jpg',1),(19,7,'Reebok Classic Leather','ruta/a/foto19.jpg',1),(20,7,'Reebok Club C','ruta/a/foto20.jpg',1),(21,7,'Reebok Workout Plus','ruta/a/foto21.jpg',1),(22,8,'Skechers Go Walk','ruta/a/foto22.jpg',1),(23,8,'Skechers D\"Lites\"','ruta/a/foto23.jpg',1),(24,8,'Skechers Energy','ruta/a/foto24.jpg',1),(25,9,'Fila Disruptor II','ruta/a/foto25.jpg',1);
/*!40000 ALTER TABLE `prc_modelos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prc_noticias`
--

DROP TABLE IF EXISTS `prc_noticias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prc_noticias` (
  `id_noticia` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_tipo_noticia` int(10) unsigned NOT NULL,
  `titulo_noticia` varchar(255) NOT NULL,
  `foto_noticia` longtext NOT NULL,
  `contenido_noticia` text NOT NULL,
  `estado_noticia` tinyint(1) NOT NULL DEFAULT 1,
  `fecha_noticia` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_noticia`),
  KEY `fk_noticia_tipo_noticia` (`id_tipo_noticia`),
  CONSTRAINT `fk_noticia_tipo_noticia` FOREIGN KEY (`id_tipo_noticia`) REFERENCES `ctg_tipo_noticias` (`id_tipo_noticia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prc_noticias`
--

LOCK TABLES `prc_noticias` WRITE;
/*!40000 ALTER TABLE `prc_noticias` DISABLE KEYS */;
/*!40000 ALTER TABLE `prc_noticias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prc_pedidos`
--

DROP TABLE IF EXISTS `prc_pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prc_pedidos` (
  `id_pedido` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_cliente` int(10) unsigned NOT NULL,
  `forma_pago_pedido` enum('Efectivo','Transferencia') NOT NULL DEFAULT 'Efectivo',
  `fecha_pedido` timestamp NOT NULL DEFAULT current_timestamp(),
  `estado_pedido` enum('Inactivo','En proceso','Entregado') NOT NULL DEFAULT 'En proceso',
  PRIMARY KEY (`id_pedido`),
  KEY `fk_pedido_cliente` (`id_cliente`),
  CONSTRAINT `fk_pedido_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `prc_clientes` (`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prc_pedidos`
--

LOCK TABLES `prc_pedidos` WRITE;
/*!40000 ALTER TABLE `prc_pedidos` DISABLE KEYS */;
INSERT INTO `prc_pedidos` VALUES (1,1,'Efectivo','2024-03-06 04:33:11','Inactivo'),(2,2,'Transferencia','2024-03-06 04:33:11','Inactivo'),(3,3,'Efectivo','2024-03-06 04:33:11','Inactivo'),(4,4,'Transferencia','2024-03-06 04:33:11','Inactivo'),(5,5,'Efectivo','2024-03-06 04:33:11','Inactivo'),(6,6,'Transferencia','2024-03-06 04:33:11','Inactivo'),(7,7,'Efectivo','2024-03-06 04:33:11','Inactivo'),(8,8,'Transferencia','2024-03-06 04:33:11','Inactivo'),(9,9,'Efectivo','2024-03-06 04:33:11','Inactivo'),(10,10,'Transferencia','2024-03-06 04:33:11','Inactivo'),(11,11,'Efectivo','2024-03-06 04:33:11','Inactivo'),(12,12,'Transferencia','2024-03-06 04:33:11','Inactivo'),(13,13,'Efectivo','2024-03-06 04:33:11','Inactivo'),(14,14,'Transferencia','2024-03-06 04:33:11','Inactivo'),(15,15,'Efectivo','2024-03-06 04:33:11','Inactivo'),(16,16,'Transferencia','2024-03-06 04:33:11','Inactivo'),(17,17,'Efectivo','2024-03-06 04:33:11','Inactivo'),(18,18,'Transferencia','2024-03-06 04:33:11','Inactivo'),(19,19,'Efectivo','2024-03-06 04:33:11','Inactivo'),(20,20,'Transferencia','2024-03-06 04:33:11','Inactivo'),(21,21,'Efectivo','2024-03-06 04:33:11','Inactivo'),(22,22,'Transferencia','2024-03-06 04:33:11','Inactivo'),(23,23,'Efectivo','2024-03-06 04:33:11','Inactivo'),(24,24,'Transferencia','2024-03-06 04:33:11','Inactivo'),(25,25,'Efectivo','2024-03-06 04:33:11','Inactivo');
/*!40000 ALTER TABLE `prc_pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sec_roles`
--

DROP TABLE IF EXISTS `sec_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sec_roles` (
  `id_rol` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `descripcion_opc` varchar(40) NOT NULL,
  `estado_opc` tinyint(1) NOT NULL,
  `marcas_opc` tinyint(1) NOT NULL,
  `modelos_opc` tinyint(1) NOT NULL,
  `tallas_opc` tinyint(1) NOT NULL,
  `pedidos_opc` tinyint(1) NOT NULL,
  `tipo_noticias_opc` tinyint(1) NOT NULL,
  `noticias_opc` tinyint(1) NOT NULL,
  `comentarios_opc` tinyint(1) NOT NULL,
  `clientes_opc` tinyint(1) NOT NULL,
  `usuarios_opc` tinyint(1) NOT NULL,
  `roles_opc` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sec_roles`
--

LOCK TABLES `sec_roles` WRITE;
/*!40000 ALTER TABLE `sec_roles` DISABLE KEYS */;
INSERT INTO `sec_roles` VALUES (1,'Admin',1,1,1,1,1,1,1,1,1,1,1),(2,'Empleado',1,0,1,0,1,0,1,1,0,0,0),(3,'Vendedor',1,0,1,0,1,0,0,1,0,0,0),(4,'Asistente',1,1,1,1,0,0,0,1,1,0,0);
/*!40000 ALTER TABLE `sec_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sec_usuarios`
--

DROP TABLE IF EXISTS `sec_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sec_usuarios` (
  `id_usuario` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_rol` int(10) unsigned NOT NULL,
  `usuario_usuario` varchar(30) NOT NULL,
  `clave_usuario` varchar(255) NOT NULL,
  `nombre_usuario` varchar(255) NOT NULL,
  `apellido_usuario` varchar(255) DEFAULT NULL,
  `email_usuario` varchar(100) NOT NULL,
  `pin_usuario` varchar(6) NOT NULL,
  `estado_usuario` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `usuario_usuario` (`usuario_usuario`),
  KEY `fk_usuario_rol` (`id_rol`),
  CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`id_rol`) REFERENCES `sec_roles` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sec_usuarios`
--

LOCK TABLES `sec_usuarios` WRITE;
/*!40000 ALTER TABLE `sec_usuarios` DISABLE KEYS */;
INSERT INTO `sec_usuarios` VALUES (1,1,'admin01','$2y$10$aP8t6cRWFw29VBpgbNrLWuwDvQVME1O8kRzquocN8h/YgNKVtm/je','Adriana','Hernández','adriana.hernandez@example.com','123456',1),(2,2,'emp01','claveEmp01','Emilio','Pérez','emilio.perez@example.com','234567',1),(3,2,'emp02','claveEmp02','Elena','Sánchez','elena.sanchez@example.com','345678',1),(4,3,'vendedor01','claveVend01','Valentina','García','valentina.garcia@example.com','456789',1),(5,3,'vendedor02','claveVend02','Víctor','López','victor.lopez@example.com','567890',1),(6,3,'vendedor03','claveVend03','Verónica','Martínez','veronica.martinez@example.com','678901',1),(7,4,'asist01','claveAsist01','Andrea','Rodríguez','andrea.rodriguez@example.com','789012',1),(8,4,'asist02','claveAsist02','Alejandro','Gómez','alejandro.gomez@example.com','890123',1),(9,4,'asist03','claveAsist03','Ana','Torres','ana.torres@example.com','901234',1),(10,2,'emp03','claveEmp03','Esteban','Ramírez','esteban.ramirez@example.com','012345',0),(11,3,'vendedor04','claveVend04','Vanessa','Herrera','vanessa.herrera@example.com','123450',1),(12,2,'emp04','claveEmp04','Eva','González','eva.gonzalez@example.com','345612',1),(13,3,'vendedor05','claveVend05','Vicente','Díaz','vicente.diaz@example.com','456123',1),(14,4,'asist04','claveAsist04','Amanda','Soto','amanda.soto@example.com','561234',1),(15,4,'asist05','claveAsist05','Arturo','Herrera','arturo.herrera@example.com','612345',1),(16,2,'emp05','claveEmp05','Elisa','Cabrera','elisa.cabrera@example.com','123456',1),(17,3,'vendedor06','claveVend06','Valentín','Montes','valentin.montes@example.com','234567',1),(18,2,'emp06','claveEmp06','Enrique','Ortega','enrique.ortega@example.com','456789',1),(19,3,'vendedor07','claveVend07','Victoria','Cortés','victoria.cortes@example.com','567890',1),(20,4,'asist06','claveAsist06','Andrés','Santos','andres.santos@example.com','678901',1),(21,4,'asist07','claveAsist07','Alma','Cruz','alma.cruz@example.com','789012',1),(22,2,'emp07','claveEmp07','Eduardo','Ríos','eduardo.rios@example.com','890123',1),(23,3,'vendedor08','claveVend08','Vanesa','Iglesias','vanesa.iglesias@example.com','901234',1),(24,2,'emp08','claveEmp08','Antonio','Luna','antonio.luna@example.com','234561',1),(25,2,'emp09','claveEmp09','Angela','Mendoza','angela.mendoza@example.com','345678',1);
/*!40000 ALTER TABLE `sec_usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'db_ynwa'
--

--
-- Dumping routines for database 'db_ynwa'
--
/*!50003 DROP FUNCTION IF EXISTS `idmin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `idmin`(tabla VARCHAR(255)) RETURNS int(11)
BEGIN
    DECLARE min_id INT;

    CASE tabla
        WHEN 'sec_usuarios' THEN
            SELECT MIN(id_usuario) INTO min_id FROM sec_usuarios;
        WHEN 'sec_roles' THEN
            SELECT MIN(id_rol) INTO min_id FROM sec_roles;
        ELSE
            SET min_id = NULL;
    END CASE;

    RETURN min_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-05 22:38:25
