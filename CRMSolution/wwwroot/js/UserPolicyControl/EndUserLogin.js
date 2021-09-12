var app = angular.module("EndLogin", []);
app.controller("Endlogincontroll", function ($scope, $http) {
    $scope.Email = null;
    $scope.Password = null;
    $scope.IsShowOTP = false;
    var Domain = "http://localhost:50972"///CallAPIDomain();
    var CallApiPostMethod = "/Account/CallCheck";
    LoadLogo();
    $scope.sumbit = function () {
        Login();
    }
    $scope.Renew = function () {

    }
    function Login() {
        let url = "";
        if ($scope.IsShowOTP == false) {
            var Login = {
                UserID: $scope.Email,
                ClientURL: 'riskoveryinsurance.com'// window.location.host.replace("www.", "")
            };
            url = "/api/Account/EndUserLogin";
        }
        else {
            var Login = {
                UserID: JSON.parse(window.localStorage.getItem("endtoken")).token,
                OTP: $scope.Password,
            };
            url = "/api/Account/EndUserMatchOtp";
        }
        var model = {
            URL: Domain + url,
            PostString: JSON.stringify(Login)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            if ($scope.IsShowOTP == false) {
                let dataCome = JSON.parse(Response.data);
                if (dataCome.status == "Success") {
                    window.localStorage.setItem("endtoken", JSON.stringify(dataCome));
                    $scope.IsShowOTP = true;
                    //window.location.href = "/UserPolicy/index";
                }
                else {
                    alert(dataCome.status)
                }
            }
            else {
                if (Response.data == "Success") {
                    window.location.href = "/UserPolicy/index";
                }
            }
        }, function (Resp) { })
    }
    function LoadLogo() {
        let ss = window.location.host.replace("www.", "");
        var Body = {
            URL: ss
        };
        var model = {
            URL: Domain + "/api/Account/DomainLogo",
            PostString: JSON.stringify(Body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            $scope.LOGO = JSON.parse(Response.data).companyLogo;
            window.localStorage.setItem("logo", $scope.LOGO);
        }, function (Response) {

        });
    }
    function CallAPIDomain() {
        var DomainMap = null;
        DomainMap = window.localStorage.getItem("getdomain");
        if (DomainMap == null) {
            $.ajax({
                url: "/Account/GetAPIDomain",
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                async: false,
                success: function (Response) {
                    window.localStorage.setItem("getdomain", Response);
                    DomainMap = Response;
                },
                error: function (Response) {

                }
            })
        }
        return DomainMap;
    }
});