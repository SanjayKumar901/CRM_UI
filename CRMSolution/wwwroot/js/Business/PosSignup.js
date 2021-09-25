var app = angular.module("app", []);
app.controller("PosSignup", function ($scope, $http, $filter) {
    $scope.IsEditDelRight = true;
    $scope.UserID = null;
    $scope.PosList = [];
    $scope.viewPos = {};
    $scope.GetPosList = function () {
        CheckEditRights();
        $(".Tableloader").show();
        var dataIn = {
            Token: JsonWebToken.token,
        }
        var model = {
            URL: Domain + "/api/SFTP/GetUserForDocSign",
            PostString: JSON.stringify(dataIn),
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            $scope.PosList = JSON.parse(Response.data);
            $(".Tableloader").hide();
        }, function (Response) {
            $(".Tableloader").hide();
        });
    }

    $scope.Edit = function (userId) {
        $scope.viewPos = $scope.PosList.filter(x => x.userID == userId)[0];
        $("#loginModal").modal('show');
    }
    $scope.$watch("viewPos.signDate", function (newValue, oldValue) {
        $scope.viewPos.signDate = (newValue || oldValue);
    });
    $scope.$watch("viewPos.iibDate", function (newValue, oldValue) {
        $scope.viewPos.iibDate = (newValue || oldValue);
    });

    $scope.UploadPosFile = function () {
        document.getElementById("lblSuccess").innerHTML = "";
        document.getElementById("lblError").innerHTML = "";
        let URL = defaultpage + '/Business/UploadPosFile';
        var fileData = new FormData();
        let files = $("#file").get(0);
        if (files.files.length == 0) {
            return;
        }
        let file = files.files[0];

        fileData.append(file.name, file);
        fileData.append("token", JsonWebToken.token);
        fileData.append("apiurl", Domain + "/api/sftp/UploadPosFile");

        $.ajax({
            url: URL,
            type: 'POST',
            dataType: 'json',
            data: fileData,
            contentType: false,
            processData: false,
            success: function (d) {
                let res = JSON.parse(d.response || JSON.stringify(d));
                if (res && res.message?.length == 0) {
                    document.getElementById("lblSuccess").innerText = "Success !";
                } else {
                    document.getElementById("lblError").innerText = res.message;
                }
                document.getElementById("file").value = null;
            },
            error: function (er) {
                document.getElementById("lblError").innerText = er;
            }
        });
    }

    function CheckEditRights() {
        let body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/User/GetUserInfo",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            $scope.IsEditDelRight = JSON.parse(Response.data).roleID == 28 || JSON.parse(Response.data).roleID == 1 ? true : false;
        })
    }

    $scope.UpdatePos = function () {
        if ($scope.viewPos && $scope.viewPos.stampID && $scope.viewPos.signDate && $scope.viewPos.iibDate) {
            // Update api call ""
            $(".Tableloader").show();
            var dataIn = {
                Token: JsonWebToken.token,
                SignDate: $scope.viewPos.signDate,
                StampID: $scope.viewPos.stampID,
                UserID: $scope.viewPos.userID,
                POSCode: $scope.viewPos.posCode,
                IIBDate: $scope.viewPos.iibDate,

            }
            var model = {
                URL: Domain + "/api/SFTP/UpdatePosStamp",
                PostString: JSON.stringify(dataIn),
            }
            $http.post(CallApiPostMethod, model).then(function (Response) {
                $("#loginModal").modal('hide');
                $scope.GetPosList();
                $(".Tableloader").hide();
            }, function (Response) {
                $(".Tableloader").hide();
            });
        }
        else {
            alert("Please fill required fields.");
        }
    }

    //**********************Callendar****************************
    $(function () {
        var start = moment().subtract(0, 'days');
        var end = moment()
        function cb(start, end) {
            $('.reportrange span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
            StartDate = start.format('YYYY-MM-DD');
            EndDate = end.format('YYYY-MM-DD');
            //CallBusiness(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'))
        }
        $('.reportrange').daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        }, cb);
        cb(start, end);
    });
    //**************************END******************************

});

app.controller("navcontroller", function ($scope, $http) {
    $("#userName").text(JsonWebToken.userName)
    $("#WelcomeText").text(GetWelcome())
    console.log(window.localStorage.getItem("navs"))
    $scope.Navs = JSON.parse(window.localStorage.getItem("navs"))
    function GetWelcome() {
        var hours = new Date().getHours();
        if (hours < 12) {
            return "Good Morning"
        }
        else if (hours >= 12 && hours <= 15) {
            return "Good Afternoon"
        }
        else if (hours > 15) {
            return "Good Evening"
        }
    }
});