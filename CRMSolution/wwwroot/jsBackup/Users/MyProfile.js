var app = angular.module("app", []);
app.controller("Profile", function ($scope, $http) {
    $scope.IsNoEdit = true;
    $scope.UserName = "";
    $scope.MobileNum = "";
    $scope.Email = "";
    $scope.PinCode = "";
    $scope.Adhaar = "";
    $scope.DOB = "";
    $scope.PinCode = "";
    $scope.BenificiaryName = "";
    $scope.AccountNum = "";
    $scope.IFSC = "";
    $scope.PanNum = "";
    $scope.GSTIN = "";
    $scope.ComAddress = "";
    $scope.userid = "";
    var GlobalModal = null;
    CheckEditable();
    $scope.payoutdata = function () {
        body = {
            Token: GlobalModal.token,
            Userid: parseInt($scope.userid),
            BeneficiaryName: $scope.BenificiaryName,
            BankAccountNo: $scope.AccountNum,
            IFSC_Code: $scope.IFSC,
            PANNumber: $scope.PanNum
        };
        callPost("http://localhost:50972/api/user/Payoutdata", body);
    }
    $scope.personaldetails = function () {
        let body = {
            Token: GlobalModal.token,
            Userid: parseInt($scope.userid),
            DOB: $scope.DOB,
            Address: $scope.ComAddress,
            PinCode: $scope.PinCode
        };
        callPost("http://localhost:50972/api/user/PersonalDetails", body)
    }
    $scope.gstCertificate = function () {
        var fileData = new FormData();
        var GSTFile = $("#GSTFile").get(0);
        var FileGST = GSTFile.files;
        for (var i = 0; i < FileGST.length; i++) {
            fileData.append($scope.userid+"_FileGST", FileGST[i]);
        }
        fileData.append("Gstin", $scope.GSTIN)
        fileData.append("UserID", $scope.userid)
        let url ="http://localhost:50972/api/user/GstCertificateFiles"
        FileUploadFunction(url,fileData);
    }
    $scope.dosc = function () {
        var fileData = new FormData();
        var EducationCertificate = $("#EducationCertificate").get(0);
        var Education = EducationCertificate.files;
        for (var i = 0; i < Education.length; i++) {
            fileData.append($scope.userid + "_FileEducation", Education[i]);
        }
        var CancelledCheque = $("#CancelledCheque").get(0);
        var Cheque = CancelledCheque.files;
        for (var i = 0; i < Cheque.length; i++) {
            fileData.append($scope.userid + "_FileCancelledCheque", Cheque[i]);
        }
        var PANCardDocument = $("#PANCardDocument").get(0);
        var PANCard = PANCardDocument.files;
        for (var i = 0; i < PANCard.length; i++) {
            fileData.append($scope.userid + "_FilePANCard", PANCard[i]);
        }
        var AadharCardFront = $("#AadharCardFront").get(0);
        var CardFront = AadharCardFront.files;
        for (var i = 0; i < CardFront.length; i++) {
            fileData.append($scope.userid + "_FileAadharCardFront", CardFront[i]);
        }
        var AadharCardBack = $("#AadharCardBack").get(0);
        var CardBack = AadharCardBack.files;
        for (var i = 0; i < CardBack.length; i++) {
            fileData.append($scope.userid + "_FileAadharCardBack", CardBack[i]);
        }
        var TandC = $("#TandC").get(0);
        var TandCw = TandC.files;
        for (var i = 0; i < TandCw.length; i++) {
            fileData.append($scope.userid + "_FileTandC", TandCw[i]);
        }
        fileData.append("UserID", $scope.userid)
        FileUploadFunction("http://localhost:50972/api/user/UploadFiles", fileData);
    }
    function FileUploadFunction(url,formdata) {
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: formdata,
            contentType: false,
            processData: false,
            success: function (d) {
                alert(d)
            },
            error: function () {
                alert('Error!');
            }
        });
    }
    function callPost(url, body) {
        $http.post(url, body).then(function (Response) {
            alert(Response.data);
        }, function (response) {
        })
    }
    function CheckEditable() {
        let urlParams = new URLSearchParams(window.location.search);
        let userid = urlParams.get('userid');
        let action = urlParams.get('action');
        GlobalModal = JSON.parse(window.localStorage.getItem("token"))
        if (action == "Y")
            $scope.IsNoEdit = false;
        else
            $scope.IsEdit = true;
        MyDetails(userid);
    }
    function MyDetails(userid) {
        let body = {
            Token: GlobalModal.token,
            Userid: parseInt(userid)
        }
        $http.post("http://localhost:50972/api/user/MyprofileData", body).then(function (Response) {
            console.log(Response.data);
            let user = Response.data;
            $scope.userid = userid;
            $scope.UserName = user.userName;
            $scope.MobileNum = user.mobileNo;
            $scope.Email = user.emailAddress;
            $scope.PinCode = user.pinCode;
            $scope.Adhaar = user.adhaarNumber;
            $scope.DOB = convertDate(user.dob);
            $scope.BenificiaryName = user.beneficiaryName;
            $scope.AccountNum = user.bankAccountNo;
            $scope.IFSC = user.ifsC_Code;
            $scope.PanNum = user.panNumber;
            $scope.GSTIN = user.gstNumber;
            $scope.ComAddress = user.address
        }, function (Response) {
        });
    }
    function convertDate(inputFormat) {
        try {
            function pad(s) { return (s < 10) ? '0' + s : s; }
            var d = new Date(inputFormat)
            return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-')
        }
        catch (ex) {
            return null;
        }
    }
});

app.controller("navcontroller", function ($scope, $http) {
    var GlobalModal = null;
    GetToken();
    //$("#userName").text(data.firstName + " " + data.lastName)
    //$("#WelcomeText").text(GetWelcome())
    var navgrouplist = []
    var navgrouplistMaster = null;
    $scope.Navs = null;
    var model = {
        Token: GlobalModal.token
    }
    $http.post("http://localhost:50972/api/Home/DashBoardPrivilages", model).then(function (Response) {
        navgrouplistMaster = Response.data
        var counter = 0;
        $(Response.data).each(function (index, value) {
            if (navgrouplist.filter(row => row.privilegeName == value.privilegeGroupName).length <= 0) {
                var prv = {
                    privid: counter,
                    privilegeName: value.privilegeGroupName,
                    url: value.url
                }
                counter += 1;
                navgrouplist.push(prv)
            }
        })
        $scope.Navs = navgrouplist;
    }, function (Response) {
    })
    $scope.submenu = function (nav) {
        var submenu = navgrouplistMaster.filter(row => row.privilegeGroupName == nav.privilegeName)
        var navul = "<ul class='first-level'>";
        $("#sidebarnav ul").each(function () {
            $(this).remove();
        })

        $(submenu).each(function (index, value) {
            navul += "<li  class='sidebar-item'><a href='" + value.url + "' class='sidebar-link'><span class='hide-menu'>" + value.privilegeName + "</span></a></li>"
        })
        navul += "</ul>"
        $("#sidebarnav").find('> li').eq(nav.privid).after(navul)
    }
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