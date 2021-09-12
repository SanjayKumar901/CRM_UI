var app = angular.module("app", []);
app.controller("DocumentVerification", function ($scope, $http) {
    $scope.User = null;
    $scope.UserActive = null;
    $scope.UserList = null;
    $scope.UserListMaster = null;
    $scope.DocData = null;
    $scope.Doclist = [];
    $scope.MessageList = [];
    $scope.ImageURL = null;
    LoadInactivePosList();
    $scope.SelectedUser = function (model) {
        let body = {
            Token: JsonWebToken.token,
            Userid: model.userid
        };
        var model = {
            URL: Domain + "/api/Master/GetUploadedDoc",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "DocData");
    }
    $scope.ShareMessage = function () {
        let body = {
            Token: JsonWebToken.token,
            Message: $scope.Message,
            Subject: "Document Verification",
            ToUserID: $scope.User.userid
        };
        var model = {
            URL: Domain + "/api/Master/ShareMessage",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
        }, function (ex) {
        })
    }
    $scope.MakeActive = function () {
        let body = {
            Token: JsonWebToken.token,
            Userid: $scope.User.userid
        };
        var model = {
            URL: Domain + "/api/Master/VerfyDocument",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
            LoadInactivePosList();
        }, function (ex) {
        })
    }
    $scope.tabOption = function (Option) {
        $scope.MessageList = [];
        $scope.User = null;
        $scope.Doclist = [];
        $scope.UserActive = null;
        if (Option == "InActive") {
            $scope.UserList = $scope.UserListMaster.filter(row => row.docverified == false);
        }
        else if (Option == "Active") {
            $scope.UserList = $scope.UserListMaster.filter(row => row.docverified == true);
        }
    }
    $scope.CheckOrNotDoc = function (index, docname) {
        let optionCondition = $(".table tbody tr").find($("input[type='checkbox']")).eq(index).is(':checked');
        $scope.User.userid
        let body = {
            Token: JsonWebToken.token,
            IsCheck: optionCondition,
            UserID: $scope.User.userid,
            DocName: docname
        };
        var model = {
            URL: Domain + "/api/user/DocumentCheck",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data)
        });
    }
    function LoadInactivePosList() {
        let body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/Master/InactivePosListWithDocReq",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "UserList");
    }
    function BindtypeData(url, body, scope) {
        $http.post(url, body).then(function (Response) {
            $scope[scope] = JSON.parse(Response.data);
            if (scope == "DocData") {
                ManageDocList($scope[scope]);
            }
            else if (scope == "UserList") {
                $scope.UserListMaster = JSON.parse(Response.data);
                $scope.UserList = $scope.UserListMaster.filter(row => row.docverified == false);
            }
        }, function () {
        })
    }
    function ManageDocList(model) {
        $scope.Doclist = [];
        if (model.userDocuments != null) {
            $scope.ImageURL = Domain + model.profilePic;
            if (model.userDocuments.adhaar_Front_URL != null) {
                $scope.Doclist.push({
                    Name: "Adhaar Front",
                    Link: model.api + model.userDocuments.adhaar_Front_URL,
                    IsCheck: model.userDocuments.isAdharFrontCheck
                })
            }
            if (model.userDocuments.adhaar_Back_URL != null) {
                $scope.Doclist.push({
                    Name: "Adhaar Back",
                    Link: model.api + model.userDocuments.adhaar_Back_URL,
                    IsCheck: model.userDocuments.isAdharBackCheck
                })
            }
            if (model.userDocuments.pAN_URL != null) {
                $scope.Doclist.push({
                    Name: "Pan Card",
                    Link: model.api + model.userDocuments.pAN_URL,
                    IsCheck: model.userDocuments.isPanCheck
                })
            }
            if (model.userDocuments.qualificationCertificate_URL != null) {
                $scope.Doclist.push({
                    Name: "Highest Education Certificate",
                    Link: model.api + model.userDocuments.qualificationCertificate_URL,
                    IsCheck: model.userDocuments.isQualificationCheck
                })
            }
            if (model.userDocuments.cancelCheque_URL != null) {
                $scope.Doclist.push({
                    Name: "Cancel Cheque",
                    Link: model.api + model.userDocuments.cancelCheque_URL,
                    IsCheck: model.userDocuments.isCancelChequeCheck
                })
            }
            if (model.userDocuments.adhaar_Front_URL != null) {
                $scope.Doclist.push({
                    Name: "POS Certificate",
                    Link: model.api + model.userDocuments.pOS_Certificate_Front_URL,
                    IsCheck: model.userDocuments.isPosCertificateCheck
                })
            }
            if (model.userDocuments.gST_CERTIFICATE_URL != null) {
                $scope.Doclist.push({
                    Name: "GST Certificate",
                    Link: model.api + model.userDocuments.gST_CERTIFICATE_URL,
                    IsCheck: model.userDocuments.isGSTCertificateCheck
                })
            }
            if (model.userDocuments.tearnAndCondition != null) {
                $scope.Doclist.push({
                    Name: "Terms & Conditions",
                    Link: model.api + model.userDocuments.tearnAndCondition,
                    IsCheck: model.userDocuments.isTermCheck
                })
            }
        }
        $scope.MessageList = model.offlineQueryRelatedMessages;
    }
})
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