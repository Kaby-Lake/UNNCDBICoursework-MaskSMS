<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Welcome · Woolin Auto</title>

    <!-- Open Source Libraries -->
    <script type="text/javascript" src="../published/jquery-3.5.1.js"></script>
    <link rel="stylesheet" href="../published/bootstrap-4.5.0-dist/css/bootstrap.css"/>
    <script type="text/javascript" src="../published/bootstrap-4.5.0-dist/js/bootstrap.bundle.js"></script>
    <script type="text/javascript" src="../published/bootstrap-4.5.0-dist/js/bootstrap.js"></script>
    <link rel="stylesheet" href="../published/font-awesome-4.7.0/css/font-awesome.css">
    <script type="text/javascript" src="../published/bootstrap-show-password/src/bootstrap-show-password.js"></script>
    <script type="text/javascript" src="../published/sha256.js"></script>
    <script type="text/javascript" src="../published/bootstrap-touchspin/src/jquery.bootstrap-touchspin.js"></script>
    <link type="text/css" href="../published/bootstrap-touchspin/src/jquery.bootstrap-touchspin.css">
    <script type="text/javascript" src="../published/country-regions-country-region-selector/dist/crs.js"></script>
    <script src="https://www.google.com/recaptcha/api.js?hl=en" async defer></script>
    <script type="text/javascript" src="../published/js.cookie-2.2.1.min.js"></script>


    <script type="text/javascript" src="js/customer.js"></script>
    <script type="text/javascript" src="js/helper.js"></script>
    <script type="text/javascript" src="js/signUp.js"></script>

    <style>
        /* Google Font Import */
        @font-face {
            font-family: 'Lato';
            font-style: normal;
            font-weight: 900;
            font-display: swap;
            src: local('Lato Black'), local('Lato-Black'), url(../published/LatoBlack.woff2) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }

        body {
            overflow-x: hidden;
        }

        #sidebar {
            z-index: 1; /* Stay on top */
            position: fixed;
            min-height: 100vh;
            transition: margin .25s ease-out;
        }

        #sidebar .sidebar-heading {
            padding: 0.875rem 1.25rem;
            font-size: 1.2rem;
        }

        #sidebar .list-group {
            width: 15rem;
        }

        #page-content-wrapper {
            padding: 0 0 0 240px;
            min-width: 100vw;
        }

        #wrapper.toggled #sidebar {
            margin-left: 0;
        }

        .price-bold {
            font-family: Lato, sans-serif;
        }
    </style>
</head>

<body>
    <?php

        require 'php/helper.php';
        session_start();

        echo "<script>Cookies.set('historyRole', 0, { expires: 1 })</script>";

        $username = $_SESSION['username'];
        $uniqueID = $_SESSION['uniqueID']; // uniqueID is the sha256(username + sha256(realPassword))

        // check login
        if(!isset($_SESSION['username']) || !customerUniqueIDExaminer($username, $uniqueID)) {
            errorCodeJump(414);
        }

        $customerInfo = getCustomerInfoByUsername($username);
        $region = $customerInfo['region'];
        $customerID = $customerInfo['customerID'];

        try {
            $conn = new PDO("mysql:dbname=hnyzx3;host=localhost", "hnyzx3", "20126507");
            $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // select sales reps within same region as customer
            $regionSalesRepsSTMT = $conn -> prepare("SELECT salesRepsID, realname, quotaAll, quotaUsed, telephone, email FROM salesReps WHERE region = ? ORDER BY salesRepsID");
            $regionSalesRepsSTMT -> execute( array($region));

            // select sales all orders made by this customer
            $orderSTMT = $conn -> prepare("SELECT orders.time, orders.orderID, orders.region, orders.amount, orders.status, salesReps.salesRepsID, salesReps.realname, salesReps.telephone, salesReps.email, orders.N95quantity, orders.Surgicalquantity, orders.SurgicalN95quantity FROM orders, salesReps WHERE orders.customerID = ? AND orders.salesRepsID = salesReps.salesRepsID ORDER BY orders.orderID");
            $orderSTMT -> execute(array($customerID));

            $conn = NULL;

        } catch (PDOException $e) {
            errorCodeJump(503);
        }

    ?>
    <div class="alert alert-primary text-center mb-0" role="alert">
        <a href="https://covid19.apple.com/screening/">Evaluate COVID‑19 symptoms and understand next steps</a>
    </div>

    <div class="d-flex" id="wrapper">
        <!-- Sidebar -->
        <div class="border-right" id="sidebar">
            <div class="sidebar-heading ">Woolin Auto </div>
            <div class="list-group list-group-flush">
                  <a id="#list-message" href="#list-message" class="list-group-item list-group-item-action"  data-toggle="list"><i class="fa pull-left fa-border fa-bullhorn fa-lg"></i>Messages</a>
                  <a href="#list-cart" class="list-group-item list-group-item-action"  data-toggle="list"><i class="fa pull-left fa-border fa-shopping-cart fa-lg"></i>Shopping Cart</a>
                  <a id="#list-orders" href="#list-orders" class="list-group-item list-group-item-action"  data-toggle="list"><i class="fa pull-left fa-border fa-list fa-lg"></i>Orders</a>
                  <a href="#list-user" class="list-group-item list-group-item-action"  data-toggle="list"><i class="fa pull-left fa-border fa-user-circle fa-lg"></i>User Profile</a>
            </div>
        </div>

    <!-- Page Content -->
    <div id="page-content-wrapper">

        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom" id="navbar">
            <div class="navbar-collapse">
                <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li class="nav-item">
                        <a class="btn btn-outline-secondary btn-sm" onclick="logOut()">
                            <i class="fa fa-sign-out fa-lg"></i>Log out
                        </a>
                    </li>
                </ul>
            </div>
        </nav>

        <div class="tab-content container">
            <!-- this is the page when choosing Message Page -->
            <div class="tab-pane fade show active" id="list-message" role="tabpanel">
                <h3 class="mt-4 mb-4">Messages</h3>
                <div class="mb-4" id="all-messages">
                    <!--       Messages added here         -->

                </div>

                <!--   Error message when update info failed     -->
                <div class="modal fade" id="failedSignUp" tabindex="-1" role="dialog">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Failed to Update Information</h5>
                                <button type="button" class="close" data-dismiss="modal">
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div class="modal-body" id="failedSignUpMsg">
                                Error message should goes here
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <!-- this is the page when choosing Shopping Cart-->
            <div class="tab-pane fade mt-3" id="list-cart" role="tabpanel">
                <!-- different mask types to select -->
                <div class="card-group shadow-lg">
                    <!--N95 Respirator-->
                    <div class="card">
                        <img src="img/n95_respirator_hero.png" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">N95 Respirators</h5>
                            <p class="card-text"><small>Our cost-effective Surgical N95 Respirators line meets Centers for Disease Control and Prevention (CDC) guidelines for protection against TB and is National Institute for Occupational Safety and Health (NIOSH) certified to have a filter efficiency level of 95 percent or greater against particulate aerosols free of oil. As the front lines of filtration, these Surgical N95 Respirators are also Food and Drug Administration (FDA) cleared for use in the OR during surgical procedures.</small></p>
                        </div>
                        <div class="card-footer container">
                            <div class="row justify-content-between">
                                <button class="btn btn-default">$19</button>
                                <button type="button" class="btn btn-dark" onclick="showCartCard(1)"><i class="fa pull-left fa-border fa-shopping-cart fa-lg"></i>Add</button>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <img src="img/surgical_mask_hero.png" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">Surgical Masks</h5>
                            <p class="card-text"><small>Surgical masks provide the protection users seek, without compromising the comfort and breathability. Cardinal Health offers ASTM Level 3 and ASTM Level 1 surgical masks. Surgical masks are traditionally characterized by surgical ties and closeness of fit. Recommended for use in the Operating Room. ASTM Level 3 Surgical Masks include 4 layers of construction which offer clinicians comfort, protection, and breathability that they seek. Designed for fluid protection.</small></p>
                        </div>
                        <div class="card-footer container">
                            <div class="row justify-content-between">
                                <button class="btn btn-default">$9</button>
                                <button type="button" class="btn btn-dark" onclick="showCartCard(2)"><i class="fa pull-left fa-border fa-shopping-cart fa-lg"></i>Add</button>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <img src="img/surgical_n95_respirator_hero.png" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">Surgical N95 Respirators</h5>
                            <p class="card-text"><small>This health care particulate respirator and surgical mask helps provide respiratory protection against certain airborne biological particles. As a disposable particulate respirator, it is intended to help reduce wearer exposure to certain airborne particles including those generated by electrocautery, laser surgery, and other powered medical instruments. As a surgical mask, it is designed to be fluid resistant to splash and spatter of blood and other infectious materials.</small></p>
                        </div>
                        <div class="card-footer container">
                            <div class="row justify-content-between">
                                <button class="btn btn-default">$29</button>
                                <button type="button" class="btn btn-dark" onclick="showCartCard(3)"><i class="fa pull-left fa-border fa-shopping-cart fa-lg"></i>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- shopping cart -->
                <div class="mt-4">
                    <h3>Shopping Cart</h3>
                    <div id="shopping-cart">
                        <!--         Carts added here         -->

                    </div>
                    <div class="py-5 text-center">
                        <img class="d-block mx-auto mb-4" src="img/shopping_cart.png">
                    </div>
                </div>

                <div class="container mt-4 mb-4">
                    <div class="row justify-content-end">
                        <div class="row col-3">
                            <h2 class="align-self-end">$</h2>
                            <h3 class="align-self-end" id="totalSpend">0</h3>
                        </div>
                        <button type="button" class="btn btn-dark" onclick="popSelectSalesReps()">Checkout</button>
                    </div>
                </div>

                <!--   Select Sales Reps when confirming order  -->
                <div class="modal fade" id="selectSalesReps" tabindex="-1" role="dialog">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Confirm Your Ordering</h5>
                                <button type="button" class="close" data-dismiss="modal">
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div class="modal-body" id="salesRepsSelectModal">
                                <div class="alert alert-primary" role="alert">
                                    Your default deliver country & region is:
                                    <b>
                                        <?php
                                            echo $region;
                                        ?>
                                    </b>.
                                </div>
                                <h6>Please select your preferred Sales Representative</h6>
                                <select class="form-control" id="salesRepsSelect" required>
                                    <?php
                                        while ($eachrow = $regionSalesRepsSTMT -> fetch(PDO::FETCH_ASSOC)) {
                                            $script = sprintf("<option value='%d'> %s (Available Quota: %d, Telephone: %s, Email: %s)</option>", $eachrow['salesRepsID'], $eachrow['realname'], $eachrow['quotaAll'] - $eachrow['quotaUsed'], $eachrow['telephone'], $eachrow['email']);
                                            echo $script;
                                        }
                                    ?>
                                </select>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" id='submitOrderBtn' class="btn btn-primary" data-dismiss="modal" onclick="orderSubmit()">Order</button>
                            </div>
                        </div>
                    </div>
                    <script type="text/javascript">
                        if($('#salesRepsSelect').children().length === 0) {
                            $('#salesRepsSelect').remove();
                            $('#salesRepsSelectModal').append("<div class='py-5 text-center'>" +
                                "               <img class='d-block mx-auto mb-4' src='img/sad.png'>" +
                                "               <h6 class='text-muted'> There's currently no Sales Reps in your region...</h6>" +
                                "             </div>")
                            $('#submitOrderBtn').attr('disabled',true);
                            $('#submitOrderBtn').html('Cannot Order');
                        }
                    </script>
                </div>

                <!--  no item selected  -->
                <div class="modal fade" id="noItemSelected" tabindex="-1" role="dialog">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Empty Shopping Cart</h5>
                            </div>
                            <div class="modal-body">
                                <div class="alert alert-danger" role="alert">
                                    You should at least choose one item to make orders.
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">OK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!--  order successfully  -->
                <div class="modal fade" id="orderSubmitSuccess" tabindex="-1" role="dialog">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Success</h5>
                            </div>
                            <div class="modal-body">
                                <div class="alert alert-success" role="alert">
                                    Your order has been successfully submitted.
                                    <br>
                                    <small>switch to <b>Orders</b> to check the latest update on all your orderings.</small>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="window.location.reload()">OK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <!--this is the page when choosing Orders-->
            <div class="tab-pane fade" id="list-orders" role="tabpanel">
                <h3 class="mt-4 mb-4">All Orders</h3>
                <div class="mb-4" id="all-orders">
                    <!--        Orders added here         -->

                </div>
                <!--  confirming cancel  -->
                <div class="modal fade" id="confirmCancel" tabindex="-1" role="dialog">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Are you sure you want to cancel this order?</h5>
                            </div>
                            <div class="modal-body">
                                <div class="alert alert-danger" role="alert">
                                    This action is irrevocable.
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                    <button type="button" class="btn btn-danger" data-dismiss="modal" id="confirmCancelButton">Yes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--  cannot cancel, more than 24 hours  -->
                <div class="modal fade" id="timeMoreThanDay" tabindex="-1" role="dialog">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Oops</h5>
                            </div>
                            <div class="modal-body">
                                <div class="alert alert-danger" role="alert">
                                    You can only cancel orders than are created within 24 hours.
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">OK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--this is the page when choosing UserInfo -->
            <div class="tab-pane fade" id="list-user" role="tabpanel">

                <form class="needs-validation mt-4" onsubmit="return false" id="updateForm" method="post" novalidate>
                    <div class="container col-md-8 text-left">
                        <div class="mb-3">
                            <label>Username</label>
                            <div class="input-group">
                                <input type="text" class="form-control" name="username" id="username" placeholder="Username" readonly>
                                <div class="invalid-feedback" style="width: 100%;">
                                    Please enter a valid <b>Username</b> for signing up.
                                </div>
                                <p class="text-muted small">Username is case-insensitive and must be within 15 characters and can only contain alphanumeric characters (letters A-Z, numbers 0-9) and underscores(_). Cannot contain any symbols, dashes, or spaces.</p>
                                <p class="text-muted small">You may not modify your username once sign up.</p>
                            </div>
                        </div>

                        <div class="custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input form-control" name="changePassword" id="changePassword">
                            <label class="custom-control-label" for="changePassword">Change Password</label>
                            <p class="text-muted small">You may toggle this button if you want to update your password. Otherwise changes on password will not be saved</p>
                        </div>

                        <div class="row mb-3">
                            <div class="col-lg">
                                <label>Password</label>
                                <input type="password" data-toggle="password" class="form-control" name="password" id="password" placeholder="Password" value="" onchange="validateForm(this.id)" required>
                                <div class="invalid-feedback">
                                    Use 8 or more characters with a mix of letters, numbers & symbols
                                </div>
                                <p class="text-muted small">Use 8 or more, 30 or less characters with a mix of letters, numbers & symbols.</p>
                            </div>

                            <div class="col-lg">
                                <label>Confirm Password</label>
                                <input type="password" data-toggle="password" class="form-control" id="secondPassword" placeholder="Confirm Password" value="" onchange="validateForm(this.id)" required>
                                <div class="invalid-feedback">
                                    Those passwords didn't match. Please try again<br>
                                </div>
                                <p class="text-muted small">Please confirm your password.</p>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label>Real name</label>
                            <input type="text" class="form-control" name="realname" id="realname" placeholder="Real Name" value="" onchange="validateForm(this.id)" required>
                            <div class="invalid-feedback">
                                Please enter a valid <b>Real Name</b>.
                            </div>
                        </div>

                        <div class="mb-3">
                            <label>Passport ID</label>
                            <input type="text" class="form-control" name="passportID" id="passportID" placeholder="Passport ID" onchange="validateForm(this.id)" required>
                            <div class="invalid-feedback">
                                Please enter a valid <b>Passport ID</b>.
                            </div>
                        </div>

                        <div class="mb-3">
                            <label>Telephone Number</label>
                            <input type="tel" class="form-control" name="telephone" id="telephone" placeholder="telephone Number" onchange="validateForm(this.id)" required>
                            <div class="invalid-feedback">
                                Please enter a valid <b>Telephone Number</b>.
                            </div>
                        </div>

                        <div class="mb-3">
                            <label>Email</label>
                            <input type="email" class="form-control" name="email" id="email" placeholder="therealdonaldtrump@gmail.com" onchange="validateForm(this.id)" required>
                            <div class="invalid-feedback">
                                Please enter a valid <b>Email Address<b>.
                            </div>
                        </div>

                        <div class="mb-4">
                            <label>Country</label>
                            <select class="crs-country custom-select d-block" data-region-id="NOTUSED" name="region" id="region" data-default-value="<?php echo $region; ?>" data-default-option="<?php echo $region; ?>"></select>
                            <div class="invalid-feedback">
                                Please select a valid country.
                            </div>
                        </div>

                        <div class="g-recaptcha justify-content-center" data-sitekey="6LdGqvkUAAAAACKtwMZLL5ikUoT7W-f0YSW1dLmp"></div>

                        <button class="btn btn-primary btn-lg btn-block mb-4" type="submit" onclick="updateInfoSubmit()">Update Information</button>
                    </div>
                </form>


            </div>

        </div>

    </div>

    <?php
        // handle update info failed
        if (isset($_GET['msg'])) {
            $msg = $_GET['msg'];
            echo "<script>toggleErrorSignUpMessage('$msg')</script>";
        }

        while ($eachrow = $orderSTMT -> fetch(PDO::FETCH_ASSOC)) {
            if($eachrow['status'] == 1 || $eachrow['status'] == -1) {
                $script = sprintf ("<script> displayAnomalyLists(%d,'%s', %d,'%s'); </script>", $eachrow["status"], $eachrow["time"], $eachrow["orderID"], $eachrow["realname"]);
                echo $script;
            }
            $script = sprintf("<script> displayOrderLists('%s', %d, '%s', %d, %d, %d,'%s','%s','%s', %d, %d, %d); </script>", $eachrow["time"],
                $eachrow["orderID"], $eachrow["region"], $eachrow["amount"], $eachrow["status"], $eachrow["salesRepsID"], $eachrow["realname"], $eachrow["telephone"], $eachrow["email"], $eachrow["N95quantity"],
                $eachrow["Surgicalquantity"], $eachrow["SurgicalN95quantity"]);
            echo $script;
        }

        $script = sprintf("<script> initModifyProfile('%s'); </script>", json_encode($customerInfo));
        echo $script;
    ?>

        <script type="text/javascript">
            addEmptyStatus('all-messages');
            addEmptyStatus('all-orders');
            addEmptyStatus('salesRepsSelect');
        </script>
</body>

</html>           