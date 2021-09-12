var app = angular.module("app", []);
app.controller("EndUserControl", function ($scope, $http) {
    $scope.listProduct = null;
    var Domain = window.localStorage.getItem("getdomain");
    var GlobalModal = JSON.parse(window.localStorage.getItem("endtoken"));
    CheckLogin();
    $scope.CallProductData = function (option) {
        CallProduct(option);
    }
    function CallProduct(product) {
        $scope.listProduct = null;
        var body = {
            Token: GlobalModal.token,
            Product: product
        };
        var model = {
            URL: Domain + "/api/EndUserControll/GetProductData",
            PostString: JSON.stringify(body)
        }
        $http.post("/Account/CallCheck", model).then(function (Response) {
            $scope.listProduct = JSON.parse(Response.data);
        }, function (Resp) { })
    }
    function CheckLogin() {
        var body = {
            Token: GlobalModal.token
        };
        var model = {
            URL: Domain + "/api/Account/EndUserTokeExist",
            PostString: JSON.stringify(body)
        }
        $http.post("/Account/CallCheck", model).then(function (Response) {
            if (Response.data != "Success") {
                window.location.href = "/UserPolicy/Login";
            }
            else {
                CallProduct("Car")
            }
        }, function (Resp) { })
    }
    $scope.GetPolicyPDF = function (obj, product) {
        var body = {
            Token: GlobalModal.token,
            PolicyNo: product == "Health" ? obj.policyNumber : obj.pOlicyno,
            DownloadAction: "policyno",
            Product: product
        };
        var model = {
            URL: Domain + "/api/BusinessReport/DownloadMotorPolicyPDF",
            PostString: JSON.stringify(body)
        }
        $http.post("/Account/CallCheck", model).then(function (Response) {
            window.open(Response.data, "_blank");
        });
    }
})

app.controller("navcontroller", function ($scope, $http) {
    var GlobalModal = null;
    GetToken();
    $("#userName").text(GlobalModal.userName)
    $("#WelcomeText").text(GetWelcome())


    function GetToken() {
        GlobalModal = JSON.parse(window.localStorage.getItem("endtoken"));

    }
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