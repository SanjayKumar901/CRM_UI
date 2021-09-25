var app = angular.module("app", []);
app.controller("OfflineBusiness", function ($scope, $http) {
    $scope.PlanName = null;
    $scope.BasePremium = null;
    $scope.TotalPremium = null;
    $scope.CoverAmount = null;
    $scope.Term = null;
    $scope.PolicyNo = null;
    var CurrentDomail = "https://www.riskoveryinsurance.com/centralapi"//window.location.origin;
    //******************ManualOfflineModel*****************
    $scope.UserList = [];
    $scope.InsurerList = [];
    $scope.ManualselectUser = null;
    $scope.ManualInsurer = null;
    $scope.ManualPolicytype = null;
    $scope.ManualPlanName = null;
    $scope.ManualAdultCount = null;
    $scope.ManualChildCount = null;
    $scope.ManualTotalPremium = null;
    $scope.ManualNetPremium = null;
    $scope.ManualServiceTax = null;
    $scope.ManualCoverAmount = null;
    $scope.ManualBasePremium = null;
    $scope.ManualPolicyNo = null;
    $scope.ManualCustomerName = null;
    $scope.ManualCustomerEmail = null;
    $scope.ManualCustomerMobile = null;
    $scope.ManualChecqueDate = null;
    $scope.ManualChecqueNo = null;
    $scope.ManualChecqueBank = null;
    $scope.ManualCustomerAddress = null;
    $scope.ManualSelectBusinessType = "New";
    $scope.ManualSelectPolicyTerm = "1";
    $scope.ManualInsuranceType = "B2B";
    $scope.ManualSelectState = null;
    $scope.ManualSelectStateList = [];
    $scope.ManualSelectCityList = [];
    $scope.ManualSelectCity = null;
    $scope.ManualPincode = null;
    $scope.ManualCustomerDOB = null;
    $scope.ManualProductName = null;
    $scope.ManualProductType = null;
    $scope.ManualStartDate = null;
    $scope.ManualEndDate = null;
    $scope.ManualPolicyIssueDate = null;
    $scope.ManualIsPospProduct = false;
    $scope.ManualInsuranceType = null;
    var PolicyDetails = null;
    //****************EndManualOfflineModel*****************

    $scope.selectPolicy = null;
    $scope.PayProcessList = null;
    $scope.MinDOB = '1900-01-01'
    $scope.MaxDOB = new Date();
    LoadOfflineData();
    $scope.selectTab = function (tab) {
        LoadUser(tab);
    }
    $scope.SaveManualPolicy = function () {
        let body = {
            Token: JsonWebToken.token,
            ManualselectUser: parseInt($scope.ManualselectUser.userid),
            ManualInsurer: parseInt($scope.ManualInsurer.companyID),
            ManualPolicytype: $scope.ManualPolicytype,
            ManualPlanName: $scope.ManualPlanName,
            ManualAdultCount: parseInt($scope.ManualAdultCount),
            ManualChildCount: parseInt($scope.ManualChildCount),
            ManualTotalPremium: parseFloat($scope.ManualTotalPremium),
            ManualServiceTax: parseFloat($scope.ManualServiceTax),
            ManualCoverAmount: parseFloat($scope.ManualCoverAmount),
            ManualBasePremium: parseFloat($scope.ManualBasePremium),
            ManualPolicyNo: $scope.ManualPolicyNo,
            ManualCustomerName: $scope.ManualCustomerName,
            ManualCustomerEmail: $scope.ManualCustomerEmail,
            ManualCustomerMobile: $scope.ManualCustomerMobile,
            ManualChecqueDate: $scope.ManualChecqueDate,
            ManualChecqueNo: $scope.ManualChecqueNo,
            ManualChecqueBank: $scope.ManualChecqueBank,
            CustomerAddress: $scope.ManualCustomerAddress,
            SelectBusinessType: $scope.ManualSelectBusinessType,
            SelectPolicyTerm: parseInt($scope.ManualSelectPolicyTerm),
            InsuranceType: $scope.ManualInsuranceType,
            SelectState: parseInt($scope.ManualSelectState.stateID),
            SelectCity: parseInt($scope.ManualSelectCity.cityID),
            Pincode: $scope.ManualPincode,
            CustomerDOB: $scope.ManualCustomerDOB,
            ProductName: $scope.ManualProductName,
            ProductType: $scope.ManualProductType,
            StartDate: $scope.ManualStartDate,
            EndDate: $scope.ManualEndDate,
            PolicyIssueDate: $scope.ManualPolicyIssueDate,
            IsPospProduct: $scope.ManualIsPospProduct
        }
        var model = {
            URL: Domain + "/api/BusinessReport/OfflineHealthPolicy",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
            LoadPolicyFile("ManualOffline");
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
    $scope.ManualSelectedStateData = function (SelectState) {
        GetCities($scope.ManualSelectState);
    }
    $scope.uploadbulkData = function () {
        var GSTFile = $("#Bulkfile").get(0);
        var FileGST = GSTFile.files;
        var fileData = new FormData();
        GlobalUserID = $scope.userid;//userid == null ?  : userid;
        fileData.append(FileGST[0].name, FileGST[0]);
        fileData.append("Token", JsonWebToken.token);
        fileData.append("Domain", window.location.hostname.replace("https://", "").replace("http://", "").replace("www.", ""));
        fileData.append("Product", "HLT");
        fileData.append("url", Domain + '/api/BusinessReport/UploadBulkManualOfflineHLTBusiness');

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
    function LoadUser(tab) {
        if (tab == 'ManualOffline') {
            var dasLeadModel = {
                Token: JsonWebToken.token
            }
            var model = {
                URL: Domain + "/api/BusinessReport/OfflineUserListData",
                PostString: JSON.stringify(dasLeadModel)
            }
            $http.post(CallApiPostMethod, model).then(function (Response) {
                $scope.UserList = JSON.parse(Response.data);
                if (PolicyDetails) {
                    $scope.ManualselectUser = $scope.UserList.filter(row => row.userid == PolicyDetails.userID)[0];
                    $scope.ManualPolicytype = PolicyDetails.policytype;
                    $scope.ManualPlanName = PolicyDetails.planName;
                    $scope.ManualAdultCount = PolicyDetails.adultCount;
                    $scope.ManualChildCount = PolicyDetails.childCount;
                    $scope.ManualCustomerName = PolicyDetails.customerName;
                    $scope.ManualCustomerEmail = PolicyDetails.customerEmail;
                    $scope.ManualCustomerMobile = PolicyDetails.customerMobile;
                    $scope.ManualCustomerAddress = PolicyDetails.customerAddress;
                    $scope.ManualPincode = PolicyDetails.pincode;
                    $scope.ManualCustomerDOB = PolicyDetails.customerDOB;
                    $scope.ManualProductName = PolicyDetails.productName;
                    $scope.ManualProductType = PolicyDetails.productType;
                    $scope.ManualIsPospProduct = PolicyDetails.isPospProduct;
                    $scope.ManualInsuranceType = PolicyDetails.insuranceType;
                    $scope.ManualTotalPremium = PolicyDetails.totalPremium;
                    $scope.ManualTotalPremium = PolicyDetails.totalPremium;
                    $scope.ManualServiceTax = PolicyDetails.serviceTax;
                    $scope.ManualCoverAmount = PolicyDetails.coverAmount;
                    $scope.ManualBasePremium = PolicyDetails.basePremium;
                    $scope.ManualPolicyNo = PolicyDetails.policyNo;
                    $scope.ManualChecqueNo = PolicyDetails.checqueNo;
                    $scope.ManualChecqueBank = PolicyDetails.checqueBank;
                    $scope.ManualStartDate = PolicyDetails.startDate;
                    $scope.ManualEndDate = PolicyDetails.endDate;
                    $scope.ManualPolicyIssueDate = PolicyDetails.policyIssueDate;
                    $scope.ManualChecqueDate = PolicyDetails.checqueDate;
                    $scope.ManualSelectBusinessType = PolicyDetails.selectBusinessType;
                }
                GetInsurerList();
                GetStates();
            }, function (Response) {

            });
        }
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
            //alert(Response.statusText)
        });
    }
    function LoadOfflineData() {
        let qstr = new URLSearchParams(window.location.search);
        let qry = qstr.get("policyno");
        if (qry != null) {
            $("#manual").click();
            LoadUser('ManualOffline');
            var dasLeadModel = {
                Token: JsonWebToken.token,
                PolicyNo: qry,
                Product: "HLT"
            }
            var model = {
                URL: Domain + "/api/BusinessReport/GetPolicyInfo",
                PostString: JSON.stringify(dasLeadModel),
            }
            $http.post(CallApiPostMethod, model).then(function (Response) {
                PolicyDetails = JSON.parse(Response.data);
            }, function (Response) {
            });
        }
        var dasLeadModel = {
            Token: JsonWebToken.token
        }
        var model = {
            URL: Domain + "/api/BusinessReport/GetProcessHLTPaymentGetway",
            PostString: JSON.stringify(dasLeadModel)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            $scope.PayProcessList = JSON.parse(Response.data);
        }, function (Response) {
            //alert(Response.statusText)
        });
    }
    function GetInsurerList() {
        let body = {
            Token: JsonWebToken.token
        };
        let model = {
            URL: Domain + "/api/Master/GetInsurerCompanies",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (ResponseData) {
            $scope.InsurerList = JSON.parse(ResponseData.data).filter(row => row.healthInsurance == true)
            if (PolicyDetails) {
                $scope.ManualInsurer = $scope.InsurerList.filter(row => row.companyID == PolicyDetails.insurerID)[0];
            }
        }, function (ResponseData) {
        })
    }
    function LoadPolicyFile(SelectedTab) {
        let path = "OfflinePolicy"
        let URL = "";
        var GSTFile = null;
        var FileGST = null;
        var fileData = new FormData();
        if (SelectedTab == 'Offline') {
            URL = defaultpage + '/Business/UploadMissingPolicy';
            GSTFile = $("#file").get(0);
            FileGST = GSTFile.files[0];
        }
        else if (SelectedTab == 'ManualOffline') {
            URL = defaultpage + '/Business/OfflineManualPolicy';
            GSTFile = $("#manualfile").get(0);
            path = "ManualOffline";
            FileGST = GSTFile.files[0];
            fileData.append("FileName", $scope.ManualPolicyNo);
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
                } else {
                    alert(d.response);
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
        $http.post(CallApiPostMethod, model).then(function (ResponseData) {
            $scope.ManualSelectStateList = JSON.parse(ResponseData.data)
            if (PolicyDetails) {
                $scope.ManualSelectState = $scope.ManualSelectStateList.filter(row => row.stateID == PolicyDetails.selectState)[0];
                GetCities($scope.ManualSelectState);
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
            $scope.ManualSelectCityList = JSON.parse(ResponseData.data)
            if (PolicyDetails) {
                $scope.ManualSelectCity = $scope.ManualSelectCityList.filter(row => row.cityID == PolicyDetails.selectCity)[0];
            }
        }, function (ResponseData) {
        })
    }

    $scope.$watch("ManualCustomerDOB", function (newValue, oldValue) {
        $scope.ManualCustomerDOB = newValue || oldValue;
    });
    $scope.$watch("ManualStartDate", function (newValue, oldValue) {
        $scope.ManualStartDate = newValue || oldValue;
    });
    $scope.$watch("ManualEndDate", function (newValue, oldValue) {
        $scope.ManualEndDate = newValue || oldValue;
    });
    $scope.$watch("ManualPolicyIssueDate", function (newValue, oldValue) {
        $scope.ManualPolicyIssueDate = newValue || oldValue;
    });
    $scope.$watch("ManualChecqueDate", function (newValue, oldValue) {
        $scope.ManualChecqueDate = newValue || oldValue;
    });
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