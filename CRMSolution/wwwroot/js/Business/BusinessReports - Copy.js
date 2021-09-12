var app = angular.module("app", []);
app.controller("BusinessMaster", function ($scope, $http) {
    //****************Global Var**************************
    var math = Math;
    $scope.sumbusiness = 0;
    $scope.Math = math;
    $scope.IsAfterQuotePopup = false;
    $scope.IsHltAfterQuotePopup = false;
    $scope.IsDownload = false;
    $scope.IsEditDelRight = false;
    var StartDate = null;
    var EndDate = null;
    var TabOption = "Motor";
    //*********************END****************************
    //*********************Global Function****************
    CheckDownloadPriority();
    $scope.tab = function (OPtion) {
        TabOption = OPtion;
        CallBusiness(StartDate, EndDate)
    }
    $scope.ShowDetails = function (option, enq) {
        if (option == "HLT") {
            $scope.IsHltAfterQuotePopup = true;
        }
        else if (option == "CAR") {
            $scope.IsAfterQuotePopup = true;
        }
        var body = {
            Token: JsonWebToken.token,
            EnquiryNo: enq,
            Product: option,
            Action: "afterquote"
        };
        var model = {
            URL: Domain + "/api/Home/QuetationInfo",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (ResponseData) {
            $scope.AfterQuoteEnquiryInfo = JSON.parse(ResponseData.data);
        }, function (Response) {
            ////alert(Response.statusText)
        });
    }
    $scope.CloseEnquiryInfo = function () {
        $scope.IsAfterQuotePopup = false;
        $scope.IsHltAfterQuotePopup = false;
    }
    function CallBusiness(start, end) {
        $(".Tableloader").show();
        if (TabOption == null || TabOption == "Motor") {
            GetBusinessReport(start, end)
        }
        else if (TabOption == "Heath") {
            GetHealthBusinessReport(start, end)
            HltTotalTodyaDetails();
        }
        else if (TabOption == "GCVPCV") {
            GetGCVPCVBusinessReport(start, end)
            TotalTodyaDetails("GCVPCV");;
        }
        else if (TabOption == "manualOffline") {
            ManualOfflineBusinessReport(start, end)
            //TotalTodyaDetails("GCVPCV");;
        }
        else if (TabOption == "manualOfflinehlt") {
            ManualOfflinehltBusinessReport(start, end)
            //TotalTodyaDetails("GCVPCV");;
        }
        else if (TabOption == "Life") {
            OfflineLifeBusinessReport(start, end)
        }
    }
    
    function BindtypeData(url, body, scope) {
        $http.post(url, body).then(function (Response) {
            $(".Tableloader").hide();
            try {
                $scope[scope] = JSON.parse(Response.data);
            }
            catch (ex) { }
            if (scope == "TotalTodayData") {
                $scope.TotalBusiness = $scope.TotalTodayData.totalCollection;
                $scope.TotalNop = $scope.TotalTodayData.totalNOP;
                $scope.TodayBusiness = $scope.TotalTodayData.todayCollection;
                $scope.TodayNop = $scope.TotalTodayData.todayNoPS;
            }
            if (scope == "GCVPCVTotalTodayData") {
                $scope.TotalGCVBusiness = $scope.GCVPCVTotalTodayData.totalCollection;
                $scope.TotalGCVNop = $scope.GCVPCVTotalTodayData.totalNOP;
                $scope.TodayGCVBusiness = $scope.GCVPCVTotalTodayData.todayCollection;
                $scope.TodayGCVNop = $scope.GCVPCVTotalTodayData.todayNoPS;
            }
            else if (scope == "BusinessReport") {
                $scope.sumbusiness = 0;
                $scope.BusinessMasterReport = JSON.parse(Response.data);
                for (let i = 0; i < $scope.BusinessMasterReport.length; i++) {
                    $scope.sumbusiness += $scope.BusinessMasterReport[i].paidAmount
                }
            }
            else if (scope == "DownloadReport") {
                window.open(Response.data, "_blank");
            }
            else if (scope == "HealthBusinessReport") {
                $scope.sumbusiness = 0;
                $scope.HealthBusinessMasterReport = JSON.parse(Response.data);
                for (let i = 0; i < $scope.HealthBusinessMasterReport.length; i++) {
                    $scope.sumbusiness += $scope.HealthBusinessMasterReport[i].totalPremium
                }
            }
            else if (scope == "GCVPCVBusinessReport") {
                $scope.sumbusiness = 0;
                $scope.GCVPCVBusinessMasterReport = JSON.parse(Response.data);
                for (let i = 0; i < $scope.GCVPCVBusinessMasterReport.length; i++) {
                    $scope.sumbusiness += $scope.GCVPCVBusinessMasterReport[i].paidAmount
                }
            }
            else if (scope == "ManualOfflineBusinessList") {
                $scope.sumbusiness = 0;
                $scope.ManualOfflineBusinessList = JSON.parse(Response.data);
                $scope.ManualOfflineBusinessListMaster = JSON.parse(Response.data);
                for (let i = 0; i < $scope.ManualOfflineBusinessList.length; i++) {
                    $scope.sumbusiness += $scope.ManualOfflineBusinessListMaster[i].totalPremium
                }
            }
            else if (scope == "ManualOfflineHLTBusinessList") {
                $scope.sumbusiness = 0;
                $scope.ManualOfflineHLTBusinessList = JSON.parse(Response.data);
                $scope.ManualOfflineHLTBusinessListMaster = JSON.parse(Response.data);
                for (let i = 0; i < $scope.ManualOfflineHLTBusinessList.length; i++) {
                    $scope.sumbusiness += $scope.ManualOfflineHLTBusinessList[i].totalPremium
                }
            }
                /*
                 By: Sunil on 23 Aug 2021
                 */
            else if (scope == "OfflineLifePolicyReport") {
                $scope.sumbusiness = 0;
                $scope.LifeBusinessList = JSON.parse(Response.data);
                $scope.LifeBusinessListMaster = JSON.parse(Response.data);
                for (let i = 0; i < $scope.LifeBusinessList.length; i++) {
                    $scope.sumbusiness += $scope.LifeBusinessList[i].totalPremium
                }
            }
        }, function () {
        })
    }
    function CheckDownloadPriority() {
        let body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/BusinessReport/CheckDownloadOption",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            var data = JSON.parse(Response.data);
            $scope.IsDownload = data.downloadData == 1 ? true: false;
        });
    }
    //**************************END***********************
    //***********************Motor***********************
    $scope.BusinessReport = null;
    $scope.BusinessMasterReport = null;
    $scope.TotalBusiness = null;
    $scope.TotalNop = null;
    $scope.TodayBusiness = null;
    $scope.TodayNop = null;
    $scope.TotalTodayData = null;
    $scope.FilterModal = null;
    TotalTodyaDetails("motor");
    $scope.filterBusiness = function (filter) {
        if (filter == null || filter == "") {
            $scope.BusinessReport = $scope.BusinessMasterReport
        }
        else {
            $scope.BusinessReport = $scope.BusinessMasterReport.filter(row => row.vehicleNo.toLowerCase() == filter.toLowerCase() ||
                row.policyNo.toLowerCase() == filter.toLowerCase() || row.name.toLowerCase() == filter.toLowerCase());
        }
    }
    $scope.Filter = function (item) {
        switch (item) {
            case "Car":
                $scope.BusinessReport = $scope.BusinessMasterReport.filter(row => row.motorType == item);
                break;
            case "Two":
                $scope.BusinessReport = $scope.BusinessMasterReport.filter(row => row.motorType == item);
                break;
            case "Two":
                $scope.BusinessReport = $scope.BusinessMasterReport.filter(row => row.motorType == item);
                break;
            case "All":
                $scope.BusinessReport = $scope.BusinessMasterReport;
                break;
            case "POS":
                $scope.BusinessReport = $scope.BusinessMasterReport.filter(row => row.userRole == item);
                break;
            case "END USER":
                $scope.BusinessReport = $scope.BusinessMasterReport.filter(row => row.userName == item);
                break;
        }

    }
    $scope.DownloadMotorReport = function () {
        let body = {
            Token: JsonWebToken.token,
            Product: TabOption,
            FromDate: StartDate,
            ToDate: EndDate
        };
        var model = {
            URL: Domain + "/api/BusinessReport/DownloadMotorBusinessReport",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "DownloadReport")
    }
    $scope.GetPolicyPDF = function (obj, product) {
        var body = {
            Token: JsonWebToken.token,
            PolicyNo: product == "Health" ? obj.policyNumber : obj.policyNo,
            DownloadAction: "policyno",
            Product: product
        };
        var model = {
            URL: Domain + "/api/BusinessReport/DownloadMotorPolicyPDF",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            window.open(Response.data, "_blank");
        });
    }
    function GetBusinessReport(FromDate, ToDate) {
        CheckEditRights();
        let body = {
            Token: JsonWebToken.token,
            FromDate: FromDate,
            ToDate: ToDate,
            Product: "motor"
        };
        var model = {
            URL: Domain + "/api/BusinessReport/MotorBusinessReports",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "BusinessReport")
    }
    function TotalTodyaDetails(motortype) {
        var body = {
            Token: JsonWebToken.token,
            MotorType: motortype
        };
        var model = {
            URL: Domain + "/api/BusinessReport/MotorHeaderBusiness",
            PostString: JSON.stringify(body)
        }
        if (motortype == "motor")
            BindtypeData(CallApiPostMethod, model, "TotalTodayData");
        else
            BindtypeData(CallApiPostMethod, model, "GCVPCVTotalTodayData");
    }
    //***********************END*************************

    //***********************Health Business******************
    $scope.HealthHeaderBusinessHeader = null;
    $scope.HealthBusinessReport = null;
    $scope.HealthBusinessMasterReport = null;

    function GetHealthBusinessReport(FromDate, ToDate) {

        let body = {
            Token: JsonWebToken.token,
            FromDate: FromDate,
            ToDate: ToDate
        };
        var model = {
            URL: Domain + "/api/BusinessReport/HealthBusinessReports",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "HealthBusinessReport")
    }
    $scope.HealthFilter = function (filter) {
        if (filter == null || filter == "") {
            $scope.HealthBusinessReport = $scope.HealthBusinessMasterReport
        }
        else {
            $scope.HealthBusinessReport = $scope.HealthBusinessMasterReport.filter(row => row.policyNumber.toLowerCase() == filter.toLowerCase()
                || row.customerName.toLowerCase() == filter.toLowerCase());
        }
    }
    function HltTotalTodyaDetails() {
        var body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/BusinessReport/HealthHeaderBusiness",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "HealthHeaderBusinessHeader")
    }
    //***************************END**************************

    //***********************GCVPCV***************************
    $scope.TotalGCVBusiness = 0;
    $scope.TotalGCVNop = 0;
    $scope.TodayGCVBusiness = 0;
    $scope.TodayGCVNop = 0;
    $scope.GCVPCVBusinessHeader = null;
    $scope.GCVPCVBusinessReport = null;
    $scope.GCVPCVBusinessMasterReport = null;
    $scope.GCVPCVTotalTodayData = null;
    $scope.GCVPCVBusinessFilter = null;
    $scope.FilterGCVModal = null;
    function GetGCVPCVBusinessReport(FromDate, ToDate) {
        let body = {
            Token: JsonWebToken.token,
            FromDate: FromDate,
            ToDate: ToDate,
            Product: "GCVPCV"
        };
        var model = {
            URL: Domain + "/api/BusinessReport/MotorBusinessReports",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "GCVPCVBusinessReport")
    }
    $scope.FilterGCVPC = function (item) {
        $scope.GCVPCVBusinessReport = $scope.GCVPCVBusinessMasterReport.filter(row => row.motorType == item);
    }
    $scope.filterGCVBusiness = function (filter) {
        if (filter == null || filter == "") {
            $scope.BusinessReport = $scope.BusinessMasterReport
        }
        else {
            $scope.GCVPCVBusinessReport = $scope.GCVPCVBusinessMasterReport.filter(row => row.vehicleNo.toLowerCase() == filter.toLowerCase() ||
                row.policyNo.toLowerCase() == filter.toLowerCase() || row.name.toLowerCase() == filter.toLowerCase());
        }
    }
    //**************************END***************************
    //************************Manual Offline*******************
    $scope.ManualOfflineBusinessList = null;
    $scope.ManualOfflineBusinessListMaster = null;
    $scope.TotalManualOfflineNop = 0;
    $scope.TotalManualOfflineBusiness = 0;
    $scope.Downloadofflinemanualreport = function (policyno,product) {
        let body = {
            Token: JsonWebToken.token,
            Policyno: policyno,
            Product: product
        };
        var model = {
            URL: Domain + "/api/BusinessReport/GetOffilePolicy",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            if (Response.data == "Not Found." || Response.data == "Path Not Found.") {
                alert(Response.data)
            }
            else {
                window.open(Response.data, "_blank");
            }
        }).then(function (Response) {

        })
    }
    $scope.filterManualOfflineBusiness = function (filter) {
        if (filter == null || filter == "") {
            $scope.ManualOfflineBusinessList = $scope.ManualOfflineBusinessListMaster
        }
        else {
            $scope.ManualOfflineBusinessList = $scope.ManualOfflineBusinessListMaster.filter(row => row.vehicleNo.toLowerCase() == filter.toLowerCase() ||
                row.policyno.toLowerCase() == filter.toLowerCase() || row.customerName.toLowerCase() == filter.toLowerCase());
        }
    }
    function ManualOfflineBusinessReport(FromDate, ToDate) {
        CheckEditRights();
        let body = {
            Token: JsonWebToken.token,
            FromDate: FromDate,
            ToDate: ToDate
        };
        var model = {
            URL: Domain + "/api/BusinessReport/ManualOfflineBusinessReport",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "ManualOfflineBusinessList")
    }
    //***************************END***************************
    function CheckEditRights() {
        let body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/User/GetUserInfo",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            $scope.IsEditDelRight = JSON.parse(Response.data).roleID == 28 || JSON.parse(Response.data).roleID == 1 ? true : false;
        })
    }
    $scope.EditDelete = function (policyno, option, product) {
        let Url = "";
        if (product == "MOT") {
            if (option == "Del")
                Url = "/api/BusinessReport/DeleteOfflinePolicy";
            else
                Url = "/myaccount/business/OfflineUpdatePolicy?policyno=" + policyno;
        }
        else if(product == "HLT") {
            if (option == "Del")
                Url = "/api/BusinessReport/DeleteOfflinePolicy";
            else
                Url = "/myaccount/business/OfflineUpdatehltPolicy?policyno=" + policyno;
        }
        else if (product == "PCV") {
            if (option == "Del") {
                Url = "/api/BusinessReport/DeleteOfflinePolicy";
                product = "MOT";
            }
            else
                Url = "/myaccount/business/OfflineUpdatehltPolicy?policyno=" + policyno;
        }
        else if (product == "GCV") {
            if (option == "Del") {
                Url = "/api/BusinessReport/DeleteOfflinePolicy";
                product = "MOT";
            }
            else
                Url = "/myaccount/business/OfflineUpdatehltPolicy?policyno=" + policyno;
        }


        else if (product == "Life") {
            if (option == "Del")
                Url = "";// "/api/BusinessReport/DeleteOfflinePolicy";
            else
                Url = "/business/OfflineUpdatelifepolicy?policyno=" + policyno;
        }

        if (option == "Del") {
            if (confirm('Are you sure you want to delete?')) {
                let body = {
                    Token: JsonWebToken.token,
                    PolicyNo: policyno,
                    Product: product
                };
                var model = {
                    URL: Domain + Url,
                    PostString: JSON.stringify(body)
                }
                $http.post(CallApiPostMethod, model).then(function (Response) {
                    alert(Response.data);
                    CallBusiness(StartDate, EndDate)
                })
            } else {
                console.log('Thing was not saved to the database.');
            }
        }
        else {
            window.location.href = Url
        }
    }
    //********************Manual Offline HLT Business***********
    $scope.ManualOfflineHLTBusinessList = [];
    $scope.ManualOfflineHLTBusinessListMaster = [];
    function ManualOfflinehltBusinessReport (FromDate, ToDate) {
        let body = {
            Token: JsonWebToken.token,
            FromDate: FromDate,
            ToDate: ToDate
        };
        var model = {
            URL: Domain + "/api/BusinessReport/OfflineHealthHLTPolicy",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "ManualOfflineHLTBusinessList")
    }
    $scope.filterManualOfflineHLTBusiness = function (filter) {
        if (filter == null || filter == "") {
            $scope.ManualOfflineHLTBusinessList = $scope.ManualOfflineHLTBusinessListMaster
        }
        else {
            $scope.ManualOfflineHLTBusinessList = $scope.ManualOfflineHLTBusinessListMaster.filter(row =>
                row.policyNo.toLowerCase() == filter.toLowerCase() || row.customerName.toLowerCase() == filter.toLowerCase());
        }
    }
    //***************************END****************************

    //**********************Callendar****************************
    $(function () {
        var start = moment().subtract(0, 'days');
        var end = moment()
        function cb(start, end) {
            $('.reportrange span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
            StartDate = start.format('YYYY-MM-DD');
            EndDate = end.format('YYYY-MM-DD');
            CallBusiness(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'))
        }
        $('.reportrange').daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        }, cb);
        cb(start, end);
    });
    //**************************END******************************

    //*****************Offline Term Life Policy*************
    /*
     -By: Sunil
     -Updated On: 23 Aug 2021
     */

    function OfflineLifeBusinessReport(FromDate, ToDate) {
        LifeHeaderSummary();
        let body = {
            Token: JsonWebToken.token,
            FromDate: FromDate,
            ToDate: ToDate
        };
        var model = {
            URL: Domain + "/api/BusinessReport/OfflineLifePolicyReport",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "OfflineLifePolicyReport");
    }

    $scope.filterLifeByTextbox = function (filter) {
        if (filter == null || filter == "") {
            return;
        }
        else {
            $scope.LifeBusinessList = $scope.LifeBusinessListMaster.filter(row => row.email?.toLowerCase() == filter.toLowerCase() ||
                row.policyNumber?.toLowerCase() == filter.toLowerCase() || row.custName?.toLowerCase() == filter.toLowerCase());
        }
    }
    $scope.DownloadLifeReport = function () {
        let body = {
            Token: JsonWebToken.token,
            Product: TabOption,
            FromDate: StartDate,
            ToDate: EndDate
        };
        var model = {
            URL: Domain + "/api/BusinessReport/OfflineLifePolicyReportDownload",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "DownloadReport")
    }
    function LifeHeaderSummary() {
        var body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/BusinessReport/LifeHeaderBusiness",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "TotalTodayData");
    }
    //*****************End Offline Term Life Policy*************
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