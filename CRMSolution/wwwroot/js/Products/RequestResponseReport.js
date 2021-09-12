
var app = angular.module("app", []);
app.controller("ReqResRep", function ($scope, $http) {
    $scope.LoadReport = [];
   
    function GetLoadReport(fromdate,todate) {
        let body = {
            Token: JsonWebToken.token,
            FromDate: fromdate,
            ToDate: todate
        };
        var model = {
            URL: Domain + "/api/Products/GetAllReqstAndResponse",
            PostString: JSON.stringify(body)
        };
        BindtypeData(CallApiPostMethod, model, "LoadReport");
    }
    function BindtypeData(url, body, scope) {
        $http.post(url, body).then(function (Response) {
            $scope[scope] = JSON.parse(Response.data);
            if (scope == "ReqResList" && Response.data == "[]") {
                alert("\"Try later\". Place holder should have Enq number/Reg#/proposal#")
            }
        }, function () {
        })
    }
    
    $(function () {
        var start = moment().subtract(0, 'days');
        var end = moment();
        function cb(start, end) {
            if ($(".ranges ul").find($("li")).length >= 6) {
                var data = $(".ranges ul").find($("li"))
                $(data[data.length - 1]).remove("li");
                $(".range_inputs").remove("div")
            }
            $('#ReqResCal span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
            GetLoadReport(start.format('YYYY-MM-DD'),end.format('YYYY-MM-DD'))
        }
        $('#ReqResCal').daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'Last 45 Days': [moment().subtract(44, 'days'), moment()],
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