CREATE DATABASE employee_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- create a user if you don't want to use root
CREATE USER 'ems_user'@'localhost' IDENTIFIED BY 'ems_pass123';
GRANT ALL PRIVILEGES ON employee_management.* TO 'ems_user'@'localhost';
FLUSH PRIVILEGES;

USE employee_management;
SHOW TABLES;

INSERT INTO department (name) VALUES ('Engineering'), ('HR');
SELECT * FROM department;

SELECT * FROM employee;

