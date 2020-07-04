<?php
    function updateFailed($msg) {
        $runtimeStatus = array('success' => false);
        $runtimeStatus['error'] = array('code' => 200, 'message' => $msg);
        echo json_encode($runtimeStatus);
        exit();
    }

    function updateSuccess() {
        $runtimeStatus['success'] = true;
        echo json_encode($runtimeStatus);
        exit();
    }

    function validateSignUpForm($username, $passwordSha256, $realname, $passportIdOREmployeeID, $telephone, $region, $email) {
        // double check if post parameters meets requirements
        if ($username == "" || !preg_match('/^[a-zA-Z0-9_]{1,15}$/', $username)) {
            return "<b>Username</b> is empty or invalid";
        }

        // sha256("") = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
        if ($passwordSha256 == "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855") {
            return "<b>Password</b> is empty or invalid";
        }

        if ($realname == "" || strlen($realname) > 255) {
            return "<b>Real Name</b> is empty or invalid";
        }

        if ($passportIdOREmployeeID == "" || strlen($passportIdOREmployeeID) > 20 ) {
            return "<b>Passport</b> is empty or invalid";
        }

        if ($telephone == "" || strlen($telephone) > 20 ) {
            return "<b>Telephone Number</b> is empty or invalid";
        }

        if ($email == "" || strlen($email) > 255 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return "<b>Email Address</b> is empty or invalid";
        }

        if ($region == "" || strlen($region) > 255) {
            return "<b>Country or Region</b> is empty or invalid";
        }
        return false;
    }

    require 'helperRedirect.php';
    session_start();

    $runtimeStatus = array('success' => false);

    $username = $_POST["username"];
    $passwordSha256 = $_POST["password"];
    $realname = $_POST["realname"];
    $employee = $_POST["employeeID"];
    $telephone = $_POST["telephone"];
    $email = $_POST["email"];
    $changePassword = $_POST["changePassword"];
    $recaptcha = $_POST['g-recaptcha-response'];

    if($recaptcha == '') {
        updateFailed('You have to pass the reCAPTCHA <i class="fa fa-check-square-o"></i> before updating information.');
    }

    if($changePassword == true) {
        $errorMessage = validateSignUpForm($username, $passwordSha256, $realname, $employee, $telephone, "China", $email);
    } else {
        $errorMessage = validateSignUpForm($username, 'thisisforvalidation', $realname, $employee, $telephone, "China", $email);
    }

    if($errorMessage) {
        updateFailed($errorMessage);
    }

    try {
        $conn = new PDO("mysql:dbname=hnyzx3;host=localhost", "hnyzx3", "20126507");
        $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        if($changePassword) {
            $updateInfoSTMT = $conn -> prepare("UPDATE salesReps SET password = ?, realname = ?, employeeID = ?, telephone = ?, email = ? WHERE username = ?");
            $updateInfoSTMT -> execute( array($passwordSha256, $realname, $employee, $telephone, $email, $username));
        } else {
            $updateInfoSTMT = $conn -> prepare("UPDATE salesReps SET realname = ?, employeeID = ?, telephone = ?, email = ? WHERE username = ?");
            $updateInfoSTMT -> execute( array($realname, $employee, $telephone, $email, $username));
        }
        $conn = NULL;
        updateSuccess();
    } catch (PDOException $e) {
        errorCodeCallback(503);
    }



