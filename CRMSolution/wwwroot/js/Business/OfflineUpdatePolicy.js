var app = angular.module("app", []);
app.controller("OfflineBusiness", function ($scope, $http) {
    $scope.selectUser = null;
    $scope.MotorType = null;
    $scope.PolicyType = null;
    $scope.PolicyTypeList = ["Renew", "New", "Expired","RollOver"];
    $scope.BasicOD = null;
    $scope.BasicTP = null;
    $scope.GrossPremium = null;
    $scope.NetPremium = null;
    $scope.TotalPremium = null;
    $scope.ServiceTax = null;
    $scope.PolicyNo = null;
    $scope.Entrydate = null;
    $scope.EngineNo = null;
    $scope.ChesisNo = null;
    $scope.VehicleNo = null;
    $scope.IDV = null;
    $scope.Make = null;
    $scope.Model = null;
    $scope.Fuel = null;
    $scope.Variant = null;
    $scope.Insurer = null;
    $scope.InsurerList = [];
    $scope.SelectMakeList = [];
    $scope.SelectFuelList = [];
    $scope.ModelList = [];
    $scope.VariantList = [];
    $scope.CustomerEmail = null;
    $scope.CustomerMobile = null;

    $scope.UserList = null;
    $scope.SelectedTab = "Offline";
    $scope.selectPolicy = null;
    $scope.PayProcessList = null;
    $scope.ManufacturingMonth = null;
    $scope.ManufacturingMonthList = [];
    $scope.ManufacturingYear = null;
    $scope.ManufacturingYearList = [];
    $scope.MotorBusinessTypes = ["STP", "SOD", "Comprehensive"];
    $scope.NCBOptions = ["0", "20", "25", "30", "35", "45", "50"];

    $scope.PreviousNCB = null;
    $scope.CubicCapicity = null;
    $scope.SelectStateList = [];
    $scope.SelectState = null;
    $scope.SelectCityList = [];
    $scope.SelectCity = null;
    $scope.SelectRTOList = [];
    $scope.SelectRTO = null;
    $scope.NillDep = false;
    $scope.CustomerAddress = null;
    $scope.CustomerPhoneNo = null;
    $scope.CustomerPin = null;
    $scope.CustomerDOB = null;
    $scope.CustomerFax = null;
    $scope.CustomerPANNo = null;
    $scope.GrossDiscount = null;
    $scope.periodlist = [];
    $scope.IsPospProduct = false;
    $scope.InsuranceType = "B2B";
    $scope.AddOnPremium = null;
    $scope.MaxDOB = DateFormate(dayDurationFromCurrent(6570))
    $scope.Seating = null;
    //----Sunil----
    $scope.TotalTP = null;
    $scope.TotalOD = null;
    //--------
    var PolicyEndDate = null;
    var PincodeFetchData = null;
    var LoadPolicyEndDate = null;
    var PolicyStartDate = null;
    var PolicyIssuedate = null;
    var ChecqueDate = null;
    var CustomerDOB = null;    
    var PolicyDetails = null;
    var CurrentDomail = window.location.origin;
    let modal = JSON.parse(window.localStorage.getItem("token"));
    LoadOfflineData();
    function LoadOfflineData() {
        let querystring = new URLSearchParams(window.location.search);
        let qry = querystring.get("policyno");
        if (qry != null) {
            $("#manual").click();
            TabSelection('ManualOffline');
            var dasLeadModel = {
                Token: JsonWebToken.token,
                PolicyNo: qry,
                Product: "MOT"
            }
            var model = {
                URL: Domain + "/api/BusinessReport/GetPolicyInfo",
                PostString: JSON.stringify(dasLeadModel)
            }
            $http.post(CallApiPostMethod, model).then(function (Response) {
                PolicyDetails = JSON.parse(Response.data);
                $scope.PolicyType = PolicyDetails.policyType;
                $scope.MotorType = PolicyDetails.motorType
                GetVehicleList();
                policytypeandmotor();
                LoadModel();
            }, function (Response) {
            });
        }
        var dasLeadModel = {
            Token: JsonWebToken.token
        }
        var model = {
            URL: Domain + "/api/BusinessReport/GetProcessPaymentGetway",
            PostString: JSON.stringify(dasLeadModel)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            $scope.PayProcessList = JSON.parse(Response.data);
        }, function (Response) {
            ////alert(Response.statusText)	
        });	
    }
    $scope.SuccessPolicy = function () {
        event.preventDefault();
        successPolicy();
    }
    $scope.selectTab = function (tab) {
        TabSelection(tab)
    }
    $scope.selectMotor = function () {
        GetVehicleList()
        policytypeandmotor();
    }
    $scope.SelectMake = function (make) {
        GetFuels(make)
    }
    $scope.SelectVariants = function (Make, Fuel) {
        variants(Make, Fuel)
    }
    $scope.PolicyStartDateChange = function (model) {
        let dateformat = new Date(model)
        dateformat.setFullYear(dateformat.getFullYear() + 1);
        dateformat.setDate(dateformat.getDate() - 1);
        $scope.PolicyEndDate = ManageDate(dateformat);
        PolicyEndDate = $scope.PolicyEndDate;
        $("input[ng-model='PolicyEndDate']").focus()
    }
    $scope.uploadbulkData = function () {
        var GSTFile = $("#Bulkfile").get(0);
        var FileGST = GSTFile.files;
        var fileData = new FormData();
        GlobalUserID = $scope.userid;//userid == null ?  : userid;
        fileData.append(FileGST[0].name, FileGST[0]);
        fileData.append("Token", JsonWebToken.token);
        fileData.append("Domain", window.location.hostname.replace("https://", "").replace("http://", "").replace("www.", ""));
        fileData.append("Product", "Motor");
        fileData.append("url", Domain + '/api/BusinessReport/UploadBulkManualOfflineMotorBusiness');
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
    $scope.BulkPDFfile = function () {
        let path = "OfflinePolicy"
        var GSTFile = $("#BulkPDFfile").get(0);
        var FileGST = GSTFile.files;
        var fileData = new FormData();
        GlobalUserID = $scope.userid;//userid == null ?  : userid;	
        for (var i = 0; i < FileGST.length; i++) {
            fileData.append(FileGST[i].name.replace(".pdf", ""), FileGST[i]);
        }
        fileData.append("url", Domain + '/api/BusinessReport/ManualOffline');
        fileData.append("Doc", "ManualOffline");
        fileData.append("Token", JsonWebToken.token);
        fileData.append("Path", path);
        $.ajax({
            url: defaultpage + '/Business/OfflineManualBulkFile',
            type: 'POST',
            dataType: 'json',
            data: fileData,
            contentType: false,
            processData: false,
            success: function (d) {
                alert(d.Response);
            },
            error: function (er) {
                alert('Error!');
            }
        });
    }
    $scope.SelectedStateData = function (SelectState) {
        GetCities(SelectState);
    }
    $scope.selectedPolicy = function () {
        policytypeandmotor();
    }
    $scope.CheckPanValidation = function (TotalPremium) {
        if (parseFloat(TotalPremium) > 50000)
            $("input[ng-model='CustomerPANNo']").attr("required", "")
        else
            $("input[ng-model='CustomerPANNo']").removeAttr("required")
    }
    $scope.CustomerPinEvent = function () {
        if ($scope.CustomerPin.length >= 6) {
            var body = {
                Token: JsonWebToken.token,
                PinCode: parseInt($scope.CustomerPin)
            }
            var model = {
                URL: Domain + "/api/user/GetStateCity",
                PostString: JSON.stringify(body)
            }
            $http.post(CallApiPostMethod, model).then(function (Response) {
                PincodeFetchData = JSON.parse(Response.data);
                var data = $scope.SelectStateList.filter(row => row.statename.toLowerCase() == PincodeFetchData.state_Name.toLowerCase());
                if (data.length > 0) {
                    $scope.SelectState = data[0];
                    GetCities($scope.SelectState, 1);
                }
            }, function (Response) {
                ////alert(Response.statusText)	
            });
        }
    }
    //---Sunil---
    $scope.CalculatePremium = function (odtp) {
        if (odtp == "OD") {
            NetPremiumCalculationOD();
        }
        else {
            NetPremiumCalculationTP();
        }
    }
    //------
    $scope.CalculateGST = function () {
        $scope.TotalPremium = manageScope($scope.NetPremium) + manageScope($scope.ServiceTax);
    }
    $scope.RemoveSpecialChar = function (scopeModel) {
        $scope.PolicyNo = scopeModel.replace(/[^a-zA-Z0-9]/g, '');
    }
    function TabSelection(tab) {
        $scope.SelectedTab = tab;
        $scope.MotorType = null;
        if (tab == 'ManualOffline') {
            //$scope.MotorType = "PrivateCar";	
            MonthList();
            $scope.PolicyType = "Renew";
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
                    $scope.selectUser = $scope.UserList.filter(row => row.userid == PolicyDetails.userID)[0];
                }
                GetInsurerList();
                GetStates();
            }, function (Response) {
                ////alert(Response.statusText)	
            });
        }
    }
    function policytypeandmotor() {
        $scope.periodlist = [];
        if ($scope.PolicyType == "New" && $scope.MotorType == "PrivateCar") {
            $scope.periodlist.push({ year: 1, period: "1 Year" });
            $scope.periodlist.push({ year: 3, period: "3 Year" });
        }
        else if ($scope.PolicyType == "New" && $scope.MotorType == "TwoWheeler") {
            $scope.periodlist.push({ year: 1, period: "1 Year" });
            $scope.periodlist.push({ year: 5, period: "5 Year" });
        }
        else
            $scope.periodlist.push({ year: 1, period: "1 Year" });
        if (PolicyDetails) {
            $scope.SelectPeriod = $scope.periodlist.filter(row => row.year == PolicyDetails.period)[0];
        }
    }
    function GetFuels(ManufacModel) {
        let Url = "";
        let endpoint = ""
        //endpoint = "/centralapi/api/Vehicle/GetFuelByVehicleID/" + ManufacModel.VehicleID;
        endpoint = "/api/Vehicle/GetFuelByVehicleID/" + ManufacModel.VehicleID;
        Url = CurrentDomail + endpoint;
        var model = {
            URL: Url
        };
        $http.post(CallApiGetMethod, model).then(function (ResponseData) {
            $scope.SelectFuelList = JSON.parse(ResponseData.data)
            if (PolicyDetails) {
                $scope.Fuel = $scope.SelectFuelList.filter(row => row.FuelID == PolicyDetails.fuel)[0];
                variants(ManufacModel, $scope.Fuel)
            }
        }, function (ResponseData) {
        })
    }
    function variants(ManufacModel, Fuel) {
        let Url = "";
        let endpoint = ""
        //endpoint = "/centralapi/api/Vehicle/GetVariantsByVehicleAndFuel?VehicleID=" + ManufacModel.VehicleID + "&FuelID=" + Fuel.FuelID;
        endpoint = "/api/Vehicle/GetVariantsByVehicleAndFuel?VehicleID=" + ManufacModel.VehicleID + "&FuelID=" + Fuel.FuelID;
        Url = CurrentDomail + endpoint;
        var model = {
            URL: Url
        };
        $http.post(CallApiGetMethod, model).then(function (ResponseData) {
            $scope.VariantList = JSON.parse(ResponseData.data);
            if (PolicyDetails) {
                $scope.Variant = $scope.VariantList.filter(row => row.VariantID == PolicyDetails.variant)[0];
            }
        }, function (ResponseData) {
        });
    }
    function successPolicy() {
        debugger;
        $scope.PolicyEndDate = PolicyEndDate;
        if ($scope.CustomerEmail == null && $scope.CustomerMobile == null) {
            alert("Customer Email or Customer Mobile no required.")
            return
        }
        else {
            var exist = mobileValidation.filter(row => row == $scope.CustomerMobile.trim());
            if ($scope.CustomerMobile.trim() == "" || exist.length > 0 || $scope.CustomerMobile.trim()[0] == "0") {
                alert("Inter valid Mobile number.")
                return
            }
        }
        let body = {
            Token: JsonWebToken.token,
            BasicOD: parseFloat($scope.BasicOD),
            BasicTP: parseFloat($scope.BasicTP),
            GrossPremium: parseFloat($scope.GrossPremium),
            //NetPremium: 0,//parseFloat($scope.NetPremium),
            NetPremium: parseFloat($scope.NetPremium),
            TotalPremium: parseFloat($scope.TotalPremium),
            ServiceTax: parseFloat($scope.ServiceTax),
            PolicyNo: $scope.PolicyNo,
            EngineNo: $scope.EngineNo,
            ChesisNo: $scope.ChesisNo,
            VehicleNo: $scope.VehicleNo,
            IDV: parseFloat($scope.IDV)
        }
        let url = "/api/BusinessReport/OfflineUpdatePolicy";
        if ($scope.SelectedTab == 'Offline') {
            body.MotorID = $scope.selectPolicy.motorID;
            body.UserID = $scope.selectPolicy.custUserID;
            body.MotorType = $scope.selectPolicy.motorType;
            body.PolicyType = $scope.selectPolicy.policytype;
        }
        else if ($scope.SelectedTab == 'ManualOffline') {
            url = "/api/BusinessReport/ManualUploadOflineBusiness";
            body.UserID = $scope.selectUser.userid;
            body.MotorType = $scope.MotorType;
            body.PolicyType = $scope.PolicyType;
            body.Insurer = $scope.Insurer.companyID;
            body.PolicyType = $scope.PolicyType;
            body.MotorType = $scope.MotorType;
            body.Make = $scope.Make.ManufacturerID;
            body.Vehicle = $scope.Make.VehicleID;
            body.Fuel = $scope.Fuel.FuelID;
            body.Variant = $scope.Variant.VariantID;
            body.ManufacturingMonth = ($scope.ManufacturingMonth.month +1);
            body.ManufacturingYear = ($scope.ManufacturingYear.year);
            body.CustomerName = $scope.CustomerName;
            body.PolicyIssuedate = $scope.PolicyIssuedate == undefined ? ManageDate(PolicyIssuedate) : ManageDate($scope.PolicyIssuedate);
            body.PolicyStartDate = $scope.PolicyStartDate == undefined ? ManageDate(PolicyStartDate) : ManageDate($scope.PolicyStartDate);
            body.PolicyEndDate = PolicyEndDate == undefined || PolicyEndDate == "NaN-NaN-NaN" ? ManageDate(LoadPolicyEndDate) : ManageDate(PolicyEndDate);
            body.BusinessType = $scope.BusinessType;
            body.NCB = parseInt($scope.NCB);
            body.ChecqueNo = $scope.ChecqueNo;
            body.ChecqueDate = $scope.ChecqueDate == undefined ? ManageDate(ChecqueDate) : ManageDate($scope.ChecqueDate);
            body.ChecqueBank = $scope.ChecqueBank;
            body.CustomerEmail = $scope.CustomerEmail;
            body.CustomerMobile = $scope.CustomerMobile;
            body.PreviousNCB = parseInt($scope.PreviousNCB);
            //body.CubicCapicity = $scope.CubicCapicity;
            body.SelectRTO = $scope.SelectRTO.rtoid;
            body.PrevPolicyNO = $scope.PrevPolicyNO;
            body.CPA = parseFloat($scope.CPA);
            body.NillDep = $scope.NillDep;
            body.CustomerAddress = $scope.CustomerAddress;
            body.CustomerPhoneNo = $scope.CustomerPhoneNo;
            body.CustomerPin = $scope.CustomerPin;
            body.CustomerDOB = $scope.CustomerDOB == undefined ? ManageDate(CustomerDOB) : ManageDate($scope.CustomerDOB);
            body.CustomerFax = $scope.CustomerFax;
            body.CustomerPANNo = $scope.CustomerPANNo;
            body.GrossDiscount = parseFloat($scope.GrossDiscount);
            body.CustomerCityID = $scope.SelectCity.cityID;
            body.Period = $scope.SelectPeriod == null ? 0 : parseInt($scope.SelectPeriod.year);
            body.InsuranceType = $scope.InsuranceType;
            body.IsPospProduct = $scope.IsPospProduct;
            body.SeatingCapacity = $scope.Seating == null ? 0 : parseInt($scope.Seating);
            body.AddOnPremium = $scope.AddOnPremium == null ? $scope.AddOnPremium : parseFloat($scope.AddOnPremium);
        }
        var model = {
            URL: Domain + url,
            PostString: JSON.stringify(body)
        }
        
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
            if (Response.data.includes("Successfully")) {
                ReleaseObj();
                LoadPolicyFile(body.PolicyNo);
            }
        }, function (Response) {
            ////alert(Response.statusText)
        });
        
        //LoadPolicyFile();
    }
    function LoadPolicyFile(PolicyNo) {
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
            URL = defaultpage +'/Business/OfflineManualPolicy';
            GSTFile = $("#manualfile").get(0);
            path = "ManualOffline";
            FileGST = GSTFile.files[0];
            fileData.append("FileName", PolicyNo);
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
    function GetVehicleList() {
        let param = $scope.MotorType == "PrivateCar" ? "Car" : "Two Wheeler";
        let Url = "";
        //let endpoint = "/centralapi/api/Vehicle/GetVehiclesByType?type=" + param;
        let endpoint = "/api/Vehicle/GetVehiclesByType?type=" + param;
        Url = CurrentDomail + endpoint;
        var model = {
            URL: Url
        };
        $http.post(CallApiGetMethod, model).then(function (ResponseData) {
            $scope.SelectMakeList = JSON.parse(ResponseData.data)
            if (PolicyDetails) {
                $scope.Make = $scope.SelectMakeList.filter(row => row.ManufacturerID == PolicyDetails.make && row.VehicleID == PolicyDetails.vehicle)[0];
                GetFuels($scope.Make)
            }
        }, function (ResponseData) {
        })
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
            $scope.InsurerList = JSON.parse(ResponseData.data).filter(row => row.carInsurance == true || row.twowheelerInsurance == true)
            if (PolicyDetails) {
                $scope.Insurer = $scope.InsurerList.filter(row => row.companyID == PolicyDetails.insurer)[0];
            }
        }, function (ResponseData) {
        })
    }
    function ManageDate(date) {
        let datadate = new Date(date);
        let mon = (datadate.getMonth() + 1) < 10 ? "0" + (datadate.getMonth() + 1) : (datadate.getMonth() + 1);
        let day = (datadate.getDate()) < 10 ? "0" + (datadate.getDate()) : (datadate.getDate());
        let yr = datadate.getFullYear();
        let combinedate = yr + "-" + mon + "-" + day;
        return combinedate;
    }
    function ReleaseObj() {
        $scope.ManufacturingMonth = $scope.ManufacturingMonthList[0];
        $scope.ManufacturingYear = $scope.ManufacturingYearList[0];
        $scope.CustomerName = null;
        $scope.BusinessType = null;
        $scope.NCB = null;
        $scope.ChecqueNo = null;
        $scope.ChecqueBank = null;
        $scope.BasicOD = null;
        $scope.BasicTP = null;
        $scope.GrossPremium = null;
        $scope.NetPremium = null;
        $scope.TotalPremium = null;
        $scope.ServiceTax = null;
        $scope.PolicyNo = null;
        $scope.EngineNo = null;
        $scope.ChesisNo = null;
        $scope.VehicleNo = null;
        $scope.IDV = null;
        //document.getElementById("manualfile").value = null;
        $scope.selectUser = null;
        $scope.Insurer = null;
        $scope.PolicyType = "Renew";
        $scope.MotorType = null;
        $scope.Make = null;
        $scope.Fuel = null;
        $scope.Variant = null;
        $scope.PolicyIssuedate = null;
        $scope.PolicyStartDate = null;
        $scope.PolicyEndDate = null;
        $scope.ChecqueDate = null;
        $scope.CustomerEmail = null;
        $scope.CustomerMobile = null;
        PolicyEndDate = null;
        LoadPolicyEndDate = null;
        PolicyStartDate = null;
        PolicyIssuedate = null;
        ChecqueDate = null;
        CustomerDOB = null;
        $("#select2-UserActive-container").text("Select User");
    }
    function MonthList() {
        for (var i = 0; i < mont.length; i++) {
            $scope.ManufacturingMonthList.push({ month: i, monthname: mont[i] });
        }
        $scope.ManufacturingMonth = $scope.ManufacturingMonthList[0];
        var date = new Date();
        for (var i = date.getFullYear(); i > date.getFullYear()-22; i--) {
            $scope.ManufacturingYearList.push({ year: i, yearname: i });
        }
        $scope.ManufacturingYear = $scope.ManufacturingYearList[0];
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
            $scope.SelectStateList = JSON.parse(ResponseData.data)
            if (PolicyDetails) {
                body.CityID = PolicyDetails.customerCityID;
                model.URL = Domain + "/api/BusinessReport/GetStateThroughCityID";
                model.PostString = JSON.stringify(body);
                $http.post(CallApiPostMethod, model).then(function (ResponseData) {
                    let resModel = JSON.parse(ResponseData.data);
                    $scope.SelectState = $scope.SelectStateList.filter(row => row.stateID == resModel.stateID)[0];
                    GetCities($scope.SelectState)
                })
            }
            GetRTOs();
        }, function (ResponseData) {
        })
    }
    function GetCities(SelectState, opt) {
        let body = {
            Token: JsonWebToken.token,
            StateID: parseInt(SelectState.stateID)
        };
        let model = {
            URL: Domain + "/api/BusinessReport/GetCityList",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (ResponseData) {
            $scope.SelectCityList = JSON.parse(ResponseData.data)
            if (opt == 1) {
                var data = $scope.SelectCityList.filter(row => row.cityName.toLowerCase() == PincodeFetchData.district_Name.toLowerCase());
                if (data.length > 0) {
                    $scope.SelectCity = data[0];
                }
            }
            if (PolicyDetails) {
                $scope.SelectCity = $scope.SelectCityList.filter(row => row.cityID == PolicyDetails.customerCityID)[0];
            }
        }, function (ResponseData) {
        })
    }
    function GetRTOs() {
        let body = {
            Token: JsonWebToken.token
        };
        let model = {
            URL: Domain + "/api/BusinessReport/GetRTOList",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (ResponseData) {
            $scope.SelectRTOList = JSON.parse(ResponseData.data)
            if (PolicyDetails) {
                $scope.SelectRTO = $scope.SelectRTOList.filter(row => row.rtoid == PolicyDetails.rtoid)[0];
            }
        }, function (ResponseData) {
        })
    }
    function LoadModel() {
        //if (PolicyDetails) {
        //    $scope.VehicleNo = PolicyDetails.vehicleNo;
        //}
        $scope.VehicleNo = PolicyDetails.vehicleNo;
        LoadPolicyEndDate = PolicyDetails.policyEndDate.substring(0, 10);
        PolicyStartDate = PolicyDetails.policyStartDate.substring(0, 10);
        PolicyIssuedate = PolicyDetails.policyIssuedate.substring(0, 10);
        $scope.PolicyIssuedate = PolicyDetails.policyIssuedate.substring(0, 10);
        $scope.PolicyStartDate = PolicyDetails.policyStartDate.substring(0, 10);
        $scope.PolicyEndDate = PolicyDetails.policyEndDate.substring(0, 10);
        $scope.BusinessType = PolicyDetails.businessType;
        $scope.PreviousNCB = PolicyDetails.previousNCB;
        $scope.NCB = PolicyDetails.ncb;//.toString() //== 0 ? null : PolicyDetails.ncb;
        $scope.EngineNo = PolicyDetails.engineNo;
        $scope.ChesisNo = PolicyDetails.chesisNo;
        $scope.ManufacturingMonth = $scope.ManufacturingMonthList.filter(row => row.month == PolicyDetails.manufacturingMonth)[0];
        $scope.ManufacturingYear = $scope.ManufacturingYearList.filter(row => row.year == PolicyDetails.manufacturingYear)[0];
        $scope.CubicCapicity = PolicyDetails.cubicCapicity;
        $scope.PrevPolicyNO = PolicyDetails.prevPolicyNO;
        $scope.CPA = PolicyDetails.cpa;
        $scope.InsuranceType = PolicyDetails.insuranceType
        $scope.AddOnPremium = PolicyDetails.addOnPremium;
        $scope.NillDep = PolicyDetails.nillDep == null ? false : PolicyDetails.nillDep
        $scope.IsPospProduct = PolicyDetails.isPospProduct == null ? false : PolicyDetails.isPospProduct;
        $scope.CustomerName = PolicyDetails.customerName
        $scope.CustomerEmail = PolicyDetails.customerEmail
        $scope.CustomerEmail = PolicyDetails.customerEmail;
        $scope.CustomerMobile = PolicyDetails.customerMobile;
        $scope.CustomerAddress = PolicyDetails.customerAddress;
        $scope.CustomerPhoneNo = PolicyDetails.customerMobile;
        $scope.CustomerPin = PolicyDetails.customerPinCode;
        $scope.CustomerDOB = PolicyDetails.customerDOB.substring(0, 10);
        CustomerDOB = PolicyDetails.customerDOB.substring(0, 10);
        $scope.CustomerFax = PolicyDetails.customerFax;
        $scope.CustomerPANNo = PolicyDetails.customerPANNo;
        ChecqueDate = PolicyDetails.checqueDate.substring(0, 10);
        $scope.ChecqueDate = PolicyDetails.checqueDate.substring(0, 10);
        $scope.ChecqueNo = PolicyDetails.checqueNo;
        $scope.ChecqueBank = PolicyDetails.checqueBank;
        $scope.BasicOD = PolicyDetails.basicOD;
        $scope.BasicTP = PolicyDetails.basicTP;
        $scope.NetPremium = PolicyDetails.netPremium;
        $scope.TotalPremium = PolicyDetails.totalPremium;
        $scope.ServiceTax = PolicyDetails.serviceTax;
        $scope.ServiceTax = PolicyDetails.serviceTax;
        $scope.PolicyNo = PolicyDetails.policyNo;
        $scope.IDV = PolicyDetails.idv;
        $scope.GrossDiscount = PolicyDetails.grossDiscount;
        $scope.Seating = PolicyDetails.seatingCapacity;
    }
    //-------------Sunil-----------
    function NetPremiumCalculationOD() {
        debugger;
        let Od = manageScope($scope.BasicOD);
        let addon = manageScope($scope.AddOnPremium);
        $scope.TotalOD = Od + addon;
        $scope.NetPremium = manageScope($scope.TotalOD) + manageScope($scope.TotalTP);
    }
    function NetPremiumCalculationTP() {
        debugger;
        let tp = manageScope($scope.BasicTP);
        let cp = manageScope($scope.CPA);
        $scope.TotalTP = tp + cp;
        $scope.NetPremium = manageScope($scope.TotalOD) + manageScope($scope.TotalTP);
    }
    //------------------------

    function manageScope(obj) {
        let value = 0;
        if (!isNaN(obj) && obj) {
            value = parseFloat(obj);
        }
        //let value = obj == null ? 0 : parseFloat(obj);
        return value
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