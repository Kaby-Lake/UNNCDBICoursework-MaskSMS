<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<title>Sign up for me · Wuulin Auto</title>

		<!-- CDN -->
        <script type="text/javascript" src="../published/jquery-3.5.1.js"></script>
        <link rel="stylesheet" href="../published/bootstrap-4.5.0-dist/css/bootstrap.css"/>
        <script type="text/javascript" src="../published/bootstrap-4.5.0-dist/js/bootstrap.bundle.js"></script>
        <script type="text/javascript" src="../published/bootstrap-4.5.0-dist/js/bootstrap.js"></script>
        <link rel="stylesheet" href="../published/font-awesome-4.7.0/css/font-awesome.css">
        <script type="text/javascript" src="../published/bootstrap-show-password/src/bootstrap-show-password.js"></script>
        <script type="text/javascript" src="../published/sha256.js"></script>
        <script type="text/javascript" src="../published/country-regions-country-region-selector/dist/crs.js"></script>
        <script src="https://www.google.com/recaptcha/api.js?hl=en" async defer></script>


        <script type="text/javascript" src="js/signUp.js"></script>


        <style>
			body {
				background-color: white;
			}

			.container {
				max-width: 960px;
			}
		</style>
	</head>

	<body>
		<div class="container">
			<div class="py-5 text-center">
				<img class="d-block mx-auto mb-4" src="img/fill_in_forms.gif" height="150">
				<h2>Create Your Woolin Auto Account</h2>
			</div>

			<ul class="nav nav-tabs col-8 mb-4 mx-auto justify-content-md-center">
				<li class="nav-item">
					<a class="nav-link active" href="signUp.php">Customer</a>
				</li>
			</ul>
			<div class="col-8 mx-auto tab-content text-center" id="nav-tabContent">

			<!-- Create as Customer -->
				<div class="alert alert-primary" role="alert">
					Create Account as <span class="badge badge-secondary">Customer</span>
				</div>
				<form class="needs-validation" onsubmit="return false" id="signUpForm" method="post" novalidate>
					<div class="container col-md-8 text-left">
						<div class="mb-3">
							<label>Username</label>
							<div class="input-group">
								<input type="text" class="form-control" name="username" id="username" placeholder="Username" onchange="validateForm(this.id)" required>
								<div class="invalid-feedback" style="width: 100%;">
									Please enter a valid <b>Username</b>.
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
								Please enter a valid <b>Real Name</b>.
							</div>
						</div>

						<div class="mb-3">
							<label>Passport ID</label>
							<input type="text" class="form-control" name="passportID" id="passportID" placeholder="Passport ID" onchange="validateForm(this.id)" required>
							<div class="invalid-feedback">
								Please enter a valid <b>Passport ID</b>.
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

						<div class="mb-3">
							<label>Country</label>
                            <select class="crs-country custom-select d-block" data-region-id="NOTUSED" name="region" id="region"></select>
							<div class="invalid-feedback">
								Please select a valid country.
							</div>
						</div>

                        <div class="g-recaptcha justify-content-center" data-sitekey="6LdGqvkUAAAAACKtwMZLL5ikUoT7W-f0YSW1dLmp"></div>

                        <button class="btn btn-primary btn-lg btn-block" type="submit" onclick="signUpSubmit()">Sign up</button>
					</div>
				</form>
			</div>
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
                    <div class="modal-body">
                        <div class="alert alert-danger" role="alert" id="failedSignUpMsg">
                            Wrong <b>Username</b> or <b>Password</b>.<br> Try again or contact manager to reset it.
                        </div>
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
                       Successfully signed up as a customer!
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onclick="toLogin()">Sign in</button>
                    </div>
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
    	?>
	</body>

	<footer class="my-5 pt-5 text-muted text-center text-small">
		<p class="mb-1">&copy; 2020 Wuulin Auto</p>
	</footer>

</html>