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

INSERT INTO customer VALUES
(null, 'customer1', 'f2e9fd3ded107a1dfdd31af5105f0d9b3bc0bdbea3d4e9354fcdcb75ee0764a0', 'Donald Trump', 'nf3205521', '911', 'United States', 'donaldtrump@gmail.com'),
(null, 'customer2', '13c2bfc9ce053ec43abc6c870c2dbd6ed0fbc9eeb9e4bf7ef6019230db7af8d3', 'Jay Chou', 'nf3305521', '912', 'Taiwan', 'jaychou@gmail.com'),
(null, 'customer3', 'b40acd31348a1186c212cc7ad46dd04b2e55043f3dafa0285c5da8c87eb695cc', 'Theresa Mary May', 'nf3005521', '913', 'United Kingdom', 'theresamay@gmail.com'),
(null, 'customer4', 'c65eedb5fc280beb1fffc7e02c304a259869b228b086b1365643251adfa80ea3', 'Jack Ma', 'nf3009521', '914', 'China', 'jackma@alibaba.com'),
(null, 'customer5', '68ec4a40378c1dd293414491cbdc63c3c1180906d3665d048b2625f44ccc76e0', 'HuaTeng Ma', 'nf3002521', '915', 'China', 'huatengma@qq.com'),
(null, 'customer6', 'f2e9fd3ded107a1dfdd31af5105f0d9b3bc0bdbea3d4e9354fcdcb75ee0764a0', 'Nancy Pelosi', 'nf3205580', '912', 'United States', 'nancypelosi@gmail.com');

-- username: customer1    password: customer1password

INSERT INTO salesReps VALUES
(null, 'salesreps1', '60da522238f207b7edffc277d70ec7d26fadd955162c6a77be7f5b527ff3e3c9', 'Mike Pence', '00000001', '119', 'United States', 'mikepence@gmail.com', 0, 8000),
(null, 'salesreps2', '70c27156b82f266dc4d779a87fcfc0ccc7047657ec6aba34e1ca8c96d77df1ee', 'Bill Clinton', '00000002', '120', 'United States', 'billclinton@gmail.com', 0, 1500),
(null, 'salesreps3', '2ec26cd443abea0ba407feead71b1f35414a729b26dcf6dab63638089fe80b38', 'Joe Biden', '00000003', '121', 'United States', 'joebiden@gmail.com', 0, 4000),
(null, 'salesreps4', '5eca58740f7c2e0cd359b60cb59aa50adea7ccd3245378a9a8734fbcaef0f5fd', 'Barack Obama', '00000004', '122', 'United States', 'barackobama@gmail.com', 0, 300),
(null, 'salesreps5', 'e1f455d04231e13234ed698ffbcd1e38c0f30271846d40135e74726cf0c7d81d', 'Boris Johnson', '00000005', '123', 'United Kingdom', 'borisjohnson@gmail.com', 0, 3000),
(null, 'salesreps6', '162d751b2c08f51b7178ae52a472abaf6a43372e3a5986d0711e446dbd0b90b3', 'Wenliang Li', '00000006', '20200207', 'China', 'wenliangli@gmail.com', 0, 8000),
(null, 'salesreps7', '905e0661f0eba2a978ccba73bcd26cd6c45db4640784657fea03afb6e2300094', 'Nanshan Zhong', '00000007', '125', 'China', 'nanshanzhong@gmail.com', 0, 1000),
(null, 'salesreps8', '176c33a84d4c328245f29a4cc35a8aa8347bf1580fb69c2abac682bb543d55df', 'Ing-wen Tsai', '00000008', '126', 'Taiwan', 'ing-wentsai@gmail.com', 0, 6000);

-- username: salesreps1    password: salesreps1password

INSERT INTO manager VALUES
(null, 'manager', '6ee4a469cd4e91053847f5d3fcb61dbcc91e8f0ef10be7748da4c4a1ba382d17', 'Tim Cook', 'tcook@apple.com', false),
-- username: manager    password: manager
(null, 'sudo', '24e5e1c2bbef565360c392851175f46821fc21d6725503a600353625b4c9209c', 'God', 'god@outlook.com', true);
-- username: sudo    password: sudo

INSERT INTO orders VALUES
(null, date_sub(now(), interval '62 7:1:1' day_second), 140, 691, 186, 14273, 'China', 4, 6, 0),
(null, date_sub(now(), interval '57 13:1:1' day_second), 628, 218, 676, 33498, 'United States', 1, 1, 0),
(null, date_sub(now(), interval '51 4:1:1' day_second), 738, 540, 629, 37123, 'United States', 1, 2, 0),
(null, date_sub(now(), interval '48 5:1:1' day_second), 249, 5, 351, 14955, 'Taiwan', 5, 8, -2),
(null, date_sub(now(), interval '44 10:1:1' day_second), 436, 750, 388, 26286, 'United States', 1, 3, 0),
(null, date_sub(now(), interval '40 13:1:1' day_second), 73, 836, 667, 28254, 'United States', 1, 4, -1),
(null, date_sub(now(), interval '37 17:1:1' day_second), 460, 438, 801, 35911, 'United States', 1, 1, 0),
(null, date_sub(now(), interval '35 1:1:1' day_second), 6, 795, 362, 17767, 'United Kingdom', 3, 5, 0),
(null, date_sub(now(), interval '33 19:1:1' day_second), 648, 903, 737, 41812, 'China', 4, 6, 0),
(null, date_sub(now(), interval '31 20:1:1' day_second), 481, 337, 391, 23511, 'China', 5, 7, -1),
(null, date_sub(now(), interval '27 10:1:1' day_second), 6, 795, 362, 17767, 'United Kingdom', 3, 5, 0),
(null, date_sub(now(), interval '23 4:1:1' day_second), 713, 135, 362, 25260, 'United Kingdom', 3, 5, 0),
(null, date_sub(now(), interval '20 17:1:1' day_second), 474, 332, 422, 24232, 'United States', 1, 1, -2),
(null, date_sub(now(), interval '18 1:1:1' day_second), 828, 164, 574, 33854, 'United States', 1, 3, 0),
(null, date_sub(now(), interval '15 23:1:1' day_second), 575, 892, 656, 37977, 'Taiwan', 2, 8, 1),
(null, date_sub(now(), interval '13 7:1:1' day_second), 750, 742, 381, 31977, 'Taiwan', 2, 8, -2),
(null, date_sub(now(), interval '11 10:1:1' day_second), 956, 759, 252, 32303, 'China', 4, 6, 0),
(null, date_sub(now(), interval '9 14:1:1' day_second), 354, 179, 141, 12426, 'China', 5, 7, 0),
(null, date_sub(now(), interval '7 22:1:1' day_second), 950, 846, 134, 29550, 'United States', 1, 1, 0),
(null, date_sub(now(), interval '5 19:1:1' day_second), 408, 646, 50, 15016, 'United States', 6, 3, 0),
(null, date_sub(now(), interval '4 23:1:1' day_second), 973, 587, 628, 41982, 'Taiwan', 2, 8, -1),
(null, date_sub(now(), interval '3 21:1:1' day_second), 813, 399, 378, 30000, 'Taiwan', 2, 8, 1),
(null, date_sub(now(), interval '2 17:1:1' day_second), 194, 671, 623, 27792, 'China', 4, 6, 0),
(null, date_sub(now(), interval '2 9:1:1' day_second), 795, 464, 183, 24588, 'China', 5, 7, -2),
(null, date_sub(now(), interval '1 18:1:1' day_second), 332, 982, 91, 17785, 'United States', 1, 1, 1),
(null, date_sub(now(), interval '1 11:1:1' day_second), 930, 269, 64, 21947, 'United States', 1, 3, 0),
(null, date_sub(now(), interval '20:1:1' day_second), 40, 910, 74, 11096, 'Taiwan', 2, 8, 1),
(null, date_sub(now(), interval '10:1:1' day_second), 349, 739, 401, 24911, 'Taiwan', 2, 8, -1),
(null, date_sub(now(), interval '1:1:1' day_second), 713, 135, 574, 31408, 'United States', 6, 1, 0);

 UPDATE salesReps INNER JOIN
     (SELECT SUM(N95quantity + Surgicalquantity + SurgicalN95quantity) AS QuotaUsedAll, salesRepsID FROM orders WHERE (status = 0 OR status = 1) GROUP BY salesRepsID) as QuotaUsedGroupBySalesReps
     ON salesReps.SalesRepsID = QuotaUsedGroupBySalesReps.salesRepsID
 SET quotaUsed = QuotaUsedGroupBySalesReps.QuotaUsedAll WHERE salesReps.SalesRepsID = QuotaUsedGroupBySalesReps.salesRepsID
