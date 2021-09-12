
var app = angular.module("app", []);
app.controller("manageCertificate", function ($scope, $http) {
    $scope.HeaderFooter = "";
    $scope.img = "https://policybonanza.com/uploadAp/addImage.jpg";
    $scope.FooterPath = "https://policybonanza.com/uploadAp/addImage.jpg";
    $scope.Certificatedescriptop1 = "This is in reference to the application made by you for enrolling yourself to act as  Point of Sale Person.This is to confirm that you have successfully completed the prescribed training and  have also passed the examination specified for Point of Sales examination conducted by ";
    $scope.Certificatedescriptop2 = " under the Guidelines on Point of Sales Person for Non - life and Health insurers.Your personal details are as under: "
    $scope.Certificatedescriptop3 = "This letter authorizes you to act as Point of Sales Person for";
    $scope.Certificatedescriptop4 = "to market products categorized and identified under the   Guidelines only.";
    $scope.Certificatedescriptop5 = "  In case you wish to work for another company, you are required to obtain a fresh   letter from the new insurer  insurance intermediary in order to act as Point of Sales   Person for that entity";
    $scope.AuthorisedSignatory = "Authorised Signatory";
    $scope.YourTruly = "Yours truly";
    $scope.heightImage = 250;
    $scope.FooterImage = 200;
    GetHeaderFooter();
    var GlobalModal = JSON.parse(window.localStorage.getItem("token"));
    $scope.IncreaseHeader = function () {
        $scope.heightImage += 1;
        document.getElementById("headerImage").style.cssText = "width: 100%;height: " + $scope.heightImage+"px;";
    }
    $scope.DecreaseImage = function () {
        $scope.heightImage -= 1;
        document.getElementById("headerImage").style.cssText = "width: 100%;height: " + $scope.heightImage + "px;";
    }
    $scope.IncreaseFooter = function () {
        $scope.FooterImage += 1;
        document.getElementById("FooterCss").style.cssText = "width: 100%;height: " + $scope.FooterImage + "px;";
    }
    $scope.DecreateFooter = function () {
        $scope.FooterImage -= 1;
        document.getElementById("FooterCss").style.cssText = "width: 100%;height: " + $scope.FooterImage + "px;";
    }
    $scope.SaveData = function () {
        let body = {
            Token: JsonWebToken.token,
            Certificatedescriptop1: $scope.Certificatedescriptop1,
            Certificatedescriptop2: $scope.Certificatedescriptop2,
            Certificatedescriptop3: $scope.Certificatedescriptop3,
            Certificatedescriptop4: $scope.Certificatedescriptop4,
            Certificatedescriptop5: $scope.Certificatedescriptop5,
            HeaderHeight: $scope.heightImage,
            FooterHeight: $scope.FooterImage
        };
        let model = {
            URL: Domain + "/api/Master/BasePosCertification",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
        }, function () {
        })
    }
    $scope.imageUpload = function (eve) {
        let folder = "";
        var GSTFile = $("#" + eve.target.id).get(0);
        var FileGST = GSTFile.files;
        if (FileGST[0].name.substr((FileGST[0].name.lastIndexOf('.') + 1)).toLowerCase() != "jpg") {
            alert("Upload .jpg extention file.")
            return;
        }
        var fileData = new FormData();
        fileData.append(name, FileGST[0]);
        fileData.append("Token", JsonWebToken.token);
        fileData.append("url", Domain + '/api/Master/Certificate');
        if (eve.target.id == "footerUploader")
            folder = "Certificate/Footer";
        else if (eve.target.id == "HeaderUploader")
            folder = "Certificate/Header";
        else if (eve.target.id == "AuthorizeSign")
            folder = "Certificate/AuthorizeSign";
        fileData.append("Folder", folder );
        console.log(FileGST)
       
        $.ajax({
            url: defaultpage + '/master/UploadLogo',
            type: 'POST',
            dataType: 'json',
            data: fileData,
            contentType: false,
            processData: false,
            success: function (d) {
                if (d == "")
                    d = "Image Uploaded Succefully."
                alert(d)
            },
            error: function (er) {
                alert('Error!');
            }
        });
        
    }
    function GetHeaderFooter() {
        let body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/Master/GetCertificateHeader",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "HeaderFooter")
    }
    function BindtypeData(url, body, scope) {
        $http.post(url, body).then(function (Response) {
            if (Response.data != "") {
                $scope[scope] = JSON.parse(Response.data);
                if (scope=="HeaderFooter") {
                    $("#headerImage").attr("src", $scope.HeaderFooter.header);
                    $("#FooterCss").attr("src", $scope.HeaderFooter.footer);
                }
            }
        }, function () {
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
});