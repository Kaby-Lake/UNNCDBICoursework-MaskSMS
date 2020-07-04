"use strict";

// shows the total quantity
let cardList = [-1, -1, -1];
// shows the total price
let cardSpend = [0, 0, 0];

function showCartCard(num) {
    let cardItem = $("#shopping-cart");

    if (num === 1 && cardList[0] === -1) {
        cardItem.prepend(
            "                    <div class='card mb-3 shadow-lg'>" +
            "                        <div class='row no-gutters'>" +
            "                            <div class='col-md-8'>" +
            "                                <div class='card-body'>" +
            "                                    <h5 class='card-title'>N95 Respirators</h5>" +
            "                                    <div class='row'>" +
            "                                        <label for='N95QuantitySelect' class='col-4'>" +
            "                                            <input class='col-4' id='N95QuantitySelect' type='text' onchange='sumEach(1)' value='1' name='N95QuantitySelect'>" +
            "                                            <script>" +
            "                                                $(\"input[name='N95QuantitySelect']\").TouchSpin({" +
            "                                                    min: 0," +
            "                                                    step: 1," +
            "                                                    buttondown_class: 'btn btn-secondary'," +
            "                                                    buttonup_class: 'btn btn-secondary'," +
            "                                                });" +
            "                                            </script>" +
            "                                        </label>" +
            "                                        <h3 class='align-self-end'>$</h3>" +
            "                                        <h4 class='align-self-end' id='N95Spend'>19</h4>" +
            "                                    </div>" +
            "                                </div>" +
            "                            </div>" +
            "                            <div class='col-md-4'>" +
            "                                <img src='img/surgical_n95_respirator_promo.png' class='card-img'>" +
            "                            </div>" +
            "                        </div>" +
            "                    </div>");
        cardList[0] = 1;
        sumEach(1);
    }
    if (num === 2 && cardList[1] === -1) {
        cardItem.prepend(
            "<div class='card mb-3 shadow-lg'>" +
            "                        <div class='row no-gutters'>" +
            "                            <div class='col-md-8'>" +
            "                                <div class='card-body'>" +
            "                                    <h5 class='card-title'>Surgical Masks</h5>" +
            "                                    <div class='row'>" +
            "                                        <label for='surgicalQuantitySelect' class='col-4'>" +
            "                                            <input class='col-4' id='surgicalQuantitySelect' type='text' onchange='sumEach(2)' value='1' name='surgicalQuantitySelect'>" +
            "                                            <script>" +
            "                                                $(\"input[name='surgicalQuantitySelect']\").TouchSpin({" +
            "                                                    min: 0," +
            "                                                    step: 1," +
            "                                                    buttondown_class: 'btn btn-secondary'," +
            "                                                    buttonup_class: 'btn btn-secondary'," +
            "                                                });" +
            "                                            </script>" +
            "                                        </label>" +
            "                                        <h3 class='align-self-end'>$</h3>" +
            "                                        <h4 class='align-self-end' id='surgicalSpend'>9</h4>" +
            "                                    </div>" +
            "                                </div>" +
            "                            </div>" +
            "                            <div class='col-md-4'>" +
            "                                <img src='img/surgical_mask_promo.png' class='card-img'>" +
            "                            </div>" +
            "                        </div>" +
            "                    </div>");
        cardList[1] = 1;
        sumEach(2);
    }
    if (num === 3 && cardList[2] === -1) {
        cardItem.prepend(
            "<div class='card mb-3 shadow-lg'>" +
            "                        <div class='row no-gutters'>" +
            "                            <div class='col-md-8'>" +
            "                                <div class='card-body'>" +
            "                                    <h5 class='card-title'>Surgical N95 Respirators</h5>" +
            "                                    <div class='row'>" +
            "                                        <label for='SurgicalN95QuantitySelect' class='col-4'>" +
            "                                            <input class='col-4' id='SurgicalN95QuantitySelect' type='text' onchange='sumEach(3)' value='1' name='SurgicalN95QuantitySelect'>" +
            "                                            <script>" +
            "                                                $(\"input[name='SurgicalN95QuantitySelect']\").TouchSpin({" +
            "                                                    min: 0," +
            "                                                    step: 1," +
            "                                                    buttondown_class: 'btn btn-secondary'," +
            "                                                    buttonup_class: 'btn btn-secondary'," +
            "                                                });" +
            "                                            </script>" +
            "                                        </label>" +
            "                                            <h3 class='align-self-end'>$</h3>" +
            "                                            <h4 class='align-self-end' id='SurgicalN95Spend'>29</h4>" +
            "                                    </div>" +
            "                                </div>" +
            "                            </div>" +
            "                            <div class='col-md-4'>" +
            "                                <img src='img/n95_respirator_promo.png' class='card-img'>" +
            "                            </div>" +
            "                        </div>");
        cardList[2] = 1;
        sumEach(3);
    }
}

function sumEach(num) {
    if(num === 1) {
        cardList[0] = $("#N95QuantitySelect").val();
        cardSpend[0] = cardList[0] * 19;
        $("#N95Spend").html(cardSpend[0].toString());
    }
    if(num === 2) {
        cardList[1] = $("#surgicalQuantitySelect").val();
        cardSpend[1] = cardList[1] * 9;
        $("#surgicalSpend").html(cardSpend[1].toString());
    }
    if(num === 3) {
        cardList[2] = $("#SurgicalN95QuantitySelect").val();
        cardSpend[2] = cardList[2] * 29;
        $("#SurgicalN95Spend").html(cardSpend[2].toString());
    }
    $("#totalSpend").html((cardSpend[0] + cardSpend[1] + cardSpend[2]).toString());
}

function orderSubmit() {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: 'php/customerFunc.php',
        data:{
            action: 'order',
            N95quantity: cardSpend[0] / 19,
            Surgicalquantity: cardSpend[1] / 9,
            SurgicalN95quantity: cardSpend[2] / 29,
            salesRepsID: $("#salesRepsSelect").val()
        },
        success: function(status) {
            console.log(status);
            if(status['success'] === true) {
                $('#orderSubmitSuccess').modal('show');
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
}

function displayOrderLists(time, orderID, region, money, status, salesRepsID, realname, telephone, email, n95Quantity, surgicalQuantity, surgicalN95Quantity) {
    let OrderListArea = $("#all-orders");
    if(status === 1) {
        OrderListArea.prepend(
        "                   <div class='card mb-3 shadow-lg alert-warning'>" +
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
        "                                            <h6><small class='text-muted'>Sales Reps ID:  </small></h6>" +
        "                                            <h6><small class='text-muted'>Real name:  </small></h6>" +
        "                                            <h6><small class='text-muted'>Telephone:  </small></h6>" +
        "                                            <h6><small class='text-muted'>Email:  </small></h6>" +
        "                                        </div>" +
        "                                        <div>" +
        "                                            <h6>" + salesRepsID + "</h6>" +
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
    } else if (status === 0) {
        OrderListArea.prepend(
            "                   <div class='card mb-3 shadow-lg'>" +
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
            "                                            <h6><small class='text-muted'>Sales Reps ID:  </small></h6>" +
            "                                            <h6><small class='text-muted'>Real name:  </small></h6>" +
            "                                            <h6><small class='text-muted'>Telephone:  </small></h6>" +
            "                                            <h6><small class='text-muted'>Email:  </small></h6>" +
            "                                        </div>" +
            "                                        <div>" +
            "                                            <h6>" + salesRepsID + "</h6>" +
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
            "                                </div>" +
            "                               <h5><small class='text-muted'>Status: </small>Normal</h5>" +
            "                        </div>" +
            "                    </div>"
        );
    } else if (status === -1) {
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
            "                                            <h6><small class='text-muted'>Sales Reps ID:  </small></h6>" +
            "                                            <h6><small class='text-muted'>Real name:  </small></h6>" +
            "                                            <h6><small class='text-muted'>Telephone:  </small></h6>" +
            "                                            <h6><small class='text-muted'>Email:  </small></h6>" +
            "                                        </div>" +
            "                                        <div>" +
            "                                            <h6>" + salesRepsID + "</h6>" +
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
            "                                </div>" +
            "                               <h5><small class='text-muted'>Status: </small>Abnormal: Cancelled by Sales Representative</h5>" +
            "                        </div>" +
            "                    </div>"
        );
    } else if (status === -2) {
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
            "                                            <h6><small class='text-muted'>Sales Reps ID:  </small></h6>" +
            "                                            <h6><small class='text-muted'>Real name:  </small></h6>" +
            "                                            <h6><small class='text-muted'>Telephone:  </small></h6>" +
            "                                            <h6><small class='text-muted'>Email:  </small></h6>" +
            "                                        </div>" +
            "                                        <div>" +
            "                                            <h6>" + salesRepsID + "</h6>" +
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
            "                                    <button type='button' class='btn btn-secondary' disabled>Cancelled</button>" +
            "                                </div>" +
            "                                </div>" +
            "                               <h5><small class='text-muted'>Status: </small>Cancelled by You</h5>" +
            "                        </div>" +
            "                    </div>"
        );
    }
}

function popSelectSalesReps() {
    if(cardSpend[0] === 0 && cardSpend[1] === 0 && cardSpend[2] === 0) {
        $('#noItemSelected').modal('show');
        return;
    }
    $('#selectSalesReps').modal('show');
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
                url: 'php/customerFunc.php',
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

function displayAnomalyLists(status, time, orderID, realname) {
    let AnomalyListArea = $('#all-messages');
    if(status === 1) {
        AnomalyListArea.prepend("<div class='alert alert-warning' role='alert'>" +
            "                    <h4 class='alert-heading'>An Order has exceed Sales Representative's masks quota</h4>" +
            "                    <p>An order (orderID: " + orderID + ") at " + time + " has exceed " + realname + "'s mask quota, check and find more information.</p>" +
            "                    <hr>" +
            "                    <p class='mb-0'>You can contact Sales Representative for more information.</p>" +
            "                </div>"
        );
    } else if (status === -1) {
        AnomalyListArea.prepend("<div class='alert alert-danger' role='alert'>" +
            "                    <h4 class='alert-heading'>An Order has been cancelled by Sales Representative</h4>" +
            "                    <p>An order (orderID: " + orderID + ") at " + time + " has been cancelled by " + realname + " due to exceeding of Sales Representative's mask quota, check and find more information.</p>" +
            "                    <hr>" +
            "                    <p class='mb-0'>You can contact Sales Representative for more information.</p>" +
            "                </div>"
        );
    }
}

function initModifyProfile(jsonObject) {
    let customerInfo = JSON.parse(jsonObject);
    $('#username').val(customerInfo['username']);
    $('#realname').val(customerInfo['realname']);
    $('#passportID').val(customerInfo['passportID']);
    $('#telephone').val(customerInfo['telephone']);
    $('#email').val(customerInfo['email']);
}

function updateInfoSubmit () {
    let thisForm = $('#updateForm');

    if($('#changePassword').is(':checked')) {
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
        url: "php/updateCustomerInfoFunc.php",
        data: thisForm.serialize(),
        success: function (status) {
            console.log(status);
            if(status['success'] === true) {
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
                        window.location.href = "./customer.php?msg=" + status['error']['message'];
                        break;
                }
            }
        }
    });
}