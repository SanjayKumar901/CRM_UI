var app = angular.module("app", []);

app.controller("linkcontroll", function ($scope, $http) {
    $scope.selectAffiliate = null;
    $scope.selectAffiliatelist = null;
    $scope.GeneratedLink = "";

    UserExist();
    BindPrivilegeList();
    $scope.GenerateLink = function () {
        let privilegeList = [];
        if ($("#AffiliateList").length) {
            let Affiliate = {
                PrivilegeID: $scope.selectAffiliate.privilegeID,
                NavBarMasterMenuID: $scope.selectAffiliate.navBarMasterMenuID
            };
            privilegeList.push(Affiliate);
        }
        else {
            $($scope.selectAffiliatelist).each(function (row,index) {
                let Affiliates = {
                    PrivilegeID: $(this)[0].privilegeID,
                    NavBarMasterMenuID: $(this)[0].navBarMasterMenuID
                };
                privilegeList.push(Affiliates);
            })
        }
        let PrivilegeData = {
            LinkType: $("#AffiliateList").length ? "Affiliate" : "POS",
            Token: JsonWebToken.token,
            Rows: privilegeList
        };
        let model = {
            URL: Domain + "/api/User/GenerateLink",
            PostString: JSON.stringify(PrivilegeData)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            $scope.GeneratedLink = Response.data;
        }, function (Response) {
        });
    }
    $scope.myFunction = function () {
        var copyText = document.getElementById("myInput");
        copyText.select();
        copyText.setSelectionRange(0, 99999)
        document.execCommand("copy");
    }
    function BindPrivilegeList() {
        let body = {
            Token: JsonWebToken.token
        };
        let model = {
            URL: Domain + "/api/User/PriviligeList",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "selectAffiliatelist")
    }
    function UserExist() {
        GlobalModal = JSON.parse(window.localStorage.getItem("token"))
        let body = {
            Token: JsonWebToken.token
        };
        let model = {
            URL: Domain + "/api/Account/TokeExist",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            if (Response.data != "Success") {
                window.location.href = "/Account/Login";
            }
        }, function (Resp) { })
    }
    function BindtypeData(url, body, scope) {
        $http.post(url, body).then(function (Response) {
            $scope[scope] = JSON.parse(Response.data);
            if (scope == "selectAffiliatelist") {
                $scope.selectAffiliate = $scope.selectAffiliatelist[0];
            }
        }, function () {
        })
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