/// <reference path="../../lib/angularjs/angular.min.js" />
var app = angular.module("app", []);
app.controller("ReqRes", function ($scope, $http) {
    $scope.Products = null;
    $scope.Product = null;
    $scope.PolicyTypes = null;
    $scope.PolicyType = null;
    $scope.ReqRes = null;
    $scope.ReqResList = null;
    $scope.EqnquiryFilter = null;
    Onload();
    $scope.GetData = function () {
        let body = {
            Token: JsonWebToken.token,
            FilterText: $scope.EqnquiryFilter,
            FilterOption: $scope.PolicyType.Option,
            ProductType: $scope.Product.shortName
        };
        console.log(JSON.stringify(body))
        var model = {
            URL: Domain + "/api/Products/GetRequestResponse",
            PostString: JSON.stringify(body)
        };
        BindtypeData(CallApiPostMethod, model, "ReqResList");
    }

    function Onload() {
        $scope.PolicyTypes = [{ "Option": "quotation", "OptionText": "Quotation" },
            { "Option": "proposal", "OptionText": "Proposal" },
            { "Option": "success", "OptionText": "Success" }];
        $scope.PolicyType = $scope.PolicyTypes[0];

        let fetchmodel = JSON.parse(window.localStorage.getItem("token"));
        GlobalModal = fetchmodel;

        let body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/Products/GetEnquiryMaster",
            PostString: JSON.stringify(body)
        };
        BindtypeData(CallApiPostMethod, model, "Products");
    }
    function BindtypeData(url, body, scope) {
        $http.post(url, body).then(function (Response) {
            $scope[scope] = JSON.parse(Response.data);
            if (scope == "ReqResList" && Response.data == "[]") {
                alert("\"Try later\". Place holder should have Enq number/Reg#/proposal#")
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