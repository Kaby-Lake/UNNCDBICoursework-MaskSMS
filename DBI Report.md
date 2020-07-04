### Contents
- [Contents](#contents)
- [Overview](#overview)
    - [Important!!!](#important)
    - [Introduction](#introduction)
    - [Developer](#developer)
    - [Open Source Libraries](#open-source-libraries)
    - [Database Initialization](#database-initialization)
- [Test Demo](#test-demo)
    - [Functionality Flowchart](#functionality-flowchart)
    - [Database Demo initialization](#database-demo-initialization)
    - [Walkthrough](#walkthrough)
      - [-1.1: HTTP 503 Error](#-11-http-503-error)
      - [0.1: Login](#01-login)
      - [0.1.1: Error in login](#011-error-in-login)
      - [0.2: Sign up](#02-sign-up)
      - [0.2.1: Error in Sign up](#021-error-in-sign-up)
      - [1: Login as Customer](#1-login-as-customer)
      - [1.1: (Default) Messages view](#11-default-messages-view)
      - [1.2: Shopping Cart view](#12-shopping-cart-view)
      - [1.3: Orders view](#13-orders-view)
      - [1.3.1: Cancel Order](#131-cancel-order)
      - [1.4: User Profile view](#14-user-profile-view)
      - [2: Login as Sales Representative](#2-login-as-sales-representative)
      - [2.1: (Default) Messages View](#21-default-messages-view)
      - [2.2: Statistics view](#22-statistics-view)
      - [2.3: Orders view](#23-orders-view)
      - [2.3.1: Cancel Order](#231-cancel-order)
      - [2.4: User Profile view](#24-user-profile-view)
      - [3 : Login as Manager / 4: Administrator](#3--login-as-manager--4-administrator)
      - [3.1: (Default) Messages view](#31-default-messages-view)
      - [3.2: Quota Management view](#32-quota-management-view)
      - [3.3: Orders view](#33-orders-view)
      - [3.4: Overview view](#34-overview-view)
      - [3.5: Sales Reps view](#35-sales-reps-view)
      - [3.5.1: Change Region of Sales Reps](#351-change-region-of-sales-reps)
      - [3.6: Customer view](#36-customer-view)
      - [3.7: Region view](#37-region-view)
      - [3.8: add Sales Reps view](#38-add-sales-reps-view)
      - [4: Administrator](#4-administrator)
- [Database](#database)
  - [Structure](#structure)
  - [Entity Relationship Diagram](#entity-relationship-diagram)
- [System-wide Evaluation](#system-wide-evaluation)
  - [Privacy](#privacy)
  - [Stability](#stability)
  - [Security](#security)
  - [Performance](#performance)
  - [Data Visualization](#data-visualization)
  - [Vulnerability](#vulnerability)



### Overview

##### Important!!!

**The website might even not allow user to login or sign up, if without loading of Google's API, please make sure both the server and your browser can successfully connect to Google services.**



##### Introduction

This coursework project is a *Face Musk Sales Management System* which will be adopted by Woolin Auto to make those process possible:

- Allow customers to order face masks or cancel the orderings.
- Allow sales representatives (reps) to check and operate his/her sales.
- Allow the manager to perform admin tasks and check the sale statistics.



##### Developer

Zichen XU -  hnyzx3@nottingham.edu.cn 



##### Open Source Libraries

- **jQuery** 3.5.1 - *jQuery is a fast, small, and feature-rich JavaScript library*

  https://jquery.com/

- **Bootstrap** 4.5.0 - Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.

  https://getbootstrap.com/

- **Font Awesome** 4.7.0 - the internet's most popular icon toolkit.

  https://fontawesome.com/v4.7.0/

- **G2Plot** 1.1.3 - an interactive and responsive charting library based on the grammar of graphics.

  https://g2plot.antv.vision/en

- **Bootstrap Touchspin** - A mobile and touch friendly input spinner component for Bootstrap.

  https://www.virtuosoft.eu/code/bootstrap-touchspin/

- **Bootstrap Show Password** - a show/hide password plugin.

  http://bootstrap-show-password.wenzhixin.net.cn/

- **Country-region-selector** - A script to automatically add dynamic, connected country and region dropdowns to your forms.

  http://country-regions.github.io/country-region-selector/

- **js-sha256** - A simple SHA-256 hash function for JavaScript supports UTF-8 encoding.

  https://github.com/emn178/js-sha256

- **98.css** - A design system for building faithful recreations of old UIs.

  https://jdan.github.io/98.css/

- **XP.css** - A CSS framework for building faithful recreations of operating system GUIs.

  https://github.com/botoxparty/XP.css

- **Google Fonts** - High-quality fonts to use on your web site.

  https://developers.google.com/fonts/

- **Google reCAPTCHA** - Protect your site from spam and abuse.

  https://developers.google.com/recaptcha/

- **JavaScript Cookie** - A simple, lightweight JavaScript API for handling browser cookies.

  https://github.com/js-cookie/js-cookie



##### Database Initialization

The whole structure of the database can be initialized through `databaseInit.sql` under the main directory in the *cslinux MySQL console*, this will generate all enough structure, as well as Managers and Admins, but without any **Customer** or **Sales Reps** to be used. If for some reasons it requires username and password, try `hnyzx3` as username and `20126507` as password. 

The scripts below are a copy of `databaseInit.sql`

```mysql
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
```



### Test Demo

##### Functionality Flowchart

![flow chart](/Users/kabylake/Library/Application Support/typora-user-images/DBI Coursework.jpg)

##### Database Demo initialization

Please kindly refer to the ***readme.md*** under ***test*** folder.



##### Walkthrough



###### -1.1: HTTP 503 Error

this page will show up when your connection to MySQL database is unstable or lost, or any other situations that are unrecoverable.

![Screen Shot 2020-05-23 at 7.08.58 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-23 at 7.08.58 PM.png)



###### 0.1: Login

- user can choose to login as **Customer**, **Sales Reps** or **Manager**.

- the *eye* icon on the right of password form is for toggle visibility of input password.

- all logins have to pass the Google reCAPTCHA to make sure you are a human :)

  (we will check the status provided by reCAPTCHA, so make sure you can connect to Google Services)

![Screen Shot 2020-05-23 at 4.35.30 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-23 at 4.35.30 PM.png)



###### 0.1.1: Error in login

This model will pop up with different error messages depending on the results returned by our server. For example:

- ```
  Wrong Username or Password
  ```

- ```
  You have to pass the reCAPTCHA before login.
  ```

![Screen Shot 2020-05-25 at 9.46.44 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-25 at 9.46.44 PM.png)



###### 0.2: Sign up

every sign up form has its own respective validation scheme or Regex, such as that user have to type in same password twice or username must be within 15 chars.

![Screen Shot 2020-05-23 at 4.36.01 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-23 at 4.36.01 PM.png)



###### 0.2.1: Error in Sign up

![Screen Shot 2020-05-25 at 8.14.17 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-25 at 8.14.17 PM.png)

![Screen Shot 2020-05-25 at 8.15.25 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-25 at 8.15.25 PM.png)

and so on ... 



###### 1: Login as Customer

> **Demo** Username: customer1	password: customer1password

- The default view is **Messages view**, you can switch different views by toggling the Navbar on the left.
- the **Log Out** button on the top right will take you back to login.



###### 1.1: (Default) Messages view

![Screen Shot 2020-05-23 at 5.21.41 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-23 at 5.21.41 PM.png)Will be notified if: 

- your order exceeds Sales Representative's masks quota
- your order has been cancelled by Sales Representative due to exceeds of his/her quota



###### 1.2: Shopping Cart view

![Screen Shot 2020-05-23 at 5.24.32 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-23 at 5.24.32 PM.png)

Here you can view descriptions of masks made by Woolin Auto and choose to add different types of masks to your shopping cart by clicking **Add** button on the card, you can choose the amount of every type of masks as well.![Screen Shot 2020-05-23 at 5.27.07 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-23 at 5.27.07 PM.png)

When you finally make you mind to make orders, press the **Checkout** button, it will pop up a window for you to choose your preferred Sales Reps.

![Screen Shot 2020-05-23 at 5.32.25 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-23 at 5.32.25 PM.png)

Press order to finally submit the order. it will pop out a window showing that it has been successfully submitted.



###### 1.3: Orders view

this view clearly shows all orders made by you, including:

- Those that are normal (in **White**).
- Those that are cancelled by you (in **Grey**).
- Those that are cancelled by your sales reps (in **Red**).
- and those that exceed Sales Rep's quota (in **Yellow**).

you can only cancel orders that are made within 24 hours

![Screen Shot 2020-05-23 at 5.39.20 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-23 at 5.39.20 PM.png)



###### 1.3.1: Cancel Order

- when you cancel orders that are made more than 24 hours ago, it will pop up a window to prevent you from doing so.

  ![Screen Shot 2020-05-23 at 5.46.53 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-23 at 5.46.53 PM.png)

- When you cancel orders that are made within 24 hours, it will pop up a alert warning you that this action is irrevocable.

  ![Screen Shot 2020-05-23 at 5.49.15 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-23 at 5.49.15 PM.png)



###### 1.4: User Profile view

You can update your user profile **Exclude Username** here. Simply modify all your information and click on the **Update Information** button to update them.

Can change your password by toggling the **Change Password** switch and type in the same new password twice. Otherwise the system will not change your password even if you typed in a new one.

![Screen Shot 2020-05-25 at 2.47.26 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-25 at 2.47.26 PM.png)



###### 2: Login as Sales Representative

> **Demo** Username: salesreps1	password: salesreps1password

- The default view is **Messages view**, you can switch different views by toggling the Navbar on the left.

- the **Log Out** button on the top right will take you back to login.



###### 2.1: (Default) Messages View

Will be notified if: 

- Customer's order exceeds your masks quota.

- Customer has cancelled his/her order.

  ![Screen Shot 2020-05-23 at 6.06.55 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-23 at 6.06.55 PM.png)



###### 2.2: Statistics view

you can see:

- the Quota that you have used
- All Quota granted by managers

as well as

- the components of all your orders, eg: from which Customer, how many masks in that order.

![Screen Shot 2020-05-25 at 8.32.37 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-25 at 8.32.37 PM.png)



###### 2.3: Orders view

This view clearly shows all orders assigned to you, including:

- Those that are normal (in **White**).
- Those that are cancelled by you (in **Grey**).
- and those that exceed your quota (in **Red**).

Those orders that are cancelled by Customer will not appear in this section.

you can cancel orders that exceed your quota and made within 24 hours

![Screen Shot 2020-05-25 at 5.46.08 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-25 at 5.46.08 PM.png)



###### 2.3.1: Cancel Order

- when you cancel orders that are anomaly and made more than 24 hours ago, it will pop up a window to prevent you from doing so.

  ![Screen Shot 2020-05-25 at 5.48.59 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-25 at 5.48.59 PM.png)

- When you cancel orders that are anomaly and made within 24 hours, it will pop up a alert warning you that this action is irrevocable.

![Screen Shot 2020-05-25 at 5.49.38 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-25 at 5.49.38 PM.png)



###### 2.4: User Profile view

Sales Reps can update their respective user profile **Exclude Username and Country** here.

Can change their password by toggling the **Change Password** switch and type in the same new password twice. Otherwise system will not change your password even if you typed in a new one.

The Country & Region can only be changed by manager.

![Screen Shot 2020-05-25 at 3.26.35 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-25 at 3.26.35 PM.png)

  

###### 3 : Login as Manager / 4: Administrator

Manager and Administrator can both login though *Login as Manager* section, but will be taken to different pages as they can perform relatively different operations.

> **Demo** Username: manager	password: manager



###### 3.1: (Default) Messages view

will be notified if: 

- Customer's order exceeds sales reps masks quota, but 24 hours has passed

![Screen Shot 2020-05-23 at 6.37.20 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-23 at 6.37.20 PM.png)



###### 3.2: Quota Management view

You can grant, re-grant or update Sales Representative's quota in this view

- **Add** (Re-grant) will add the number you typed in to the existing Quota.
- **Set** (Update) will set the number you typed in to the Quota.

![Screen Shot 2020-05-23 at 6.40.19 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-23 at 6.40.19 PM.png)

And if you do so, there will be a confirming message.![Screen Shot 2020-05-23 at 6.42.56 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-23 at 6.42.56 PM.png)



###### 3.3: Orders view

this view clearly shows all orders, including:

- those that are normal (in **White**).
- those that exceed Sales Reps quota but still in ordering (in **Yellow** without **Mark**).
- and those that are marked as ***Complete***.

Those orders that are cancelled by Customer or Sales Reps will not appear in this section.

![Screen Shot 2020-05-23 at 6.45.10 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-23 at 6.45.10 PM.png)



###### 3.4: Overview view

this view is a mixture of all statistics as *overview*, which includes:

- Total Quantity of all orders.
- Total Revenue of all orders.
- Masks that are under ordering (within 24 hours).
- Total Quantity grouped by weeks (2020 19 means the 19th week of 2020).
- Total Revenue grouped by weeks.
- Region distribution of all Sales Representatives.
- Region distribution of all Customer.

 some of the chart will pop up details of statistics when mouse hover on it :)

![Screen Shot 2020-05-25 at 8.45.03 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-25 at 8.45.03 PM.png)

![Screen Shot 2020-05-25 at 8.45.44 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-25 at 8.45.44 PM.png)

![Screen Shot 2020-05-25 at 8.46.12 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-25 at 8.46.12 PM.png)



###### 3.5: Sales Reps view

this view shows:

- Personal information about this Sales Reps.
- Can change the Region of Sales Reps
- Weekly quantity/revenue made by this Sales Reps (chart is Interactive)
- all orders assigned to this Sales Reps.

By default it will display a blank space until you choose one Sales Reps.

![Screen Shot 2020-05-23 at 6.56.51 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-23 at 6.56.51 PM.png)

![Screen Shot 2020-05-25 at 8.48.43 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-25 at 8.48.43 PM.png)

![Screen Shot 2020-05-25 at 8.49.18 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-25 at 8.49.18 PM.png)



###### 3.5.1: Change Region of Sales Reps

You can simply change the region of Sales Reps just by select a new Region in the list.

![Screen Shot 2020-05-27 at 3.29.03 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-27 at 3.29.03 PM.png)

![Screen Shot 2020-05-27 at 3.30.26 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-27 at 3.30.26 PM.png)



###### 3.6: Customer view

this view shows:

- Personal information about this Customer.
- Weekly quantity/revenue made by this Customer (chart is Interactive)
- all orders made by this Customer.

By default it will display a blank space until you choose one Customer.

![Screen Shot 2020-05-23 at 6.59.42 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-23 at 6.59.42 PM.png)

![Screen Shot 2020-05-25 at 8.50.36 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-25 at 8.50.36 PM.png)

![Screen Shot 2020-05-25 at 8.51.16 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-25 at 8.51.16 PM.png)



###### 3.7: Region view

this view shows:

- Quantity/revenue with respect to distribution of region
- All orders in this Region

By default it will display only the distribution chart until you choose one Region.

![Screen Shot 2020-05-25 at 8.51.58 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-25 at 8.51.58 PM.png)

![Screen Shot 2020-05-25 at 8.52.33 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-25 at 8.52.33 PM.png)



###### 3.8: add Sales Reps view

in this view you can add sales reps, as what the manager is responsible for.

![Screen Shot 2020-05-23 at 7.03.46 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-23 at 7.03.46 PM.png)



###### 4: Administrator

This page can be logged in though the admin account in the manager section in the login page.

This WIndows XP's wallpaper feels awesome...

> **Demo** Username: sudo	password: sudo

![Screen Shot 2020-05-25 at 6.01.26 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-25 at 6.01.26 PM.png)

Assuming that the user, as the administrator of the system, has enough knowledge to work on manipulation of MySQL, he/she can operate 'just like sudo in terminal' by typing **MySQL scripts** to the textbox and click **execute**.

You can exit this **Terminal** and back to login page by typing "exit()" and execute.

depending on the your scripts, it will pop up windows showing different messages or JSON objects returned by database.

![Screen Shot 2020-05-25 at 6.04.58 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-25 at 6.04.58 PM.png)

![Screen Shot 2020-05-25 at 6.05.25 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-25 at 6.05.25 PM.png)



### Database

#### Structure

- #### Customer

|     Column     |     Type     |   NULL   |               Comment               |
| :------------: | :----------: | :------: | :---------------------------------: |
| **customerID** |    BIGINT    | NOT NULL |           AUTO_INCREMENT            |
|    username    | VARCHAR(15)  | NOT NULL |    Match Twitter Username Regex     |
|    password    | VARCHAR(64)  | NOT NULL |    Match Twitter Password Regex     |
|    realname    | VARCHAR(255) | NOT NULL |          Customer Realname          |
|   passportID   | VARCHAR(20)  | NOT NULL |        Customer Passport ID         |
|   telephone    | VARCHAR(20)  | NOT NULL |      Customer Telephone Number      |
|     region     | VARCHAR(255) | NOT NULL | Customer Country & Region Full Name |
|     email      | VARCHAR(255) | NOT NULL |          Match Email Regex          |



- #### Sales Reps

|     Column      |     Type     |   NULL   |                Comment                |
| :-------------: | :----------: | :------: | :-----------------------------------: |
| **salesRepsID** |    BIGINT    | NOT NULL |            AUTO_INCREMENT             |
|    username     | VARCHAR(15)  | NOT NULL |     Match Twitter Username Regex      |
|    password     | VARCHAR(64)  | NOT NULL |     Match Twitter Password Regex      |
|    realname     | VARCHAR(255) | NOT NULL |          Sales Reps Realname          |
|   employeeID    | VARCHAR(20)  | NOT NULL |        Sales Reps Employee ID         |
|    telephone    | VARCHAR(20)  | NOT NULL |      Sales Reps Telephone Number      |
|     region      | VARCHAR(255) | NOT NULL | Sales Reps Country & Region Full Name |
|      email      | VARCHAR(255) | NOT NULL |           Match Email Regex           |
|    quotaUsed    |    BIGINT    | NOT NULL |         Quota Already Used          |
|    quotaAll     |    BIGINT    | NOT NULL |       Quota Assigned By Manager       |



- #### Manager

|    Column     |     Type     |   NULL   |           Comment            |
| :-----------: | :----------: | :------: | :--------------------------: |
| **managerID** |    BIGINT    | NOT NULL |        AUTO_INCREMENT        |
|   username    | VARCHAR(15)  | NOT NULL | Match Twitter Username Regex |
|   password    | VARCHAR(64)  | NOT NULL | Match Twitter Password Regex |
|   realname    | VARCHAR(255) |          |       Manager Realname       |
|     email     | VARCHAR(255) |          |      Match Email Regex       |
|    isAdmin    |     BOOL     | NOT NULL |  Manager is Admin of System  |



- #### Orders

|       Column        |     Type     |   NULL   |                           Comment                            |
| :-----------------: | :----------: | :------: | :----------------------------------------------------------: |
|     **orderID**     |    BIGINT    | NOT NULL |                        AUTO_INCREMENT                        |
|        time         |   DATETIME   | NOT NULL |                    Time When Order Added                     |
|     N95quantity     |    BIGINT    | NOT NULL |                    Number of N95 Ordered                     |
|  Surgicalquantity   |    BIGINT    | NOT NULL |                  Number of Surgical Ordered                  |
| SurgicalN95quantity |    BIGINT    | NOT NULL |                Number of SurgicalN95 Ordered                 |
|       amount        |    BIGINT    | NOT NULL |                  Total Price Of This Order                   |
|       region        | VARCHAR(255) | NOT NULL |                 Where This Order Shipped to                  |
|     customerID      |    BIGINT    | NOT NULL |               ***Foreign Key*** / Who Ordered                |
|     salesRepsID     |    BIGINT    | NOT NULL |        ***Foreign Key*** / Which Sales Reps Appointed        |
|       status        |     INT      | NOT NULL | -2 User Cancelled<br>-1 SalesReps Cancelled<br> 0 Normal<br> 1 Anomaly |



#### Entity Relationship Diagram

![Screen Shot 2020-05-26 at 8.05.24 PM](/Users/kabylake/Library/Application Support/typora-user-images/Screen Shot 2020-05-26 at 8.05.24 PM.png)



### System-wide Evaluation

#### Privacy

User privacy matters a lot, in this approach, to prevent from leaking of password though database storage, this system stores user's password by applying **SHA-256** algorithm on it, rather than purely store bare password in to a fragile database that might be cracked at any time. In this approach, even if your "password" from the database has leaked, people who get this "SHA"ed password still cannot retrieve your original password because SHA-256 algorithm by far cannot reverse engineering. Moreover, this encryption happens in the front-end, both at sign up or login, so that it will never transmit unencrypted password in the unsafe internet.



#### Stability

This system has embedded with Google's **reCAPTCHA** on login, sign up as well as updating user information procedure, which can prevent those spam and abuse and make sure that it is REAL HUMAN who is using your system. Even so, it has not yet been equipped with anti-DDoS modules, which might be a vulnerability when it, as a global system, is further deployed on public internet.



#### Security

This website uses Session to keep the connection between browser and server, however, it's not safe enough as anyone can cheat with server because it's a non-HTTPS connection. To solve this issue and enhance security, a **unique *Session ID*** will be created once the user login. this *Session ID* consists of the concatenation of your username and password, which have already applied SHA-256, and then apply SHA-256 the second time. In this encryption approach, every time user send a HTTP request, the server will evaluate the *Session ID* first, before doing anything related to database manipulation.

This website **catches any error** made by using PHP connecting to database, in this scheme, if any unrecoverable error happened, server will redirect user to 503 page, in order to prevent from doing anything harmful to the database.

This website generally applies PDO parameter binding on every SQL statements that has user input in it, which can largely prevent **SQL Injection Attack** when applied on public internet, and thus protect the database from malicious and unexpected manipulation.



#### Performance

As we all know, JavaScript is a single-threaded programming language, which means it has one call stack and one memory heap. this might appear that this synchronous might be harmful when communicating with the internet. To solve this blocking, this system generally applies **Asynchronous** to all Ajax requests by utilizing **Callback** functions features, which will not be blocked on stack if the internet connection is unstable or lost. Moreover, every single POST request requires a JSON_status to be echoed, this also stops it from having bad or interrupted executions on the server-side, but unknown by the client-side.



#### Data Visualization

From my point of view, data cannot be fully understood if without **Visualizing** it. Nowadays, thanks for the contribution from people in Ant Financial, I could use the open source libraries they provide to visualize the data from database into interactive 2D plots. Thus will reduce the difficulty in featuring, classification and monitoring or those data in a large scale. 



#### Vulnerability

The Administrator Page gives Admin a command windows and sudo privilege on manipulation of the whole database. Even if the executing the SQL scripts requires double check of login status, there might still have possibility that the admin account been leaked.