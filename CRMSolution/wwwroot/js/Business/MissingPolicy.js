var app = angular.module("app", []);
app.controller("missingpolicy", function ($scope, $http) {
    $scope.CompanyList = null;
    $scope.Company = null;
    $scope.Policies = null;
    $scope.PolicyNumber = null;
    $scope.Product = "motor";
    $scope.EngineNo = null;
    var GlobalModal = null;
    GetCompanies($scope.Product);
    GetPolicies();
    $scope.fileNameChanged = function () {
        let path = "MissingPolicy"
        var GSTFile = $("#fileupload").get(0);
        var FileGST = GSTFile.files;
        var fileData = new FormData();
        fileData.append(FileGST[0].name, FileGST[0]);
        fileData.append("Path", path);
        $.ajax({
            url: '/Business/UploadMissingPolicy',
            type: 'POST',
            dataType: 'json',
            data: fileData,
            contentType: false,
            processData: false,
            success: function (d) {
                if (d.response == "Done") {
                    ProceedMissingPolicy(d.path)
                }
            },
            error: function (er) {
                alert('Error!');
            }
        });
    }
    $scope.ChangeProduct = function (pro) {
        GetCompanies(pro);
    }
    function ProceedMissingPolicy(path) {
        let body = {
            PolicyNo: $scope.PolicyNumber,
            Insuer: $scope.Company.companyID,
            PDFPath: path,
            ClientUrl: window.location.origin,
            Token: JsonWebToken.token,
            EngineNo: $scope.EngineNo
        }
        let Url = "";
        if ($scope.Product == "motor")
            Url = "/api/api/InsurerMotor/MissingPolicies";
        else {
            Url = "/healthapi/api/InsurerHealth/MissingPolicies";
            body.Product = "health";
        }

        let model = {
            URL: window.location.origin + Url,
            PostString: JSON.stringify(body)
        }
        $http.post("/Account/CallCheck", model).then(function (Response) {
            alert(Response.data);
        }, function (Response) {
            alert(Response);
        })
    }
    function GetCompanies(pro) {
        let body = {
            Token: JsonWebToken.token,
            Product: pro
        };
        let model = {
            URL: Domain + "/api/Setup/GetCompanies",
            PostString: JSON.stringify(body)
        }
        $http.post("/Account/CallCheck", model).then(function (Response) {
            $scope.CompanyList = JSON.parse(Response.data);
        }, function (Response) {
            alert(Response);
        })
    }
    function GetPolicies() {
        let body = {
            Token: JsonWebToken.token
        };
        let model = {
            URL: Domain + "/api/Business/MissingPolicies",
            PostString: JSON.stringify(body)
        }
        $http.post("/Account/CallCheck", model).then(function (Response) {
            $scope.Policies = JSON.parse(Response.data);
        }, function (Response) {
            alert(Response);
        })
    }
})


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