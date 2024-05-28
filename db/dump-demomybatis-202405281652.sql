-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: demomybatis
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_group`
--

DROP TABLE IF EXISTS `tbl_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_group` (
  `id_group` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_group`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_group`
--

LOCK TABLES `tbl_group` WRITE;
/*!40000 ALTER TABLE `tbl_group` DISABLE KEYS */;
INSERT INTO `tbl_group` VALUES (2,'Group 1','Description for Group 1'),(3,'Group 2','Description for Group 2'),(4,'Group 3','Description for Group 3'),(5,'test update','test update group'),(13,'test (users)','test add group and add user');
/*!40000 ALTER TABLE `tbl_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_group_users`
--

DROP TABLE IF EXISTS `tbl_group_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_group_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_group` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tbl_group_users_tbl_group_FK` (`id_group`),
  KEY `tbl_group_users_tbl_users_FK` (`id_user`),
  CONSTRAINT `tbl_group_users_tbl_group_FK` FOREIGN KEY (`id_group`) REFERENCES `tbl_group` (`id_group`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `tbl_group_users_tbl_users_FK` FOREIGN KEY (`id_user`) REFERENCES `tbl_users` (`id_user`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_group_users`
--

LOCK TABLES `tbl_group_users` WRITE;
/*!40000 ALTER TABLE `tbl_group_users` DISABLE KEYS */;
INSERT INTO `tbl_group_users` VALUES (1,50,2),(2,51,2),(3,53,2),(4,50,13),(5,51,13),(6,53,13),(7,50,5),(8,51,5),(9,39,5),(10,41,5),(11,42,5),(33,39,4),(34,41,4);
/*!40000 ALTER TABLE `tbl_group_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_users`
--

DROP TABLE IF EXISTS `tbl_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_users` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone_number` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_users`
--

LOCK TABLES `tbl_users` WRITE;
/*!40000 ALTER TABLE `tbl_users` DISABLE KEYS */;
INSERT INTO `tbl_users` VALUES (39,'Frank Green','frankgreen@example.com','8901234567'),(41,'Hank Lee','hanklee@example.com','0123456789'),(42,'John Doe','john.doe@example.com','1234567890'),(44,'Alice Johnson','alice.johnson@example.com','3456789012'),(45,'Bob Brown','bob.brown@example.com','4567890123'),(46,'Charlie Davis','charlie.davis@example.com','5678901234'),(47,'Diana Evans','diana.evans@example.com','6789012345'),(48,'Frank Green','frank.green@example.com','7890123456'),(49,'Grace Harris','grace.harris@example.com','8901234567'),(50,'Henry Lee','henry.lee@example.com','9012345678'),(51,'Ivy Martin','ivy.martin@example.com','0123456789'),(52,'Jack King','jack.king@example.com','1234567891'),(53,'Karen Lewis','karen.lewis@example.com','2345678902'),(54,'Larry White','larry.white@example.com','3456789013'),(55,'Megan Young','megan.young@example.com','4567890124'),(56,'Nate Clark','nate.clark@example.com','5678901235'),(57,'Olivia Hall','olivia.hall@example.com','6789012346'),(58,'Paul Walker','paul.walker@example.com','7890123457'),(59,'Quinn Scott','quinn.scott@example.com','8901234568'),(60,'Rachel Adams','rachel.adams@example.com','9012345679'),(61,'Sam Nelson','sam.nelson@example.com','0123456780'),(62,'Tina Carter','tina.carter@example.com','1234567892'),(63,'Ulysses Reed','ulysses.reed@example.com','2345678903'),(64,'Vera Brooks','vera.brooks@example.com','3456789014'),(65,'Walt Foster','walt.foster@example.com','4567890125'),(66,'Xena Green','xena.green@example.com','5678901236'),(67,'Yvonne Hunter','yvonne.hunter@example.com','6789012347'),(68,'Zachary Ortiz','zachary.ortiz@example.com','7890123458'),(69,'Amy Rivera','amy.rivera@example.com','8901234569'),(70,'Brian Shaw','brian.shaw@example.com','9012345670'),(72,'Tứ Nguyễn','sing19022001@gmail.com','0967163867'),(77,'Tứ Nguyễn sd22322','sing19022001@gmail.com','0967163867'),(78,'sda','sing19022001@gmail.com','0967163867'),(79,'Tứ Nguyễn yjjjjujuty','sing19022001@gmail.com','0967163867'),(80,'Tứ Nguyễnaa','sing19022001@gmail.com','0967163867');
/*!40000 ALTER TABLE `tbl_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'demomybatis'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-28 16:52:37
