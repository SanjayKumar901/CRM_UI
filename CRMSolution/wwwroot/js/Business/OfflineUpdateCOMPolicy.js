var app = angular.module("app", []);
app.controller("OfflineBusiness", function ($scope, $http) {
    $scope.selectUser = null;
    $scope.MotorType = null;
    $scope.PolicyType = null;
    $scope.PolicyTypeList = ["Renew", "New", "Expired", "RollOver"];
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
    $scope.PolicyDetails = {};
    $scope.CustomerAddress = null;
    $scope.CustomerPin = null;
    $scope.SelectState = null;
    $scope.SelectCity = null;
    $scope.StateList = null;
    $scope.CityList = null;

    var PincodeFetchData = null;
    var policyIssueDate = null;
    var policyStartDate
    var policyEndDate
    var checqueDate
    //var PolicyDetails = null;
    var CurrentDomail = "https://www.riskoveryinsurance.com/commercial"//window.location.origin;
    let modal = JSON.parse(window.localStorage.getItem("token"));
    GetInsurerList();
    MonthList();
    GetStates();
    LoadOfflineData();

    function LoadOfflineData() {
        let querystring = new URLSearchParams(window.location.search);
        let qry = querystring.get("policyno");

        if (qry != null) {
            $("#manual").click();
            TabSelection('ManualOffline')
            var dasLeadModel = {
                Token: JsonWebToken.token,
                PolicyNo: qry,
                Product: "COM"
            }
            var model = {
                URL: Domain + "/api/BusinessReport/GetPolicyInfo",
                PostString: JSON.stringify(dasLeadModel)
            }
            $http.post(CallApiPostMethod, model).then(function (Response) {
                var PolicyDetails = JSON.parse(Response.data);
                $scope.PolicyDetails = JSON.parse(Response.data);
                $scope.PolicyType = PolicyDetails.policyType;
                $scope.MotorType = PolicyDetails.motorType
                GetVehicleList(PolicyDetails.motorType);
                //policytypeandmotor();
                LoadCOMModel(PolicyDetails);
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
    function TabSelection(tab) {
        $scope.SelectedTab = tab;
        $scope.MotorType = null;
        if (tab == 'ManualOffline') {
            //$scope.MotorType = "PrivateCar";
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
                if ($scope.PolicyDetails) {
                    $scope.selectUser = $scope.UserList.filter(row => row.userid == $scope.PolicyDetails.userID)[0];
                }
            }, function (Response) {
                ////alert(Response.statusText)
            });
        }
    }
    $scope.selectMotor = function (MotorType) {
        //GetInsurerList(MotorType)
        GetVehicleList(MotorType)


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
    function GetFuels(ManufacModel) {
        let Url = "";
        let endpoint = "";
        endpoint = "/api/api/Vehicle/GetFuelByVehicleIDAndCompany?id=" + ManufacModel.CombindID.trim();
        Url = CurrentDomail + endpoint;
        var model = {
            URL: Url
        };
        $http.post(CallApiGetMethod, model).then(function (ResponseData) {
            $scope.SelectFuelList = JSON.parse(ResponseData.data)
            if ($scope.PolicyDetails) {
                $scope.Fuel = $scope.SelectFuelList.filter(row => row.FuelID == $scope.PolicyDetails.fuel)[0];
                variants(ManufacModel, $scope.Fuel)
            }
        }, function (ResponseData) {
        })
    }
    function variants(ManufacModel, Fuel) {
        let Url = "";
        let endpoint = "";
        // endpoint = "/api/Vehicle/GetVariantsByVehicleAndFuel?VehicleID=" + ManufacModel.VehicleID + "&FuelID=" + Fuel.FuelID;
        endpoint = "/api/api/Vehicle/GetVariantsByVehicleAndFuelAndCompany?VehicleID=" + ManufacModel.CombindID + "&FuelID=" + Fuel.CombindID;

        Url = CurrentDomail + endpoint;
        var model = {
            URL: Url
        };
        $http.post(CallApiGetMethod, model).then(function (ResponseData) {
            $scope.VariantList = JSON.parse(ResponseData.data)
            if ($scope.PolicyDetails) {
                $scope.Variant = $scope.VariantList.filter(row => row.VariantID == $scope.PolicyDetails.variant)[0];
            }
        }, function (ResponseData) {
        })
    }
    $scope.$watch("PolicyIssuedate", function (newValue, oldValue) {
        policyIssueDate = newValue || oldValue;
    });
    $scope.$watch("PolicyStartDate", function (newValue, oldValue) {
        policyStartDate = newValue || oldValue;
    });
    $scope.$watch("PolicyEndDate", function (newValue, oldValue) {
        policyEndDate = newValue || oldValue;
    });
    $scope.$watch("ChecqueDate", function (newValue, oldValue) {
        checqueDate = newValue || oldValue;
    });

    function successPolicy() {
        // $scope.PolicyEndDate = PolicyEndDate;
        if ($scope.CustomerEmail == null && $scope.CustomerMobile == null) {
            alert("Customer Email or Customer Mobile no required.")
            return
        }
        let body = {
            Token: JsonWebToken.token,
            BasicOD: parseFloat($scope.BasicOD),
            BasicTP: parseFloat($scope.BasicTP),
            GrossPremium: parseFloat($scope.GrossPremium),
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
            body.ManufacturingMonth = ($scope.ManufacturingMonth.month + 1);
            body.ManufacturingYear = ($scope.ManufacturingYear.year);
            body.CustomerName = $scope.CustomerName;
            body.PolicyIssuedate = ManageDate(policyIssueDate); //ManageDate($scope.PolicyIssuedate);
            body.PolicyStartDate = ManageDate(policyStartDate);
            body.PolicyEndDate = ManageDate(policyEndDate);
            body.BusinessType = $scope.BusinessType;
            body.NCB = parseInt($scope.NCB);
            body.ChecqueNo = $scope.ChecqueNo;
            body.ChecqueDate = ManageDate(checqueDate);
            body.ChecqueBank = $scope.ChecqueBank;
            body.CustomerEmail = $scope.CustomerEmail;
            body.CustomerMobile = $scope.CustomerMobile;
            body.SeatingCapacity = parseInt($scope.Seating);
            body.GVW = $scope.GVW;
            body.CustomerCityID = $scope.SelectCity.cityID;
            body.CustomerAddress = $scope.CustomerAddress;
            body.CustomerPin = $scope.CustomerPin;
        }
        var model = {
            URL: Domain + url,
            PostString: JSON.stringify(body)
        }

        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
            if (Response.data.includes("Successfully")) {
                ReleaseObj();
                LoadPolicyFile();
            }
        }, function (Response) {
            ////alert(Response.statusText)
        });

        //LoadPolicyFile();
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
            fileData.append("FileName", $scope.PolicyNo);
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
    function GetVehicleList(MotorType) {
        let CompID = $scope.Insurer == "HDFC" ? 103 : 124;
        let type = MotorType;
        let Url = "";
        let endpoint = "/api/api/Vehicle/GetVehiclesByTypeAndCompany?type=" + type + "&Compid=" + CompID;
        Url = CurrentDomail + endpoint;
        var model = {
            URL: Url
        };
        $http.post(CallApiGetMethod, model).then(function (ResponseData) {
            $scope.SelectMakeList = JSON.parse(ResponseData.data)
            if ($scope.PolicyDetails) {
                $scope.Make = $scope.SelectMakeList.filter(row => row.ManufacturerID == $scope.PolicyDetails.make && row.VehicleID == $scope.PolicyDetails.vehicle)[0];
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
            if ($scope.PolicyDetails) {
                $scope.Insurer = $scope.InsurerList.filter(row => row.companyID == $scope.PolicyDetails.insurer)[0];
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
        $("#select2-UserActive-container").text("Select User");
    }
    function MonthList() {
        for (var i = 0; i < mont.length; i++) {
            $scope.ManufacturingMonthList.push({ month: i, monthname: mont[i] });
        }
        $scope.ManufacturingMonth = $scope.ManufacturingMonthList[0];
        var date = new Date();
        for (var i = date.getFullYear(); i > date.getFullYear() - 10; i--) {
            $scope.ManufacturingYearList.push({ year: i, yearname: i });
        }
        $scope.ManufacturingYear = $scope.ManufacturingYearList[0];
    }
    function LoadCOMModel(PolicyDetails) {
        debugger;
        $scope.VehicleNo = PolicyDetails.vehicleNo;
        //LoadPolicyEndDate = PolicyDetails.policyEndDate.substring(0, 10);
        //PolicyStartDate = PolicyDetails.policyStartDate.substring(0, 10);
        //PolicyIssuedate = PolicyDetails.policyIssuedate.substring(0, 10);
        $scope.PolicyIssuedate = PolicyDetails.policyIssuedate;//.substring(0, 10);
        $scope.PolicyStartDate = PolicyDetails.policyStartDate;//.substring(0, 10);
        $scope.PolicyEndDate = PolicyDetails.policyEndDate;//.substring(0, 10);
        $scope.BusinessType = PolicyDetails.businessType;
        $scope.PreviousNCB = PolicyDetails.previousNCB;
        $scope.NCB = PolicyDetails.ncb;
        $scope.EngineNo = PolicyDetails.engineNo;
        $scope.ChesisNo = PolicyDetails.chesisNo;
        $scope.ManufacturingMonth = $scope.ManufacturingMonthList.filter(row => row.month == PolicyDetails.manufacturingMonth)[0];
        $scope.ManufacturingYear = $scope.ManufacturingYearList.filter(row => row.year == PolicyDetails.manufacturingYear)[0];
        $scope.CubicCapicity = PolicyDetails.cubicCapicity;
        $scope.PrevPolicyNO = PolicyDetails.prevPolicyNO;
        $scope.CPA = PolicyDetails.cpa;
        $scope.InsuranceType = PolicyDetails.insuranceType;
        $scope.AddOnPremium = PolicyDetails.addOnPremium;
        $scope.NillDep = PolicyDetails.nillDep == null ? false : PolicyDetails.nillDep
        $scope.IsPospProduct = PolicyDetails.isPospProduct == null ? false : PolicyDetails.isPospProduct;
        $scope.CustomerName = PolicyDetails.customerName
        $scope.CustomerEmail = PolicyDetails.customerEmail
        $scope.CustomerMobile = PolicyDetails.customerMobile;
        $scope.CustomerAddress = PolicyDetails.customerAddress;
        $scope.CustomerPhoneNo = PolicyDetails.customerMobile;
        $scope.CustomerPin = PolicyDetails.customerPinCode;
        // $scope.CustomerDOB = PolicyDetails.customerDOB.substring(0, 10);
        // CustomerDOB = PolicyDetails.customerDOB.substring(0, 10);
        $scope.CustomerFax = PolicyDetails.customerFax;
        $scope.CustomerPANNo = PolicyDetails.customerPANNo;
        ChecqueDate = PolicyDetails.checqueDate;//.substring(0, 10);
        $scope.ChecqueDate = PolicyDetails.checqueDate;//.substring(0, 10);
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
        $scope.GVW = PolicyDetails.gvw;
        //$scope.insurer = PolicyDetails.insurer;
        $scope.Insurer = $scope.InsurerList.filter(row => row.companyID == $scope.PolicyDetails.insurer)[0];
    }

    $scope.SelectedStateData = function (SelectState) {
        GetCities(SelectState);
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
    function GetStates() {
        let body = {
            Token: JsonWebToken.token
        };
        let model = {
            URL: Domain + "/api/BusinessReport/GetStateList",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (ResponseData) {
            $scope.StateList = JSON.parse(ResponseData.data)
            if (PolicyDetails) {
                $scope.SelectState = $scope.StateList.filter(row => row.stateID == PolicyDetails.stateID)[0];
                GetCities($scope.SelectState);
            }
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


