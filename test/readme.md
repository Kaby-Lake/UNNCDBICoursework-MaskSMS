#### Database Bootcamp
Simply run the `databaseDemo.sql` under this directory in the *cslinux MySQL console*, this will generate all enough data to be used as demo. If for some reasons it requires username and password, try `hnyzx3` as username and `20126507` as password. 

You may re-run this script every time before you evaluate the demo, even though the MySQL already has tables and data in it. Reasons are that the scripts will automatically insert orders whose checkoutTime are close to the date and time you run this script, in order to activate and show the functionalities provided by this system as more as possible.



#### Link to Website

If everything works as expected, hopefully you can visit the website via this link `cslinux.nottingham.edu.cn/~hnyzx3/src/index.php`, make sure that you have **Google** services connected as this website requires **reCAPTCHA** authentication to login.



#### Test Accounts

Every test account can be found in the `databaseDemo.sql`, however, the passwords are applied with SHA-256 encryption. To name a few, here are the list of all accounts that have been created:

- ##### Customer

| Username  |     Password      |
| :-------: | :---------------: |
| customer1 | customer1password |
| customer2 | customer2password |
| customer3 | customer3password |
| customer4 | customer4password |
| customer5 | customer5password |
| customer6 | customer6password |

- ##### Sales Reps

|  Username  |      Password      |
| :--------: | :----------------: |
| salesreps1 | salesreps1password |
| salesreps2 | salesreps2password |
| salesreps3 | salesreps3password |
| salesreps4 | salesreps4password |
| salesreps5 | salesreps5password |
| salesreps6 | salesreps6password |
| salesreps7 | salesreps7password |
| salesreps8 | salesreps8password |

- ##### Manager

| Username | Password |  Role   |
| :------: | :------: | :-----: |
| manager  | manager  | Manager |
|   sudo   |   sudo   |  Admin  |

However, to make sure you have the best demo experience, please use the first or second account listed in every section, these accounts contains relatively more information than others.