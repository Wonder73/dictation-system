/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : dictation_system

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-11-23 21:12:04
*/

SET FOREIGN_KEY_CHECKS=0;

CREATE DATABASE IF NOT EXISTS `dictation_system` CHARSET UTF8;

USE `dictation_system`;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `salt` varchar(128) NOT NULL,
  `data` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'wonder', 'a7efe6cb351c1511336061c868b07dee', 'ajsldjfaoweijrslnsjf&(&(JHT^&%&HGTR%%*GJHGK**IG大姐夫阿什顿发斯蒂芬阿什顿发', '2018-10-11 21:36:52');

-- ----------------------------
-- Table structure for admin_login_record
-- ----------------------------
DROP TABLE IF EXISTS `admin_login_record`;
CREATE TABLE `admin_login_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_id` int(11) NOT NULL,
  `ip` varchar(16) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `admin_id` (`admin_id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_login_record
-- ----------------------------
INSERT INTO `admin_login_record` VALUES ('1', '1', '10.32.1.96', '2018-10-15 22:46:10');
INSERT INTO `admin_login_record` VALUES ('2', '1', '10.32.1.96', '2018-10-15 22:56:28');
INSERT INTO `admin_login_record` VALUES ('3', '1', '10.32.1.96', '2018-10-16 00:22:33');
INSERT INTO `admin_login_record` VALUES ('4', '1', '127.0.0.1', '2018-10-16 10:09:33');
INSERT INTO `admin_login_record` VALUES ('5', '1', '10.32.1.96', '2018-10-16 15:25:32');
INSERT INTO `admin_login_record` VALUES ('6', '1', '10.16.24.29', '2018-10-16 16:23:05');
INSERT INTO `admin_login_record` VALUES ('7', '1', '10.16.24.29', '2018-11-14 21:18:39');
INSERT INTO `admin_login_record` VALUES ('8', '1', '10.16.24.29', '2018-11-14 21:18:38');
INSERT INTO `admin_login_record` VALUES ('9', '1', '10.16.24.29', '2018-11-15 19:36:09');
INSERT INTO `admin_login_record` VALUES ('10', '1', '10.16.24.29', '2018-11-15 20:22:34');
INSERT INTO `admin_login_record` VALUES ('11', '1', '10.16.24.29', '2018-11-15 22:22:59');
INSERT INTO `admin_login_record` VALUES ('12', '1', '192.168.13.94', '2018-11-15 23:25:32');
INSERT INTO `admin_login_record` VALUES ('13', '1', '192.168.13.94', '2018-11-15 23:25:50');
INSERT INTO `admin_login_record` VALUES ('14', '1', '192.168.13.94', '2018-11-15 23:45:29');
INSERT INTO `admin_login_record` VALUES ('15', '1', '192.168.13.94', '2018-11-17 21:30:27');

-- ----------------------------
-- Table structure for apply
-- ----------------------------
DROP TABLE IF EXISTS `apply`;
CREATE TABLE `apply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `nickname` varchar(32) NOT NULL,
  `email` varchar(64) NOT NULL,
  `description` text,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=88 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of apply
-- ----------------------------

-- ----------------------------
-- Table structure for dictation_record
-- ----------------------------
DROP TABLE IF EXISTS `dictation_record`;
CREATE TABLE `dictation_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `did_dictation_words` text NOT NULL,
  `values` text NOT NULL,
  `error_words` text NOT NULL,
  `timing` int(11) NOT NULL,
  `achievement` int(11) NOT NULL,
  `punish` int(11) NOT NULL DEFAULT '0',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dictation_record
-- ----------------------------
INSERT INTO `dictation_record` VALUES ('25', '1', '[{\"english\":\"clumsy\",\"parts\":\"adj\",\"chinese\":\"笨拙的\"},{\"english\":\"burden\",\"parts\":\"n\",\"chinese\":\"负担\"}]', '{\"word_0\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_1\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false}}', '[{\"english\":\"clumsy\",\"parts\":\"adj\",\"chinese\":\"笨拙的\"},{\"english\":\"burden\",\"parts\":\"n\",\"chinese\":\"负担\"}]', '30', '0', '0', '2018-09-17 23:04:44');
INSERT INTO `dictation_record` VALUES ('26', '1', '[{\"english\":\"post\",\"parts\":\"n\",\"chinese\":\"姿势\"},{\"english\":\"clumsy\",\"parts\":\"adj\",\"chinese\":\"笨拙的\"},{\"english\":\"burden\",\"parts\":\"n\",\"chinese\":\"负担\"},{\"english\":\"roast\",\"parts\":\"v\",\"chinese\":\"烤\"},{\"english\":\"ounce\",\"parts\":\"n\",\"chinese\":\"盎司\"},{\"english\":\"convenience\",\"parts\":\"n\",\"chinese\":\"方便\"},{\"english\":\"resign\",\"parts\":\"vi\",\"chinese\":\"辞职\"},{\"english\":\"termain\",\"parts\":\"n\",\"chinese\":\"终点\"}]', '{\"word_0\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_1\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_2\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_3\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_4\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_5\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_6\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_7\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false}}', '[{\"english\":\"post\",\"parts\":\"n\",\"chinese\":\"姿势\"},{\"english\":\"clumsy\",\"parts\":\"adj\",\"chinese\":\"笨拙的\"},{\"english\":\"burden\",\"parts\":\"n\",\"chinese\":\"负担\"},{\"english\":\"roast\",\"parts\":\"v\",\"chinese\":\"烤\"},{\"english\":\"ounce\",\"parts\":\"n\",\"chinese\":\"盎司\"},{\"english\":\"convenience\",\"parts\":\"n\",\"chinese\":\"方便\"},{\"english\":\"resign\",\"parts\":\"vi\",\"chinese\":\"辞职\"},{\"english\":\"termain\",\"parts\":\"n\",\"chinese\":\"终点\"}]', '86', '0', '0', '2018-09-18 10:13:30');
INSERT INTO `dictation_record` VALUES ('27', '1', '[{\"english\":\"iceberg\",\"parts\":\"n\",\"chinese\":\"冰山\"},{\"english\":\"port\",\"parts\":\"n\",\"chinese\":\"港\"},{\"english\":\"scratch\",\"parts\":\"n\",\"chinese\":\"抓痕\"},{\"english\":\"abstract\",\"parts\":\"adj\",\"chinese\":\"抽象\"},{\"english\":\"yours\",\"parts\":\"pron\",\"chinese\":\"你的\"},{\"english\":\"consciousness\",\"parts\":\"n\",\"chinese\":\"意识\"},{\"english\":\"statement\",\"parts\":\"n\",\"chinese\":\"声明\"},{\"english\":\"replace\",\"parts\":\"v\",\"chinese\":\"替换\"},{\"english\":\"mold\",\"parts\":\"vt\",\"chinese\":\"塑造\"},{\"english\":\"equipment\",\"parts\":\"n\",\"chinese\":\"设备\"}]', '{\"word_0\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_1\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_2\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_3\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_4\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_5\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_6\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_7\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_8\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_9\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false}}', '[{\"english\":\"iceberg\",\"parts\":\"n\",\"chinese\":\"冰山\"},{\"english\":\"port\",\"parts\":\"n\",\"chinese\":\"港\"},{\"english\":\"scratch\",\"parts\":\"n\",\"chinese\":\"抓痕\"},{\"english\":\"abstract\",\"parts\":\"adj\",\"chinese\":\"抽象\"},{\"english\":\"yours\",\"parts\":\"pron\",\"chinese\":\"你的\"},{\"english\":\"consciousness\",\"parts\":\"n\",\"chinese\":\"意识\"},{\"english\":\"statement\",\"parts\":\"n\",\"chinese\":\"声明\"},{\"english\":\"replace\",\"parts\":\"v\",\"chinese\":\"替换\"},{\"english\":\"mold\",\"parts\":\"vt\",\"chinese\":\"塑造\"},{\"english\":\"equipment\",\"parts\":\"n\",\"chinese\":\"设备\"}]', '67', '0', '1', '2018-09-18 10:14:22');
INSERT INTO `dictation_record` VALUES ('28', '1', '[{\"english\":\"iceberg\",\"parts\":\"n\",\"chinese\":\"冰山\"},{\"english\":\"mold\",\"parts\":\"vt\",\"chinese\":\"塑造\"},{\"english\":\"yours\",\"parts\":\"pron\",\"chinese\":\"你的\"},{\"english\":\"consciousness\",\"parts\":\"n\",\"chinese\":\"意识\"},{\"english\":\"abstract\",\"parts\":\"adj\",\"chinese\":\"抽象\"},{\"english\":\"equipment\",\"parts\":\"n\",\"chinese\":\"设备\"},{\"english\":\"statement\",\"parts\":\"n\",\"chinese\":\"声明\"},{\"english\":\"scratch\",\"parts\":\"n\",\"chinese\":\"抓痕\"},{\"english\":\"replace\",\"parts\":\"v\",\"chinese\":\"替换\"},{\"english\":\"port\",\"parts\":\"n\",\"chinese\":\"港\"}]', '{\"word_0\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_1\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_2\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_3\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_4\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_5\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_6\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_7\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_8\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_9\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false}}', '[{\"english\":\"iceberg\",\"parts\":\"n\",\"chinese\":\"冰山\"},{\"english\":\"mold\",\"parts\":\"vt\",\"chinese\":\"塑造\"},{\"english\":\"yours\",\"parts\":\"pron\",\"chinese\":\"你的\"},{\"english\":\"consciousness\",\"parts\":\"n\",\"chinese\":\"意识\"},{\"english\":\"abstract\",\"parts\":\"adj\",\"chinese\":\"抽象\"},{\"english\":\"equipment\",\"parts\":\"n\",\"chinese\":\"设备\"},{\"english\":\"statement\",\"parts\":\"n\",\"chinese\":\"声明\"},{\"english\":\"scratch\",\"parts\":\"n\",\"chinese\":\"抓痕\"},{\"english\":\"replace\",\"parts\":\"v\",\"chinese\":\"替换\"},{\"english\":\"port\",\"parts\":\"n\",\"chinese\":\"港\"}]', '52', '0', '1', '2018-09-18 11:03:12');
INSERT INTO `dictation_record` VALUES ('29', '1', '[{\"english\":\"burden\",\"parts\":\"n\",\"chinese\":\"负担\"},{\"english\":\"clumsy\",\"parts\":\"adj\",\"chinese\":\"笨拙的\"},{\"english\":\"ounce\",\"parts\":\"n\",\"chinese\":\"盎司\"}]', '{\"word_0\":{\"english\":\"burden\",\"chinese\":\"n.负担\",\"pass\":true},\"word_1\":{\"english\":\"clumsy\",\"chinese\":\"adj.笨拙的\",\"pass\":true},\"word_2\":{\"english\":\"ounce\",\"chinese\":\"n.盎司\",\"pass\":true}}', '[]', '7825', '99', '0', '2018-09-20 17:51:19');
INSERT INTO `dictation_record` VALUES ('30', '1', '[{\"english\":\"ounce\",\"parts\":\"n\",\"chinese\":\"盎司\"},{\"english\":\"burden\",\"parts\":\"n\",\"chinese\":\"负担\"},{\"english\":\"clumsy\",\"parts\":\"adj\",\"chinese\":\"笨拙的\"}]', '{\"word_0\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_1\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_2\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false}}', '[{\"english\":\"ounce\",\"parts\":\"n\",\"chinese\":\"盎司\"},{\"english\":\"burden\",\"parts\":\"n\",\"chinese\":\"负担\"},{\"english\":\"clumsy\",\"parts\":\"adj\",\"chinese\":\"笨拙的\"}]', '1320', '0', '0', '2018-09-23 15:44:07');
INSERT INTO `dictation_record` VALUES ('31', '1', '[{\"english\":\"ounce\",\"parts\":\"n\",\"chinese\":\"盎司\"},{\"english\":\"burden\",\"parts\":\"n\",\"chinese\":\"负担\"},{\"english\":\"clumsy\",\"parts\":\"adj\",\"chinese\":\"笨拙的\"}]', '{\"word_0\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_1\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_2\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false}}', '[{\"english\":\"ounce\",\"parts\":\"n\",\"chinese\":\"盎司\"},{\"english\":\"burden\",\"parts\":\"n\",\"chinese\":\"负担\"},{\"english\":\"clumsy\",\"parts\":\"adj\",\"chinese\":\"笨拙的\"}]', '676', '0', '0', '2018-09-23 15:57:15');
INSERT INTO `dictation_record` VALUES ('32', '1', '[{\"english\":\"clumsy\",\"parts\":\"adj\",\"chinese\":\"笨拙的\"},{\"english\":\"ounce\",\"parts\":\"n\",\"chinese\":\"盎司\"},{\"english\":\"burden\",\"parts\":\"n\",\"chinese\":\"负担\"}]', '{\"word_0\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_1\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_2\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false}}', '[{\"english\":\"clumsy\",\"parts\":\"adj\",\"chinese\":\"笨拙的\"},{\"english\":\"ounce\",\"parts\":\"n\",\"chinese\":\"盎司\"},{\"english\":\"burden\",\"parts\":\"n\",\"chinese\":\"负担\"}]', '398', '0', '0', '2018-09-23 15:58:06');
INSERT INTO `dictation_record` VALUES ('33', '1', '[{\"english\":\"burden\",\"parts\":\"n\",\"chinese\":\"负担\"},{\"english\":\"clumsy\",\"parts\":\"adj\",\"chinese\":\"笨拙的\"}]', '{\"word_0\":{\"english\":\"burden\",\"chinese\":\"n.负担\",\"pass\":true},\"word_1\":{\"english\":\"clumsy\",\"chinese\":\"adj.笨拙的\",\"pass\":true}}', '[]', '5690', '100', '0', '2018-09-23 16:04:59');
INSERT INTO `dictation_record` VALUES ('34', '1', '[{\"english\":\"burden\",\"parts\":\"n\",\"chinese\":\"负担\"},{\"english\":\"clumsy\",\"parts\":\"adj\",\"chinese\":\"笨拙的\"}]', '{\"word_0\":{\"english\":\"burden\",\"chinese\":\"n.负担\",\"pass\":true},\"word_1\":{\"english\":\"clumsy\",\"chinese\":\"adj.笨拙的\",\"pass\":true}}', '[]', '5530', '100', '1', '2018-09-23 16:14:24');
INSERT INTO `dictation_record` VALUES ('35', '1', '[{\"english\":\"ounce\",\"parts\":\"n\",\"chinese\":\"盎司\"},{\"english\":\"termain\",\"parts\":\"n\",\"chinese\":\"终点\"},{\"english\":\"clumsy\",\"parts\":\"adj\",\"chinese\":\"笨拙的\"},{\"english\":\"burden\",\"parts\":\"n\",\"chinese\":\"负担\"},{\"english\":\"convenience\",\"parts\":\"n\",\"chinese\":\"方便\"}]', '{\"word_0\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_1\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_2\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_3\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_4\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false}}', '[{\"english\":\"ounce\",\"parts\":\"n\",\"chinese\":\"盎司\"},{\"english\":\"termain\",\"parts\":\"n\",\"chinese\":\"终点\"},{\"english\":\"clumsy\",\"parts\":\"adj\",\"chinese\":\"笨拙的\"},{\"english\":\"burden\",\"parts\":\"n\",\"chinese\":\"负担\"},{\"english\":\"convenience\",\"parts\":\"n\",\"chinese\":\"方便\"}]', '949', '0', '0', '2018-09-23 16:42:37');
INSERT INTO `dictation_record` VALUES ('37', '1', '[{\"english\":\"burden\",\"parts\":\"n\",\"chinese\":\"负担\"},{\"english\":\"ounce\",\"parts\":\"n\",\"chinese\":\"盎司\"},{\"english\":\"clumsy\",\"parts\":\"adj\",\"chinese\":\"笨拙的\"}]', '{\"word_0\":{\"english\":\"burder\",\"chinese\":\"n.负担\",\"pass\":false},\"word_1\":{\"english\":\"ounce\",\"chinese\":\"n.盎司\",\"pass\":true},\"word_2\":{\"english\":\"clumsy\",\"chinese\":\"adj.笨拙的\",\"pass\":true}}', '[{\"english\":\"burden\",\"parts\":\"n\",\"chinese\":\"负担\"}]', '16389', '66', '1', '2018-10-16 15:22:57');
INSERT INTO `dictation_record` VALUES ('38', '39', '[{\"english\":\"two\",\"parts\":\"num\",\"chinese\":\"二\"},{\"english\":\"one\",\"parts\":\"num\",\"chinese\":\"一\"}]', '{\"word_0\":{\"english\":\"two\",\"chinese\":\"num.二\",\"pass\":true},\"word_1\":{\"english\":\"one\",\"chinese\":\"num.一\",\"pass\":true}}', '[]', '3545', '100', '1', '2018-10-16 15:49:24');
INSERT INTO `dictation_record` VALUES ('39', '1', '[{\"english\":\"port\",\"parts\":\"n\",\"chinese\":\"港\"},{\"english\":\"yours\",\"parts\":\"pron\",\"chinese\":\"你的\"},{\"english\":\"consciousness\",\"parts\":\"n\",\"chinese\":\"意识\"},{\"english\":\"centimerter\",\"parts\":\"n\",\"chinese\":\"厘米\"},{\"english\":\"coarse\",\"parts\":\"adj\",\"chinese\":\"粗糙的\"},{\"english\":\"abstract\",\"parts\":\"adj\",\"chinese\":\"抽象\"},{\"english\":\"iceberg\",\"parts\":\"n\",\"chinese\":\"冰山\"},{\"english\":\"replace\",\"parts\":\"v\",\"chinese\":\"替换\"},{\"english\":\"mold\",\"parts\":\"vt\",\"chinese\":\"塑造\"},{\"english\":\"equipment\",\"parts\":\"n\",\"chinese\":\"设备\"}]', '{\"word_0\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_1\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_2\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_3\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_4\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_5\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_6\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_7\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_8\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_9\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false}}', '[{\"english\":\"port\",\"parts\":\"n\",\"chinese\":\"港\"},{\"english\":\"yours\",\"parts\":\"pron\",\"chinese\":\"你的\"},{\"english\":\"consciousness\",\"parts\":\"n\",\"chinese\":\"意识\"},{\"english\":\"centimerter\",\"parts\":\"n\",\"chinese\":\"厘米\"},{\"english\":\"coarse\",\"parts\":\"adj\",\"chinese\":\"粗糙的\"},{\"english\":\"abstract\",\"parts\":\"adj\",\"chinese\":\"抽象\"},{\"english\":\"iceberg\",\"parts\":\"n\",\"chinese\":\"冰山\"},{\"english\":\"replace\",\"parts\":\"v\",\"chinese\":\"替换\"},{\"english\":\"mold\",\"parts\":\"vt\",\"chinese\":\"塑造\"},{\"english\":\"equipment\",\"parts\":\"n\",\"chinese\":\"设备\"}]', '4854', '0', '0', '2018-11-14 21:06:52');
INSERT INTO `dictation_record` VALUES ('40', '1', '[{\"english\":\"centimerter\",\"parts\":\"n\",\"chinese\":\"厘米\"},{\"english\":\"consciousness\",\"parts\":\"n\",\"chinese\":\"意识\"},{\"english\":\"coarse\",\"parts\":\"adj\",\"chinese\":\"粗糙的\"},{\"english\":\"abstract\",\"parts\":\"adj\",\"chinese\":\"抽象\"},{\"english\":\"yours\",\"parts\":\"pron\",\"chinese\":\"你的\"},{\"english\":\"replace\",\"parts\":\"v\",\"chinese\":\"替换\"},{\"english\":\"equipment\",\"parts\":\"n\",\"chinese\":\"设备\"},{\"english\":\"mold\",\"parts\":\"vt\",\"chinese\":\"塑造\"},{\"english\":\"iceberg\",\"parts\":\"n\",\"chinese\":\"冰山\"},{\"english\":\"port\",\"parts\":\"n\",\"chinese\":\"港\"}]', '{\"word_0\":{\"english\":\"111\",\"chinese\":\"1111\",\"pass\":false},\"word_1\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_2\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_3\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_4\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_5\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_6\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_7\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_8\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_9\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false}}', '[{\"english\":\"centimerter\",\"parts\":\"n\",\"chinese\":\"厘米\"},{\"english\":\"consciousness\",\"parts\":\"n\",\"chinese\":\"意识\"},{\"english\":\"coarse\",\"parts\":\"adj\",\"chinese\":\"粗糙的\"},{\"english\":\"abstract\",\"parts\":\"adj\",\"chinese\":\"抽象\"},{\"english\":\"yours\",\"parts\":\"pron\",\"chinese\":\"你的\"},{\"english\":\"replace\",\"parts\":\"v\",\"chinese\":\"替换\"},{\"english\":\"equipment\",\"parts\":\"n\",\"chinese\":\"设备\"},{\"english\":\"mold\",\"parts\":\"vt\",\"chinese\":\"塑造\"},{\"english\":\"iceberg\",\"parts\":\"n\",\"chinese\":\"冰山\"},{\"english\":\"port\",\"parts\":\"n\",\"chinese\":\"港\"}]', '2293', '0', '0', '2018-11-15 21:30:32');
INSERT INTO `dictation_record` VALUES ('41', '1', '[{\"english\":\"ounce\",\"parts\":\"n\",\"chinese\":\"盎司\"},{\"english\":\"burden\",\"parts\":\"n\",\"chinese\":\"负担\"},{\"english\":\"clumsy\",\"parts\":\"adj\",\"chinese\":\"笨拙的\"}]', '{\"word_0\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_1\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_2\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false}}', '[{\"english\":\"ounce\",\"parts\":\"n\",\"chinese\":\"盎司\"},{\"english\":\"burden\",\"parts\":\"n\",\"chinese\":\"负担\"},{\"english\":\"clumsy\",\"parts\":\"adj\",\"chinese\":\"笨拙的\"}]', '1229', '0', '0', '2018-11-15 21:31:33');
INSERT INTO `dictation_record` VALUES ('42', '1', '[{\"english\":\"burden\",\"parts\":\"n\",\"chinese\":\"负担\"},{\"english\":\"clumsy\",\"parts\":\"adj\",\"chinese\":\"笨拙的\"},{\"english\":\"ounce\",\"parts\":\"n\",\"chinese\":\"盎司\"}]', '{\"word_0\":{\"english\":\"burden\",\"chinese\":\"adj.笨拙\",\"pass\":false},\"word_1\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_2\":{\"english\":\"ounce\",\"chinese\":\"n.盎司\",\"pass\":true}}', '[{\"english\":\"burden\",\"parts\":\"n\",\"chinese\":\"负担\"},{\"english\":\"clumsy\",\"parts\":\"adj\",\"chinese\":\"笨拙的\"}]', '9041', '33', '0', '2018-11-15 23:22:37');
INSERT INTO `dictation_record` VALUES ('43', '1', '[{\"english\":\"two\",\"parts\":\"num\",\"chinese\":\"二\"},{\"english\":\"three\",\"parts\":\"num\",\"chinese\":\"三\"},{\"english\":\"one\",\"parts\":\"num\",\"chinese\":\"一\"}]', '{\"word_0\":{\"english\":\"two\",\"chinese\":\"num.二\",\"pass\":true},\"word_1\":{\"english\":\"three\",\"chinese\":\"num.三\",\"pass\":true},\"word_2\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false}}', '[{\"english\":\"one\",\"parts\":\"num\",\"chinese\":\"一\"}]', '10213', '66', '1', '2018-11-15 23:42:02');
INSERT INTO `dictation_record` VALUES ('44', '1', '[{\"english\":\"abstract\",\"parts\":\"adj\",\"chinese\":\"抽象\"},{\"english\":\"inference\",\"parts\":\"n\",\"chinese\":\"推断结果\"},{\"english\":\"one\",\"parts\":\"num\",\"chinese\":\"一\"}]', '{\"word_0\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_1\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false},\"word_2\":{\"english\":\"\",\"chinese\":\"\",\"pass\":false}}', '[{\"english\":\"abstract\",\"parts\":\"adj\",\"chinese\":\"抽象\"},{\"english\":\"inference\",\"parts\":\"n\",\"chinese\":\"推断结果\"},{\"english\":\"one\",\"parts\":\"num\",\"chinese\":\"一\"}]', '1566', '0', '0', '2018-11-17 21:19:42');

-- ----------------------------
-- Table structure for login_record
-- ----------------------------
DROP TABLE IF EXISTS `login_record`;
CREATE TABLE `login_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=84 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of login_record
-- ----------------------------
INSERT INTO `login_record` VALUES ('1', '1', '2018-10-14 22:37:34');
INSERT INTO `login_record` VALUES ('2', '15', '2018-10-14 22:38:07');
INSERT INTO `login_record` VALUES ('3', '16', '2018-10-14 22:38:20');
INSERT INTO `login_record` VALUES ('4', '2', '2018-10-13 00:00:00');
INSERT INTO `login_record` VALUES ('5', '2', '2018-10-13 00:00:00');
INSERT INTO `login_record` VALUES ('6', '2', '2018-10-13 00:00:00');
INSERT INTO `login_record` VALUES ('7', '2', '2018-10-13 00:00:00');
INSERT INTO `login_record` VALUES ('8', '2', '2018-10-13 00:00:00');
INSERT INTO `login_record` VALUES ('9', '2', '2018-10-12 00:00:00');
INSERT INTO `login_record` VALUES ('10', '2', '2018-10-12 00:00:00');
INSERT INTO `login_record` VALUES ('11', '2', '2018-10-12 00:00:00');
INSERT INTO `login_record` VALUES ('12', '2', '2018-10-12 00:00:00');
INSERT INTO `login_record` VALUES ('13', '2', '2018-10-12 00:00:00');
INSERT INTO `login_record` VALUES ('14', '2', '2018-10-12 00:00:00');
INSERT INTO `login_record` VALUES ('15', '2', '2018-10-12 00:00:00');
INSERT INTO `login_record` VALUES ('16', '2', '2018-10-11 00:00:00');
INSERT INTO `login_record` VALUES ('17', '2', '2018-10-11 00:00:00');
INSERT INTO `login_record` VALUES ('18', '2', '2018-10-11 00:00:00');
INSERT INTO `login_record` VALUES ('19', '2', '2018-10-11 00:00:00');
INSERT INTO `login_record` VALUES ('20', '2', '2018-10-11 00:00:00');
INSERT INTO `login_record` VALUES ('21', '2', '2018-10-11 00:00:00');
INSERT INTO `login_record` VALUES ('22', '2', '2018-10-11 00:00:00');
INSERT INTO `login_record` VALUES ('23', '2', '2018-10-11 00:00:00');
INSERT INTO `login_record` VALUES ('24', '2', '2018-10-10 00:00:00');
INSERT INTO `login_record` VALUES ('25', '2', '2018-10-10 00:00:00');
INSERT INTO `login_record` VALUES ('26', '2', '2018-10-10 00:00:00');
INSERT INTO `login_record` VALUES ('27', '2', '2018-10-10 00:00:00');
INSERT INTO `login_record` VALUES ('28', '2', '2018-10-10 00:00:00');
INSERT INTO `login_record` VALUES ('29', '2', '2018-10-10 00:00:00');
INSERT INTO `login_record` VALUES ('30', '2', '2018-10-10 00:00:00');
INSERT INTO `login_record` VALUES ('31', '2', '2018-10-10 00:00:00');
INSERT INTO `login_record` VALUES ('32', '2', '2018-10-10 00:00:00');
INSERT INTO `login_record` VALUES ('33', '2', '2018-10-10 00:00:00');
INSERT INTO `login_record` VALUES ('34', '2', '2018-10-09 00:00:00');
INSERT INTO `login_record` VALUES ('35', '2', '2018-10-09 00:00:00');
INSERT INTO `login_record` VALUES ('36', '2', '2018-10-09 00:00:00');
INSERT INTO `login_record` VALUES ('37', '2', '2018-10-09 00:00:00');
INSERT INTO `login_record` VALUES ('38', '2', '2018-10-09 00:00:00');
INSERT INTO `login_record` VALUES ('39', '2', '2018-10-09 00:00:00');
INSERT INTO `login_record` VALUES ('40', '2', '2018-10-09 00:00:00');
INSERT INTO `login_record` VALUES ('41', '2', '2018-10-09 00:00:00');
INSERT INTO `login_record` VALUES ('42', '2', '2018-10-09 00:00:00');
INSERT INTO `login_record` VALUES ('43', '2', '2018-10-09 00:00:00');
INSERT INTO `login_record` VALUES ('44', '2', '2018-10-09 00:00:00');
INSERT INTO `login_record` VALUES ('45', '2', '2018-10-09 00:00:00');
INSERT INTO `login_record` VALUES ('46', '2', '2018-10-08 00:00:00');
INSERT INTO `login_record` VALUES ('47', '2', '2018-10-08 00:00:00');
INSERT INTO `login_record` VALUES ('48', '2', '2018-10-08 00:00:00');
INSERT INTO `login_record` VALUES ('49', '2', '2018-10-07 00:00:00');
INSERT INTO `login_record` VALUES ('50', '2', '2018-10-07 00:00:00');
INSERT INTO `login_record` VALUES ('51', '2', '2018-10-07 00:00:00');
INSERT INTO `login_record` VALUES ('52', '2', '2018-10-07 00:00:00');
INSERT INTO `login_record` VALUES ('53', '2', '2018-10-07 00:00:00');
INSERT INTO `login_record` VALUES ('54', '2', '2018-10-01 00:00:00');
INSERT INTO `login_record` VALUES ('55', '2', '2018-10-01 00:00:00');
INSERT INTO `login_record` VALUES ('56', '2', '2018-10-01 00:00:00');
INSERT INTO `login_record` VALUES ('57', '2', '2018-10-01 00:00:00');
INSERT INTO `login_record` VALUES ('58', '2', '2018-10-01 00:00:00');
INSERT INTO `login_record` VALUES ('59', '2', '2018-09-28 00:00:00');
INSERT INTO `login_record` VALUES ('60', '2', '2018-09-28 00:00:00');
INSERT INTO `login_record` VALUES ('61', '2', '2018-09-28 00:00:00');
INSERT INTO `login_record` VALUES ('62', '2', '2018-09-25 00:00:00');
INSERT INTO `login_record` VALUES ('63', '2', '2018-09-25 00:00:00');
INSERT INTO `login_record` VALUES ('64', '2', '2018-09-25 00:00:00');
INSERT INTO `login_record` VALUES ('65', '2', '2018-09-25 00:00:00');
INSERT INTO `login_record` VALUES ('66', '2', '2018-09-15 00:00:00');
INSERT INTO `login_record` VALUES ('67', '2', '2018-09-15 00:00:00');
INSERT INTO `login_record` VALUES ('68', '2', '2018-09-15 00:00:00');
INSERT INTO `login_record` VALUES ('69', '2', '2018-09-15 00:00:00');
INSERT INTO `login_record` VALUES ('70', '1', '2018-10-15 13:36:51');
INSERT INTO `login_record` VALUES ('71', '1', '2018-10-16 00:15:22');
INSERT INTO `login_record` VALUES ('72', '1', '2018-10-16 00:21:04');
INSERT INTO `login_record` VALUES ('73', '1', '2018-10-16 00:21:30');
INSERT INTO `login_record` VALUES ('74', '1', '2018-10-16 00:22:21');
INSERT INTO `login_record` VALUES ('75', '1', '2018-10-16 00:25:14');
INSERT INTO `login_record` VALUES ('76', '39', '2018-10-16 15:26:31');
INSERT INTO `login_record` VALUES ('77', '1', '2018-10-20 16:28:47');
INSERT INTO `login_record` VALUES ('78', '1', '2018-11-14 21:06:18');
INSERT INTO `login_record` VALUES ('79', '40', '2018-11-14 21:21:01');
INSERT INTO `login_record` VALUES ('80', '1', '2018-11-15 19:29:09');
INSERT INTO `login_record` VALUES ('81', '42', '2018-11-15 23:47:27');
INSERT INTO `login_record` VALUES ('82', '1', '2018-11-17 21:09:45');
INSERT INTO `login_record` VALUES ('83', '42', '2018-11-17 21:30:40');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `nickname` varchar(32) NOT NULL,
  `email` varchar(32) NOT NULL,
  `login_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '20162204135', '蔡大胖4', '1491733348@qq.com', '2018-11-17 21:38:29', '2018-09-08 14:55:29');
INSERT INTO `user` VALUES ('15', '20172204135', '蔡大胖1', '11111@163.com', '2018-10-14 22:38:07', '2018-10-06 15:10:08');
INSERT INTO `user` VALUES ('16', '20182204135', '蔡大胖2', '111112222@163.com', '2018-10-14 22:38:20', '2018-10-06 15:10:20');
INSERT INTO `user` VALUES ('42', '7121_1234567890', 'wonder', '111111111@qq.com', '2018-11-17 21:38:36', '2018-11-15 23:47:11');
INSERT INTO `user` VALUES ('39', '000000', '游客', 'wonder_97@163.com', '2018-10-16 20:15:18', '2018-10-16 15:26:01');

-- ----------------------------
-- Table structure for words
-- ----------------------------
DROP TABLE IF EXISTS `words`;
CREATE TABLE `words` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `words` text NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of words
-- ----------------------------
INSERT INTO `words` VALUES ('1', '1', '[{\"english\":\"clumsy\",\"parts\":\"adj\",\"chinese\":\"笨拙的\"},{\"english\":\"burden\",\"parts\":\"n\",\"chinese\":\"负担\"},{\"english\":\"ounce\",\"parts\":\"n\",\"chinese\":\"盎司\"},{\"english\":\"convenience\",\"parts\":\"n\",\"chinese\":\"方便\"},{\"english\":\"terminal\",\"parts\":\"n\",\"chinese\":\"终点\"},{\"english\":\"post\",\"parts\":\"n\",\"chinese\":\"姿势\"},{\"english\":\"resign\",\"parts\":\"vi\",\"chinese\":\"辞职\"},{\"english\":\"roast\",\"parts\":\"v\",\"chinese\":\"烤\"},{\"english\":\"smooth\",\"parts\":\"adj\",\"chinese\":\"光滑的\"},{\"english\":\"mix\",\"parts\":\"v\",\"chinese\":\"混合\"},{\"english\":\"liar\",\"parts\":\"n\",\"chinese\":\"说谎的人\"},{\"english\":\"jaw\",\"parts\":\"n\",\"chinese\":\"下巴\"},{\"english\":\"profess\",\"parts\":\"v\",\"chinese\":\"表示\"},{\"english\":\"plunge\",\"parts\":\"v\",\"chinese\":\"使投入\"},{\"english\":\"transient\",\"parts\":\"adj\",\"chinese\":\"短暂的\"},{\"english\":\"honor\",\"parts\":\"n\",\"chinese\":\"荣耀\"},{\"english\":\"corporation\",\"parts\":\"n\",\"chinese\":\"企业\"},{\"english\":\"plug\",\"parts\":\"vi\",\"chinese\":\"插入\"},{\"english\":\"trash\",\"parts\":\"n\",\"chinese\":\"废物\"},{\"english\":\"liberate\",\"parts\":\"bt\",\"chinese\":\"解放\"},{\"english\":\"private\",\"parts\":\"ajd\",\"chinese\":\"私人的\"},{\"english\":\"inference\",\"parts\":\"n\",\"chinese\":\"推断结果\"},{\"english\":\"transistor\",\"parts\":\"n\",\"chinese\":\"晶体管\"},{\"english\":\"choke\",\"parts\":\"v\",\"chinese\":\"噎住\"},{\"english\":\"widow\",\"parts\":\"n\",\"chinese\":\"寡妇\"},{\"english\":\"clam\",\"parts\":\"adj\",\"chinese\":\"平静的\"},{\"english\":\"addition\",\"parts\":\"n\",\"chinese\":\"加法\"},{\"english\":\"unfortunate\",\"parts\":\"adj\",\"chinese\":\"不幸的\"},{\"english\":\"coarse\",\"parts\":\"adj\",\"chinese\":\"粗糙的\"},{\"english\":\"yours\",\"parts\":\"pron\",\"chinese\":\"你的\"},{\"english\":\"port\",\"parts\":\"n\",\"chinese\":\"港\"},{\"english\":\"mold\",\"parts\":\"vt\",\"chinese\":\"塑造\"},{\"english\":\"iceberg\",\"parts\":\"n\",\"chinese\":\"冰山\"},{\"english\":\"equipment\",\"parts\":\"n\",\"chinese\":\"设备\"},{\"english\":\"consciousness\",\"parts\":\"n\",\"chinese\":\"意识\"},{\"english\":\"abstract\",\"parts\":\"adj\",\"chinese\":\"抽象\"},{\"english\":\"replace\",\"parts\":\"v\",\"chinese\":\"替换\"},{\"english\":\"centimerter\",\"parts\":\"n\",\"chinese\":\"厘米\"},{\"english\":\"one\",\"parts\":\"num\",\"chinese\":\"一\"},{\"english\":\"one\",\"parts\":\"num\",\"chinese\":\"一\"}]', '2018-09-11 22:13:18');
INSERT INTO `words` VALUES ('6', '39', '[{\"english\":\"one\",\"parts\":\"num\",\"chinese\":\"一\"},{\"english\":\"two\",\"parts\":\"num\",\"chinese\":\"二\"}]', '2018-10-16 15:27:18');
INSERT INTO `words` VALUES ('7', '42', '[{\"english\":\"one\",\"parts\":\"num\",\"chinese\":\"一\"}]', '2018-11-17 21:38:55');
