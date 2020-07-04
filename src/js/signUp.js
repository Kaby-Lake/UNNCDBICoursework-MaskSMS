"use strict";

function validateForm(what) {
    switch (what) {
        case 'username':
            validateUsername();
            break;
        case 'password':
            validatePassword();
            break;
        case 'secondPassword':
            validateSamePassword();
            break;
        case 'realname':
            validateRealname();
            break;
        case 'passportID':
            validatePassportID();
            break;
        case 'email':
            validateEmail();
            break;
        case 'employeeID':
            validatePassportID('employeeID');
            break;
        case 'telephone':
            validateTelephone();
            break;
    }
}

function validateUsername() {
    let usernameDiv = $('#username');
    if (!(/^[a-zA-Z0-9_]{1,15}$/).test(usernameDiv.val()) || usernameDiv.val().length > 30) {
        usernameDiv.removeClass('is-valid');
        usernameDiv.addClass('is-invalid');
    } else {
        usernameDiv.removeClass('is-invalid');
        usernameDiv.addClass('is-valid');
    }
}

function validatePassword() {
    let passwordDiv = $('#password');
    if (passwordDiv.val().length < 8 || passwordDiv.val().length > 30) {
        passwordDiv.removeClass('is-valid');
        passwordDiv.addClass('is-invalid');
    } else {
        passwordDiv.removeClass('is-invalid');
        passwordDiv.addClass('is-valid');
    }
}

function validateSamePassword() {
    let passwordDiv = $('#password');
    let samePasswordDiv = $('#secondPassword');
    if (passwordDiv.val() !== samePasswordDiv.val()) {
        samePasswordDiv.removeClass('is-valid');
        samePasswordDiv.addClass('is-invalid');
    } else {
        samePasswordDiv.addClass('is-valid');
        samePasswordDiv.removeClass('is-invalid');
    }
}

function validateRealname() {
    let realnameDiv = $('#realname');
    if (realnameDiv.val().length <= 0 || realnameDiv.val().length > 255) {
        realnameDiv.removeClass('is-valid');
        realnameDiv.addClass('is-invalid');
    } else {
        realnameDiv.removeClass('is-invalid');
        realnameDiv.addClass('is-valid');
    }
}

function validatePassportID(passportIdOrEmployeeId = 'passportID') {
    let passportDiv = $('#' + passportIdOrEmployeeId);
    if (passportDiv.val().length < 8 || passportDiv.val().length > 30) {
        passportDiv.removeClass('is-valid');
        passportDiv.addClass('is-invalid');
    } else {
        passportDiv.removeClass('is-invalid');
        passportDiv.addClass('is-valid');
    }
}

function validateTelephone() {
    let telephoneDiv = $('#telephone');
    if (telephoneDiv.val().length < 0 || telephoneDiv.val().length > 20) {
        telephoneDiv.removeClass('is-valid');
        telephoneDiv.addClass('is-invalid');
    } else {
        telephoneDiv.removeClass('is-invalid');
        telephoneDiv.addClass('is-valid');
    }
}

function validateEmail() {
    let emailDiv = $('#email');
    if (!emailDiv.val().match("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")) {
        emailDiv.removeClass("is-valid");
        emailDiv.addClass("is-invalid");
    } else {
        emailDiv.removeClass("is-invalid");
        emailDiv.addClass("is-valid");
    }
}

function toLogin() {
    window.location.href="./index.php"
}

function toggleErrorSignUpMessage(msg) {
    $('#failedSignUpMsg').html(msg);
    $('#failedSignUp').modal('show');
}

function toggleSuccessSignUpMessage(msg) {
    $('#successSignUp').modal('show');
}

function signUpSubmit () {
    let thisForm = $('#signUpForm');

    let passwordDiv = $('#password');
    let samePasswordDiv = $('#secondPassword');
    let usernameDiv = $('#username');
    let emailDiv = $('#email');
    // if not the same then flush password to prevent sign up
    if (passwordDiv.val() !== samePasswordDiv.val()) {
        passwordDiv.val("");
    }
    let sha256password = sha256(passwordDiv.val());
    // apply sha256 to password to store on server
    passwordDiv.val(sha256password);
    // store lowercase username on server
    let usernameLowercase = usernameDiv.val().toLowerCase();
    usernameDiv.val(usernameLowercase);
    // store lowercase email on server
    let emailLowercase = emailDiv.val().toLowerCase();
    emailDiv.val(emailLowercase);

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "php/signUpFunc.php" ,
        data: thisForm.serialize(),
        success: function (status) {
            console.log(status);
            if(status['success'] === true) {
                window.location.href = "./signUp.php?success=true";
            } else {
                switch (status['error']['code']) {
                    case 414:
                        window.location.href = "./index.php?timeout=true";
                        break;
                    case 503:
                        window.location.href = "./503.php";
                        break;
                    case 200:
                        window.location.href = "./signUp.php?msg=" + status['error']['message'];
                        break;
                }
            }
        }
    });
}
