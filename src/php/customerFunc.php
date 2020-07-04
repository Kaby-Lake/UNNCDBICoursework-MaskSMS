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

    if(!isset($_SESSION['username']) || !customerUniqueIDExaminer($username, $uniqueID)) {
        errorCodeCallback(414);
    }

    if ( isset($_POST['action']) && $_POST['action'] == 'order') {
        try {
            $conn = new PDO("mysql:dbname=hnyzx3;host=localhost", "hnyzx3", "20126507");
            $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $N95quantity = $_POST['N95quantity'];
            $Surgicalquantity = $_POST['Surgicalquantity'];
            $SurgicalN95quantity = $_POST['SurgicalN95quantity'];
            $amount = $N95quantity * 19 + $Surgicalquantity * 9 + $SurgicalN95quantity * 29;
            $salesRepsID = $_POST['salesRepsID'];
            $customerInfo = getCustomerInfoByUsername($username);
            $salesRepsInfo = getSalesRepsInfoById($salesRepsID);
            $salesRepsQuotaUsedAfter = $salesRepsInfo['quotaUsed'] + $N95quantity + $Surgicalquantity + $SurgicalN95quantity;
            $orderStatus = ($salesRepsInfo['quotaAll'] - $salesRepsQuotaUsedAfter >= 0) ? 0 : 1;

            $reduceQuotaSTMT = $conn -> prepare("UPDATE salesReps SET quotaUsed = ? WHERE salesRepsID = ?");
            $reduceQuotaSTMT -> execute( array($salesRepsQuotaUsedAfter, $salesRepsID));

            $customerID = $customerInfo['customerID'];
            $region = $customerInfo['region'];

            $addOrderSTMT = $conn -> prepare("INSERT INTO orders VALUES (null, NOW(), ?, ?, ?, ?, ?, ?, ?, ?)");
            $addOrderSTMT -> execute(array($N95quantity, $Surgicalquantity, $SurgicalN95quantity, $amount, $region, $customerID, $salesRepsID, $orderStatus));

            $conn = NULL;
            echo json_encode($runtimeStatus);

        } catch (PDOException $e) {
            errorCodeCallback(503);
        }
    }

    if ( isset($_POST['action']) && $_POST['action'] == 'cancel') {
        $orderID = $_POST['orderID'];
        try {
            $conn = new PDO("mysql:dbname=hnyzx3;host=localhost", "hnyzx3", "20126507");
            $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $cancelOrderSTMT = $conn -> prepare("UPDATE orders SET status = -2 WHERE orderID = ?");
            $cancelOrderSTMT -> execute(array($orderID));

            $getOrderSalesRepsSTMT = $conn -> prepare("SELECT salesRepsID, orderID FROM orders WHERE orderID = ? LIMIT 1");
            $getOrderSalesRepsSTMT -> execute(array($orderID));
            $getOrderSalesRepsArray = $getOrderSalesRepsSTMT -> fetch(PDO::FETCH_ASSOC);

            updateSalesRepsQuota($getOrderSalesRepsArray['salesRepsID']);
            $conn = NULL;
            echo json_encode($runtimeStatus);

        } catch (PDOException $e) {
            errorCodeCallback(503);
        }
    }

