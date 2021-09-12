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
    $scope.BankName = "";
    $scope.BankBranch = "";
    $scope.PanNum = "";
    $scope.GSTIN = "";
    $scope.ComAddress = "";
    $scope.userid = "";
    $scope.ReferPrifix = null;
    $scope.ReferCode = null;
    $scope.PosPrifix = null;
    $scope.PoSAssociateCode = null;
    $scope.RoleName = null;
    $scope.IsShowUnblock = false;
    $scope.AlternetCode = null;
    $scope.Certificate = null;
    $scope.CancelCheque = null;
    $scope.PaN = null;
    $scope.AdhaarFront = null;
    $scope.AdhaarBack = null;
    $scope.TearnAndCondition = null;
    $scope.IsPos = false;
    $scope.Ismyprofile = false;
    $scope.ProfileImage = "https://icons.iconarchive.com/icons/paomedia/small-n-flat/512/user-male-icon.png";
    $scope.CertificateDate = null;
    $scope.CancelChequeDate = null;
    $scope.PanDate = null;
    $scope.AdharFrontDate = null;
    $scope.AdharBackDate = null;
    $scope.TermConditionDate = null;
    $scope.IsShowPosCer = false;
    $scope.IsBenificiaryName = false;
    $scope.IsAccountNum = false;
    $scope.IsBankName = false;
    $scope.IsBankBranch = false;
    $scope.IsIFSC = false;
    $scope.IsPanNum = false;
    $scope.IsComaddress = false;
    $scope.IsPin = false;
    $scope.IsGSTIN = false;
    $scope.IsAllowConfigPinCode = false;
    $scope.PinState = null;
    $scope.PinCity = null;
    $scope.UpdatedPinCode = null;
    $scope.RegionList = [];
    var GlobalUserID = "";
    CheckEditable();
    $scope.payoutdata = function () {
        let body = {
            Token: JsonWebToken.token,
            Userid: parseInt($scope.userid),
            BeneficiaryName: $scope.BenificiaryName,
            BankAccountNo: $scope.AccountNum,
            IFSC_Code: $scope.IFSC,
            PANNumber: $scope.PanNum,
            BankName: $scope.BankName,
            BankBranch: $scope.BankBranch
        };
        let model = {
            URL: Domain + "/api/User/Payoutdata",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
        }, function () {
        })
    }
    $scope.personaldetails = function () {
        let body = {
            Token: JsonWebToken.token,
            Userid: parseInt($scope.userid),
            DOB: $scope.DOB,
            Address: $scope.ComAddress,
            PinCode: $scope.PinCode
        };
        let model = {
            URL: Domain + "/api/User/PersonalDetails",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
        }, function () {
        })
    }
    $scope.gstCertificate = function (opt) {
        let body = {
            Token: JsonWebToken.token,
            Userid: parseInt($scope.userid),
            GSTIN: $scope.GSTIN
        };
        let model = {
            URL: Domain + "/api/User/Gstin",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
            if (opt == "GSTFile") {
                var GSTFile = $("#GSTFile").get(0);
                if (GSTFile.files.length > 0) {
                    UploadDocuments("GSTFile");
                }
            }
        }, function () {
        })
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
        FileUploadFunction(Domain + "/api/user/UploadFiles", fileData);
    }
    $scope.Unlock = function () {
        let urlParams = new URLSearchParams(window.location.search);
        let userid = urlParams.get('userid');
        userid = userid.replace(" ", "+");
        userid = userid.replace(" ", "+");
        userid = userid.replace(" ", "+");
        let body = {
            Token: JsonWebToken.token,
            Userid: userid
        };
        let model = {
            URL: Domain + "/api/user/UnlockIncorrectAttempt",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
            if (Response.data == "Unlocked Successfully.") {
                $scope.IsShowUnblock = false;
            }
        }, function () {
        })
    }
    $scope.UpdateInfo = function () {
        if (GlobalUserID != "") {
            UpdateInfo(GlobalUserID)
        }
        else {
            UpdateInfoencryptID()
        }
    }
    $scope.addfile = function () {
        $("#fileupload").click();
    }
    $scope.fileNameChanged = function () {
        let urlParams = new URLSearchParams(window.location.search);
        let userid = urlParams.get('userid');
        if (userid != null) {
            userid = manageQueryString(userid);
        }
        let name = window.location.origin.replace(".com", "").replace(".in", "");
        var GSTFile = $("#fileupload").get(0);
        var FileGST = GSTFile.files;
        var fileData = new FormData();
        GlobalUserID = $scope.userid;//userid == null ?  : userid;
        fileData.append(FileGST[0].name, FileGST[0]);
        fileData.append("FileName", GlobalUserID);
        fileData.append("Token", JsonWebToken.token);
        fileData.append("Path", "TempUserPhoto");
        fileData.append("Doc", "UserProfilePic");
        //fileData.append("url", Domain + '/api/user/UserProfilePic');
        fileData.append("url", Domain + '/api/user/UploadFiles');
        
        $.ajax({
            url: defaultpage + '/user/UploadData',
            type: 'POST',
            dataType: 'json',
            data: fileData,
            contentType: false,
            processData: false,
            success: function (d) {
                alert(d);
                location.reload(true);
            },
            error: function (er) {
                alert('Error!');
            }
        });
        
    }
    $scope.UploadDoc = function (doc) {
        UploadDocuments(doc);
    }
    $scope.UpdateAlternetCode = function () {
        let urlParams = new URLSearchParams(window.location.search);
        let userid = urlParams.get('userid');
        userid = userid.replace(" ", "+");
        userid = userid.replace(" ", "+");
        userid = userid.replace(" ", "+");
        let body = {
            Token: JsonWebToken.token,
            Userid: userid,
            Name: $scope.AlternetCode
        };
        let model = {
            URL: Domain + "/api/user/UpdateAlternetCode",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
            if (Response.data == "Unlocked Successfully.") {
                $scope.IsShowUnblock = false;
            }
        }, function () {
        })
    }
    $scope.DownloadCertificate = function () {
        window.open("/user/certificate", "_blank");
    }
    $scope.checkPincode = function (pin) {
        if (pin.length >= 6) {
            let body = {
                Token: JsonWebToken.token,
                PinCode: parseInt(pin)
            };
            let model = {
                URL: Domain + "/api/user/CheckPinAvailable",
                PostString: JSON.stringify(body)
            }
            $http.post(CallApiPostMethod, model).then(function (Response) {
                if (Response.data ="NotFound")
                    $scope.IsAllowConfigPinCode = true
                else
                    $scope.IsAllowConfigPinCode = false
            }, function (Respo) {
            })
        }
        else
            $scope.IsAllowConfigPinCode = false
    }
    $scope.ConfigPinCode = function () {
        $(".ConfigPincode").show();
        $scope.UpdatedPinCode = $scope.PinCode;
    }
    $scope.SavePincodeCityState = function () {
        let body = {
            Token: JsonWebToken.token,
            PinCode: parseInt($scope.UpdatedPinCode),
            PinState: $scope.PinState,
            PinCity: $scope.PinCity
        };
        var model = {
            URL: Domain + "/api/user/UpdatePincode",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
        }, function (Response) {
        })
    }
    function UpdateInfoencryptID() {
        let body = {
            Token: JsonWebToken.token,
            UserID: $scope.userid,
        };
        var modelRe = {
            URL: Domain + "/api/Setup/EncryptOrDecrypt",
            PostString: JSON.stringify(body)
        }
        $http.post("/myaccount/Account/CallCheck", modelRe).then(function (Response) {
            UpdateInfo(Response.data)
        })
    }
    function UpdateInfo(userID) {
        let updateUser = {
            MobileNo: $scope.MobileNum,
            Name: $scope.UserName,
            UserID: userID,
            Adhaar: parseInt($scope.Adhaar),
            Email: $scope.Email,
            Token: JsonWebToken.token
        };
        let model = {
            URL: Domain + "/api/user/UpdateUserinfo",
            PostString: JSON.stringify(updateUser)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
        }, function (Response) {
        })
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
        GlobalUserID = userid == null ? "": manageQueryString(userid);
        let action = urlParams.get('action');
        GlobalModal = JSON.parse(window.localStorage.getItem("token"))
        if (action == "N")
            $scope.IsNoEdit = true;
        else
            $scope.IsNoEdit = false;

        $scope.Ismyprofile = userid == null ? true : false;
        MyDetails(userid);
    }
    function manageQueryString(userid) {
        if (userid != null) {
            userid = userid.replace(" ", "+");
            userid = userid.replace(" ", "+");
            userid = userid.replace(" ", "+");
        }
        return userid;
    }
    function MyDetails(userid) {
        if (userid == null)
            userid = "0";
        else {
            userid = userid.replace(" ", "+");
            userid = userid.replace(" ", "+");
            userid = userid.replace(" ", "+");
        }
        let body = {
            Token: JsonWebToken.token,
            RegisterOrDeregister: userid
        }
        var model = {
            URL: Domain + "/api/user/MyprofileData",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            console.log(Response.data);
            let user = JSON.parse(Response.data);
            $scope.userid = user.userMaster.userID;
            $scope.UserName = user.userMaster.userName;
            $scope.MobileNum = user.userMaster.mobileNo;
            $scope.Email = user.userMaster.emailAddress;
            $scope.PinCode = user.userMaster.pinCode;
            $scope.Adhaar = user.userMaster.adhaarNumber;
            $scope.DOB = convertDate(user.userMaster.dob);
            $scope.BenificiaryName = user.userMaster.beneficiaryName;
            $scope.AccountNum = user.userMaster.bankAccountNo;
            $scope.IFSC = user.userMaster.ifsC_Code;
            $scope.PanNum = user.userMaster.panNumber;
            $scope.GSTIN = user.userMaster.gstNumber;
            $scope.ComAddress = user.userMaster.address;
            $scope.ReferPrifix = user.userMaster.referPrifix;
            $scope.ReferCode = user.userMaster.referVal;
            $scope.PosPrifix = user.userMaster.posPrifix;
            $scope.PoSAssociateCode = user.userMaster.posVal;
            $scope.RoleName = user.roleType.roleName;
            $scope.ProfileImage = user.userMaster.userProfilePic != null ? user.userMaster.userProfilePic : $scope.ProfileImage;
            $scope.IsShowUnblock = user.wrongLoginAttempt >= 5 ?? true;
            $scope.AlternetCode = user.userMaster.roleId == 8 && user.userMaster.alternatecode ? user.userMaster.alternatecode : "";
            $scope.IsPos = user.userMaster.roleId == 8 ? true : false
            $scope.CheckUpdation = user.whoView == 28 || user.whoView == 30 ? true : false;
            $scope.Certificate = user.userDocuments != null ? user.userDocuments.qualificationCertificate_URL == null ? null : Domain + user.userDocuments.qualificationCertificate_URL : null;
            $scope.CertificateDate = $scope.Certificate != null ? user.userDocuments.qualificationDate : null;
            $scope.CancelCheque = user.userDocuments != null ? user.userDocuments.cancelCheque_URL == null ? null : Domain + user.userDocuments.cancelCheque_URL : null;
            $scope.CancelChequeDate = $scope.CancelCheque != null ? user.userDocuments.cancelChequeDate : null;
            $scope.PaN = user.userDocuments != null ? user.userDocuments.paN_URL == null ? null : Domain + user.userDocuments.paN_URL : null;
            $scope.PanDate = $scope.PaN != null ? user.userDocuments.panDate : null;
            $scope.AdhaarFront = user.userDocuments != null ? user.userDocuments.adhaar_Front_URL == null ? null : Domain + user.userDocuments.adhaar_Front_URL : null;
            $scope.AdharFrontDate = $scope.AdhaarFront != null ? user.userDocuments.adharFrontDate : null;
            $scope.AdhaarBack = user.userDocuments != null ? user.userDocuments.adhaar_Back_URL==null? null : Domain + user.userDocuments.adhaar_Back_URL : null;
            $scope.AdharBackDate = $scope.AdhaarBack != null ? user.userDocuments.adharBackDate : null;
            $scope.TearnAndCondition = user.userDocuments != null ? user.userDocuments.tearnAndCondition == null ? null : Domain + user.userDocuments.tearnAndCondition : null;
            $scope.TermConditionDate = $scope.TearnAndCondition != null ? user.userDocuments.termConditionDate : null;
            $scope.BankName = user.userMaster.bankName
            $scope.BankBranch = user.userMaster.bankBranch
            $scope.RegionList = user.userRegions;
            $scope.IsBenificiaryName = $scope.CheckUpdation == false ? ($scope.BenificiaryName != "" && $scope.BenificiaryName != null) : false;
            $scope.IsAccountNum = $scope.CheckUpdation == false ? ($scope.AccountNum != "" && $scope.AccountNum != null) : false;
            $scope.IsBankName = $scope.CheckUpdation == false ? ($scope.BankName != "" && $scope.BankName != null) : false;
            $scope.IsBankBranch = $scope.CheckUpdation == false ? ($scope.BankBranch != "" && $scope.BankBranch != null) : false;
            $scope.IsIFSC = $scope.CheckUpdation == false ? ($scope.IFSC != "" && $scope.IFSC != null) : false;
            $scope.IsPanNum = $scope.CheckUpdation == false ? ($scope.PanNum != "" && $scope.PanNum != null) : false;
            $scope.IsComaddress = $scope.CheckUpdation == false ? ($scope.ComAddress != "" && $scope.ComAddress != null) : false;
            $scope.IsPin = $scope.CheckUpdation == false ? ($scope.PinCode != "" && $scope.PinCode != null) : false;
            $scope.IsGSTIN = $scope.CheckUpdation == false ? ($scope.GSTIN != "" && $scope.GSTIN != null) : false;

            if ($scope.IsPos == true && $scope.Ismyprofile == true) {
                if (user.userMaster.isDocRequred) {
                    if (user.userDocuments.docVerified && user.posExamStart.passOrFail == "Pass") {
                        $scope.IsShowPosCer = true;
                    }
                }
                else if (user.posExamStart.passOrFail == "Pass") {
                    $scope.IsShowPosCer = true;
                }
            }
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
    function UploadDocuments(doc) {
        let ElementID = "";
        switch (doc) {
            case "Certificate":
                ElementID = "#EducationCertificate"
                break;
            case "Cheque":
                ElementID = "#CancelledCheque"
                break;
            case "PANCard":
                ElementID = "#PANCardDocument"
                break;
            case "AadharCardFront":
                ElementID = "#AadharCardFront"
                break;
            case "AadharCardBack":
                ElementID = "#AadharCardBack"
                break;
            case "TandC":
                ElementID = "#TandC"
                break;
            case "GSTFile":
                ElementID = "#GSTFile"
                break;
        }
        var GSTFile = $(ElementID).get(0);
        if (GSTFile == undefined)
            return
        var FileGST = GSTFile.files;
        if (FileGST.length <= 0)
            return

        let Checkfilesize = (FileGST[0].size / 1024) / 1024;
        if (Checkfilesize > 2) {
            alert("File size is large")
            return;
        }
        var fileData = new FormData();
        let urlParams = new URLSearchParams(window.location.search);
        let userid = urlParams.get('userid');
        GlobalUserID = userid == null ? $scope.userid : manageQueryString(userid);
        fileData.append(FileGST[0].name, FileGST[0]);
        fileData.append("Token", JsonWebToken.token);
        fileData.append("Path", "TempUserDoc");
        fileData.append("FileName", GlobalUserID);
        fileData.append("Doc", doc);
        fileData.append("url", Domain + '/api/user/UploadFiles');
        $.ajax({
            url: defaultpage + '/user/UploadData',
            type: 'POST',
            dataType: 'json',
            data: fileData,
            contentType: false,
            processData: false,
            success: function (d) {
                if (d == "")
                    d = "Data Uploaded Successfully."
                alert(d);
                location.reload(true);
            },
            error: function (er) {
                alert('Error!');
            }
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