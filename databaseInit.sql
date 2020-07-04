# DROP DATABASE IF EXISTS hnyzx3;
# CREATE DATABASE hnyzx3;

USE hnyzx3;

DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS salesReps;
DROP TABLE IF EXISTS manager;


CREATE TABLE customer (
                          customerID BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                          username VARCHAR(15) NOT NULL,
                          password VARCHAR(64) NOT NULL,
                          realname VARCHAR(255) NOT NUll,
                          passportID VARCHAR(20) NOT NULL,
                          telephone VARCHAR(20) NOT NULL,
                          region VARCHAR(255) NOT NULL,
                          email VARCHAR(255) NOT NULL
);

CREATE TABLE salesReps (
                           salesRepsID BIGINT NOT NULL  PRIMARY KEY AUTO_INCREMENT,
                           username VARCHAR(15) NOT NULL,
                           password VARCHAR(64) NOT NULL,
                           realname VARCHAR(255) NOT NUll,
                           employeeID VARCHAR(20) NOT NULL,
                           telephone VARCHAR(20) NOT NULL,
                           region VARCHAR(255) NOT NULL,
                           email VARCHAR(255) NOT NULL,
                           quotaUsed BIGINT NOT NULL,
                           quotaAll BIGINT NOT NULL
);

CREATE TABLE manager (
                         managerID BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                         username VARCHAR(15) NOT NULL,
                         password VARCHAR(64) NOT NULL,
                         realname VARCHAR(255),
                         email VARCHAR(255),
                         isAdmin BOOL NOT NULL
);

CREATE TABLE orders (
                        orderID BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        time DATETIME NOT NULL,
                        N95quantity BIGINT NOT NULL,
                        Surgicalquantity BIGINT NOT NULL,
                        SurgicalN95quantity BIGINT NOT NULL,
                        amount BIGINT NOT NULL,
                        region VARCHAR(255) NOT NULL,
                        customerID BIGINT NOT NULL,
                        salesRepsID BIGINT NOT NULL,
                        status int NOT NULL,

                        CONSTRAINT fk_customerID FOREIGN KEY (customerID) REFERENCES customer(customerID),
                        CONSTRAINT fk_salesRepsID FOREIGN KEY (salesRepsID) REFERENCES salesReps(salesRepsID)
);


INSERT INTO manager VALUES
(null, 'manager', '6ee4a469cd4e91053847f5d3fcb61dbcc91e8f0ef10be7748da4c4a1ba382d17', 'Tim Cook', 'tcook@apple.com', false),
-- username: manager    password: manager
(null, 'sudo', '24e5e1c2bbef565360c392851175f46821fc21d6725503a600353625b4c9209c', 'God', 'god@outlook.com', true);
-- username: sudo    password: sudo