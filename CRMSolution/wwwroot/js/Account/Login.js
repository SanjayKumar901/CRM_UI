var app = angular.module("Login", []);
app.controller("logincontroll", function ($scope, $http) {
    $scope.Email = null;
    $scope.Password = null;
    $scope.IsEmail = false;
    $scope.IsMobile = false;
    $scope.Login = "Next";
    $scope.UrlDomain = null;
    $scope.LOGO = null;
    $scope.isRenew = false;
    $scope.RenewalPolicy = null;
    $scope.IsReset = false;
    $scope.EmailIDforReset = null;
    $scope.OldPassReset = null;
    $scope.NewPassReset = null;
    $scope.ConfirmPassReset = null;
    $scope.ResetPasswordBtn = "Change";

    var Domain = CallAPIDomain()
    LoadLogo();
    UserExist();
    $scope.sumbit = function () {
        Login();
    }
    $scope.nextProcess = function () {
        if ($scope.Login == "Next") {
            let val = $scope.Email;
            let isNumeric = true;
            $scope.Login == "Wait..."
            for (let i = 0; i < val.length; i++) {
                if (isNaN(val[i])) {
                    isNumeric = false;
                    break;
                }
            }
            var Body = {
                UserID: $scope.Email,
                ClientURL: 'riskoveryinsurance.com'//window.location.origin
            };
            var model = {
                URL: Domain + "/api/Account/CheckExistance",
                PostString: JSON.stringify(Body)
            }
            if (isNumeric == false) {
                $http.post("/Account/CallCheck", model).then(function (Response) {
                    if (Response.data == "Exist") {
                        $scope.Login = "Login";
                        $scope.IsEmail = true;
                        $scope.IsMobile = false;
                    }
                    else {
                        $scope.Login == "Next"
                    }
                }, function (Reponse) {
                });
            }
            else {
                $http.post("/Account/CallCheck", model).then(function (Response) {
                    if (Response.data == "Exist") {
                        $scope.IsEmail = false;
                        $scope.IsMobile = true;
                        $scope.Login = "OTP";
                    }
                    else {
                        $scope.Login == "Next"
                    }
                }, function (Reponse) {
                });

            }
        }
        else {
            Login($scope.Login);
            
        }
    }
    $scope.GotoRenew = function () {
        let ss = window.location.host.replace("www.", "");
        var Body = {
            URL: ss,
            PolicyNo: $scope.RenewalPolicy
        };
        var model = {
            URL: Domain + "/api/Account/Renewalenquiry",
            PostString: JSON.stringify(Body)
        }
        $http.post("/Account/CallCheck", model).then(function (Response) {
            if (Response.data != "") {
                let currentdomain = window.location.origin + "/QuoteMotor?enqno=" + Response.data;
                window.open(currentdomain, "_blank");
            }
        }, function (Response) {

        });
    }
    $scope.IsResetPass = function () {
        if ($scope.IsReset == false) {
            $scope.IsReset = true;
        }
        else
            $scope.IsReset = false;
    }
    $scope.ResetPass = function () {
        $scope.ResetPasswordBtn = "Wait...";
        if ($scope.NewPassReset !== $scope.ConfirmPassReset) {
            alert("Confirm Password not mathced.");
            return
        }
        var Login = {
            EmailID: $scope.EmailIDforReset,
            OldPassReset: $scope.OldPassReset,
            NewPassReset: $scope.NewPassReset,
            ConfirmPassReset: $scope.ConfirmPassReset,
            ClientURL: 'riskoveryinsurance.com' //window.location.host.replace("www.", "")
        };
        var model = {
            URL: Domain +"/api/Account/ResetBeforeLoginPass",
            PostString: JSON.stringify(Login)
        }
        $http.post("/Account/CallCheck", model).then(function (response) {
            alert(response.data);
            $scope.ResetPasswordBtn = "Change";
        }, function (response) {
            alert(response.data);
        })
    }
    $scope.CreateAccount = function () {
        let Win = window.location.origin;
        window.open(Win +"/ePartner","_blank")
    }
    function Login() {
        debugger;
        let HoldVal = $scope.Login;
        var Login = {
            UserID: $scope.Email,
            Password: $scope.Password,
            OTP: $scope.OTP,
            ClientURL: 'riskoveryinsurance.com'//window.location.origin
        };
        let pushURL = "";
        if ($scope.Login == "Login") {
            pushURL = Domain + "/api/Account/LoginUser";
        }
        else if ($scope.Login == "OTP") {
            pushURL = Domain + "/api/Account/LoginUserWithOTP";
        }
        var model = {
            URL: pushURL,
            PostString: JSON.stringify(Login)
        }
        $scope.Login = "Wait..."
        $http.post("/Account/CallCheck", model).then(function (Response) {
            let dataCome = JSON.parse(Response.data);
            if (dataCome.status == "Success") {
                window.localStorage.setItem("token", JSON.stringify(dataCome));
                //window.localStorage.setItem("user", JSON.stringify(Response.data))
                document.cookie = "token=" + dataCome.token
                window.location.href = "/home/index";
            }
            else {
                $scope.Login = HoldVal;
                alert(dataCome.status)
            }
        }, function (Resp) {
        })
    }
    function LoginWithOTP() {

    }
    function UserExist() {
        let modal = null;
        try {
            modal = JSON.parse(window.localStorage.getItem("token"))
        }
        catch (ex) { }
        if (modal != null) {
            var body = {
                Token: modal.token
            };
            var model = {
                URL: Domain + "/api/Account/TokeExist",
                PostString: JSON.stringify(body)
            }

            $http.post("/Account/CallCheck", model).then(function (Response) {
                if (Response.data == "Success") {
                    document.cookie = "token=" + modal.token
                    window.location.href = "/Home/Index";
                }
                else {
                    window.localStorage.removeItem("token");
                    window.localStorage.removeItem("navs");
                    window.localStorage.removeItem("MotorType");
                    document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                }
            }, function (Resp) { })
        }
    }
    function LoadLogo() {
        let querystring = new URLSearchParams(window.location.search);
        let qry = querystring.get("isrenew");
        if (qry == "renew") {
            $scope.isRenew = true;
        }

        let ss = window.location.host.replace("www.", "");
        var Body = {
            URL: ss
        };
        var model = {
            URL: Domain + "/api/Account/DomainLogo",
            PostString: JSON.stringify(Body)
        }
        $http.post("/Account/CallCheck", model).then(function (Response) {
            $scope.LOGO = JSON.parse(Response.data).companyLogo;
            window.localStorage.setItem("logo", $scope.LOGO);
        }, function (Response) {

        });
    }
    function CallAPIDomain() {
        debugger;
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