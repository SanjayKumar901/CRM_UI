var app = angular.module("app", []);
app.controller("Offline", function ($scope, $http) {
    $scope.leadCounter = null;
    $scope.SearchLead = null;
    $scope.LeadDetailGrid = null;

    function LeadGrid(startdate, enddate) {
        //*************************Lead Details*****************************
        $(".Tableloader").show();
        var dasLeadModel = {
            Token: JsonWebToken.token,
            From: startdate,
            To: enddate,
        }
        var model = {
            URL: Domain + "/api/Home/GetOfflineFeatureLead",
            PostString: JSON.stringify(dasLeadModel)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            $(".Tableloader").hide();
            $scope.LeadDetailGrid = JSON.parse(Response.data);
        }, function (Response) {
                $(".Tableloader").hide();
            ////alert(Response.statusText)
        });
        //***************************END************************************
    }
    $(function () {
        var start = moment().subtract(0, 'days');
        var end = moment();
        function cb(start, end) {
            $('#reportrange span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
            LeadGrid(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'))
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
})

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