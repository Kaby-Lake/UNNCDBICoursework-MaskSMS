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
    <script type="text/javascript" src="../published/g2plot/dist/g2plot.js"></script>
    <script type="text/javascript" src="../published/country-regions-country-region-selector/dist/crs.js"></script>
    <script src="https://www.google.com/recaptcha/api.js?hl=en" async defer></script>
    <script type="text/javascript" src="../published/js.cookie-2.2.1.min.js"></script>

    <script type="text/javascript" src="js/helper.js"></script>
    <script type="text/javascript" src="js/signUp.js"></script>
    <script type="text/javascript" src="js/manager.js"></script>

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

        $username = $_SESSION['username'];
        $uniqueID = $_SESSION['uniqueID'];

        // check login
        if(!isset($_SESSION['username']) || !managerUniqueIDExaminer($username, $uniqueID)) {
            errorCodeJump(414);
        }

        echo "<script>Cookies.set('historyRole', 2, { expires: 1 })</script>";

        try {
            // set up database
            $conn = new PDO("mysql:dbname=hnyzx3;host=localhost", "hnyzx3", "20126507");
            $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // select all orders that are anomaly but sold
            $sqlAnomalyOrderButSold = "SELECT orders.time, orders.orderID, orders.region, customer.realname AS customerRealname, salesReps.employeeID AS salesRepsEmployeeID, salesReps.realname AS salesRepsRealname FROM orders, customer, salesReps WHERE orders.status = 1 AND orders.customerID = customer.customerID AND orders.salesRepsID = salesReps.salesRepsID ORDER BY orders.orderID";
            $AnomalyOrderButSoldArray = $conn -> query($sqlAnomalyOrderButSold);

            // prepare all data used in Quota Management
            $sqlQuotaManagement = "SELECT employeeID, realname, quotaUsed, quotaAll FROM salesReps ORDER BY salesRepsID";
            $QuotaManagementArray = $conn -> query($sqlQuotaManagement);

            // select all orders
            $sqlAllOrders = "SELECT orders.time, orders.orderID, orders.region, orders.amount, orders.status, customer.customerID, customer.realname AS customerRealname, customer.telephone AS customerTelephone, customer.email AS customerEmail, salesReps.employeeID AS salesRepsEmployeeID, salesReps.realname AS salesRepsRealname, salesReps.telephone AS salesRepsTelephone, salesReps.email AS salesRepsEmail, orders.N95quantity, orders.Surgicalquantity, orders.SurgicalN95quantity FROM orders, customer, salesReps WHERE (orders.status = 0 OR orders.status = 1) AND orders.customerID = customer.customerID AND orders.salesRepsID = salesReps.salesRepsID ORDER BY orders.orderID";
            $AllOrdersArray = $conn -> query($sqlAllOrders);

            // prepare data used in Statistics
            // total quantity and revenue of masks
            $sqlTotalQuantityRevenue = "SELECT status, (SUM(N95quantity) + SUM(Surgicalquantity) + SUM(SurgicalN95quantity)) AS SUMQuantity, SUM(amount) AS SUMRevenue FROM orders WHERE (status = 0 OR status = 1) GROUP BY status";
            $totalQuantityRevenueArray = $conn -> query($sqlTotalQuantityRevenue);

            // masks under ordering
            $sqlMaskUnderOrdering = "SELECT orders.time, orders.orderID, orders.region, orders.amount, orders.status, customer.customerID, customer.realname AS customerRealname, customer.telephone AS customerTelephone, customer.email AS customerEmail, salesReps.employeeID AS salesRepsEmployeeID, salesReps.realname AS salesRepsRealname, salesReps.telephone AS salesRepsTelephone, salesReps.email AS salesRepsEmail, orders.N95quantity, orders.Surgicalquantity, orders.SurgicalN95quantity FROM orders, customer, salesReps WHERE (orders.status = 0 OR orders.status = 1) AND orders.customerID = customer.customerID AND orders.salesRepsID = salesReps.salesRepsID ORDER BY orders.orderID";
            $MaskUnderOrderingArray = $conn -> query($sqlMaskUnderOrdering);

            // mask sold in weeks
            $sqlMaskSoldInWeeks = "SELECT CONCAT(YEAR(time), ' ', WEEK(time)) AS WEEKS, status, (SUM(N95quantity) + SUM(Surgicalquantity) + SUM(SurgicalN95quantity) )AS SUMQuantity, SUM(amount) AS SUMRevenue FROM orders WHERE (status = 0 OR status = 1) GROUP BY status, CONCAT(YEAR(time), ' ', WEEK(time)) ORDER BY MAX(time)";
            $MaskSoldInWeeksArray = $conn -> query($sqlMaskSoldInWeeks);

            // list of all sales reps
            $sqlListAllSalesReps = "SELECT salesRepsID, realname FROM salesReps ORDER BY salesRepsID";
            $ListAllSalesRepsArray = $conn -> query($sqlListAllSalesReps);

            // list of all customers
            $sqlListAllCustomer = "SELECT customerID, realname FROM customer ORDER BY customerID";
            $ListAllCustomerArray = $conn -> query($sqlListAllCustomer);

            // region distribution of sales reps
            $sqlSalesRepsRegionDistribution = "SELECT COUNT(*), region FROM salesReps GROUP BY region ORDER BY COUNT(*)";
            $salesRepsRegionDistributionArray = $conn -> query($sqlSalesRepsRegionDistribution);

            // region distribution of customers
            $sqlCustomerRegionDistribution = "SELECT COUNT(*), region FROM customer GROUP BY region ORDER BY COUNT(*)";
            $customerRegionDistributionArray = $conn -> query($sqlCustomerRegionDistribution);

            // region distribution of orders
            $sqlOrdersRegionDistribution = "SELECT (SUM(N95quantity) + SUM(Surgicalquantity) + SUM(SurgicalN95quantity) ) AS SUMQuantity, SUM(amount) AS SUMRevenue, region FROM orders GROUP BY region ORDER BY SUMQuantity";
            $ordersRegionDistributionArray = $conn -> query($sqlOrdersRegionDistribution);

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
                <a href="#list-quota" class="list-group-item list-group-item-action"  data-toggle="list"><i class="fa pull-left fa-border fa-hourglass-start fa-lg"></i>Quota Management</a>
                <a href="#list-orders" class="list-group-item list-group-item-action"  data-toggle="list"><i class="fa pull-left fa-border fa-list fa-lg"></i>Orders</a>
                <a href="#list-overview" class="list-group-item list-group-item-action" data-toggle="list"><i class="fa pull-left fa-border fa-bar-chart fa-lg"></i>Overview</a>
                <a href="#list-salesReps" class="list-group-item list-group-item-action" data-toggle="list"><i class="fa pull-left fa-border fa-user-secret fa-lg"></i>Sales Reps</a>
                <a href="#list-customer" class="list-group-item list-group-item-action" data-toggle="list"><i class="fa pull-left fa-border fa-users fa-lg"></i>Customer</a>
                <a href="#list-region" class="list-group-item list-group-item-action" data-toggle="list"><i class="fa pull-left fa-border fa-map-o fa-lg"></i>Region</a>
                <a href="#list-addSalesReps" class="list-group-item list-group-item-action" data-toggle="list"><i class="fa pull-left fa-border fa-user-plus fa-lg"></i>add Sales Reps</a>
            </div>
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
            <!-- // this is the page when choosing Message Page-->
            <div class="tab-pane fade show active" id="list-message" role="tabpanel">
                <h3 class="mb-4 mt-4">All Messages</h3>
                <div class='mb-4' id='all-messages'>
                    <!--        messages to add here         -->

                </div>

                <!--   Error message when sign up failed     -->
                <div class="modal fade" id="failedSignUp" tabindex="-1" role="dialog">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Failed to Sign Up</h5>
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

                <!--   Success message when sign up completed     -->
                <div class="modal fade" id="successSignUp" tabindex="-1" role="dialog">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Successfully Signed Up</h5>
                                <button type="button" class="close" data-dismiss="modal">
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                Successfully signed up a sales representative!
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <!--this is the page when choosing quota-->
            <div class='tab-pane fade' id='list-quota' role='tabpanel'>
                <h3 class="mb-4 mt-4">You can grant, re-grant or update Sales Representative's quota</h3>
                <div class='container p-0'>
                    <div class='row' id="quotaManagement">
                        <!--            Quota Regrant Card added here                -->

                    </div>
                </div>

                <!--  confirming update or re-grant the quota  -->
                <div class="modal fade" id="confirmUpdateQuota" tabindex="-1" role="dialog">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Confirm Submit</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="alertMessage">
                                    Sure?
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-primary confirmUpdateButton">Confirm</button>
                            </div>
                        </div>
                    </div>
                    <script>
                        $('#confirmUpdateQuota').on('show.bs.modal', function (event) {
                            const button = $(event.relatedTarget); // Button that triggered the modal
                            const action = button.data('action');
                            const employeeID = button.data('value');
                            const modal = $(this);
                            const postValue = $('#' + employeeID).find('.input' + action + 'Value').val();
                            modal.find('.alertMessage').html("Are you sure you want to " + action + ' Employee ID: ' + employeeID + "'s quota?")
                            modal.find('.confirmUpdateButton').click(function () {
                                $.ajax({
                                    type: "POST",
                                    url: 'php/managerFunc.php',
                                    data: {
                                        action: action,
                                        employeeID: employeeID,
                                        value: postValue
                                    },
                                    success: function () {
                                        window.location.reload();
                                    }
                                });
                            })
                        })
                    </script>
                </div>

            </div>

            <!--this is the page when choosing Orders-->
            <div class='tab-pane fade' id='list-orders' role='tabpanel'>
                <h3 class='mb-4 mt-4'>All Orders</h3>
                <div class='mb-4' id='all-orders'>
                    <!--        Orders to add here         -->

                </div>
                <!--  confirming cancel  -->
                <div class='modal fade' id='confirmCancel' tabindex='-1' role='dialog'>
                    <div class='modal-dialog modal-dialog-centered' role='document'>
                        <div class='modal-content'>
                            <div class='modal-header'>
                                <h5 class='modal-title'>Are you sure you wan't to cancel this order?</h5>
                            </div>
                            <div class='modal-body'>
                                <div class='alert alert-danger' role='alert'>
                                    This action is irrevocable.
                                </div>
                                <div class='modal-footer'>
                                    <button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>
                                    <button type='button' class='btn btn-danger' data-dismiss='modal' id='confirmCancelButton'>Yes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--  cannot cancel, more than 24 hours  -->
                <div class='modal fade' id='timeMoreThanDay' tabindex='-1' role='dialog'>
                    <div class='modal-dialog modal-dialog-centered' role='document'>
                        <div class='modal-content'>
                            <div class='modal-header'>
                                <h5 class='modal-title'>Oops</h5>
                            </div>
                            <div class='modal-body'>
                                <div class='alert alert-danger' role='alert'>
                                    You can only cancel orders than are created within 24 hours.
                                </div>
                                <div class='modal-footer'>
                                    <button type='button' class='btn btn-secondary' data-dismiss='modal'>OK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!--  this is the page when choosing overview Page-->
            <div class="tab-pane fade" id="list-overview" role="tabpanel">
                <h3 class="mb-4 mt-4">Overview</h3>
                <div class="container p-0">
                    <!--         Total Number of masks sold          -->
                    <div class='row shadow-lg m-0 mb-4'>
                        <div class="card col-6 align-self-center">
                            <h4 class="card-header">Total Quantity</h4>
                            <div class="card-body">
                                <div id="totalQuantityGraph"></div>
                                <!--           Graph to generate here             -->
                            </div>
                        </div>

                        <!--         Total Revenue        -->
                        <div class="card col-6 align-self-center">
                            <h4 class="card-header">Total Revenue</h4>
                            <div class="card-body">
                                <div id="totalRevenueGraph"></div>
                                <!--           Graph to generate here             -->
                            </div>
                        </div>
                    </div>

                    <!--          List of masks under ordering          -->
                    <div class="card align-self-center shadow-lg mb-4">
                        <h4 class="card-header">Mask Under Ordering</h4>
                        <div class="card-body" id="MaskUnderOrdering">
                            <!--           List added here             -->
                        </div>
                    </div>

                    <!--          mask sold group by weeks          -->
                    <div class="card align-self-center shadow-lg mb-4">
                        <h4 class="card-header">Weekly Quantity</h4>
                        <div class="card-body">
                            <div id="WeeklyQuantityGraph"></div>
                            <!--           Graph to generate here             -->
                        </div>
                    </div>

                    <!--         Total Revenue        -->
                    <div class="card align-self-center shadow-lg mb-4">
                        <h4 class="card-header">Weekly Revenue</h4>
                        <div class="card-body">
                            <div id="WeeklyRevenueGraph"></div>
                            <!--           Graph to generate here             -->
                        </div>
                    </div>

                    <div class='row shadow-lg m-0 mb-4'>
                        <!--         Overview of Sales Reps Region       -->
                        <div class="card col-6 align-self-center">
                            <h4 class="card-header">Sales Representatives Region Distribution</h4>
                            <div class="card-body">
                                <div id="salesRepsRegionDistributionGraph"></div>
                                <!--           Graph to generate here             -->
                            </div>
                        </div>

                        <!--         Overview of Customers Region       -->
                        <div class="card col-6 align-self-center">
                            <h4 class="card-header">Customer Region Distribution</h4>
                            <div class="card-body">
                                <div id="customerRegionDistributionGraph"></div>
                                <!--           Graph to generate here             -->
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <!--  this is the page when choosing salesReps Page-->
            <div class="tab-pane fade" id="list-salesReps" role="tabpanel">
                <h3 class="mb-4 mt-4">Statistics of Sales Representatives</h3>

                <div class="container p-0">
                    <select class="form-control form-control-lg mb-4" id="selectSalesRepsForStatistics" onchange="refreshSalesRepsStatistics(this.value)">
                        <option selected disabled>Please select the Sales Representatives you want to analyse</option>
                        <?php
                            while ($eachrow = $ListAllSalesRepsArray -> fetch(PDO::FETCH_ASSOC)) {
                                echo "<option value='" . $eachrow['salesRepsID'] . "'>" . $eachrow['realname'] . "</option>";
                            }
                        ?>
                    </select>
                    <!--  salesRepsInfoAddedHere-->
                    <div class="shadow-lg" id="selectedSalesRepsInfo">

                    </div>

                    <div class="card align-self-center shadow-lg">
                        <ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="salesRepsQuantity-tab" data-toggle="tab" href="#salesRepsQuantity" role="tab">Quantity</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="salesRepsRevenue-tab" data-toggle="tab" href="#salesRepsRevenue" role="tab">Revenue</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="salesRepsQuantity" role="tabpanel">
                                <div id="SalesRepsQuantityGraph"></div>
                                <!--           Graph to generate here             -->
                            </div>
                            <div class="tab-pane fade" id="salesRepsRevenue" role="tabpanel">
                                <div id="SalesRepsRevenueGraph"></div>
                                <!--           Graph to generate here             -->
                            </div>
                        </div>
                    </div>

                    <h3 class="mb-4 mt-4">Orders of Sales Representatives</h3>
                    <div class="align-self-center" id="salesRepsOrders">
                        <!--           Orders added here             -->
                    </div>
                </div>
            </div>

            <!--  this is the page when choosing customer Page-->
            <div class="tab-pane fade" id="list-customer" role="tabpanel">
                <h3 class="mb-4 mt-4">Statistics of Customer</h3>
                <div class="container p-0">
                    <select class="form-control form-control-lg mb-4" id="selectCustomerForStatistics" onchange="refreshCustomerStatistics(this.value)">
                        <option selected disabled>Please select the Customer you want to analyse</option>
                        <?php
                        while ($eachrow = $ListAllCustomerArray -> fetch(PDO::FETCH_ASSOC)) {
                            echo "<option value='" . $eachrow['customerID'] . "'>" . $eachrow['realname'] . "</option>";
                        }
                        ?>
                    </select>
                    <!--  customerInfoAddedHere-->
                    <div class="shadow-lg" id="selectedCustomerInfo">

                    </div>
                    <div class="card align-self-center shadow-lg">
                        <ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="customerQuantity-tab" data-toggle="tab" href="#customerQuantity" role="tab">Quantity</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id=customerRevenue-tab" data-toggle="tab" href="#customerRevenue" role="tab">Expense</a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane fade show active" id="customerQuantity" role="tabpanel">
                                <div id="CustomerQuantityGraph"></div>
                                <!--           Graph to generate here             -->
                            </div>
                            <div class="tab-pane fade" id="customerRevenue" role="tabpanel">
                                <div id="CustomerRevenueGraph"></div>
                                <!--           Graph to generate here             -->
                            </div>
                        </div>
                    </div>

                    <h3 class="mb-4 mt-4">Orders of Customer</h3>
                    <div class="align-self-center" id="customerOrders">

                        <!--           Orders added here             -->
                    </div>
                </div>
            </div>

            <!--  this is the page when choosing region Page-->
            <div class="tab-pane fade container p-0" id="list-region" role="tabpanel">
                <div class='row shadow-lg m-0 mb-4 mt-4'>
                    <div class="card col-6 align-self-center">
                        <h4 class="card-header">Orders Quantity Region Distribution</h4>
                        <div class="card-body">
                            <div id="ordersQuantityRegionDistributionGraph"></div>
                            <!--           Graph to generate here             -->
                        </div>
                    </div>

                    <div class="card col-6 align-self-center">
                        <h4 class="card-header">Orders Amount Region Distribution</h4>
                        <div class="card-body">
                            <div id="ordersAmountRegionDistributionGraph"></div>
                            <!--           Graph to generate here             -->
                        </div>
                    </div>
                </div>

                <select class="crs-country form-control form-control-lg mb-4" data-region-id="NOTUSED" name="region" id="selectCustomerForStatistics" onchange="refreshRegionStatistics(this.value)"></select>

                    <h3 class="mb-4 mt-4">Orders in Region</h3>
                <div class="align-self-center" id="regionOrders">
                    <!--           Orders added here             -->
                </div>

            </div>

            <!--this is the page when choosing UserInfo -->
            <div class="tab-pane fade" id="list-use" role="tabpanel">
                <h3>You can add Sales Reps here</h3>
            </div>

            <!--this is the page when choosing Add Sales Reps -->
            <div class="tab-pane fade" id="list-addSalesReps" role="tabpanel">

                <form class="needs-validation mt-4 mb-4" method="post" id="signUpForm" novalidate>
                    <div class="container col-md-8 text-left">
                        <div class="mb-3">
                            <label>Username</label>
                            <div class="input-group">
                                <input type="text" class="form-control" name="username" id="username" placeholder="Username" onchange="validateForm(this.id)" required>
                                <div class="invalid-feedback" style="width: 100%;">
                                    Please enter a valid <b>Username</b> for signing up.
                                </div>
                                <p class="text-muted small">Username is case-insensitive and must be within 15 characters and can only contain alphanumeric characters (letters A-Z, numbers 0-9) and underscores(_). Cannot contain any symbols, dashes, or spaces.</p>
                            </div>
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
                                Please enter a valid <b>Real Name</b> for signing up.
                            </div>
                        </div>

                        <div class="mb-3">
                            <label>Employee ID</label>
                            <input type="text" class="form-control" name="employeeID" id="employeeID" placeholder="Employee ID" onchange="validateForm(this.id)" required>
                            <div class="invalid-feedback">
                                Please enter a valid <b>Employee ID</b> for signing up.
                            </div>
                        </div>

                        <div class="mb-3">
                            <label>Telephone Number</label>
                            <input type="tel" class="form-control" name="telephone" id="telephone" placeholder="telephone Number" onchange="validateForm(this.id)" required>
                            <div class="invalid-feedback">
                                Please enter a valid <b>Telephone Number</b> for signing up.
                            </div>
                        </div>

                        <div class="mb-3">
                            <label>Email</label>
                            <input type="email" class="form-control" name="email" id="email" placeholder="therealdonaldtrump@gmail.com" onchange="validateForm(this.id)" required>
                            <div class="invalid-feedback">
                                Please enter a valid <b>Email Address<b> for shipping updates.
                            </div>
                        </div>

                        <div class="mb-4">
                            <label>Country</label>
                            <select class="crs-country custom-select d-block" data-region-id="NOTUSED" name="region" id="region"></select>
                            <div class="invalid-feedback">
                                Please select a valid country.
                            </div>
                        </div>

                        <div class="g-recaptcha justify-content-center" data-sitekey="6LdGqvkUAAAAACKtwMZLL5ikUoT7W-f0YSW1dLmp"></div>

                        <button class="btn btn-primary btn-lg btn-block" type="submit" onclick="salesRepsSignUpSubmit()">Sign up</button>
                    </div>
                </form>

            </div>

        </div>

    </div>

    <?php

        // handle sign up success or failed
        if (isset($_GET['msg'])) {
            $msg = $_GET['msg'];
            echo "<script>toggleErrorSignUpMessage('$msg')</script>";
        }

        if (isset($_GET['success'])) {
            echo "<script>toggleSuccessSignUpMessage()</script>";
        }

        // Initialize notified autonomy: exceed quota but sold
        $thisTime = date("Y-m-d H:i:s");
        while ($eachrow = $AnomalyOrderButSoldArray -> fetch(PDO::FETCH_ASSOC)) {
            if(strtotime($thisTime) - strtotime($eachrow['time']) > 60 * 60 * 24) {
                $displayAnomalyScript = sprintf("<script> displayAnomalyLists('%s', %d, '%s', '%s', '%s', '%s'); </script>", $eachrow["time"], $eachrow["orderID"], $eachrow['region'], $eachrow['salesRepsEmployeeID'], $eachrow['salesRepsRealname'], $eachrow['customerRealname']);
                echo $displayAnomalyScript;
            }
        }

        // Initialize Quota Management
        while ($eachrow = $QuotaManagementArray -> fetch(PDO::FETCH_ASSOC)) {
            $quotaAvaliable = $eachrow['quotaAll'] - $eachrow['quotaUsed'];
            $displayQuotaManagementScript = sprintf ("<script> displayQuotaManagement('%s', '%s', %d, %d); </script>", $eachrow["employeeID"], $eachrow["realname"], $quotaAvaliable, $eachrow['quotaAll']);
            echo $displayQuotaManagementScript;
        }
        echo "<script> addEmptyStatus('quotaManagement') </script>";

        // Initialize All Orders
        while ($eachrow = $AllOrdersArray -> fetch(PDO::FETCH_ASSOC)) {
            $displayAllOrdersScript = sprintf ("<script> displayOrderLists('%s', %d, '%s', %d, %d, %d,'%s','%s','%s','%s','%s','%s','%s',%d, %d, %d); </script>", $eachrow["time"], $eachrow["orderID"], $eachrow["region"], $eachrow['amount'], $eachrow['status'], $eachrow['customerID'], $eachrow['customerRealname'], $eachrow['customerTelephone'], $eachrow['customerEmail'], $eachrow['salesRepsEmployeeID'], $eachrow['salesRepsRealname'], $eachrow['salesRepsTelephone'], $eachrow['salesRepsEmail'], $eachrow['N95quantity'], $eachrow['Surgicalquantity'], $eachrow['SurgicalN95quantity']);
            echo $displayAllOrdersScript;
        }
        echo "<script> addEmptyStatus('all-orders') </script>";

        // Total Quantity and Amount
        $totalQuantityNormal = 0;
        $totalQuantityAnomaly = 0;
        $totalRevenueNormal = 0;
        $totalRevenueAnomaly = 0;
        while ($eachrow = $totalQuantityRevenueArray -> fetch(PDO::FETCH_ASSOC)) {
            if ($eachrow['status'] == 1) {
                $totalQuantityAnomaly += $eachrow['SUMQuantity'];
                $totalRevenueAnomaly += $eachrow['SUMRevenue'];
            } else {
                $totalQuantityNormal += $eachrow['SUMQuantity'];
                $totalRevenueNormal += $eachrow['SUMRevenue'];
            }
        }
        $totalQuantityGraphScript = sprintf ("<script> totalQuantityGraphInit(%d, %d); </script>", $totalQuantityNormal, $totalQuantityAnomaly);
        echo $totalQuantityGraphScript;
        $totalRevenueGraphScript = sprintf ("<script> totalRevenueGraphInit(%d, %d); </script>", $totalRevenueNormal, $totalRevenueAnomaly);
        echo $totalRevenueGraphScript;

        // List of masks under ordering
        $thisTime = date("Y-m-d H:i:s");
        while ($eachrow = $MaskUnderOrderingArray -> fetch(PDO::FETCH_ASSOC)) {
            if(strtotime($thisTime) - strtotime($eachrow['time']) < 60 * 60 * 24) {
                $displayAllOrdersScript = sprintf ("<script> displayOrderLists('%s', %d, '%s', %d, %d, %d,'%s','%s','%s','%s','%s','%s','%s',%d, %d, %d, '%s'); </script>", $eachrow["time"], $eachrow["orderID"], $eachrow["region"], $eachrow['amount'], $eachrow['status'], $eachrow['customerID'], $eachrow['customerRealname'], $eachrow['customerTelephone'], $eachrow['customerEmail'], $eachrow['salesRepsEmployeeID'], $eachrow['salesRepsRealname'], $eachrow['salesRepsTelephone'], $eachrow['salesRepsEmail'], $eachrow['N95quantity'], $eachrow['Surgicalquantity'], $eachrow['SurgicalN95quantity'], 'MaskUnderOrdering');
                echo $displayAllOrdersScript;
            }
        }

        // Weekly Quantity and Amount
        $MaskSoldInWeeksArray = $MaskSoldInWeeksArray -> fetchAll(PDO::FETCH_ASSOC);
        $displayWeeklyQuantityGraphScript = sprintf ("<script> quantityGraphInit('%s'); </script>", json_encode($MaskSoldInWeeksArray));
        echo $displayWeeklyQuantityGraphScript;
        $displayWeeklyRevenueGraphScript = sprintf ("<script> revenueGraphInit('%s'); </script>", json_encode($MaskSoldInWeeksArray));
        echo $displayWeeklyRevenueGraphScript;

        // Region Distribution of Sales Reps
        $salesRepsRegionDistributionArray = $salesRepsRegionDistributionArray -> fetchAll();
        $displaySalesRepsRegionDistributionGraphScript = sprintf ("<script> regionDistributionGraphInit('%s'); </script>", json_encode($salesRepsRegionDistributionArray));
        echo $displaySalesRepsRegionDistributionGraphScript;

        // Region Distribution of Customer
        $customerRegionDistributionArray = $customerRegionDistributionArray -> fetchAll();
        $displayCustomerRegionDistributionGraphScript = sprintf ("<script> regionDistributionGraphInit('%s', 'customerRegionDistributionGraph'); </script>", json_encode($customerRegionDistributionArray));
        echo $displayCustomerRegionDistributionGraphScript;

        // Region Distribution of All orders
        $ordersRegionDistributionArray = $ordersRegionDistributionArray -> fetchAll();
        $displayOrdersQuantityRegionDistributionGraphScript = sprintf ("<script> ordersQuantityRegionDistributionGraphInit('%s', 'ordersQuantityRegionDistributionGraph'); </script>", json_encode($ordersRegionDistributionArray));
        $displayOrdersAmountRegionDistributionGraphScript = sprintf ("<script> ordersAmountRegionDistributionGraphInit('%s', 'ordersAmountRegionDistributionGraph'); </script>", json_encode($ordersRegionDistributionArray));
        echo $displayOrdersQuantityRegionDistributionGraphScript;
        echo $displayOrdersAmountRegionDistributionGraphScript;

    ?>
    <script type="text/javascript">
        addEmptyStatus('all-messages');
        addEmptyStatus('customerOrders');
        addEmptyStatus('salesRepsOrders');
        addEmptyStatus('regionOrders');
    </script>
</body>

</html>           