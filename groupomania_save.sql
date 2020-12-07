-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Current Database: `groupomania`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `groupomania` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `groupomania`;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `comment_post` text NOT NULL,
  `date_comment` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_comment` smallint unsigned NOT NULL,
  `comment_post_id` smallint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_post_comment` (`comment_post_id`),
  KEY `fk_user_id_comment` (`user_comment`),
  CONSTRAINT `fk_post_comment` FOREIGN KEY (`comment_post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user_id_comment` FOREIGN KEY (`user_comment`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like_dislike`
--

DROP TABLE IF EXISTS `like_dislike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like_dislike` (
  `like_dislike` tinyint DEFAULT '0',
  `user_like` smallint unsigned NOT NULL,
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `like_post_id` smallint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_post_like` (`like_post_id`),
  KEY `fk_user_id_like` (`user_like`),
  CONSTRAINT `fk_post_like` FOREIGN KEY (`like_post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user_id_like` FOREIGN KEY (`user_like`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like_dislike`
--

LOCK TABLES `like_dislike` WRITE;
/*!40000 ALTER TABLE `like_dislike` DISABLE KEYS */;
/*!40000 ALTER TABLE `like_dislike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `titre` varchar(200) NOT NULL,
  `contenu_text` text,
  `contenu_media` varchar(256) DEFAULT NULL,
  `date_post` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_post` smallint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id_post` (`user_post`),
  FULLTEXT KEY `ind_full_titre_contenu` (`titre`,`contenu_text`),
  CONSTRAINT `fk_user_id_post` FOREIGN KEY (`user_post`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (4,'Test Post 2','Post essai 2',NULL,'2020-12-03 23:31:27',33),(5,'Faut\'il faire un essai ?','Il faut faire un essai !',NULL,'2020-12-05 21:00:42',35),(16,'Il faut faire un essai ','Il faut faire un essai !',NULL,'2020-12-05 21:18:27',35),(17,'Il faut faire un essai ','Il faut faire un essai !',NULL,'2020-12-05 21:20:28',35);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(30) NOT NULL,
  `prenom` varchar(30) NOT NULL,
  `email` varchar(220) NOT NULL,
  `password` varchar(60) NOT NULL,
  `type_droit` varchar(20) NOT NULL DEFAULT 'utilisateur',
  `email_mask` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (33,'Test 10','Test 10','3a807b2fa2f2ea6dcb46e37cbba3a4085a28fa5711b72418fb0015f8aa74eb00311d5a3090e13648553f296667f2f3cf6679e86a13e1c183f07ba73a5f5fc672300dbe2acc2cee1656f62bcb4c43d4034f7826cbabebb68953e57e577cd55c104bcf6e1ec4d2adfa2d347d3ed98c','$2b$10$a.8.VtOOP.ErB9KAtLRt5.RNfvq1SlcE6nQrLlk/Y0.sJXxjHxu9u','utilisateur','tes***@*****fr'),(34,'Test 11','Test 11','93f7dba09f439c91f08a0855ff6411da3d8ac5c25b7df00a4010193bb3af04f4d26df5975916cb6f8ee506d8dac5daa3ed6e92b40977badf05b32bd03c14fd61f0dfc05c68495b83c1001231026f2c9d4465f200bc539c6f5982dc614d76fdd704fe1daf84c370b65c3e47d6ec26','$2b$10$5k8kGhi2xAnZaUufgbO8GeIOYQwyqFrQjnrGD7hfickSbmEXz0GqG','utilisateur','tes***@*****fr'),(35,'Test 12','Test 12','e2ec65807c604a37a219fc42f2e45a2a6de5980be80004bc53668d92378427d77fd20c185812f4c115ab4deaa22d67ae4b9517b30455eca99bf5c09aa1e6d390c641ca8a591e161b212b066b7ae60e647e6245550e0227828f7f6f453dd8d3aa2a58a7612b8885737cc935348afd','$2b$10$qjB8GbG6ewwWjsJi7O18Jubg2Dvlf9Rm5uJxtFp5eXj5rd8qVbn5G','utilisateur','tes***@*****fr'),(68,'Test 13','Test 13','8dc6d38595666d22c5128b14351eeada23c1446fb15ecd6b661e04e118d757aa4ea40bcb17ef391160ba48a8208dac1bd1717bf2daf22911729e08a128b3ccad7c861dc485480724c7300873024d02863b8a50b09c8cd8e750477f4f16b905cb1df279a9a31764f7a8a309f27bda','$2b$10$fICFky2KymbDzgOlDjUYl.dWtLiqbyQhoJU9CM5UUk.JGkpW/LPw2','utilisateur','tes***@*****fr'),(69,'Test 14','Test 14','62aca2a602ed267308d868e79b832ba614d601c05db43ec959ee8752458b58575d90b9a3a1bc54a154523ca37c415bb58c933f2ff566273f753c55759a234bee0c4c7554b9582cdcb3c8bfeac59edad090128d0c87575f72b481d8bf7bc140a526301b665006af0bdfe3be9cde7c','$2b$10$n4IIskYrOU7uxRCODc7MuOz.I3UXs0GqHo9A.UJLqrPgi8MUSJj1K','utilisateur','tes***@*****fr');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-07 17:09:52
