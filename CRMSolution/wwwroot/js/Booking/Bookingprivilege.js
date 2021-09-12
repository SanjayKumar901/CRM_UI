var app = angular.module("app", []);
app.controller("Bookingprivilege", function ($scope, $http) {
    $scope.products = null;
    $scope.currentDomain = null;
    $scope.Token = null;
    var JsonWebToken = null;

    UserExist();
    LoadUser();
    function LoadUser() {
        var body = {
            Token: JsonWebToken.token
        }
        var model = {
            URL: Domain + "/api/BookingPolicy/GetCRMCurrentUrl",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            let ClientMaster = JSON.parse(Response.data);
            $scope.currentDomain = ClientMaster.companyURL;
        }, function (Response) {
        })

        LoadPrivileges();
    }
    function LoadPrivileges() {
        var body = {
            Token: JsonWebToken.token,
            Privilegeid: 3
        }
        var model = {
            URL: Domain + "/api/Home/DashBoardPrivilages",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            let navgrouplistMaster = JSON.parse(Response.data);
            $scope.products = navgrouplistMaster;
        }, function (Response) {
        })
    }
    function UserExist() {
        JsonWebToken = JSON.parse(window.localStorage.getItem("token"))
        $scope.Token = JsonWebToken.token;
        var body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/Account/TokeExist",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            if (Response.data != "Success") {
                window.location.href = "/Account/Login";
            }
        }, function (Resp) { })
    }
});


app.controller("navcontroller", function ($scope, $http) {
    var JsonWebToken = null;
    GetToken();
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
        JsonWebToken = JSON.parse(window.localStorage.getItem("token"));
    }
});