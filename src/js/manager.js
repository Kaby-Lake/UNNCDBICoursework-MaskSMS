"use strict";

function displayOrderLists(time, orderID, region, money, status, customerID, customerRealname, customerTelephone, customerEmail, salesRepsEmployeeID, salesRepsRealname, salesRepsTelephone, salesRepsEmail, n95Quantity, surgicalQuantity, surgicalN95Quantity, placeToAdd="all-orders") {
    let OrderListArea = $("#" + placeToAdd);
    status = parseInt(status);
    let statusString, statusAlert;
    if (status === 1) {
        const timeNow = new Date();
        let timeThere = new Date(time);
        let timeDiff = (timeNow.getTime() - timeThere.getTime());
        if (timeDiff > 1000 * 60 * 60 * 24) {
            statusString = "Abnormal: Exceed Sales Representative's Quota <span class='badge badge-danger'>Complete</span>";
        } else {
            statusString = "Abnormal: Exceed Sales Representative's Quota <span class='badge badge-warning'>Within 24 Hours</span>";
        }
        statusAlert = "<div class='card mb-3 shadow-lg alert-warning'>";

    } else {
        statusString = "Normal";
        statusAlert = "<div class='card mb-3 shadow-lg'>";
    }
    OrderListArea.prepend(
        statusAlert +
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

        "                                <div class='col col-3'>" +
        "                                    <div class='row justify-content-between'>" +
        "                                        <div>" +
        "                                            <h6><small class='text-muted'>Customer ID:  </small></h6>" +
        "                                            <h6><small class='text-muted'>Real name:  </small></h6>" +
        "                                            <h6><small class='text-muted'>Telephone:  </small></h6>" +
        "                                            <h6><small class='text-muted'>Email:  </small></h6>" +
        "                                        </div>" +
        "                                        <div>" +
        "                                            <h6>" + customerID + "</h6>" +
        "                                            <h6>" + customerRealname + "</h6>" +
        "                                            <h6>" + customerTelephone + "</h6>" +
        "                                            <h6>" + customerEmail + "</h6>" +
        "                                        </div>" +
        "                                    </div>" +
        "                                </div>" +

        "                                <div class='col col-4'>" +
        "                                    <div class='row justify-content-between'>" +
        "                                        <div>" +
        "                                            <h6><small class='text-muted'>SalesRepsEmployeeID:  </small></h6>" +
        "                                            <h6><small class='text-muted'>Real name:  </small></h6>" +
        "                                            <h6><small class='text-muted'>Telephone:  </small></h6>" +
        "                                            <h6><small class='text-muted'>Email:  </small></h6>" +
        "                                        </div>" +
        "                                        <div>" +
        "                                            <h6>" + salesRepsEmployeeID + "</h6>" +
        "                                            <h6>" + salesRepsRealname + "</h6>" +
        "                                            <h6>" + salesRepsTelephone + "</h6>" +
        "                                            <h6>" + salesRepsEmail + "</h6>" +
        "                                        </div>" +
        "                                    </div>" +
        "                                </div>" +

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
        "                               </div>" +
        "                               <h5><small class='text-muted'>Status: </small>" + statusString + "</h5>" +
        "                        </div>" +
        "                    </div>"
    );
}

function displayAnomalyLists(time, orderID, region, salesRepsEmployeeID, salesRepsRealname, customerRealname) {
    let AnomalyListArea = $('#all-messages');
    AnomalyListArea.prepend("<div class='alert alert-warning' role='alert'>" +
        "                    <h4 class='alert-heading'>An order has exceed masks quota, but 24 hours has passed</h4>" +
        "                    <p>An order (orderID: " + orderID + ") in " + region + " at " + time + " from " + customerRealname + " has exceed " + salesRepsRealname + " (EmployeeID: " + salesRepsEmployeeID + ")'s mask quota, but 24 hours has passed and this order is considered as complete and sold. check and find more information.</p>" +
        "                    <hr>" +
        "                    <p class='mb-0'>You can grant, re-grant, or update Sales Representative's quota.</p>" +
        "                </div>"
        );
}

function displayQuotaManagement(employeeID, employeeRealname, quotaAvaliable, quotaAll) {
    const quotaManagement = $('#quotaManagement');
    if(quotaAvaliable >= 0) {
        quotaManagement.prepend(
            "                       <div class='card col-4 p-3'" +
            "                           <div class='card-body' id='" + employeeID + "'>" +
            "                                <h5 class='card-title'>" + employeeRealname + "</h5>" +
            "                                <div class='card-text container p-0'>" +
            "                                    <small>Employee ID: " + employeeID + "</small>" +
            "                                    <div class='alert alert-success' role='alert'>" +
            "                                        Quota has <b>" + quotaAvaliable + "</b> of <b>" + quotaAll + "</b> available" +
            "                                    </div>" +
            "                                    <form class='form-inline mb-2 regrantQuota'>" +
            "                                        <input type='number' class='form-control col-9 inputRe-grantValue' placeholder='Re-grant Quota' min='0' oninput='value=value.replace(/[^\\d]/g,'')'>" +
            "                                        <button type='button' class='btn alert-info col-3' data-toggle='modal' data-target='#confirmUpdateQuota' data-action='Re-grant' data-value='" + employeeID + "'>Add</button>" +
            "                                        <small>Re-grant will be added to exist Quota</small>" +
            "                                    </form>" +
            "                                    <form class='form-inline mb-2 updateQuota'>" +
            "                                        <input type='number' class='form-control col-9 inputUpdateValue' placeholder='Update Quota'>" +
            "                                        <button type='button' class='btn alert-info col-3' data-toggle='modal' data-target='#confirmUpdateQuota' data-action='Update' data-value='" + employeeID + "'>Set</button>" +
            "                                        <small>Update will set to new Quota</small>" +
            "                                    </form>" +
            "                                </div>" +
            "                            </div>" +
            "                         </div>");
    } else {
        quotaManagement.prepend(
            "                       <div class='card col-4 p-3'" +
            "                           <div class='card-body' id='" + employeeID + "'>" +
            "                                <h5 class='card-title'>" + employeeRealname + "</h5>" +
            "                                <div class='card-text container p-0'>" +
            "                                    <small>Employee ID: " + employeeID + "</small>" +
            "                                    <div class='alert alert-danger' role='alert'>" +
            "                                        Quota exceeds <b>" + quotaAvaliable + "</b> of <b>" + quotaAll + "</b>" +
            "                                    </div>" +
            "                                    <form class='form-inline mb-2 regrantQuota'>" +
            "                                        <input type='number' class='form-control col-9 inputRe-grantValue' placeholder='Re-grant Quota' min='0' oninput='value=value.replace(/[^\\d]/g,'')'>" +
            "                                        <button type='button' class='btn alert-info col-3' data-toggle='modal' data-target='#confirmUpdateQuota' data-action='Re-grant' data-value='" + employeeID + "'>Add</button>" +
            "                                        <small>Re-grant will be added to exist Quota</small>" +
            "                                    </form>" +
            "                                    <form class='form-inline mb-2 updateQuota'>" +
            "                                        <input type='number' class='form-control col-9 inputUpdateValue' placeholder='Update Quota'>" +
            "                                        <button type='button' class='btn alert-info col-3' data-toggle='modal' data-target='#confirmUpdateQuota' data-action='Update' data-value='" + employeeID + "'>Set</button>" +
            "                                        <small>Update will set to new Quota</small>" +
            "                                    </form>" +
            "                                </div>" +
            "                            </div>" +
            "                         </div>");
    }

}

function logOut() {
    $.ajax({
        type: "POST",
        url: 'php/customerFunc.php',
        data: {
            action: 'logout',
        },
        success: function () {
            window.location.href="./index.php"
        }
    });
    localStorage.clear();
    sessionStorage.clear();
}

let salesRepsQuantityGraph;
let salesRepsRevenueGraph;

function totalQuantityGraphInit(normalNumber, anomalyNumber) {
    const data = [
        {
            Type: 'Quantity',
            WithorWithoutAnomaly: 'Normal',
            Quantity: normalNumber
        },
        {
            Type: 'Quantity',
            WithorWithoutAnomaly: 'Anomaly',
            Quantity: anomalyNumber
        },
    ];

    const stackBarPlot = new G2Plot.StackedBar(document.getElementById('totalQuantityGraph'), {
        forceFit: false,
        height: 300,
        data,
        yField: 'Type',
        xField: 'Quantity',
        label: {
            visible: true,
            formatter: (v) => v
        },
        stackField: 'WithorWithoutAnomaly',
        colorField: 'WithorWithoutAnomaly',
        color: (d) => {
            if(d ==='Normal') return 'rgba(100,149,249,0.76)';
            return '#f9d78f';
        }
    });
    stackBarPlot.render();
}

function totalRevenueGraphInit(normalRevenues, anomalyRevenues) {
    const data = [
        {
            Type: 'Revenues',
            WithorWithoutAnomaly: 'Normal',
            Revenue: normalRevenues
        },
        {
            Type: 'Revenues',
            WithorWithoutAnomaly: 'Anomaly',
            Revenue: anomalyRevenues
        },
    ];

    const stackBarPlot = new G2Plot.StackedBar(document.getElementById('totalRevenueGraph'), {
        height: 300,
        data,
        yField: 'Type',
        xField: 'Revenue',
        label: {
            visible: true,
            formatter: (v) => '$' + v
        },
        stackField: 'WithorWithoutAnomaly',
        colorField: 'WithorWithoutAnomaly',
        color: (d) => {
            if(d ==='Normal') return 'rgba(100,149,249,0.76)';
            return '#f9d78f';
        }
    });
    stackBarPlot.render();
}

function regionDistributionGraphInit(regionDistributionEncode, placeToAdd="salesRepsRegionDistributionGraph") {

    let regionDistribution = JSON.parse(regionDistributionEncode);
    let data = [];
    let total = 0;

    for (let x of regionDistribution) {
        let temp = {
            'Country & Region': x[1],
            Number: parseInt(x[0])
        };
        total += parseInt(x[0]);
        data.push(temp);
    }

    const rosePlot = new G2Plot.Rose(document.getElementById(placeToAdd), {
        forceFit: true,
        title: {
            visible: true,
            text: 'Total: ' + total,
        },
        radius: 0.8,
        data,
        radiusField: 'Number',
        categoryField: 'Country & Region',
        colorField: 'Country & Region',
        label: {
            visible: true,
            type: 'outer',
            autoRotate: false,
            content: (text) => text.value,
        },
    });

    rosePlot.render();
}

function ordersQuantityRegionDistributionGraphInit(regionDistributionEncode, placeToAdd="salesRepsRegionDistributionGraph") {

    let regionDistribution = JSON.parse(regionDistributionEncode);
    let data = [];
    let total = 0;

    for (let x of regionDistribution) {
        let temp = {
            'Country & Region': x[2],
            Number: parseInt(x[0])
        };
        total += parseInt(x[0]);
        data.push(temp);
    }

    const rosePlot = new G2Plot.Rose(document.getElementById(placeToAdd), {
        forceFit: true,
        title: {
            visible: true,
            text: 'Total: ' + total,
        },
        radius: 0.8,
        data,
        radiusField: 'Number',
        categoryField: 'Country & Region',
        colorField: 'Country & Region',
        label: {
            visible: true,
            type: 'outer',
            autoRotate: false,
            content: (text) => text.value,
        },
    });

    rosePlot.render();
}

function ordersAmountRegionDistributionGraphInit(regionDistributionEncode, placeToAdd="salesRepsRegionDistributionGraph") {

    let regionDistribution = JSON.parse(regionDistributionEncode);
    let data = [];
    let total = 0;

    for (let x of regionDistribution) {
        let temp = {
            'Country & Region': x[2],
            Number: parseInt(x[1])
        };
        total += parseInt(x[1]);
        data.push(temp);
    }

    const rosePlot = new G2Plot.Rose(document.getElementById(placeToAdd), {
        forceFit: true,
        title: {
            visible: true,
            text: 'Total: ' + total,
        },
        radius: 0.8,
        data,
        radiusField: 'Number',
        categoryField: 'Country & Region',
        colorField: 'Country & Region',
        label: {
            visible: true,
            type: 'outer',
            autoRotate: false,
            content: (text) => text.value,
        },
    });

    rosePlot.render();
}

function quantityGraphInit(weeklyQuantityEncode, placeholder = "WeeklyQuantityGraph") {
    let weeklyJSON = JSON.parse(weeklyQuantityEncode);
    let data = [];

    for (let x of weeklyJSON) {
        let temp = {
            Week: x['WEEKS'],
            WithorWithoutAnomaly: x['status'] == '0' ? 'Normal' : 'Anomaly',
            Quantity: parseInt(x['SUMQuantity'])
        };
        data.push(temp);
    }

    if(data.length === 0) {
        data = [{ Week: '', WithorWithoutAnomaly: '', Quantity: ''}];
    }

    if(salesRepsQuantityGraph) {
        salesRepsQuantityGraph.destroy();
    }
    salesRepsQuantityGraph = new G2Plot.StackedBar(document.getElementById(placeholder), {
        forceFit: true,
        data,
        yField: 'Week',
        xField: 'Quantity',
        label: {
            visible: true,
            formatter: (v) => v
        },
        xAxis: {
            tickCount: 8,
        },
        stackField: 'WithorWithoutAnomaly',
        colorField: 'WithorWithoutAnomaly',
        color: (d) => {
            if(d ==='Normal') return 'rgba(100,149,249,0.76)';
            return '#f9d78f';
        }
    });
    salesRepsQuantityGraph.render();
}

function revenueGraphInit(weeklyQuantityEncode, placeholder = "WeeklyRevenueGraph") {
    let weeklyJSON = JSON.parse(weeklyQuantityEncode);
    let data = [];

    for (let x of weeklyJSON) {
        let temp = {
            Week: x['WEEKS'],
            WithorWithoutAnomaly: x['status'] == '0' ? 'Normal' : 'Anomaly',
            Revenue: parseInt(x['SUMRevenue'])
        };
        data.push(temp);
    }

    if(data.length === 0) {
        data = [{ Week: '', WithorWithoutAnomaly: '', Revenue: ''}];
    }

    if(salesRepsRevenueGraph) {
        salesRepsRevenueGraph.destroy();
    }
    salesRepsRevenueGraph = new G2Plot.StackedBar(document.getElementById(placeholder), {
        forceFit: true,
        data,
        yField: 'Week',
        xField: 'Revenue',
        label: {
            visible: true,
            formatter: (v) => '$' + v
        },
        xAxis: {
            tickCount: 8,
        },
        stackField: 'WithorWithoutAnomaly',
        colorField: 'WithorWithoutAnomaly',
        color: (d) => {
            if(d ==='Normal') return 'rgba(100,149,249,0.76)';
            return '#f9d78f';
        }
    });
    salesRepsRevenueGraph.render();
}

function displaySelectedSalesRepsInfo(salesRepsInfo, salesRepsID) {
    let changeableRegion = sprintf("<select class='crs-country form-control-sm mb-4' data-region-id='NOTUSED' data-default-option='%s' data-default-value='%s' name='region' id='selectCustomerForStatistics' onchange=\"changeSalesRepsRegion('%s', $(this).val());\"></select>", salesRepsInfo['region'], salesRepsInfo['region'], salesRepsID);
    $('#selectedSalesRepsInfo').prepend(
        "                   <div class='card mb-3 shadow-lg'>" +
        "                        <div class='no-gutters container card-body'>" +
        "                            <h5 class='card-title'>" + salesRepsInfo['realname'] + "</h5>" +
        "                            <div class='row justify-content-between p-3'>" +
        "                                <div class='col col-3'>" +
        "                                    <div class='row justify-content-between'>" +
        "                                        <div>" +
        "                                            <h6><small class='text-muted'>Sales Reps EmployeeID:  </small></h6>" +
        "                                            <h6><small class='text-muted'>Real name:  </small></h6>" +
        "                                            <h6><small class='text-muted'>Username:  </small></h6>" +
        "                                        </div>" +
        "                                        <div>" +
        "                                            <h6>" + salesRepsInfo['employeeID'] + "</h6>" +
        "                                            <h6>" + salesRepsInfo['realname'] + "</h6>" +
        "                                            <h6>" + salesRepsInfo['username'] + "</h6>" +
        "                                        </div>" +
        "                                    </div>" +
        "                                </div>" +

        "                                <div class='col col-5'>" +
        "                                    <div class='row justify-content-between'>" +
        "                                        <div>" +
        "                                            <h6><small class='text-muted'>Telephone:  </small></h6>" +
        "                                            <h6><small class='text-muted'>Email:  </small></h6>" +
        "                                            <h6><small class='text-muted'>Region:  </small></h6>" +
        "                                        </div>" +
        "                                        <div>" +
        "                                            <h6>" + salesRepsInfo['telephone'] + "</h6>" +
        "                                            <h6>" + salesRepsInfo['email'] + "</h6>" +
                                                            changeableRegion +
        "                                        </div>" +
        "                                    </div>" +
        "                                </div>" +

        "                                <div class='col col-3'>" +
        "                                    <div class='row justify-content-between'>" +
        "                                        <div>" +
        "                                            <h6><small class='text-muted'>Quota Used:  </small></h6>" +
        "                                            <h6><small class='text-muted'>Quota All:  </small></h6>" +
        "                                        </div>" +
        "                                        <div>" +
        "                                            <h6>" + salesRepsInfo['quotaUsed'] + "</h6>" +
        "                                            <h6>" + salesRepsInfo['quotaAll'] + "</h6>" +
        "                                        </div>" +
        "                                    </div>" +
        "                                </div>" +
    "                                </div>" +
        "                        </div>" +
        "                    </div>"
    );
    crs.init();
}

function changeSalesRepsRegion(salesRepsID, targetRegion) {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: 'php/managerFunc.php',
        data: {
            action: 'changeSalesRepsRegion',
            SalesRepsID: salesRepsID,
            targetRegion: targetRegion
        },
        success: function(status) {
            console.log(status);
            if (status['success'] === true) {
                $('#selectedSalesRepsInfo').append("<div class='alert alert-success alert-dismissible fade show' role='alert'>" +
                    "  You have successfully changed this Sales Reps's region." +
                    "  <button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
                    "    <span aria-hidden='true'>&times;</span>" +
                    "  </button>" +
                    "</div>");
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

function displaySelectedCustomerInfo(customerInfo) {
    $('#selectedCustomerInfo').prepend(
        "                   <div class='card mb-3 shadow-lg'>" +
        "                        <div class='no-gutters container card-body'>" +
        "                            <h5 class='card-title'>" + customerInfo['realname'] + "</h5>" +
        "                            <div class='row justify-content-around p-3'>" +
        "                                <div class='col col-3'>" +
        "                                    <div class='row justify-content-between'>" +
        "                                        <div>" +
        "                                            <h6><small class='text-muted'>Customer ID:  </small></h6>" +
        "                                            <h6><small class='text-muted'>Real name:  </small></h6>" +
        "                                            <h6><small class='text-muted'>Username:  </small></h6>" +
        "                                        </div>" +
        "                                        <div>" +
        "                                            <h6>" + customerInfo['customerID'] + "</h6>" +
        "                                            <h6>" + customerInfo['realname'] + "</h6>" +
        "                                            <h6>" + customerInfo['username'] + "</h6>" +
        "                                        </div>" +
        "                                    </div>" +
        "                                </div>" +

        "                                <div class='col col-3'>" +
        "                                    <div class='row justify-content-between'>" +
        "                                        <div>" +
        "                                            <h6><small class='text-muted'>Telephone:  </small></h6>" +
        "                                            <h6><small class='text-muted'>Email:  </small></h6>" +
        "                                            <h6><small class='text-muted'>Region:  </small></h6>" +
        "                                        </div>" +
        "                                        <div>" +
        "                                            <h6>" + customerInfo['telephone'] + "</h6>" +
        "                                            <h6>" + customerInfo['email'] + "</h6>" +
        "                                            <h6>" + customerInfo['region'] + "</h6>" +
        "                                        </div>" +
        "                                    </div>" +
        "                                </div>" +

        "                                </div>" +
        "                        </div>" +
        "                    </div>"
    );
}

function refreshSalesRepsStatistics(selectedSalesRepsID) {
    $.ajax({
        type: "POST",
        url: 'php/managerFunc.php',
        data: {
            action: 'getSalesRepsInfo',
            SalesRepsID: selectedSalesRepsID
        },
        success: function (data) {
            $('#selectedSalesRepsInfo').empty();
            let decodeInfo = JSON.parse(data);
            displaySelectedSalesRepsInfo(decodeInfo, selectedSalesRepsID);
        }
    });

    $.ajax({
        type: "POST",
        url: 'php/managerFunc.php',
        data: {
            action: 'initSalesRepsGraph',
            SalesRepsID: selectedSalesRepsID
        },
        success: function (data) {
            quantityGraphInit(data, 'SalesRepsQuantityGraph');
            revenueGraphInit(data, 'SalesRepsRevenueGraph');
        }
    });

    $.ajax({
        type: "POST",
        url: 'php/managerFunc.php',
        data: {
            action: 'SalesRepsOrderArray',
            SalesRepsID: selectedSalesRepsID
        },
        success: function (data) {
            $('#salesRepsOrders').empty()
            let SalesRepsOrderArray = JSON.parse(data);
            for (let x of SalesRepsOrderArray) {
                displayOrderLists(x[0], x[1], x[2], x[3], x[4], x[5], x[6], x[7], x[8], x[9], x[10], x[11], x[12], x[13], x[14], x[15], 'salesRepsOrders');
            }
            addEmptyStatus('salesRepsOrders');
        }
    });
}

function refreshCustomerStatistics(customerID) {
    $.ajax({
        type: "POST",
        url: 'php/managerFunc.php',
        data: {
            action: 'getCustomerInfo',
            CustomerID: customerID
        },
        success: function (data) {
            $('#selectedCustomerInfo').empty();
            let decodeInfo = JSON.parse(data);
            displaySelectedCustomerInfo(decodeInfo);
        }
    });

    $.ajax({
        type: "POST",
        url: 'php/managerFunc.php',
        data: {
            action: 'initCustomerGraph',
            CustomerID: customerID
        },
        success: function (data) {
            quantityGraphInit(data, 'CustomerQuantityGraph');
            revenueGraphInit(data, 'CustomerRevenueGraph');
        }
    });

    $.ajax({
        type: "POST",
        url: 'php/managerFunc.php',
        data: {
            action: 'CustomerOrderArray',
            CustomerID: customerID
        },
        success: function (data) {
            $('#customerOrders').empty()
            let CustomerOrderArray = JSON.parse(data);
            for (let x of CustomerOrderArray) {
                displayOrderLists(x[0], x[1], x[2], x[3], x[4], x[5], x[6], x[7], x[8], x[9], x[10], x[11], x[12], x[13], x[14], x[15], 'customerOrders');
            }
            addEmptyStatus('customerOrders');
        }
    });
}

function refreshRegionStatistics(region) {

    $.ajax({
        type: "POST",
        url: 'php/managerFunc.php',
        data: {
            action: 'RegionOrderArray',
            region: region
        },
        success: function (data) {
            $('#regionOrders').empty()
            let regionOrderArray = JSON.parse(data);
            for (let x of regionOrderArray) {
                displayOrderLists(x[0], x[1], x[2], x[3], x[4], x[5], x[6], x[7], x[8], x[9], x[10], x[11], x[12], x[13], x[14], x[15], 'regionOrders');
            }
            addEmptyStatus('regionOrders');
        }
    });
}

function salesRepsSignUpSubmit () {
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
    let passwordLowercase = usernameDiv.val().toLowerCase();
    usernameDiv.val(passwordLowercase);
    // store lowercase email on server
    let emailLowercase = emailDiv.val().toLowerCase();
    emailDiv.val(emailLowercase);

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "php/signUpSalesRepsFunc.php" ,
        data: thisForm.serialize(),
        success: function (status) {
            console.log(status);
            if(status['success'] === true) {
                window.location.href = "./manager.php?success=true";
            } else {
                switch (status['error']['code']) {
                    case 414:
                        window.location.href = "./index.php?timeout=true";
                        break;
                    case 503:
                        window.location.href = "./503.php";
                        break;
                    case 200:
                        window.location.href = "./manager.php?msg=" + status['error']['message'];
                        break;
                }
            }
        }
    });
}