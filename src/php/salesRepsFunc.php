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

    if(!isset($_SESSION['username']) || !salesRepsUniqueIDExaminer($username, $uniqueID)) {
        errorCodeCallback(414);
    }

    if ( isset($_POST['action']) && $_POST['action'] == 'cancel') {
        $orderID = $_POST['orderID'];
        try {
            $conn = new PDO("mysql:dbname=hnyzx3;host=localhost", "hnyzx3", "20126507");
            $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $cancelOrderSTMT = $conn -> prepare("UPDATE orders SET status = -1 WHERE orderID = ?");
            $cancelOrderSTMT -> execute(array($orderID));

            $getOrderSalesRepsSTMT = $conn -> prepare("SELECT salesRepsID FROM orders WHERE orderID = ? LIMIT 1");
            $getOrderSalesRepsSTMT -> execute(array($orderID));
            $getOrderSalesRepsArray = $getOrderSalesRepsSTMT -> fetch(PDO::FETCH_ASSOC);

            updateSalesRepsQuota($getOrderSalesRepsArray['salesRepsID']);
            $conn = NULL;
        } catch (PDOException $e) {
            errorCodeCallback(503);
        }
        echo json_encode($runtimeStatus);
    }