"use strict";

function displayOrderLists(time, orderID, region, money, status, customerID, realname, telephone, email, n95Quantity, surgicalQuantity, surgicalN95Quantity) {
    let OrderListArea = $("#all-orders");
    if(status === 1) {
        OrderListArea.prepend(
            "                   <div class='card mb-3 shadow-lg alert-danger'>" +
            "                        <div class='no-gutters container card-body'>" +
            "                            <h5 class='card-title'>" + time + "</h5>" +
            "                            <div class='row justify-content-between'>" +
            "                                <div class='col col-2'>" +
            "                                        <p class='card-text'><small class='text-muted'>Order ID: </small>" + orderID + "</p>" +
            "                                        <p class='card-text'><small class='text-muted'>to: </small>" + region + "</p>" +
            "                                    <div class='row justify-content-between ml-0'>" +
            "                                        <div class='row ml-0'>" +
            "                                            <h3 class='align-self-end'>$</h3>" +
            "                                            <h1 class='align-self-end price-bold' id='N95Spend'>" + money + "</h1>" +
            "                                        </div>" +
            "                                    </div>" +
            "                                </div>" +
            "" +
            "                                <div class='col col-4'>" +
            "                                    <div class='row justify-content-between'>" +
            "                                        <div>" +
            "                                            <h6><small class='text-muted'>Customer ID:  </small></h6>" +
            "                                            <h6><small class='text-muted'>Real name:  </small></h6>" +
            "                                            <h6><small class='text-muted'>Telephone:  </small></h6>" +
            "                                            <h6><small class='text-muted'>Email:  </small></h6>" +
            "                                        </div>" +
            "                                        <div>" +
            "                                            <h6>" + customerID + "</h6>" +
            "                                            <h6>" + realname + "</h6>" +
            "                                            <h6>" + telephone + "</h6>" +
            "                                            <h6>" + email + "</h6>" +
            "                                        </div>" +
            "                                    </div>" +
            "                                </div>" +
            "" +
            "                                <div class='col col-3'>" +
            "                                    <div class='row'>" +
            "                                        <div class='col-4'>" +
            "                                            <img class='align-self-center' src='img/kn95_icon.svg' style='width:30px; height:auto;'>" +
            "                                        </div>" +
            "                                        <div class='col-8'>" +
            "                                            <h5 class='align-self-center ml-2'><small class='text-muted'>Quantity: </small>" + n95Quantity + "</h5>" +
            "                                        </div>" +
            "                                    </div>" +
            "" +
            "                                    <div class='row'>" +
            "                                        <div class='col-4'>" +
            "                                            <img class='align-self-center' src='img/surgical_icon.svg' style='width:auto; height:20px;'>" +
            "                                        </div>" +
            "                                        <div class='col-8'>" +
            "                                            <h5 class='align-self-center ml-2'><small class='text-muted'>Quantity: </small>" + surgicalQuantity + "</h5>" +
            "                                        </div>" +
            "                                    </div>" +
            "" +
            "                                    <div class='row'>" +
            "                                        <div class='col-4'>" +
            "                                            <img class='align-self-center' src='img/kn95_icon.svg' style='width:30px; height:auto;'>" +
            "                                            <img class='align-self-center' src='img/surgical_icon.svg' style='width:auto; height:20px;'>" +
            "                                        </div>" +
            "                                        <div class='col-8'>" +
            "                                            <h5 class='align-self-center ml-2'><small class='text-muted'>Quantity: </small>" + surgicalN95Quantity + "</h5>" +
            "                                        </div>" +
            "                                    </div>" +
            "                                </div>" +
            "                                <div class='col col-2'>" +
            "                                    <button type='button' class='btn btn-danger' onclick=\"cancelOrder('" + orderID + "','" + time + "')\">Cancel Order</button>" +
            "                                </div>" +
            "                               </div>" +
            "                               <h5><small class='text-muted'>Status: </small>Abnormal: Exceed Sales Representative's Quota</h5>" +
            "                        </div>" +
            "                    </div>"
        );
    } else if (status === 0){
        OrderListArea.prepend(
            "                   <div class='card mb-3 shadow-lg'>" +
            "                        <div class='no-gutters container card-body'>" +
            "                            <h5 class='card-title'>" + time + "</h5>" +
            "                            <div class='row justify-content-between'>" +
            "                                <div class='col col-4'>" +
        "                                        <p class='card-text'><small class='text-muted'>Order ID: </small>" + orderID + "</p>" +
        "                                        <p class='card-text'><small class='text-muted'>to: </small>" + region + "</p>" +
            "                                    <div class='row justify-content-between ml-0'>" +
            "                                        <div class='row ml-0'>" +
            "                                            <h3 class='align-self-end'>$</h3>" +
            "                                            <h1 class='align-self-end price-bold' id='N95Spend'>" + money + "</h1>" +
            "                                        </div>" +
            "                                    </div>" +
            "                                </div>" +
            "" +
            "                                <div class='col col-4'>" +
            "                                    <div class='row justify-content-between'>" +
            "                                        <div>" +
            "                                            <h6><small class='text-muted'>Customer ID:  </small></h6>" +
            "                                            <h6><small class='text-muted'>Real name:  </small></h6>" +
            "                                            <h6><small class='text-muted'>Telephone:  </small></h6>" +
            "                                            <h6><small class='text-muted'>Email:  </small></h6>" +
            "                                        </div>" +
            "                                        <div>" +
            "                                            <h6>" + customerID + "</h6>" +
            "                                            <h6>" + realname + "</h6>" +
            "                                            <h6>" + telephone + "</h6>" +
            "                                            <h6>" + email + "</h6>" +
            "                                        </div>" +
            "                                    </div>" +
            "                                </div>" +
            "" +
            "                                <div class='col col-4'>" +
            "                                    <div class='row'>" +
            "                                        <div class='col-4'>" +
            "                                            <img class='align-self-center' src='img/kn95_icon.svg' style='width:30px; height:auto;'>" +
            "                                        </div>" +
            "                                        <div class='col-8'>" +
            "                                            <h5 class='align-self-center ml-2'><small class='text-muted'>Quantity: </small>" + n95Quantity + "</h5>" +
            "                                        </div>" +
            "                                    </div>" +
            "" +
            "                                    <div class='row'>" +
            "                                        <div class='col-4'>" +
            "                                            <img class='align-self-center' src='img/surgical_icon.svg' style='width:auto; height:20px;'>" +
            "                                        </div>" +
            "                                        <div class='col-8'>" +
            "                                            <h5 class='align-self-center ml-2'><small class='text-muted'>Quantity: </small>" + surgicalQuantity + "</h5>" +
            "                                        </div>" +
            "                                    </div>" +
            "" +
            "                                    <div class='row'>" +
            "                                        <div class='col-4'>" +
            "                                            <img class='align-self-center' src='img/kn95_icon.svg' style='width:30px; height:auto;'>" +
            "                                            <img class='align-self-center' src='img/surgical_icon.svg' style='width:auto; height:20px;'>" +
            "                                        </div>" +
            "                                        <div class='col-8'>" +
            "                                            <h5 class='align-self-center ml-2'><small class='text-muted'>Quantity: </small>" + surgicalN95Quantity + "</h5>" +
            "                                        </div>" +
            "                                    </div>" +
            "                                </div>" +
            "                           </div>" +
            "                           <h5><small class='text-muted'>Status: </small>Normal</h5>" +
            "                       </div>" +
            "                    </div>"

        )
    } else if (status === -1) {
        OrderListArea.prepend(
            "                   <div class='card mb-3 shadow-lg alert-dark'>" +
            "                        <div class='no-gutters container card-body'>" +
            "                            <h5 class='card-title'>" + time + "</h5>" +
            "                            <div class='row justify-content-between'>" +
            "                                <div class='col col-2'>" +
            "                                        <p class='card-text'><small class='text-muted'>Order ID: </small>" + orderID + "</p>" +
            "                                        <p class='card-text'><small class='text-muted'>to: </small>" + region + "</p>" +
            "                                    <div class='row justify-content-between ml-0'>" +
            "                                        <div class='row ml-0'>" +
            "                                            <h3 class='align-self-end'>$</h3>" +
            "                                            <h1 class='align-self-end price-bold' id='N95Spend'>" + money + "</h1>" +
            "                                        </div>" +
            "                                    </div>" +
            "                                </div>" +
            "" +
            "                                <div class='col col-4'>" +
            "                                    <div class='row justify-content-between'>" +
            "                                        <div>" +
            "                                            <h6><small class='text-muted'>Customer ID:  </small></h6>" +
            "                                            <h6><small class='text-muted'>Real name:  </small></h6>" +
            "                                            <h6><small class='text-muted'>Telephone:  </small></h6>" +
            "                                            <h6><small class='text-muted'>Email:  </small></h6>" +
            "                                        </div>" +
            "                                        <div>" +
            "                                            <h6>" + customerID + "</h6>" +
            "                                            <h6>" + realname + "</h6>" +
            "                                            <h6>" + telephone + "</h6>" +
            "                                            <h6>" + email + "</h6>" +
            "                                        </div>" +
            "                                    </div>" +
            "                                </div>" +
            "" +
            "                                <div class='col col-3'>" +
            "                                    <div class='row'>" +
            "                                        <div class='col-4'>" +
            "                                            <img class='align-self-center' src='img/kn95_icon.svg' style='width:30px; height:auto;'>" +
            "                                        </div>" +
            "                                        <div class='col-8'>" +
            "                                            <h5 class='align-self-center ml-2'><small class='text-muted'>Quantity: </small>" + n95Quantity + "</h5>" +
            "                                        </div>" +
            "                                    </div>" +
            "" +
            "                                    <div class='row'>" +
            "                                        <div class='col-4'>" +
            "                                            <img class='align-self-center' src='img/surgical_icon.svg' style='width:auto; height:20px;'>" +
            "                                        </div>" +
            "                                        <div class='col-8'>" +
            "                                            <h5 class='align-self-center ml-2'><small class='text-muted'>Quantity: </small>" + surgicalQuantity + "</h5>" +
            "                                        </div>" +
            "                                    </div>" +
            "" +
            "                                    <div class='row'>" +
            "                                        <div class='col-4'>" +
            "                                            <img class='align-self-center' src='img/kn95_icon.svg' style='width:30px; height:auto;'>" +
            "                                            <img class='align-self-center' src='img/surgical_icon.svg' style='width:auto; height:20px;'>" +
            "                                        </div>" +
            "                                        <div class='col-8'>" +
            "                                            <h5 class='align-self-center ml-2'><small class='text-muted'>Quantity: </small>" + surgicalN95Quantity + "</h5>" +
            "                                        </div>" +
            "                                    </div>" +
            "                                </div>" +
            "                               <div class='col col-2'>" +
        "                                       <button type='button' class='btn btn-secondary' disabled>Cancelled</button>" +
        "                                   </div>" +
        "                                </div>" +
    "                                    <h5><small class='text-muted'>Status: </small>Cancelled by You</h5>" +
            "                        </div>" +
            "                    </div>"
        );
    }
}

function displayAnomalyLists(time, orderID, realname, status) {
    let AnomalyListArea = $('#all-messages');
    if(status === 1) {
        AnomalyListArea.prepend("<div class='alert alert-warning' role='alert'>" +
            "                    <h4 class='alert-heading'>An order has exceed your masks quota</h4>" +
            "                    <p>An order (orderID: " + orderID + ") at " + time + " from " + realname + " has exceed your mask quota, check and find more information.</p>" +
            "                    <hr>" +
            "                    <p class='mb-0'>You can contact Manager to grant, re-grant, or update your quota.</p>" +
            "                </div>"
        );
    }
    if(status === -2) {
        AnomalyListArea.prepend("<div class='alert alert-secondary' role='alert'>" +
            "                    <h4 class='alert-heading'>An order has been cancelled by Customer</h4>" +
            "                    <p>An order (orderID: " + orderID + ") at " + time + " has been cancelled by customer: " + realname + ", check and find more information.</p>" +
            "                </div>"
        );
    }

}

function cancelOrder(orderID, orderTime) {
    let timeNow = new Date();
    let timeThere = new Date(orderTime);
    let timeDiff = (timeNow.getTime() - timeThere.getTime());
    if (timeDiff >= 1000 * 60 * 60 * 24) {
        $('#timeMoreThanDay').modal('show');
    } else {
        $('#confirmCancelButton').click(function () {
            $.ajax({
                type: "POST",
                dataType: "json",
                url: 'php/salesRepsFunc.php',
                data: {
                    action: 'cancel',
                    orderID: orderID.toString()
                },
                success: function(status) {
                    console.log(status);
                    if(status['success'] === true) {
                        window.location.reload();
                    } else {
                        switch (status['error']['code']) {
                            case 414:
                                window.location.href = "./index.php?timeout=true";
                                break;
                            case 503:
                                window.location.href = "./503.php";
                                break;
                        }
                    }
                }
            });
        });
        $('#confirmCancel').modal('show');
    }
}

function quotaGraphInit(quotaUsed, quotaAll) {
    const bulletPlot = new G2Plot.Bullet(document.getElementById('quotaGraph'), {
        data: [
            {
                title: 'Quota Used',
                measures: [quotaUsed],
                targets: [quotaAll],
                ranges: [0, 0.6, 0.9, 1],
            },
        ],
        rangeMax: quotaAll,
        rangeColors: ['#B4EBBF', '#FFDBA2', '#FFB1AC'],
        legend: {
            custom: true,
            items: [
                {
                    name: 'Quota Used: ' + quotaUsed,
                    marker: {
                        symbol: 'square',
                        style: {
                            fill: '#5B8FF9',
                        },
                    },
                },
                {
                    name: 'Quota All: ' + quotaAll,
                    marker: {
                        symbol: 'line',
                        style: {
                            stroke: '#5B8FF9',
                        },
                    },
                }
            ],
        },
        axis: {
            visible: true,
            formatter: (text) => text,
        },
    });

    bulletPlot.render();
}

function quotaComponentsGraphInit(orderListEncode) {
    let orderList = JSON.parse(orderListEncode);
    const data = [];

    for (let x of orderList) {
        let temp = {
            type: 'Customer Name: ' + x['realname'],
            value: x['Quantity']
        };
        data.push(temp);
    }

    const donutPlot = new G2Plot.Donut(document.getElementById('quotaComponentsGraph'), {

        statistic: {
            visible: false
        },
        description: {
            visible: true,
            text: 'Different color represents different customer, different section within same color represents different orders.',
        },
        radius: 0.8,
        padding: 'auto',
        data,
        angleField: 'value',
        colorField: 'type',
    });

    donutPlot.render();
}

function initModifyProfile(jsonObject) {
    let salesRepsInfo = JSON.parse(jsonObject);
    $('#username').val(salesRepsInfo['username']);
    $('#realname').val(salesRepsInfo['realname']);
    $('#employeeID').val(salesRepsInfo['employeeID']);
    $('#telephone').val(salesRepsInfo['telephone']);
    $('#email').val(salesRepsInfo['email']);
}

function updateInfoSubmit () {
    let thisForm = $('#updateForm');

    if ($('#changePassword').is(':checked')) {
        let passwordDiv = $('#password');
        let samePasswordDiv = $('#secondPassword');
        // if not the same then flush password to prevent sign up
        if (passwordDiv.val() !== samePasswordDiv.val()) {
            passwordDiv.val("");
        }
        let sha256password = sha256(passwordDiv.val());
        // apply sha256 to password to store on server
        passwordDiv.val(sha256password);

    }
    let usernameDiv = $('#username');
    let emailDiv = $('#email');

    // store lowercase username on server
    let usernameLowercase = usernameDiv.val().toLowerCase();
    usernameDiv.val(usernameLowercase);
    // store lowercase email on server
    let emailLowercase = emailDiv.val().toLowerCase();
    emailDiv.val(emailLowercase);

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "php/updateSalesRepsInfoFunc.php",
        data: thisForm.serialize(),
        success: function (status) {
            console.log(status);
            if (status['success'] === true) {
                window.location.href = "./index.php?updateSuccess=true";
            } else {
                switch (status['error']['code']) {
                    case 414:
                        window.location.href = "./index.php?timeout=true";
                        break;
                    case 503:
                        window.location.href = "./503.php";
                        break;
                    case 200:
                        window.location.href = "./salesReps.php?msg=" + status['error']['message'];
                        break;
                }
            }
        }
    });
}
