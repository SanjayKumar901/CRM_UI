var app = angular.module("LinkLogin", []);
app.controller("LinkLoginControll", function ($scope, $http) {
    $scope.loading = "Wait...";
    var Domain = CallAPIDomain();//
    let User = new URLSearchParams(window.location.search);
    let Token = User.get("Token")
    var Login = {
        UserID: Token
    };
    var model = {
        URL: Domain + "/api/Account/LogWithLinkiUser",
        PostString: JSON.stringify(Login)
    }
    $http.post("/Account/CallCheck", model).then(function (Response) {
        let json = JSON.parse(Response.data);
        if (json.status = "Success") {
            window.localStorage.setItem("token", Response.data);//"/myaccount/home/index";
            window.location.href = window.location.origin + '?user=' + json.token;
        }
        else {
            alert(json.status);
        }
    }, function (Reponse) {

    });
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