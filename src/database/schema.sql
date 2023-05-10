CREATE DATABASE Notes_App CHARACTER SET utf8;
USE Notes_App;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'yourpassword';

-- TABLE USERS
CREATE TABLE `notes_app`.`users` (
  `userID` VARCHAR(255) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`userID`));
  
 -- DROP TABLE notes_app.users;  
 -- SELECT * FROM notes_app.users;

-- TABLE NOTES 
CREATE TABLE `notes_app`.`notes` (
  `noteID` VARCHAR(45) NOT NULL,
  `userID` VARCHAR(255) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `text` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  PRIMARY KEY (`noteID`),
  FOREIGN KEY (userID) REFERENCES users(userID)
);

-- DROP TABLE notes_app.note;
-- SELECT * FROM notes_app.notes;



