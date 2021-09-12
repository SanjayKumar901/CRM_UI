var app = angular.module("Login", []);
app.controller("logincontroll", function ($scope, $http) {
    $scope.Email = null;
    $scope.Password = null;
    UserExist();
    $scope.sumbit = function () {
        var Login = {
            UserID: $scope.Email,
            Password: $scope.Password,
            ClientURL: 'insta-policy.com'//window.location.origin
        };
        $http.post("http://localhost:50972/api/Account/LoginUser", Login).then(function (Response) {
            if (Response.data.status == "Success") {
                window.localStorage.setItem("token", JSON.stringify(Response.data));
                //window.localStorage.setItem("user", JSON.stringify(Response.data))
                window.location.href = "/Home/Index"
            }
        }, function (Resp) { })
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
            $http.post("http://localhost:50972/api/Account/TokeExist", body).then(function (Response) {
                if (Response.data == "Success") {
                    window.location.href = "/Home/Index";
                }
            }, function (Resp) { })
        }
    }
});