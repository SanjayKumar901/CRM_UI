
var app = angular.module("app", []);
app.controller("MotorBusiness", function ($scope, $http) {
    $scope.BusinessReport = null;
    $scope.BusinessMasterReport = null;
    $scope.TotalBusiness = null;
    $scope.TotalNop = null;
    $scope.TodayBusiness = null;
    $scope.TodayNop = null;
    $scope.TotalTodayData = null;
    $scope.FilterModal = null;
    var StartDate = null;
    var EndDate = null;
    var GlobalModal = null;
    var Domain = "http://localhost:50973";
    GetToken();
    TotalTodyaDetails();
    $scope.filterBusiness = function (filter) {
        if (filter == null || filter == "") {
            $scope.BusinessReport = $scope.BusinessMasterReport
        }
        else {
            $scope.BusinessReport = $scope.BusinessMasterReport.filter(row => row.vehicleNo == filter || row.policyNo == filter);
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
            Token: GlobalModal.token,
            FromDate: StartDate,
            ToDate: EndDate
        };
        var model = {
            URL: Domain + "/api/BusinessReport/DownloadMotorBusinessReport",
            PostString: JSON.stringify(body)
        }
        BindtypeData("/Account/CallCheck", model, "DownloadReport")
    }
    function GetBusinessReport(FromDate, ToDate) {
        let body = {
            Token: GlobalModal.token,
            FromDate: FromDate,
            ToDate: ToDate
        };
        var model = {
            URL: Domain + "/api/BusinessReport/MotorBusinessReports",
            PostString: JSON.stringify(body)
        }
        BindtypeData("/Account/CallCheck", model, "BusinessReport")
    }
    function TotalTodyaDetails() {
        var body = {
            Token: GlobalModal.token
        };
        var model = {
            URL: Domain + "/api/Home/DashbordHeaders",
            PostString: JSON.stringify(body)
        }
        BindtypeData("/Account/CallCheck", model, "TotalTodayData")
    }
    function GetToken() {
        GlobalModal = JSON.parse(window.localStorage.getItem("token"));
    }
    function dateFun(IsCurrent) {
        let datefull = new Date();
        let yr = datefull.getFullYear();
        let mon = null;
        if (IsCurrent)
            mon = parseInt(datefull.getMonth()) + 1;
        else
            mon = parseInt(datefull.getMonth());
        mon = parseInt(mon) > 9 ? mon : '0' + mon;
        let dt = datefull.getDate();
        dt = parseInt(dt) > 9 ? dt : '0' + dt;

        let fulldate = yr + '-' + mon + '-' + dt;
        return fulldate;
    }
    function CastDateTime(datetime) {
        let datefull = new Date(datetime);
        let yr = datefull.getFullYear();
        let mon = parseInt(datefull.getMonth()) + 1;
        mon = parseInt(mon) > 9 ? mon : '0' + mon;
        let dt = datefull.getDate();
        dt = parseInt(dt) > 9 ? dt : '0' + dt;
        let fulldate = yr + '-' + mon + '-' + dt;
        let convertdate = new Date(fulldate);
        return fulldate;
    }
    function BindtypeData(url, body, scope) {
        $http.post(url, body).then(function (Response) {
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
            else if (scope == "BusinessReport") {
                $scope.BusinessMasterReport = JSON.parse(Response.data);
            }
            else if (scope == "DownloadReport") {
                window.open(Response.data, "_blank");
            }
        }, function () {
        })
    }

    //**********************Callendar****************************
    $(function () {
        var start = moment().subtract(0, 'days');
        var end = moment();
        function cb(start, end) {
            $('#reportrange span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
            StartDate = start.format('YYYY-MM-DD');
            EndDate = end.format('YYYY-MM-DD');
            GetBusinessReport(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'))
        }
        $('#reportrange').daterangepicker({
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