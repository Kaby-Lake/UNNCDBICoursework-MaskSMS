"use strict";

function toggleErrorSignInMessage(msg) {
    $('#errorLoginMsg').html(msg);
    $('#errorLogin').modal('show');

    // flush previous typed password
    $('#inputPassword').val("");
}

function toggleErrorTimeOutMessage() {
    $('#timeOut').modal('show');
}

function toggleSuccessUpdateInfoMessage() {
    $('#updateSuccess').modal('show');
}

// determine sign in as Customer, Sales Reps or Manager
let role = 0;

function toggleNav(nav) {
    role = nav;
}

function toggleCookieNav() {
    let cookieRole = parseInt(Cookies.get('historyRole'));
    if (isNaN(cookieRole)) {
        return;
    } else {
        switch (cookieRole) {
            case 0:
                $('#as-customer').tab('show');
                break;
            case 1:
                $('#as-salesReps').tab('show');
                break;
            case 2:
                $('#as-manager').tab('show');
                break;
        }
        role = cookieRole;
    }
}


function loginSubmit() {
    let thisForm = $('#signinForm');
    let roleInput=$("<input type='text' name='as-role'/>");
    roleInput.attr("value", role);
    roleInput.hide();
    thisForm.append(roleInput);

    let password = $('#password');
    let username = $('#username');

    let sha256password = sha256(password.val());
    // apply sha256 to password to store on server
    password.val(sha256password);

    // compare lowercase username on server
    let passwordLowercase = username.val().toLowerCase();
    username.val(passwordLowercase);

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "php/signInFunc.php" ,
        data: thisForm.serialize(),
        success: function (status) {
            console.log(status);
            if(status['success'] === true) {
                switch (status['code']['role']) {
                    case 0:
                        window.location.href = "./customer.php";
                        break;
                    case 1:
                        window.location.href = "./salesReps.php";
                        break;
                    case 2:
                        window.location.href = "./manager.php";
                        break;
                    case 3:
                        window.location.href = "./admin.php";
                        break;
                }
            } else {
                switch (status['error']['code']) {
                    case 414:
                        window.location.href = "./index.php?timeout=true";
                        break;
                    case 503:
                        window.location.href = "./503.php";
                        break;
                    case 200:
                        window.location.href = "./index.php?msg=" + status['error']['message'];
                        break;
                }
            }
        }
    });
}
