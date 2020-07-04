<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Welcome · Woolin Auto</title>

    <!-- Bootstrap core CSS -->
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
    <script type="text/javascript" src="../published/g2plot/dist/g2plot.js"></script>
    <script src="https://www.google.com/recaptcha/api.js?hl=en" async defer></script>
    <script type="text/javascript" src="../published/js.cookie-2.2.1.min.js"></script>

    <script type="text/javascript" src="js/salesReps.js"></script>
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

        echo "<script>Cookies.set('historyRole', 1, { expires: 1 })</script>";

        $username = $_SESSION['username'];
        $uniqueID = $_SESSION['uniqueID'];

        // check login
        if(!isset($_SESSION['username']) || !salesRepsUniqueIDExaminer($username, $uniqueID)) {
            errorCodeJump(414);
        }

        $salesRepsInfo = getSalesRepsInfoByUsername($username);
        $region = $salesRepsInfo['region'];
        $salesRepsID = $salesRepsInfo['salesRepsID'];

        try {
            $conn = new PDO("mysql:dbname=hnyzx3;host=localhost", "hnyzx3", "20126507");
            $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // select all orders appointed to this sales reps
            $orderSTMT = $conn -> prepare("SELECT orders.time, orders.orderID, orders.region, orders.amount, orders.status, customer.customerID, customer.realname, customer.telephone, customer.email, orders.N95quantity, orders.Surgicalquantity, orders.SurgicalN95quantity FROM orders, customer WHERE orders.salesRepsID = ? AND orders.customerID = customer.customerID ORDER BY orders.orderID");
            $orderSTMT -> execute( array($salesRepsID));

            // prepare all data used in graph and data section
            $validOrderSTMT = $conn -> prepare("SELECT (orders.N95quantity + orders.Surgicalquantity + orders.SurgicalN95quantity) AS Quantity, customer.realname FROM orders INNER JOIN customer ON orders.customerID = customer.customerID WHERE orders.salesRepsID = ? AND ( orders.status != -1 AND orders.status != -2) ORDER BY orders.orderID");
            $validOrderSTMT -> execute(array($salesRepsID));

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
                  <a href="#list-message" class="list-group-item list-group-item-action"  data-toggle="list"><i class="fa pull-left fa-border fa-bullhorn fa-lg"></i>Messages</a>
                  <a href="#list-quota" class="list-group-item list-group-item-action"  data-toggle="list"><i class="fa pull-left fa-border fa-hourglass-start fa-lg"></i>Statistics</a>
                  <a href="#list-orders" class="list-group-item list-group-item-action"  data-toggle="list"><i class="fa pull-left fa-border fa-list fa-lg"></i>Orders</a>
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
            <!-- this is the page when choosing Message Page-->
            <div class="tab-pane fade show active" id="list-message" role="tabpanel">
                <h3 class="mt-4 mb-4">Messages</h3>
                <div class="mb-4" id="all-messages">
                    <!--  Messages added here         -->

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


            <!--this is the page when choosing quota-->
            <div class="tab-pane fade mt-3 container" id="list-quota" role="tabpanel">
                <div class="shadow-lg">
                    <!--         Quota          -->
                    <div class="card align-self-center">
                        <h4 class="card-header"> Quota </h4>
                            <div class="card-body">
                                <div id="quotaGraph"></div>
                                <?php
                                    $script = sprintf("<script>quotaGraphInit(%d, %d);</script>", $salesRepsInfo['quotaUsed'], $salesRepsInfo["quotaAll"]);
                                    echo $script;
                                ?>
                            </div>
                    </div>
                    <!--         Components          -->
                    <div class="card align-self-center mb-3">
                        <h4 class="card-header">Order Components</h4>
                        <div class="card-body">
                            <div id="quotaComponentsGraph"></div>
                            <?php
                                $script = sprintf("<script>quotaComponentsGraphInit('%s');</script>", json_encode($validOrderSTMT -> fetchALl(PDO::FETCH_ASSOC)));
                                echo $script;
                            ?>
                        </div>
                    </div>
                </div>
            </div>

            <!--this is the page when choosing Orders-->
            <div class="tab-pane fade" id="list-orders" role="tabpanel">
                <h3 class="mt-4 mb-4">All Orders</h3>
                <div class="mb-4" id="all-orders">
                    <!--        Orders to add here         -->

                </div>
                <!--  confirming cancel  -->
                <div class="modal fade" id="confirmCancel" tabindex="-1" role="dialog">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Are you sure you wan't to cancel this order?</h5>
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
                            <label>Employee ID</label>
                            <input type="text" class="form-control" name="employeeID" id="employeeID" placeholder="Employee ID" onchange="validateForm(this.id)" required>
                            <div class="invalid-feedback">
                                Please enter a valid <b>Employee ID</b>.
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
                            <select class="crs-country custom-select d-block" data-region-id="NOTUSED" name="region" id="region" data-default-value="<?php echo $region; ?>" data-default-option="<?php echo $region; ?>" disabled></select>
                            <div class="invalid-feedback">
                                Please select a valid country.
                                <p class="text-muted small">Sales Rep's region may only be modified by Manager.</p>
                            </div>
                        </div>

                        <div class="g-recaptcha justify-content-center" data-sitekey="6LdGqvkUAAAAACKtwMZLL5ikUoT7W-f0YSW1dLmp"></div>

                        <button class="btn btn-primary btn-lg btn-block mb-4" type="submit" onclick="updateInfoSubmit()">Update Information</button>
                    </div>
                </form>

            </div>

        </div>
        <!-- /#page-content-wrapper -->
    </div>
  <!-- /#wrapper -->
    <?php
        // handle update info failed
        if (isset($_GET['msg'])) {
            $msg = $_GET['msg'];
            echo "<script>toggleErrorSignUpMessage('$msg')</script>";
        }

        $script = sprintf("<script> initModifyProfile('%s'); </script>", json_encode($salesRepsInfo));
        echo $script;

        while ($eachrow = $orderSTMT -> fetch(PDO::FETCH_ASSOC)) {
            $status = $eachrow['status'] == 0 ? 'Normal' : 'Abnormal';

            if($status === 'Abnormal') {
                $displayAnomalyScript = sprintf ("<script> displayAnomalyLists('%s', %d, '%s', %d); </script>", $eachrow["time"], $eachrow["orderID"], $eachrow["realname"], $eachrow["status"]);
                echo $displayAnomalyScript;
            }

            $displayOrderScript = sprintf("<script> displayOrderLists('%s',%d,'%s',%d,%d,%d,'%s','%s','%s',%d,%d,%d); </script>", $eachrow["time"],
                $eachrow["orderID"], $eachrow["region"], $eachrow["amount"], $eachrow["status"], $eachrow["customerID"], $eachrow["realname"], $eachrow["telephone"], $eachrow["email"], $eachrow["N95quantity"],
                $eachrow["Surgicalquantity"], $eachrow["SurgicalN95quantity"]);
            echo $displayOrderScript;
        }
    ?>

    <script type="text/javascript">
        addEmptyStatus('all-messages');
        addEmptyStatus('all-orders');
    </script>
</body>

</html>           