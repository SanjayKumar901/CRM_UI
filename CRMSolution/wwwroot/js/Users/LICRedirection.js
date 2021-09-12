var app = angular.module("app", []);
app.controller("licredirection", function ($scope, $http) {
    $scope.AgencyCode = null;
    $scope.SpCode = null;
    $scope.ActionURL = null;
    $scope.Checksum = null;
    load();
    function load() {
        let body = {
            Token: JsonWebToken.token
        };
        let model = {
            URL: Domain + "/api/Setup/ChecksumAPIForSpCode",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            let ResponsJson = JSON.parse(Response.data);

            $("form").attr("action", ResponsJson.actionURL)
            $scope.ActionURL = ResponsJson.actionURL
            $scope.Checksum = ResponsJson.checkSum
            $scope.AgencyCode = ResponsJson.agencyCode
            $scope.SpCode = ResponsJson.spCode
            alert(Response.data);
        }, function () {
        })
    }
    $scope.submitform = function () {
        $("form").submit();
        window.location.reload()
    }
})

app.controller("navcontroller", function ($scope, $http) {
    var GlobalModal = null;
    GetToken();
    $("#userName").text(GlobalModal.userName)
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