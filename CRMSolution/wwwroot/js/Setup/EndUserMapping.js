var app = angular.module("app", []);
app.controller("EndUserMapp", function ($scope, $http) {
    $scope.EnduserData = null;
    $scope.Users = null;
    $scope.usermodel = null;
    $scope.FilterText = null;
    $scope.PlaceHolder = "Vehicle Number or Policy Number";
    $scope.SelectProduct = "Mot";
    $scope.FilterUser = null;
    LoadUser();
    $scope.GetEndUserDetails = function () {
        let body = {
            Token: JsonWebToken.token,
            FilterEnquiry: $scope.FilterText,
            Product: $scope.SelectProduct
        };
        var model = {
            URL: Domain + "/api/Setup/GetEndUserDetailWithMPD",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "EnduserData")
    }
    $scope.mapp = function (obj) {
        let body = {
            Token: JsonWebToken.token,
            FilterEnquiry: $scope.FilterText,
            MappUserid: $scope.usermodel.userID,
            Product: $scope.SelectProduct
        };
        var model = {
            URL: Domain + "/api/Setup/Endusermapping",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
        }, function (Response) {
        })
    }
    $scope.SelectProductOpt = function (product) {
        if (product == "Mot") {
            $scope.PlaceHolder = "Vehicle Number or Policy Number";
        }
        else {
            $scope.PlaceHolder = "Proposal Number or Policy Number";
        }
    }
    $scope.GetUserList = function () {
        let body = {
            Token: JsonWebToken.token,
            FilterUser: $scope.FilterUser
        };
        var model = {
            URL: Domain + "/api/user/UserListDataForMap",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "Users")
    }
    function LoadUser() {
        //let body = {
        //    Token: JsonWebToken.token
        //};
        //var model = {
        //    URL: Domain + "/api/user/UserListData",
        //    PostString: JSON.stringify(body)
        //}
        //BindtypeData(CallApiPostMethod, model, "Users")
    }
    function BindtypeData(url, body, scope) {
        $http.post(url, body).then(function (Response) {
            try {
                $scope[scope] = JSON.parse(Response.data);
                if (scope == "EnduserData") {
                    if ($scope.EnduserData.length <= 0) {
                        alert("Not Found.")
                    }
                }
            }
            catch (ex) {
            }
        });
    }
});

app.controller("navcontroller", function ($scope, $http) {
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
});