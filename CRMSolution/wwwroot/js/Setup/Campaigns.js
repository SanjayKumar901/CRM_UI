var app = angular.module("app", []);
app.controller("campaign", function ($scope, $http) {
    $scope.RoleList = null;
    $scope.SelectRole = null;
    $scope.UserList = null;
    $scope.Message = null;
    $scope.Subject = null;

    GetRoleList();

    $scope.SendNotification = function () {
        let EmpIDList = [];
        let tabledata = $("#tblusers tbody tr");
        $("input:checkbox:checked", tabledata).each(function () {
            EmpIDList.push($(this).attr("value"));
        })
        let body = {
            Token: JsonWebToken.token,
            Users: EmpIDList,
            NotifationMessage: $scope.Message,
            Subject: $scope.Subject
        };
        var model = {
            URL: Domain + "/api/setup/Camapigns",
            PostString: JSON.stringify(body)
        };

        $http.post(CallApiPostMethod, model).then(function (Response) {
            try {
                alert(Response.data);
            }
            catch (ex) { }
        }, function (Resp) {
        });
    }
    $scope.changeRole = function (obj) {
        let body = {
            Token: JsonWebToken.token,
            ID: obj.roleID
        };
        var model = {
            URL: Domain + "/api/setup/UserlistWithRoletype",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "UserList")
    }
    function GetRoleList() {
        let body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/Setup/RoleList",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "RoleList")
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