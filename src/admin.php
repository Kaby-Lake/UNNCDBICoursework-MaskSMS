<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin · Woolin Auto</title>
    <link rel="stylesheet" href="../published/xp.css/dist/XP.css">
    <script type="text/javascript" src="../published/jquery-3.5.1.js"></script>
    <link rel="stylesheet" href="../published/bootstrap-4.5.0-dist/css/bootstrap.css"/>
    <script type="text/javascript" src="../published/bootstrap-4.5.0-dist/js/bootstrap.bundle.js"></script>
    <script type="text/javascript" src="../published/bootstrap-4.5.0-dist/js/bootstrap.js"></script>
    <script type="text/javascript" src="../published/js.cookie-2.2.1.min.js"></script>

    <script type="text/javascript" src="js/helper.js"></script>

    <style>
        .center {
            position: fixed;
            top: 50%;
            left: 50%;
            margin-top: -100px;
            margin-left: -200px;
        }

        body {
            background-image: url('img/windows_xp.jpg');
        }

        pre {
            color: white;
            white-space: pre-wrap;
            word-wrap: break-word;
        }

    </style>

    <script>
        function executeScripts() {
            let script = $('#text40').val();
            if(script === 'exit()') {
                logOut();
            } else {
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "php/managerFunc.php" ,
                    data: {
                        action: 'mysql',
                        script: script
                    },
                    success: function (status) {
                        console.log(status);
                        if(status['success'] === true) {
                            $('#message').html(JSON.stringify(status['result']));
                        } else {
                            $('#message').html(status['error'].toString());
                        }
                        $('#logWindow').show();
                    }
                });
            }
        }
    </script>
</head>
<body>
    <?php
    require 'php/helper.php';
    session_start();

    $username = $_SESSION['username'];
    $uniqueID = $_SESSION['uniqueID']; // uniqueID is the sha256(username + sha256(realPassword))

    // check login
    if(!isset($_SESSION['username']) || !managerUniqueIDExaminer($username, $uniqueID)) {
        errorCodeJump(414);
    }
    echo "<script>Cookies.set('historyRole', 2, { expires: 1 })</script>";
    ?>

    <div class="window" id="logWindow">
        <div class="title-bar">
            <div class="title-bar-text">
                MySQL says:
            </div>

            <div class="title-bar-controls">
                <button aria-label="Minimize" onclick="$('#logWindow').hide()"></button>
                <button aria-label="Maximize" onclick="$('#logWindow').hide()"></button>
                <button aria-label="Close" onclick="$('#logWindow').hide()"></button>
            </div>
        </div>
        <div class="window-body">
            <pre id="message">Hello, world!</pre>
            <section class="field-row" style="justify-content: flex-end">
                <button onclick="$('#logWindow').hide()">OK</button>
            </section>
        </div>
    </div>

    <div class="window center">
        <div class="title-bar">
            <div class="title-bar-text">
                Welcome Administrator
            </div>
        </div>
        <div class="window-body">
            <p>You can execute MySQL scripts in this Window (only 1 statement at a time)</p>

            <div class="field-row-stacked" style="width: 400px">
                <textarea id="text40" rows="8"></textarea>
            </div>
            <section class="field-row" style="justify-content: flex-end">
                <button onclick="executeScripts()">execute</button>
            </section>
        </div>
    </div>

    <script>
        $('#logWindow').hide()
    </script>

</body>
</html>