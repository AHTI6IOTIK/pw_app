-- MySQL dump 10.15  Distrib 10.0.36-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: api_pw
-- ------------------------------------------------------
-- Server version	10.0.36-MariaDB-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user_operations`
--

DROP TABLE IF EXISTS `user_operations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_operations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `operation_type` varchar(128) NOT NULL,
  `operation_value` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_operations`
--

LOCK TABLES `user_operations` WRITE;
/*!40000 ALTER TABLE `user_operations` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_operations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_payment_account`
--

DROP TABLE IF EXISTS `user_payment_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_payment_account` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `balance` double unsigned DEFAULT NULL,
  `last_three_operations` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_payment_account`
--

LOCK TABLES `user_payment_account` WRITE;
/*!40000 ALTER TABLE `user_payment_account` DISABLE KEYS */;
INSERT INTO `user_payment_account` VALUES (1,1,500,NULL),(22,31,521,'a:3:{i:0;s:42:\"transfer to :  on sum: 1. date: 11-12-2018\";i:1;s:59:\"transfer from: im tewqqst111, on sum: 11, date: 11-12-2018.\";i:2;s:59:\"transfer from: im tewqqst111, on sum: 11, date: 11-12-2018.\";}'),(23,32,500,NULL),(24,33,500,NULL),(25,34,500,NULL),(26,35,664,'a:3:{i:0;s:58:\"transfer from: im tewqqst111, on sum: 1, date: 11-12-2018.\";i:1;s:58:\"transfer from: im tewqqst111, on sum: 1, date: 11-12-2018.\";i:2;s:58:\"transfer from: im tewqqst111, on sum: 1, date: 11-12-2018.\";}'),(27,36,500,NULL),(28,37,337,'a:3:{i:0;s:20:\"transfer to user: 40\";i:1;s:20:\"transfer to user: 40\";i:2;s:58:\"transfer from: im tewqqst111, on sum: 1, date: 11-12-2018.\";}'),(29,38,51,'a:1:{i:0;s:58:\"transfer from: im tewqqst111, on sum: 1, date: 11-12-2018.\";}'),(30,39,0,NULL),(31,40,1628,'a:3:{i:0;s:46:\"transfer from : 35 on sum: 1. date: 09-12-2018\";i:1;s:46:\"transfer from : 50 on sum: 1. date: 11-12-2018\";i:2;s:46:\"transfer from : 53 on sum: 1. date: 11-12-2018\";}'),(32,41,500,NULL),(33,42,513,'a:2:{i:0;s:58:\"transfer from: im tewqqst111, on sum: 1, date: 11-12-2018.\";i:1;s:59:\"transfer from: im tewqqst111, on sum: 12, date: 11-12-2018.\";}'),(34,43,500,NULL),(35,44,500,NULL),(36,45,500,NULL),(37,46,500,NULL),(38,47,500,NULL),(39,48,500,NULL),(40,49,136,'a:3:{i:0;s:53:\"transfer to: im test111, on sum: 1, date: 11-12-2018.\";i:1;s:50:\"transfer to: 123@123, on sum: 3, date: 11-12-2018.\";i:2;s:50:\"transfer to: 123@123, on sum: 2, date: 11-12-2018.\";}'),(41,50,499,'a:1:{i:0;s:44:\"transfer to : 40 on sum: 1. date: 11-12-2018\";}'),(42,51,526,'a:3:{i:0;s:58:\"transfer from: im tewqqst111, on sum: 1, date: 11-12-2018.\";i:1;s:58:\"transfer from: im tewqqst111, on sum: 1, date: 11-12-2018.\";i:2;s:58:\"transfer from: im tewqqst111, on sum: 1, date: 11-12-2018.\";}'),(43,52,616,'a:3:{i:0;s:58:\"transfer from: im tewqqst111, on sum: 3, date: 11-12-2018.\";i:1;s:58:\"transfer from: im tewqqst111, on sum: 2, date: 11-12-2018.\";i:2;s:60:\"transfer from: im tewqqst111, on sum: 111, date: 11-12-2018.\";}'),(44,53,504,'a:3:{i:0;s:44:\"transfer from :  on sum: 1. date: 11-12-2018\";i:1;s:44:\"transfer from :  on sum: 1. date: 11-12-2018\";i:2;s:57:\"transfer from : im tewqqst111 on sum: 1. date: 11-12-2018\";}'),(45,54,500,NULL),(46,55,501,'a:1:{i:0;s:58:\"transfer from: im tewqqst111, on sum: 1, date: 11-12-2018.\";}'),(47,56,500,NULL),(48,57,500,NULL),(49,58,500,NULL),(50,59,502,'a:2:{i:0;s:58:\"transfer from: im tewqqst111, on sum: 1, date: 11-12-2018.\";i:1;s:58:\"transfer from: im tewqqst111, on sum: 1, date: 11-12-2018.\";}'),(51,60,500,NULL),(52,61,500,NULL),(53,62,500,NULL),(54,63,500,NULL),(55,64,500,NULL),(56,65,500,NULL),(57,66,501,'a:1:{i:0;s:58:\"transfer from: im tewqqst111, on sum: 1, date: 11-12-2018.\";}'),(58,67,500,NULL),(59,68,500,NULL);
/*!40000 ALTER TABLE `user_payment_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role_name` varchar(48) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,'Пользователь'),(2,'Привилигерованный пользователь'),(3,'Администратор');
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `payment_account_id` int(11) unsigned DEFAULT NULL,
  `role_id` int(11) NOT NULL DEFAULT '1',
  `blocked` enum('0','1') NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COMMENT='payment_account';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (31,'eee','2dqw2222fiwe2qwd21212l@fil.ru','e2a4e737747313b6e84d783d5d735bb7',22,2,'0'),(32,'eee','2dqw1242222fiwe2qwd21212l@fil.ru','b76d4c75d0a2a80179a1ba1b9d059bf0',23,1,'1'),(33,'eee','222@yy.ru','1a03f61f17b133fccae8f70dc9ce709d',24,1,'1'),(34,'im test','im_test@us.ru','ed7726a9849f9363a8ace0997eac5153',25,1,'1'),(35,'im test111','im_34t34gte123st@us.ru','5781b743e381518a58dbb14deeb048ec',26,1,'0'),(36,'im test111','i12m_34t34gte123st@us.ru','5781b743e381518a58dbb14deeb048ec',27,1,'1'),(37,'im tewqqst111','22d2@yyw.ru','5781b743e381518a58dbb14deeb048ec',28,1,'1'),(38,'im test111','i513m_34t34gte123st@us.ru','5781b743e381518a58dbb14deeb048ec',29,1,'1'),(39,'im test111','i513m_312rf4t34gte123st@us.ru','5781b743e381518a58dbb14deeb048ec',30,1,'1'),(40,'im test111','i513m_312rfqwf4t34gte123st@us.ru','5781b743e381518a58dbb14deeb048ec',31,1,'0'),(41,'im test111','i513m_qwf312rfqwf4t34gte123st@us.ru','5781b743e381518a58dbb14deeb048ec',32,1,'1'),(42,'im tewqqst111','12$egw','16bc14cc388284b70cd86f35ff72055d',33,1,'0'),(43,'im tewqqst111','ppp@p.ru','16bc14cc388284b70cd86f35ff72055d',34,1,'1'),(44,'im tewqqst111','ppp12@p.ru','16bc14cc388284b70cd86f35ff72055d',35,1,'1'),(45,'im tewqqst111','p1pp12@p.ru','16bc14cc388284b70cd86f35ff72055d',36,1,'0'),(46,'im tewqqst111','p1pp1122@p.ru','16bc14cc388284b70cd86f35ff72055d',37,1,'1'),(47,'im tewqqst111','p2p2@p.ru','16bc14cc388284b70cd86f35ff72055d',38,1,'0'),(48,'im tewqqst111','p211p2@p.ru','16bc14cc388284b70cd86f35ff72055d',39,1,'1'),(49,'im tewqqst111','111@11.ru','ed7726a9849f9363a8ace0997eac5153',40,1,'1'),(50,'qwe','11@1.ru','0e67ea4ef64fc49f513262a45953a38c',41,1,'0'),(51,'123','123','0e67ea4ef64fc49f513262a45953a38c',42,1,'1'),(52,'123@123','123@123','ed7726a9849f9363a8ace0997eac5153',43,1,'1'),(53,'im tewqqst111','111@11.ru123','ed7726a9849f9363a8ace0997eac5153',44,1,'0'),(54,'im tewqqst111','111@11.ru1231','ed7726a9849f9363a8ace0997eac5153',45,1,'0'),(55,'123@12311','12123@123','ed7726a9849f9363a8ace0997eac5153',46,1,'1'),(56,'123','123@321','ed7726a9849f9363a8ace0997eac5153',47,1,'1'),(57,'321','321@321','ed7726a9849f9363a8ace0997eac5153',48,1,'1'),(58,'321','321222','ed7726a9849f9363a8ace0997eac5153',49,1,'1'),(59,'12e','12e','d456d6a0003fdfb19f1ceb07e58f3a9c',50,1,'1'),(60,'123','32122','edbcb3b430863a6e1e7a1c8609e796b8',51,1,'1'),(61,'321','33322','b8fed0f5a491180e7acfc6f9255dfef1',52,1,'1'),(62,'321','321','ed7726a9849f9363a8ace0997eac5153',53,1,'1'),(63,'321','332211','ed7726a9849f9363a8ace0997eac5153',54,1,'1'),(64,'332211','3322111','ed7726a9849f9363a8ace0997eac5153',55,1,'1'),(65,'421','421','f8e7f0f91d56959f847424b3e48011b6',56,1,'1'),(66,'Test FeedBack','222@22.ru','ed7726a9849f9363a8ace0997eac5153',57,1,'1'),(67,'im','1@1.ru','ed7726a9849f9363a8ace0997eac5153',58,1,'0'),(68,'admin','admin@adm.ru','ed7726a9849f9363a8ace0997eac5153',59,3,'0');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-12  1:33:49
