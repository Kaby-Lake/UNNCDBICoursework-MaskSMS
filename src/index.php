<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Login · Woolin Auto</title>

        <!-- Open Source Libraries -->
        <script type="text/javascript" src="../published/jquery-3.5.1.js"></script>
        <link rel="stylesheet" href="../published/bootstrap-4.5.0-dist/css/bootstrap.css"/>
        <script type="text/javascript" src="../published/bootstrap-4.5.0-dist/js/bootstrap.bundle.js"></script>
        <script type="text/javascript" src="../published/bootstrap-4.5.0-dist/js/bootstrap.js"></script>
        <link rel="stylesheet" href="../published/font-awesome-4.7.0/css/font-awesome.css">
        <script type="text/javascript" src="../published/bootstrap-show-password/src/bootstrap-show-password.js"></script>
        <script type="text/javascript" src="../published/sha256.js"></script>
        <script src="https://www.google.com/recaptcha/api.js?hl=en" async defer></script>
        <script type="text/javascript" src="../published/js.cookie-2.2.1.min.js"></script>

        <script type="text/javascript" src="js/signIn.js"></script>

        <style>
			html,
			body {
			    height: 100%;
			}

			body {
                display: flex;
                align-items: center;
                padding-top: 40px;
                padding-bottom: 40px;
                background-color: white;
			}

			.form-signin {
                width: 100%;
                max-width: 350px;
                padding: 15px;
                margin: auto;
                font-weight: 400;
			}

			.form-signin .form-control {
                position: relative;
                box-sizing: border-box;
                height: auto;
                padding: 10px;
                font-size: 16px;
			}

			.form-signin input[type="username"] {
                border-radius: 10px 10px 0 0;
            }

            .form-signin button[type="submit"] {
                border-radius: 0 0 10px 10px;
            }
		</style>
	</head>

	<body class="text-center">

		<form class="form-signin" id="signinForm" method="post" onsubmit="return false">
            <h1 class="h3 mb-3">Welcome Back</h1>
			<div class="mb-3">
				<ul class="nav nav-pills nav-fill flex-row" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link btn-light active" data-toggle="pill" onclick="toggleNav(0)" href="#as-customer-msg" role="tab" id="as-customer">Customer</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link btn-light" data-toggle="pill" onclick="toggleNav(1)" href="#as-sales-rep-msg" role="tab" id="as-salesReps">Sales Reps</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link btn-light" data-toggle="pill" onclick="toggleNav(2)" href="#as-manager-msg" role="tab" id="as-manager">Manager</a>
                    </li>
                </ul>
			</div>
			<div class="tab-content text-center mx-auto" id="as-role">
				<div class="tab-pane fade alert alert-light show active" id="as-customer-msg" role="tabpanel">Login as <b>Registered Customer</b></div>
				<div class="tab-pane fade alert alert-light" id="as-sales-rep-msg" role="tabpanel">Login as <b>Sales Representative</b></div>
				<div class="tab-pane fade alert alert-light" id="as-manager-msg" role="tabpanel">Login as <b>Manager</b></div>
			</div>

            <input type="username" id="username" name="username" class="form-control" placeholder="Username" required autofocus>
            <input type="password" data-toggle="password" id="password" name="password" class="form-control" placeholder="Password" required>
			<button class="btn btn-lg btn-block btn-outline-primary mb-4" type="submit" onclick="loginSubmit()">Login</button>
            <div class="g-recaptcha justify-content-center" data-sitekey="6LdGqvkUAAAAACKtwMZLL5ikUoT7W-f0YSW1dLmp"></div>
			<p class="mx-auto">Do not have an account? <br>
				<a href="signUp.php">Sign up</a> for me</p>
		</form>

        <!--   Success message when update info success     -->
        <div class="modal fade" id="updateSuccess" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Update User Info Success</h5>
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-success" role="alert">
                            You have <b>successfully</b> updated your user profile.
                            <br> to apply these changes, you might need to login again.
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <!--   Error message when login failed     -->
        <div class="modal fade" id="errorLogin" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Login Failed</h5>
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-danger" role="alert" id="errorLoginMsg">
                            Wrong <b>Username</b> or <b>Password</b>.<br> PLease try again or contact manager to reset it.
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <!--   Error message when time out     -->
        <div class="modal fade" id="timeOut" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Session Timeout</h5>
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        You have to login as your account again.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <?php
            // select role on nav based on cookie
            echo "<script>toggleCookieNav()</script>";

            // handle sign in failed
            if (isset($_GET['msg'])) {
                $msg = $_GET['msg'];
                echo "<script>toggleErrorSignInMessage('". $msg."')</script>";
            }

            // handle time out
            if (isset($_GET['timeout'])) {
                echo "<script>toggleErrorTimeOutMessage()</script>";
            }

            // handle update info success
            if (isset($_GET['updateSuccess'])) {
            echo "<script>toggleSuccessUpdateInfoMessage()</script>";
            }
        ?>
	</body>

</html>
