var app = angular.module("app", []);
app.controller("UpdatePolicystatus", function ($scope, $http) {
    $scope.Comp = null;
    $scope.CompList = null;
    $scope.PlaceHolder = "Enter Enquiry Number";
    $scope.rdo = "Enq";
    $scope.FilterText = null;
    var CurrentUrl = window.location.origin;

    GetInsurers();
    $scope.ChangeRDO = function (RDO) {
        if (RDO == "Enq")
            $scope.PlaceHolder = "Enter Enquiry Number";
        else
            $scope.PlaceHolder = "Enter Policy Number";
    }
    $scope.UpdatePolicy = function () {
        if ($scope.Comp == null) {
            alert("Select insurer Name");
            return;
        }
        if ($scope.FilterText == null || $scope.FilterText == "") {
            alert("Enter value for update.");
            return;
        }
        let body = {
            "Insuer": $scope.Comp.companyID,
            "InputType": $scope.rdo == "Enq" ? "enquiryno" : "proposalno",
            "Value": $scope.FilterText,
            "ClientUrl": CurrentUrl,
            "Token": JsonWebToken.token
        };
        if ($scope.rdo == "Enq") {
            body.EnquiryNo = $scope.FilterText
        }
        else {
            body.ProposalNo = $scope.FilterText
        }
        var model = {
            URL: CurrentUrl + "/api/api/InsurerMotor/UpdatePolicyModel",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            let Json = JSON.parse(Response.data);
            alert(Json.Status);
        });
    }

    function GetInsurers() {
        let body = {
            Token: GlobalModal.token,
            Product:"motor"
        };
        var model = {
            URL: Domain + "/api/setup/GetCompanies",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "CompList")
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