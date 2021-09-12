var app = angular.module("app", []);
app.controller("LifePolicy", function ($scope, $http) {
    $scope.EnquiryList = null;
    $scope.EnquiryNo = null;
    $scope.AddressLine1 = null;
    $scope.AddressLine2 = null;
    $scope.AddressLine3 = null;
    $scope.Cityid = null;
    $scope.StateID = null;
    $scope.PinCode = null;
    $scope.ProposalNo = null;
    $scope.CompanyID = null;
    $scope.YourAge = null;
    $scope.Gender = "Male";
    $scope.SmokeStaus = null;
    $scope.AnnualInCome = null;
    $scope.PreferredCover = null;
    $scope.CoverageAge = null;
    $scope.PolicyType = null;
    $scope.PaymentID = null;
    $scope.SumAsured = null;
    $scope.BasePremium = null;
    $scope.GrossPremium = null;
    $scope.TaxAmount = null;
    $scope.TotalPremium = null;
    $scope.Discount = null;
    $scope.DiscountPercentage = null;
    $scope.PolicyTerm = null;
    $scope.PolicyNo = null;
    $scope.PolicyDocUrl = null;
    $scope.PolicyRemark = null;
    $scope.CompList = null;
    $scope.CityList = null;
    $scope.StateList = null;
    var GlobalModal = null;
    var CurrentDomain = window.location.origin;
    GlobalModal = JSON.parse(window.localStorage.getItem("token"))
    LoadCompanies();
    LoadState();
    $scope.Filter = function (ObjModel) {
        let body = {
            MobileNumber: ObjModel,
            Token: JsonWebToken.token,
        };
        let model = {
            URL: Domain + "/api/BusinessReport/FilterEnquiryWithNumber",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "EnquiryList");
    }
    $scope.Submit = function () {
        let cityComb = $scope.Cityid.CombindID.split("~")[0]
        let body = {
            EnquiryNo: $scope.EnquiryNo.enquiryNo,
            AddressLine1: $scope.AddressLine1,
            AddressLine2: $scope.AddressLine2,
            AddressLine3: $scope.AddressLine3,
            Cityid: cityComb,
            StateID: $scope.StateID.CombindID,
            PinCode: parseInt($scope.PinCode),
            ProposalNo: $scope.ProposalNo,
            CompanyID: $scope.CompanyID.companyID,
            YourAge: parseInt($scope.YourAge),
            Gender: $scope.Gender,
            SmokeStaus: $scope.SmokeStaus,
            AnnualInCome: $scope.AnnualInCome,
            PreferredCover: $scope.PreferredCover,
            CoverageAge: parseInt($scope.CoverageAge),
            PolicyType: $scope.PolicyType,
            PaymentID: parseInt($scope.PaymentID),
            SumAsured: parseFloat($scope.SumAsured),
            BasePremium: parseFloat($scope.BasePremium),
            GrossPremium: parseFloat($scope.GrossPremium),
            TaxAmount: parseFloat($scope.TaxAmount),
            TotalPremium: parseFloat($scope.TotalPremium),
            Discount: parseFloat($scope.Discount),
            DiscountPercentage: parseFloat($scope.DiscountPercentage),
            PolicyTerm: parseInt($scope.PolicyTerm),
            PolicyNo: $scope.PolicyNo,
            PolicyDocUrl: $scope.PolicyDocUrl,
            PolicyRemark: $scope.PolicyRemark,
        }
        let model = {
            URL: Domain + "/api/BusinessReport/LifePolicy",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
        }, function () {
        })
    }
    $scope.BindCIties = function (stateModel) {
        let model = {
            URL: CurrentDomain + "/api/api/RTO/BindCity?companytype=GoDigit&stateid=" + stateModel.CombindID
        }
        BindtypeData(CallApiGetMethod, model, "CityList");
    }
    function LoadCompanies() {
        let body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/setup/GetCompanies",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "CompList")
    }
    function LoadState() {
        let model = {
            URL: CurrentDomain + "/api/api/RTO/bindstate?companytype=GoDigit&stateid="
        }
        BindtypeData(CallApiGetMethod, model, "StateList");
    }
    function BindtypeData(url, body, scope) {
        $http.post(url, body).then(function (Response) {
            $scope[scope] = JSON.parse(Response.data);
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
})