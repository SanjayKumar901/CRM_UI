
var app = angular.module("app", []);
app.controller("Utility", function ($scope, $http) {
    $scope.value = 'Enquiry Number';
    $scope.newValue = function (value) {
        console.log(value);
    }
    $scope.Enquiry = null;
    let GlobalModal = null;
    GlobalModal = JSON.parse(window.localStorage.getItem("token"));

    $scope.GetPdf = function () {
        var getpolicyby = $("input[name='getpolicyby']:checked").val();
        var SlctProduct = $('#SlctProduct').val()
        Download(getpolicyby, SlctProduct, $scope.Enquiry);
    }

    function Download(getpolicyby, SlctProduct, Enquiry) {
        var body = {
            Token: GlobalModal.token,
            PolicyNo: Enquiry,
            DownloadAction: getpolicyby,
            Product: SlctProduct
        };
        var model = {
            URL: Domain + "/api/BusinessReport/DownloadMotorPolicyPDF",
            PostString: JSON.stringify(body)
        }
        $http.post("/Account/CallCheck", model).then(function (Response) {
            window.open(Response.data, "_blank");
        });
    }
});

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