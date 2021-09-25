var app = angular.module("app", []);

app.controller("InsurerPOS", function ($scope, $http) {
    $scope.Insurer = null;
    $scope.Insurerlist = [];
    $scope.User = null;
    $scope.Userlist = [];
    GetRoleList();
    $scope.SelectedInsurer = function () {
        if ($scope.Userlist.length < 0) {
            body = {
                Token: JsonWebToken.token,
                ID: 8
            };
            model = {
                URL: Domain + "/api/User/TeamList",
                PostString: JSON.stringify(body)
            }
            BindtypeData(CallApiPostMethod, model, 'Userlist');
        }
    }
    $scope.SaveInsurer = function (){
        body = {
            ClientURL: CurentOrigin,
            UserID: $scope.User.userID,
            Companyname: $scope.Insurer.InsurerUser
        };
        model = {
            URL: CurentOrigin + "/api/api/InsurerMotor/POSMAPPING",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            let json = JSON.parse(Response.data);
            if (json.error != "") {
                alert(json.error);
            }
            else {
                alert(json.message);
            }
            console.log(Response.data)
        });
    }
    function GetRoleList() {
        let body = {
            Token: JsonWebToken.token
        };
        let model = {
            URL: Domain + "/api/Master/GetInsurerCompanies",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, 'Insurerlist');
    }
    function BindtypeData(url, body, scope) {
        $http.post(url, body).then(function (Response) {
            try {
                $scope[scope] = JSON.parse(Response.data);
            }
            catch (ex) { }
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


