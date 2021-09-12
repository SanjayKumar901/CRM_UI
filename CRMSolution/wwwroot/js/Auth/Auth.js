var app = angular.module("Login", []);
app.controller("logincontroll", function ($scope, $http) {
    var Domain = CallAPIDomain();
    UserExist();
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