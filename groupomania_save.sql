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
-- Table structure for table `commentaire`
--

DROP TABLE IF EXISTS `commentaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commentaire` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `commentaire_post` text NOT NULL,
  `date_commentaire` datetime NOT NULL,
  `user_commentaire` smallint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id_commentaire` (`user_commentaire`),
  CONSTRAINT `fk_user_id_commentaire` FOREIGN KEY (`user_commentaire`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentaire`
--

LOCK TABLES `commentaire` WRITE;
/*!40000 ALTER TABLE `commentaire` DISABLE KEYS */;
/*!40000 ALTER TABLE `commentaire` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like_dislike`
--

DROP TABLE IF EXISTS `like_dislike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like_dislike` (
  `like_post` smallint unsigned DEFAULT '0',
  `dislike_post` smallint unsigned DEFAULT '0',
  `utilisateur_like` smallint unsigned DEFAULT NULL,
  `utilisateur_dislike` smallint unsigned DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `contenu_multimedia` varchar(256) DEFAULT NULL,
  `date_post` datetime NOT NULL,
  `user_post` smallint unsigned NOT NULL,
  PRIMARY KEY (`id`,`user_post`),
  KEY `fk_user_id_post` (`user_post`),
  FULLTEXT KEY `ind_full_titre_contenu` (`titre`,`contenu_text`),
  CONSTRAINT `fk_user_id_post` FOREIGN KEY (`user_post`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
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
  `email` varchar(80) NOT NULL,
  `password` text NOT NULL,
  `type_droit` varchar(20) NOT NULL DEFAULT 'utilisateur',
  `email_mask` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'TEST','Test','test@test.fr','test1','utilisateur','test@test.fr'),(4,'Test 2','Test 2','Test2@test2.fr','test2','utilisateur','test2@test2.fr'),(5,'Test 3','Test 3','Test3@test3.fr','test3','utilisateur','test3@test3.fr'),(7,'Test 4','Test 4','Test@test4.fr','Test4!','utilisateur','test3@test3.fr');
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

-- Dump completed on 2020-11-29 14:21:51
