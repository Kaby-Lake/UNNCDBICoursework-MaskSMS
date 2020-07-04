<?php
    function signUpFailed($msg) {
        $runtimeStatus = array('success' => false);
        $runtimeStatus['error'] = array('code' => 200, 'message' => $msg);
        echo json_encode($runtimeStatus);
        exit();
    }

    function signUpSuccess() {
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
    $employeeid = $_POST["employeeID"];
    $telephone = $_POST["telephone"];
    $email = $_POST["email"];
    $region = $_POST["region"];
    $recaptcha = $_POST['g-recaptcha-response'];

    if($recaptcha == '') {
        signUpFailed('You have to pass the reCAPTCHA <i class="fa fa-check-square-o"></i> before updating user profile.');
    }
    $errorMessage = validateSignUpForm($username, $passwordSha256, $realname, $employeeid, $telephone, $region, $email);

    if($errorMessage) {
        signUpFailed($errorMessage);
    }

    try {
        $conn = new PDO("mysql:dbname=hnyzx3;host=localhost", "hnyzx3", "20126507");
        $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // check if this username already exists in database
        $sameUsernameSTMT = $conn -> prepare("SELECT salesRepsID FROM salesReps WHERE username = ?");
        $sameUsernameSTMT -> execute( array($username));
        $sameUsernameArray = $sameUsernameSTMT -> fetchAll(PDO::FETCH_ASSOC);
        if (count($sameUsernameArray) != 0) {
            $conn = NULL;
            signUpFailed("Username already exists");
        } else {  // add user
            $addUserSTMT = $conn -> prepare("INSERT INTO salesReps VALUES (null, ?, ?, ?, ?, ?, ?, ?, 0, 0)");
            $addUserSTMT -> execute( array($username, $passwordSha256, $realname, $passport, $telephone, $region, $email));
            signUpSuccess();
        }
        $conn = NULL;
    } catch (PDOException $e) {
        errorCodeCallback(503);
    }
