"use strict";

function logOut() {
    $.ajax({
        type: "POST",
        url: 'php/helper.php',
        data: {
            action: 'logout',
        },
        success: function () {
            localStorage.clear();
            sessionStorage.clear();
            window.location.href="./index.php"
        }
    });
}

function addEmptyStatus(where) {
    let thisPlace = $('#' + where);
    if (thisPlace.children().length === 0) {
        thisPlace.append("<div class='py-5 text-center'>" +
            "               <img class='d-block mx-auto mb-4' src='img/shopping_cart.png'>" +
            "               <h6 class='text-muted'> There's nothing here...</h6>" +
            "             </div>")
    }
}