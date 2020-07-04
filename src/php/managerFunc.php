<?php

/*  Error Code:
 *
 *  503: Database connection problem
 *  414: Session timeout
 */

    session_start();
    require 'helperRedirect.php';
    // check login
    $username = $_SESSION['username'];
    $uniqueID = $_SESSION['uniqueID'];

    $runtimeStatus = array('success' => true);

    if(!isset($_SESSION['username']) || !managerUniqueIDExaminer($username, $uniqueID)) {
        errorCodeCallback(414);
    }

    if ( isset($_POST['action']) && $_POST['action'] == 'Re-grant') {
        $employeeID = $_POST['employeeID'];
        $value = $_POST['value'];
        try {
            // set up database
            $conn = new PDO("mysql:dbname=hnyzx3;host=localhost", "hnyzx3", "20126507");
            $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $RegrantQuotaSTMT = $conn -> prepare("UPDATE salesReps SET quotaAll = quotaAll + ? WHERE employeeID = ?");
            $RegrantQuotaSTMT -> execute( array($value, $employeeID));
        } catch (PDOException $e) {
            errorCodeCallback(503);
        }
        $salesRepsInfoSTMT = $conn -> prepare("SELECT salesRepsID, quotaAll FROM salesReps WHERE employeeID = ? LIMIT 1");
        $salesRepsInfoSTMT -> execute( array($employeeID));
        $salesRepsInfo = $salesRepsInfoSTMT -> fetch(PDO::FETCH_ASSOC);
        refreshOrderStatus($salesRepsInfo['salesRepsID']);
        $conn = NULL;
    }

    if ( isset($_POST['action']) && $_POST['action'] == 'Update') {
        $employeeID = $_POST['employeeID'];
        $value = $_POST['value'];
        try {
            // set up database
            $conn = new PDO("mysql:dbname=hnyzx3;host=localhost", "hnyzx3", "20126507");
            $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $UpdateQuotaSTMT = $conn -> prepare("UPDATE salesReps SET quotaAll = ? WHERE employeeID = ?");
            $UpdateQuotaSTMT -> execute(array($value, $employeeID));
        } catch (PDOException $e) {
            errorCodeCallback(503);
        }
        $salesRepsInfoSTMT = $conn -> prepare("SELECT salesRepsID, quotaAll FROM salesReps WHERE employeeID = ? LIMIT 1");
        $salesRepsInfoSTMT -> execute( array($employeeID));
        $salesRepsInfo = $salesRepsInfoSTMT -> fetch(PDO::FETCH_ASSOC);
        refreshOrderStatus($salesRepsInfo['salesRepsID']);
        $conn = NULL;
    }

    if ( isset($_POST['action']) && $_POST['action'] == 'getSalesRepsInfo') {
        $selectedSalesRepsID = $_POST['SalesRepsID'];
        $salesRepsInfo = json_encode(getSalesRepsInfoById($selectedSalesRepsID));
        echo $salesRepsInfo;
    }

    if ( isset($_POST['action']) && $_POST['action'] == 'getCustomerInfo') {
        $selectedCustomerID = $_POST['CustomerID'];
        $customerInfo = json_encode(getCustomerInfoById($selectedCustomerID));
        echo $customerInfo;
    }

    if ( isset($_POST['action']) && $_POST['action'] == 'initSalesRepsGraph') {
        $selectedSalesRepsID = $_POST['SalesRepsID'];
        try {
            // set up database
            $conn = new PDO("mysql:dbname=hnyzx3;host=localhost", "hnyzx3", "20126507");
            $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $SalesRepsGraphSTMT = $conn -> prepare("SELECT CONCAT(YEAR(time), ' ', WEEK(time)) AS WEEKS, status, (SUM(N95quantity) + SUM(Surgicalquantity) + SUM(SurgicalN95quantity) )AS SUMQuantity, SUM(amount) AS SUMRevenue FROM orders WHERE (salesRepsID = ? AND (status = 0 OR status = 1)) GROUP BY status, CONCAT(YEAR(time), ' ', WEEK(time)) ORDER BY MAX(time), status DESC");
            $SalesRepsGraphSTMT -> execute( array($selectedSalesRepsID));
            $SalesRepsGraphArray = $SalesRepsGraphSTMT -> fetchAll(PDO::FETCH_ASSOC);
            $temp = json_encode($SalesRepsGraphArray);
            echo $temp;
            $conn = NULL;
        } catch (PDOException $e) {
            errorCodeCallback(503);
        }
    }

    if ( isset($_POST['action']) && $_POST['action'] == 'SalesRepsOrderArray') {
        $selectedSalesRepsID = $_POST['SalesRepsID'];
        try {
            $conn = new PDO("mysql:dbname=hnyzx3;host=localhost", "hnyzx3", "20126507");
            $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $getOrderSalesRepsSTMT = $conn -> prepare("SELECT orders.time, orders.orderID, orders.region, orders.amount, orders.status, customer.customerID, customer.realname AS customerRealname, customer.telephone AS customerTelephone, customer.email AS customerEmail, salesReps.employeeID AS salesRepsEmployeeID, salesReps.realname AS salesRepsRealname, salesReps.telephone AS salesRepsTelephone, salesReps.email AS salesRepsEmail, orders.N95quantity, orders.Surgicalquantity, orders.SurgicalN95quantity FROM orders, customer, salesReps WHERE orders.salesRepsID = ? AND (orders.status = 0 OR orders.status = 1) AND orders.customerID = customer.customerID AND orders.salesRepsID = salesReps.salesRepsID ORDER BY orders.orderID");
            $getOrderSalesRepsSTMT -> execute( array($selectedSalesRepsID));
            $SalesRepsOrdersArray = $getOrderSalesRepsSTMT -> fetchAll(PDO::FETCH_NUM );
            $temp = json_encode($SalesRepsOrdersArray);
            echo $temp;
            $conn = NULL;
        } catch (PDOException $e) {
            errorCodeCallback(503);
        }
    }

    if ( isset($_POST['action']) && $_POST['action'] == 'initCustomerGraph') {
        $selectedCustomerID = $_POST['CustomerID'];
        try {
            // set up database
            $conn = new PDO("mysql:dbname=hnyzx3;host=localhost", "hnyzx3", "20126507");
            $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $CustomerGraphSTMT = $conn -> prepare("SELECT CONCAT(YEAR(time), ' ', WEEK(time)) AS WEEKS, status, (SUM(N95quantity) + SUM(Surgicalquantity) + SUM(SurgicalN95quantity) )AS SUMQuantity, SUM(amount) AS SUMRevenue FROM orders WHERE (customerID = ? AND (status = 0 OR status = 1)) GROUP BY status, CONCAT(YEAR(time), ' ', WEEK(time)) ORDER BY MAX(time), status DESC");
            $CustomerGraphSTMT -> execute(array($selectedCustomerID));
            $CustomerGraphArray = $CustomerGraphSTMT -> fetchAll(PDO::FETCH_ASSOC);
            $temp = json_encode($CustomerGraphArray);
            echo $temp;
            $conn = NULL;
        } catch (PDOException $e) {
            errorCodeCallback(503);
        }
    }

    if ( isset($_POST['action']) && $_POST['action'] == 'CustomerOrderArray') {
        $selectedCustomerID = $_POST['CustomerID'];
        try {
            $conn = new PDO("mysql:dbname=hnyzx3;host=localhost", "hnyzx3", "20126507");
            $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $getOrderCustomerSTMT = $conn -> prepare("SELECT orders.time, orders.orderID, orders.region, orders.amount, orders.status, customer.customerID, customer.realname AS customerRealname, customer.telephone AS customerTelephone, customer.email AS customerEmail, salesReps.employeeID AS salesRepsEmployeeID, salesReps.realname AS salesRepsRealname, salesReps.telephone AS salesRepsTelephone, salesReps.email AS salesRepsEmail, orders.N95quantity, orders.Surgicalquantity, orders.SurgicalN95quantity FROM orders, customer, salesReps WHERE orders.customerID = ? AND (orders.status = 0 OR orders.status = 1) AND orders.customerID = customer.customerID AND orders.salesRepsID = salesReps.salesRepsID ORDER BY orders.orderID");
            $getOrderCustomerSTMT -> execute( array($selectedCustomerID));
            $SalesCustomerArray = $getOrderCustomerSTMT -> fetchAll(PDO::FETCH_NUM);
            $temp = json_encode($SalesCustomerArray);
            echo $temp;
            $conn = NULL;
        } catch (PDOException $e) {
            errorCodeCallback(503);
        }
    }

    if ( isset($_POST['action']) && $_POST['action'] == 'RegionOrderArray') {
        $selectedRegion = $_POST['region'];
        try {
            // set up database
            $conn = new PDO("mysql:dbname=hnyzx3;host=localhost", "hnyzx3", "20126507");
            $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $sqlGetOrderRegionSTMT = $conn -> prepare("SELECT orders.time, orders.orderID, orders.region, orders.amount, orders.status, customer.customerID, customer.realname AS customerRealname, customer.telephone AS customerTelephone, customer.email AS customerEmail, salesReps.employeeID AS salesRepsEmployeeID, salesReps.realname AS salesRepsRealname, salesReps.telephone AS salesRepsTelephone, salesReps.email AS salesRepsEmail, orders.N95quantity, orders.Surgicalquantity, orders.SurgicalN95quantity FROM orders, customer, salesReps WHERE orders.region = ? AND (orders.status = 0 OR orders.status = 1) AND orders.customerID = customer.customerID AND orders.salesRepsID = salesReps.salesRepsID ORDER BY orders.orderID");
            $sqlGetOrderRegionSTMT -> execute(array($selectedRegion));
            $temp = json_encode($sqlGetOrderRegionSTMT -> fetchAll());
            echo $temp;
            $conn = NULL;
        } catch (PDOException $e) {
            errorCodeCallback(503);
        }
    }

    if ( isset($_POST['action']) && $_POST['action'] == 'mysql') {
        if (! $_SESSION['isSudo']) {
            errorCodeCallback(414);
        }
        $scripts = $_POST['script'];
        try {
            // set up database
            $conn = new PDO("mysql:dbname=hnyzx3;host=localhost", "hnyzx3", "20126507");
            $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $result = $conn -> query($scripts);
            $runtimeStatus['result'] = $result -> fetchAll(PDO::FETCH_ASSOC);
            $conn = NULL;
            $temp = json_encode($runtimeStatus);
            echo $temp;
        } catch (PDOException $e) {
            $runtimeStatus['success'] = false;
            $runtimeStatus['error'] = $e -> getMessage();
            $temp = json_encode($runtimeStatus);
            echo $temp;
        }
    }

    if ( isset($_POST['action']) && $_POST['action'] == 'changeSalesRepsRegion') {
        $salesRepsID = $_POST['SalesRepsID'];
        $targetRegion = $_POST['targetRegion'];
        try {
            // set up database
            $conn = new PDO("mysql:dbname=hnyzx3;host=localhost", "hnyzx3", "20126507");
            $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $sqlUpdateOrderRegionSTMT = $conn -> prepare("UPDATE salesReps SET region = ? WHERE salesRepsID = ?");
            $sqlUpdateOrderRegionSTMT -> execute(array($targetRegion, $salesRepsID));
            $temp = json_encode($runtimeStatus);
            echo $temp;
            $conn = NULL;
        } catch (PDOException $e) {
            errorCodeCallback(503);
        }
    }