
var app = angular.module("app", []);
app.controller("licsetup", function ($scope, $http) {
    $scope.AgencyCode = null;
    $scope.APIUrl = null;
    $scope.Authorization = null;
    $scope.UserName = null;
    $scope.Password = null;
    $scope.RedirectionUrl = null;
    $scope.UserList = [];
    $scope.SelectPos = null;
    $scope.SalesPersonCode = null;
    $scope.SpList = [];
    $scope.IsEnable= null;
    $scope.SalesPersonCodeList = [];
    load();
    $scope.SaveAgencyCode = function (Code) {
        let body = {
            Token: JsonWebToken.token,
            AgencyCode: Code,
            APIUrl: $scope.APIUrl,
            AuthParam: $scope.Authorization,
            UserName: $scope.UserName,
            PasswordParam: $scope.Password,
            RedirectionUrl: $scope.RedirectionUrl
        };
        let model = {
            URL: Domain + "/api/Setup/SaveAgencyCode",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
            load();
        }, function () {
        })
    }
    $scope.GetSalesPerson = function () {
        let body = {
            Token: JsonWebToken.token,
            ID: 8
        };
        var model = {
            URL: Domain + "/api/setup/GetSalesPersonCode",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "SalesPersonCodeList")
    }
    $scope.SaveSalesPersonCode = function () {
        event.preventDefault();
        let body = {
            Token: JsonWebToken.token,
            UserID: $scope.SelectPos.userID,
            SalesPersonCode: $scope.SalesPersonCode
        };
        let model = {
            URL: Domain + "/api/Setup/SaveSalesPersonCode",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
        }, function () {
        })
    }
    $scope.Edit = function () {
        $scope.IsEnable = null;
    }
    function load() {
        let body = {
            Token: JsonWebToken.token
        };
        let model = {
            URL: Domain + "/api/Setup/GetAgencyCode",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            let data = JSON.parse(Response.data);
            if (Response.data == "" && Response.data != null)
                $scope.IsEnable = null;
            else {
                $scope.IsEnable = Response.data;
                $scope.AgencyCode = data.agencyCode;
                $scope.Authorization = data.authorization;
                $scope.UserName = data.username;
                $scope.Password = data.password;
                $scope.RedirectionUrl = data.redirectionURL;
                $scope.APIUrl = data.apiurl;
            }
            RoleUser();
        }, function () {
        })
    }
    function RoleUser() {
        let body = {
            Token: JsonWebToken.token,
            ID: 8
        };
        var model = {
            URL: Domain + "/api/setup/UserlistWithRoletype",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "UserList")
    }
    function BindtypeData(url, body, scope) {
        $http.post(url, body).then(function (Response) {
            $scope[scope] = JSON.parse(Response.data);
        }, function () {
        })
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