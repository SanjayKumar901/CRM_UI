var app = angular.module("certificateapp", []);
app.controller("Certificate", function ($scope, $http) {
    var GlobalModal = JSON.parse(window.localStorage.getItem("token"));
    var Domain = "http://localhost:50972";//CallAPIDomain();
    GetCertificate();
    function GetCertificate() {
        let body = {
            Token: GlobalModal.token
        }
        var model = {
            URL: Domain + "/api/user/GetCertificate",
            PostString: JSON.stringify(body)
        }
        $http.post("/Account/CallCheck", model).then(function (Response) {
            $("#certificate").html(Response.data);
        }, function (en) {
            console.log(en)
        })
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
})