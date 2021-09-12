var app = angular.module("app", []);
app.controller("OfflineBusiness", function ($scope, $http,$filter) {
  
    var CurrentDomail = window.location.origin;
    //******************ManualOfflineModel*****************
    $scope.UserList = [];
    $scope.InsurerList = [];
    $scope.SelectedUser = null;
    $scope.SelectedInsurer = null;
    $scope.POSCode = null;
    $scope.POSName = null;
    $scope.POSSource= null;
    $scope.ReportingManagerName= null;
    $scope.RegionalManagerName= null;
    $scope.CustName= null;
    $scope.Address= null;
    $scope.SelectedCity = null;
    $scope.StateList = [];
    $scope.CityList = [];
    $scope.Pin= null;
    $scope.SelectedState= null;
    $scope.PhoneNo= null;
    $scope.MobileNo= null;
    $scope.Email= null;
    $scope.DOB= null;
    $scope.ProductType= null;
    $scope.Product = "Life";
    $scope.ProductName = "Tag Safal Jeevan";
    $scope.PolicyTerm = null;
    $scope.PremiumPayingTerm= null;
    $scope.PremiumPayingFrequency= null;
    $scope.BusinessType= null;
    $scope.PolicyNumber= null;
    $scope.StartDate= null;
    $scope.EndDate= null;
    $scope.PolicyIssueDate= null;
    $scope.SumAssured= null;
    $scope.NetPremium= null;
    $scope.GST= null;
    $scope.TotalPremium = null;
    $scope.Enquiryno = null;//----
    $scope.ProductIssuanceType = null;
    $scope.POSPProduct = null;

    $scope.MaxDOB = null;
    $scope.StateID= null;
    $scope.CityID = null;
    $scope.UserID = null;
    $scope.InsurerID = null;
    //****************EndManualOfflineModel*****************

    $scope.SelectedTab = null;
    $scope.PayProcessList = null;
    LoadOfflineData();
    $scope.selectTab = function (tab) {
        $scope.SelectedTab = tab;
        if (tab == 'ManualOffline') {
            BindUsers();
            GetInsurerList();
            GetStates();
            //var dasLeadModel = {
            //    Token: JsonWebToken.token
            //}
            //var model = {
            //    URL: Domain + "/api/BusinessReport/OfflineUserListData",
            //    PostString: JSON.stringify(dasLeadModel)
            //}
            //$http.post(CallApiPostMethod, model).then(function (Response) {
            //    $scope.UserList = JSON.parse(Response.data);
            //    GetInsurerList();
            //    GetStates();

            //    if ($scope.UserID) {
            //        this.SelectedUser = $scope.UserList.filter(x => x.userid== $scope.UserID);
            //    }

            //}, function (Response) {

            //});
        }
    }
    $scope.SaveManualPolicy = function () {
        let body = {
            Token: JsonWebToken.token,
            UserID: parseInt($scope.SelectedUser.userid),
            //ClientID: $scope.
            //CreatedID: $scope.
            POSCode: $scope.POSCode,
            POSName: $scope.POSName,
            POSSource: $scope.POSSource,
            ReportingManagerName: $scope.ReportingManagerName,
            RegionalManagerName: $scope.RegionalManagerName,
            CustName: $scope.CustName,
            Address: $scope.Address,
            CityID: parseInt($scope.SelectedCity.cityID),
            Pin: $scope.Pin,
            StateID: parseInt($scope.SelectedState.stateID),
            PhoneNo: $scope.PhoneNo,
            MobileNo: $scope.MobileNo,
            Email: $scope.Email,
            DOB: $scope.DOB,
            Insurer: "",
            InsurerID: parseInt($scope.SelectedInsurer.companyID),
            ProductType: $scope.ProductType,
            Product: $scope.Product,
            ProductName: $scope.ProductName,
            PolicyTerm: parseInt($scope.PolicyTerm),
            PremiumPayingTerm: parseInt($scope.PremiumPayingTerm),
            PremiumPayingFrequency: $scope.PremiumPayingFrequency,
            BusinessType: $scope.BusinessType,
            PolicyNumber: $scope.PolicyNumber,
            StartDate: $scope.StartDate,
            EndDate: $scope.EndDate,
            PolicyIssueDate: $scope.PolicyIssueDate,
            SumAssured: Number($scope.SumAssured),
            NetPremium: Number($scope.NetPremium),
            GST: Number($scope.GST),
            TotalPremium: Number($scope.TotalPremium),
            Enquiryno: $scope.Enquiryno,
            ProductIssuanceType: $scope.ProductIssuanceType,
            POSPProduct: $scope.POSPProduct
        }
        var model = {
            URL: Domain + "/api/BusinessReport/SaveOfflineLifePolicy",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
            LoadPolicyFile();
        }, function (Response) {
            ////alert(Response.statusText)
        });
    }
    $scope.SuccessPolicy = function () {
        successPolicy();
    }
    $scope.selectedPolicy = function () {
        $scope.PlanName = $scope.selectPolicy.policytype;
    }
    $scope.BindCities = function (SelectState) {
        GetCities($scope.SelectedState);
    }
    $scope.uploadbulkData = function () {
        var GSTFile = $("#Bulkfile").get(0);
        var FileGST = GSTFile.files;
        var fileData = new FormData();
        //GlobalUserID = $scope.GlobalUserID;//userid == null ?  : userid;
        fileData.append(FileGST[0].name, FileGST[0]);
        fileData.append("Token", JsonWebToken.token);
        fileData.append("Domain", window.location.hostname.replace("https://", "").replace("http://", "").replace("www.", ""));
        fileData.append("Product", "Life");
        fileData.append("url", Domain + '/api/BusinessReport/UploadBulkOfflineLifeBusiness');
        $.ajax({
            url: defaultpage + '/Business/BulkMotorDataPost',
            type: 'POST',
            dataType: 'json',
            data: fileData,
            contentType: false,
            processData: false,
            success: function (d) {
                alert(d);
            },
            error: function (er) {
                alert(er.responseText);
            }
        });
    }

    function BindUsers() {
        var dasLeadModel = {
            Token: JsonWebToken.token
        }
        var model = {
            URL: Domain + "/api/BusinessReport/OfflineUserListData",
            PostString: JSON.stringify(dasLeadModel)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            $scope.UserList = JSON.parse(Response.data);
            if ($scope.UserID) {
                $scope.SelectedUser = $scope.UserList?.filter(x => x.userid == $scope.UserID)[0];
            }

        }, function (Response) {

        });
    }

    function successPolicy() {
        let body = {
            Token: JsonWebToken.token,
            Getway: $scope.selectPolicy,
            PlanName: $scope.selectPolicy.policytype,
            TotalPremium: parseFloat($scope.TotalPremium),
            BasePremium: parseFloat($scope.BasePremium),
            CoverAmount: parseFloat($scope.CoverAmount),
            Policyno: parseFloat($scope.PolicyNo)
        }
        var model = {
            URL: Domain + "/api/BusinessReport/OfflineUpdateHLTPolicy",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);

        }, function (Response) {
            ////alert(Response.statusText)
        });
    }
    function LoadOfflineData() {
        let qstr = new URLSearchParams(window.location.search);
        let qry = qstr.get("policyno");
        if (qry != null) {
            $("#manual").click();
            //LoadUser('ManualOffline');
            var dasLeadModel = {
                Token: JsonWebToken.token,
                PolicyNo: qry,
            }
            var model = {
                URL: Domain + "/api/BusinessReport/GetOfflineLifePolicyInfo",
                PostString: JSON.stringify(dasLeadModel),
            }
            $http.post(CallApiPostMethod, model).then(function (Response) {
                debugger;
                //item.dateAsString = $filter('date')(item.date, "yyyy-MM-dd");  // for type="date" binding
               let life = JSON.parse(Response.data);
                if (life) {
                    $scope.CityID = life.cityID;
                    $scope.StateID = life.stateID;
                    $scope.InsurerID = life.insurerID;
                    $scope.UserID = life.userID;
                    BindUsers();
                    GetInsurerList();
                    GetStates();
                    $scope.POSCode = life.posCode;
                    $scope.POSName = life.posName;
                    $scope.POSSource = life.posSource;
                    $scope.ReportingManagerName = life.reportingManagerName;
                    $scope.RegionalManagerName = life.regionalManagerName;
                    $scope.CustName = life.custName;
                    $scope.Address = life.address;
                    $scope.Pin = life.pin;
                    $scope.PhoneNo = life.phoneNo;
                    $scope.MobileNo = life.mobileNo;
                    $scope.Email = life.email;
                    //$scope.DOB = $filter('date')(life.dob, "yyyy-MM-dd");
                    $("input[ng-model='DOB']").val($filter('date')(life.dob, "yyyy-MM-dd"));
                    $scope.ProductType = life.productType;
                    $scope.Product = life.product;
                    $scope.ProductName = life.productName;
                    $scope.PolicyTerm = life.policyTerm;
                    $scope.PremiumPayingTerm = life.premiumPayingTerm;
                    $scope.PremiumPayingFrequency = life.premiumPayingFrequency;
                    $scope.BusinessType = life.businessType;
                    $scope.PolicyNumber = life.policyNumber;
                    //$scope.StartDate = $filter('date')(life.startDate, "yyyy-MM-dd");
                    $("input[ng-model='StartDate']").val($filter('date')(life.startDate, "yyyy-MM-dd"));
                    //$scope.EndDate = $filter('date')(life.endDate, "yyyy-MM-dd");
                    $("input[ng-model='EndDate']").val($filter('date')(life.endDate, "yyyy-MM-dd"));
                    //$scope.PolicyIssueDate = $filter('date')(life.policyIssueDate, "yyyy-MM-dd");
                    $("input[ng-model='PolicyIssueDate']").val($filter('date')(life.policyIssueDate, "yyyy-MM-dd"));
                    $scope.SumAssured = life.sumAssured;
                    $scope.NetPremium = life.netPremium;
                    $scope.GST = life.gst;
                    $scope.TotalPremium = life.totalPremium;
                    $scope.Enquiryno = life.enquiryno;
                    $scope.ProductIssuanceType = life.productIssuanceType;
                    $scope.POSPProduct = life.pospProduct;
                }
            }, function (Response) {
            });
        }
    }
    function GetInsurerList() {
        let body = {
            Token: JsonWebToken.token
        };
        let model = {
            URL: Domain + "/api/Master/GetInsurerCompanies",
            PostString: JSON.stringify(body)
        }
        return $http.post(CallApiPostMethod, model).then(function (ResponseData) {
            $scope.InsurerList = JSON.parse(ResponseData.data).filter(row => row.termlifeInsurance == true);
            if ($scope.InsurerID) {
                $scope.SelectedInsurer = $scope.InsurerList?.filter(x => x.companyID == $scope.InsurerID)[0];
            }
        }, function (ResponseData) {
        })
    }
    function LoadPolicyFile() {
        let path = "OfflinePolicy"
        let URL = "";
        var GSTFile = null;
        var FileGST = null;
        var fileData = new FormData();
        if ($scope.SelectedTab == 'Offline') {
            URL = defaultpage + '/Business/UploadMissingPolicy';
            GSTFile = $("#file").get(0);
            FileGST = GSTFile.files[0];
        }
        else if ($scope.SelectedTab == 'ManualOffline') {
            URL = defaultpage + '/Business/OfflineManualPolicy';
            GSTFile = $("#manualfile").get(0);
            path = "ManualOffline";
            FileGST = GSTFile.files[0];
            fileData.append("FileName", $scope.PolicyNumber);
            fileData.append("url", Domain + '/api/BusinessReport/ManualOffline');
            fileData.append("Doc", "ManualOffline");
        }
        if (GSTFile == null)
            return;

        fileData.append(FileGST.name, FileGST);
        fileData.append("Token", JsonWebToken.token);
        fileData.append("Path", path);
        $.ajax({
            url: URL,
            type: 'POST',
            dataType: 'json',
            data: fileData,
            contentType: false,
            processData: false,
            success: function (d) {
                if (d.response == "Done") {
                    //ProceedMissingPolicy(d.path)
                }
                document.getElementById("manualfile").value = null;
            },
            error: function (er) {
                alert('Error!');
            }
        });
    }
    function GetStates() {
        let body = {
            Token: JsonWebToken.token
        };
        let model = {
            URL: Domain + "/api/BusinessReport/GetStateList",
            PostString: JSON.stringify(body)
        }
        return $http.post(CallApiPostMethod, model).then(function (ResponseData) {
            $scope.StateList = JSON.parse(ResponseData.data);
            if ($scope.StateID) {
                $scope.SelectedState = $scope.StateList?.filter(x => x.stateID == $scope.StateID)[0];
                GetCities($scope.SelectedState);
            }
        }, function (ResponseData) {
        })
    }
    function GetCities(SelectState) {
        let body = {
            Token: JsonWebToken.token,
            StateID: parseInt(SelectState.stateID)
        };
        let model = {
            URL: Domain + "/api/BusinessReport/GetCityList",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (ResponseData) {
            $scope.CityList = JSON.parse(ResponseData.data);
            if ($scope.CityID) {
                $scope.SelectedCity = $scope.CityList?.filter(x => x.cityID == $scope.CityID)[0];
            }
        }, function (ResponseData) {
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