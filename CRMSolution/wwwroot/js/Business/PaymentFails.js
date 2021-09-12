var app = angular.module("app", []);
app.controller("failcontroller", function ($scope, $http) {
    $scope.FailedList = null;
    $scope.FailedListMain = null;
    $scope.FilterText = null;
    var GlobalModal = null;
    UserExist();
    failedList();
    $scope.Filter = function (FilterText) {
        if (FilterText == null || FilterText == "") {
            $scope.FailedList = $scope.FailedListMain;
        }
        else {
            $scope.FailedList = $scope.FailedListMain.Filter(row => row.vehicleNo.includes(FilterText));
        }
    }
    function failedList() {
        let body = {
            Token: JsonWebToken.token
        };
        let model = {
            URL: Domain + "/api/BusinessReport/Paymentfailstatus",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "FailedList");
    }
    function UserExist() {
        GlobalModal = JSON.parse(window.localStorage.getItem("token"))
        let body = {
            Token: GlobalModal.token
        };
        let model = {
            URL: Domain + "/api/Account/TokeExist",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            if (Response.data != "Success") {
                window.location.href = "/Account/Login";
            }
        }, function (Resp) { })
    }
    function BindtypeData(url, body, scope) {
        $http.post(url, body).then(function (Response) {
            $scope[scope] = JSON.parse(Response.data);
            if (scope == "FailedList") {
                $scope.FailedListMain = JSON.parse(Response.data);
            }
        }, function () {
        })
    }
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
    function GetToken() {
        GlobalModal = JSON.parse(window.localStorage.getItem("token"));
    }
});