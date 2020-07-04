<?php
    /*  Error Code:
    *
    *  503: Database connection problem
    *  414: Session timeout
    *  200: pop error message
    */

    require 'helper.php';
    function signInFailed($msg="Wrong <b>Username</b> or <b>Password</b>.<br> Try again or contact manager to reset it.") {
        $runtimeStatus = array('success' => false);
        $runtimeStatus['error'] = array('code' => 200, 'message' => $msg);
        echo json_encode($runtimeStatus);
        exit();
    }

    // a JSON to be echo to ajax as status
    $runtimeStatus = array('success' => false);

    session_start();

    // check post parameters
    $username = $_POST['username'];
    $password = $_POST['password'];
    $role = $_POST['as-role'];
    $recaptcha = $_POST['g-recaptcha-response'];

    setcookie('historyRole', $role, time() + 24 * 60 * 60);

    if ( $username == null || $password == null || $role == null) {
        signInFailed();
    } else {
        if($recaptcha == '') {
            signInFailed('You have to pass the reCAPTCHA <i class="fa fa-check-square-o"></i> before login');
        }
        try {
            // set up database
            $conn = new PDO("mysql:dbname=hnyzx3;host=localhost", "hnyzx3", "20126507");
            $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            switch ($role) {
                // Customer login
                case 0:
                    $searchCustomerSTMT = $conn -> prepare("SELECT * FROM customer WHERE username = ? AND password = ? LIMIT 1");
                    $searchCustomerSTMT -> execute( array($username, $password));
                    $searchCustomerArray = $searchCustomerSTMT -> fetchAll(PDO::FETCH_ASSOC);
                    $conn = NULL;
                    if(count($searchCustomerArray) == 1) {
                        $_SESSION['uniqueID'] = hash('sha256',$username . $password);
                        $_SESSION['username'] = $username;
                        $runtimeStatus['success'] = true;
                        $runtimeStatus['code'] = array('role' => 0, 'message' => 'Sign in as customer success, redirecting..');
                        echo json_encode($runtimeStatus);
                    } else {
                        signInFailed();
                    }
                    break;
                // SalesReps login
                case 1:
                    $searchSalesRepsSTMT = $conn -> prepare("SELECT * FROM salesReps WHERE username = ? AND password = ? LIMIT 1");
                    $searchSalesRepsSTMT -> execute( array($username, $password));
                    $searchSalesRepsArray = $searchSalesRepsSTMT -> fetchAll(PDO::FETCH_ASSOC);
                    $conn = NULL;
                    if(count($searchSalesRepsArray) == 1) {
                        $_SESSION['uniqueID'] = hash('sha256', $username . $password);
                        $_SESSION['username'] = $username;
                        $runtimeStatus['success'] = true;
                        $runtimeStatus['code'] = array('role' => 1, 'message' => 'Sign in as sales reps success, redirecting..');
                        echo json_encode($runtimeStatus);
                    } else {
                        signInFailed();
                    }
                    break;
                // Manager login
                case 2:
                    $searchManagerSTMT = $conn -> prepare("SELECT * FROM manager WHERE username = ? AND password = ? LIMIT 1");
                    $searchManagerSTMT -> execute( array($username, $password));
                    $searchManagerArray = $searchManagerSTMT -> fetchAll(PDO::FETCH_ASSOC);
                    $conn = NULL;
                    if(count($searchManagerArray) == 1) {
                        $_SESSION['uniqueID'] = hash('sha256', $username . $password);
                        $_SESSION['username'] = $username;
                        $_SESSION['isSudo'] = $searchManagerArray[0]['isAdmin'];
                        if ($_SESSION['isSudo']) {
                            $runtimeStatus['success'] = true;
                            $runtimeStatus['code'] = array('role' => 3, 'message' => 'Sign in as admin success, redirecting..');
                            echo json_encode($runtimeStatus);
                        } else {
                            $runtimeStatus['success'] = true;
                            $runtimeStatus['code'] = array('role' => 2, 'message' => 'Sign in as manager success, redirecting..');
                            echo json_encode($runtimeStatus);
                        }
                    } else {
                        signInFailed();
                    }
                    break;
            }
        } catch (PDOException $e) {
            errorCodeCallback(503);
        }
}

