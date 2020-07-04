<?php

    // return all information of a Customer except password
    function getCustomerInfoByUsername($username) {
        try {
            $conn = new PDO("mysql:dbname=hnyzx3;host=localhost", "hnyzx3", "20126507");
            $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $customerInfoSTMT = $conn -> prepare("SELECT * FROM customer WHERE username = ? LIMIT 1");
            $customerInfoSTMT -> execute( array($username));
            $conn = NULL;
            $row = $customerInfoSTMT -> fetch(PDO::FETCH_ASSOC);
            unset($row['password']);
            return $row;
        } catch (PDOException $e) {
            errorCodeJump(503);
        }
    }

    // return all information of a Customer except password
    function getCustomerInfoById($id) {
        try {
            $conn = new PDO("mysql:dbname=hnyzx3;host=localhost", "hnyzx3", "20126507");
            $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $customerInfoSTMT = $conn -> prepare("SELECT * FROM customer WHERE customerID = ? LIMIT 1");
            $customerInfoSTMT -> execute( array($id));
            $conn = NULL;
            $row = $customerInfoSTMT -> fetch(PDO::FETCH_ASSOC);
            unset($row['password']);
            return $row;
        } catch (PDOException $e) {
            errorCodeJump(503);
        }
    }

    function getSalesRepsInfoByUsername($username) {
        try {
            $conn = new PDO("mysql:dbname=hnyzx3;host=localhost", "hnyzx3", "20126507");
            $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $salesRepsInfoSTMT = $conn -> prepare("SELECT * FROM salesReps WHERE username = ? LIMIT 1");
            $salesRepsInfoSTMT -> execute( array($username));
            $conn = NULL;
            $row = $salesRepsInfoSTMT -> fetch(PDO::FETCH_ASSOC);
            unset($row['password']);
            return $row;
        } catch (PDOException $e) {
            errorCodeJump(503);
        }
    }

    function getSalesRepsInfoById($id) {
        try {
            $conn = new PDO("mysql:dbname=hnyzx3;host=localhost", "hnyzx3", "20126507");
            $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $salesRepsInfoSTMT = $conn -> prepare("SELECT * FROM salesReps WHERE salesRepsID = ? LIMIT 1");
            $salesRepsInfoSTMT -> execute( array($id));
            $conn = NULL;
            $row = $salesRepsInfoSTMT -> fetch(PDO::FETCH_ASSOC);
            unset($row['password']);
            return $row;
        } catch (PDOException $e) {
            errorCodeJump(503);
        }
    }

    function getManagerInfoByUsername($username) {
        try {
            $conn = new PDO("mysql:dbname=hnyzx3;host=localhost", "hnyzx3", "20126507");
            $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $managerInfoSTMT = $conn -> prepare("SELECT * FROM manager WHERE username = ? LIMIT 1");
            $managerInfoSTMT -> execute( array($username));
            $conn = NULL;
            $row = $managerInfoSTMT -> fetch(PDO::FETCH_ASSOC);
            unset($row['password']);
            return $row;
        } catch (PDOException $e) {
            errorCodeJump(503);
        }
    }

    function getManagerInfoById($id) {
        try {
            $conn = new PDO("mysql:dbname=hnyzx3;host=localhost", "hnyzx3", "20126507");
            $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $managerInfoSTMT = $conn -> prepare("SELECT * FROM manager WHERE managerID = ? LIMIT 1");
            $managerInfoSTMT -> execute( array($id));
            $conn = NULL;
            $row = $managerInfoSTMT -> fetch(PDO::FETCH_ASSOC);
            unset($row['password']);
            return $row;
        } catch (PDOException $e) {
            errorCodeJump(503);
        }
    }

    function customerUniqueIDExaminer($username, $uniqueID) {
        try {
            $conn = new PDO("mysql:dbname=hnyzx3;host=localhost", "hnyzx3", "20126507");
            $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $customerInfoSTMT = $conn -> prepare("SELECT * FROM customer WHERE username = ? LIMIT 1");
            $customerInfoSTMT -> execute( array($username));
            $conn = NULL;
            $userInfo = $customerInfoSTMT -> fetch(PDO::FETCH_ASSOC);
            $verifyPassword = $userInfo['password'];
            $verifyUniqueID = hash('sha256', $username . $verifyPassword);
            if ($uniqueID == $verifyUniqueID) {
                return true;
            } else {
                errorCodeJump(414);
            }
        } catch (PDOException $e) {
            errorCodeJump(503);
        }
    }

    function salesRepsUniqueIDExaminer($username, $uniqueID) {
        try {
            $conn = new PDO("mysql:dbname=hnyzx3;host=localhost", "hnyzx3", "20126507");
            $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $salesRepsInfoSTMT = $conn -> prepare("SELECT * FROM salesReps WHERE username = ? LIMIT 1");
            $salesRepsInfoSTMT -> execute( array($username));
            $conn = NULL;
            $userInfo = $salesRepsInfoSTMT -> fetch(PDO::FETCH_ASSOC);
            $verifyPassword = $userInfo['password'];
            $verifyUniqueID = hash('sha256', $username . $verifyPassword);
            if ($uniqueID == $verifyUniqueID) {
                return true;
            } else {
                errorCodeJump(414);
            }
        } catch (PDOException $e) {
            errorCodeJump(503);
        }
    }

    function managerUniqueIDExaminer($username, $uniqueID) {
        try {
            $conn = new PDO("mysql:dbname=hnyzx3;host=localhost", "hnyzx3", "20126507");
            $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $managerInfoSTMT = $conn -> prepare("SELECT * FROM manager WHERE username = ? LIMIT 1");
            $managerInfoSTMT -> execute( array($username));
            $conn = NULL;
            $userInfo = $managerInfoSTMT -> fetch(PDO::FETCH_ASSOC);
            $verifyPassword = $userInfo['password'];
            $verifyUniqueID = hash('sha256', $username . $verifyPassword);
            if ($uniqueID == $verifyUniqueID) {
                return true;
            } else {
                errorCodeJump(414);
            }
        } catch (PDOException $e) {
            errorCodeJump(503);
        }
    }

    function updateSalesRepsQuota($salesRepsID) {
        try {
            $conn = new PDO("mysql:dbname=hnyzx3;host=localhost", "hnyzx3", "20126507");
            $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $getAllValidOrdersSTMT = $conn -> prepare("SELECT salesRepsID, (SUM(N95quantity) + SUM(Surgicalquantity) + SUM(SurgicalN95quantity)) AS SUMQuantity FROM orders WHERE salesRepsID = ? AND (status != -1 AND status != -2) ORDER BY orders.orderID");
            $getAllValidOrdersSTMT -> execute( array($salesRepsID));
            $getAllValidOrdersArray = $getAllValidOrdersSTMT -> fetch(PDO::FETCH_ASSOC);
            $updateQuotaSTMT = $conn -> prepare("UPDATE salesReps SET quotaUsed = ? WHERE salesRepsID = ?");
            $updateQuotaSTMT -> execute( array($getAllValidOrdersArray['SUMQuantity'], $salesRepsID));
        } catch (PDOException $e) {
            errorCodeJump(503);
        }
    }

    function refreshOrderStatus($salesRepsID) {
        try {
            $conn = new PDO("mysql:dbname=hnyzx3;host=localhost", "hnyzx3", "20126507");
            $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $salesRepsInfoSTMT = $conn -> prepare("SELECT salesRepsID, quotaAll FROM salesReps WHERE salesRepsID = ? LIMIT 1");
            $salesRepsInfoSTMT -> execute( array($salesRepsID));
            $salesRepsInfo = $salesRepsInfoSTMT -> fetch(PDO::FETCH_ASSOC);
            $newQuotaAll = $salesRepsInfo['quotaAll'];

            $resetAllOrdersStatusSTMT = $conn -> prepare("UPDATE orders SET status = 0 WHERE salesRepsID = ? AND (status != -1 AND status != -2)");
            $resetAllOrdersStatusSTMT -> execute( array($salesRepsID));

            $getAllValidOrdersSTMT = $conn -> prepare("SELECT salesRepsID, (SUM(N95quantity) + SUM(Surgicalquantity) + SUM(SurgicalN95quantity)) AS SUMQuantity FROM orders WHERE salesRepsID = ? AND (status != -1 AND status != -2) ORDER BY orders.orderID");
            $getAllValidOrdersSTMT -> execute( array($salesRepsID));

            $quotaUsedByFar = 0;
            // pass those that are within quota
            while($getAllValidOrdersArray = $getAllValidOrdersSTMT -> fetch(PDO::FETCH_ASSOC)) {
                $quotaUsedByFar += $getAllValidOrdersArray['SUMQuantity'];
                if($quotaUsedByFar >= $newQuotaAll) {
                    break;
                }
            }
            // set those that exceed new quota to anomaly
            while($getAllValidOrdersArray = $getAllValidOrdersSTMT -> fetch(PDO::FETCH_ASSOC)) {
                $setOrdersStatusSTMT = $conn -> prepare("UPDATE orders SET status = 1 WHERE orderID = ?");
                $setOrdersStatusSTMT -> execute( array($getAllValidOrdersArray['orderID']) );
            }
            $conn = NULL;
        } catch (PDOException $e) {
            errorCodeJump(503);
        }
    }

    function errorCodeJump($code) {
        switch ($code) {
            case 414:
                echo "<script>window.location.href = './index.php?timeout=1';</script>";
                exit();
                break;

            case 503:
                echo "<script>window.location.href = './503.php';</script>";
                exit();
                break;
        }

    }

/*  Error Code:
*
*  503: Database connection problem
*  414: Session timeout
*/

    if ( isset($_POST['action']) && $_POST['action'] == 'logout') {
        session_start();

        unset($_SESSION['username']);
        unset($_SESSION['$uniqueID']);
    }




