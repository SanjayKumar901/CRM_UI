var app = angular.module("app", []);
app.controller("UserVerification", function ($scope, $http) {
    $scope.PosReqGrid = [];
    $scope.PosReqGridMaster = [];
    $scope.PosReqCounter = null;
    $scope.VerifyMessage = null;
    $scope.UserVerificationFilter = null;
    var TempStartDate = null;
    var TempENDDate = null;
    $scope.CHKDuplicate = function (model) {
        //alert(model);
    }
    $scope.Verify = function () {
        let lstPos = [];
        $(".poscheck:checked").each(function (index, value) {
            lstPos.push(value.value);
        })
        if ($scope.VerifyMessage == null) {
            alert("Fill verification message.")
            return
        }
        let body = {
            Token: JsonWebToken.token,
            VerifyMessage: $scope.VerifyMessage,
            IsDuplicate: $scope.IsDuplicate,
            UserIDs: lstPos.join(",")
        }
        var model = {
            URL: Domain + "/api/User/UserVerification",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
            RegisterAsPos(TempStartDate, TempENDDate)
        }, function (Response) {
            ////alert(Response.statusText)
        });
    }
    $scope.UserVerificationOptions = function () {
        if ($scope.UserVerificationFilter == "") {
            $scope.PosReqGrid = $scope.PosReqGridMaster
        }
        else {
            $scope.PosReqGrid = $scope.PosReqGridMaster.filter(row => row.activeUser == $scope.UserVerificationFilter);
        }
    }
    function RegisterAsPos(startdate, enddate) {
        //*************************Lead Details*****************************
        var dasLeadModel = {
            Token: JsonWebToken.token,
            FromDate: startdate,
            ToDate: enddate,
            DetailAction:"User Verification"
        }
        var model = {
            URL: Domain + "/api/Home/PosRegisterData",
            PostString: JSON.stringify(dasLeadModel)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            let Resp = JSON.parse(Response.data);
            $scope.PosReqGrid = Resp.register_as_poss;
            $scope.PosReqGridMaster = $scope.PosReqGrid;
            $scope.PosReqCounter = Resp.register_as_poss.length;
        }, function (Response) {
            ////alert(Response.statusText)
        });
        //***************************END************************************
    }
    $(function () {
        var start = moment().subtract(0, 'days');
        var end = moment();
        function cb(start, end) {
            TempStartDate = start.format('YYYY-MM-DD');
            TempENDDate = end.format('YYYY-MM-DD');
            $('#RegisterAsPos span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
            RegisterAsPos(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'))
        }
        $('#RegisterAsPos').daterangepicker({
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