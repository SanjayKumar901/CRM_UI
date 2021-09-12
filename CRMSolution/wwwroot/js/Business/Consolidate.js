var app = angular.module("app", []);
app.controller("Consolidate", function ($scope, $http) {
    $scope.Reports = null;
    $scope.SelectCons = "CurrentMonth"
    $scope.YearList = null;
    $scope.MonthList = null;
    $scope.SelectYear = null;
    $scope.SelectmonthYear = null;
    $scope.Selectmonthmonth = null;
    $scope.SelectUserProgessYear = null;
    $scope.SelectUserProgessmonth = null;
    $scope.monthList = [];
    $scope.UserProgresive = null;
    var MaxAmount = 0;
    var Per = 0;
    $("#tblInfo").hide();
    $(".Tableloader").hide();
    loadYear();
    LodMonth();
    $scope.ChangeSection = function () {
        $("#tblInfo").hide()
        $("#tblInfo tbody").empty();
        //if ($scope.SelectCons == "CurrentMonth") {
        //    loadYear();
        //    LodMonth();
        //}
        //else if ($scope.SelectCons == "TillDate"){
        //    loadYear();
        //}
    }
    $scope.ChangeSectedYear = function (SelectYear) {
        LoadYearConsolidate(SelectYear);
    }
    $scope.ChangeMonthYearForMonthConsolidate = function () {
        if ($scope.SelectmonthYear == null || $scope.Selectmonthmonth == null) {
            return
        }
        loadMonthConsolidate($scope.SelectmonthYear.val.toString() + '-' + $scope.Selectmonthmonth.val.toString()+'-01')
    }
    $scope.ChangeUserProgessConsolidate = function () {
        if ($scope.SelectUserProgessmonth == null || $scope.SelectUserProgessYear == null) {
            return
        }
        loadUserProgress($scope.SelectUserProgessYear.val.toString() + '-' + $scope.SelectUserProgessmonth.val.toString() + '-01')
    }
    $scope.tabOption = function (Option) {
        switch (Option) {
            case "UserProgress":

                break;
        }
    }
    $scope.configure = function (index, primium) {
        if (index == 0) {
            $(".ProgressBar").eq(index).attr("style", "width:100%").addClass("PG_green")
        }
        let calc = (primium * 100) / MaxAmount
        let color = "";
        if (calc > 70 && calc < 95) {
            color = "PG_blue";
        }
        else if (calc > 95) {
            color = "PG_green";
        }
        if (calc <70) {
            color = "PG_orng";
        }
        $(".ProgressBar").eq(index).attr("style", "width:" + calc + "%").addClass(color)

    }
    function loadYear() {
        let pthismonthdate = new Date();
        let model = [];
        for (var i = 2020; i <= pthismonthdate.getFullYear(); i++) {
            var year = {
                val: i,
                text: i
            }
            model.push(year)
        }
        $scope.YearList = model;
    }
    function LodMonth() {
        let model = [];
        for (var i = 3; i < mont.length; i++) {
            var monthformate = "";
            if ((i + 1) <= 9)
                monthformate = "0" + (i + 1).toString()
            else
                monthformate = (i + 1).toString();
            var month = {
                val: monthformate,
                text: mont[i]
            }
            $scope.monthList.push(mont[i])
            model.push(month)
        }
        for (var i = 0; i < 3; i++) {
            var monthformate = "";
            if ((i + 1) <= 9)
                monthformate = "0" + (i + 1).toString()
            else
                monthformate = (i + 1).toString();
            var month = {
                val: monthformate,
                text: mont[i]
            }
            $scope.monthList.push(mont[i])
            model.push(month)
        }
        $scope.MonthList = model;
    }
    function loadMonthConsolidate(paramdate) {
        $(".Tableloader").eq(0).show();
        let pthismonthdate = new Date(paramdate);
        let StartDate = DateFormate(startOfMonth(pthismonthdate));
        let EndDate = DateFormate(endOfMonth(pthismonthdate));
        
        var body = {
            Token: JsonWebToken.token,
            From: StartDate,
            To: EndDate
        };
        var model = {
            URL: Domain + "/api/BusinessReport/GetConsolidate",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            let data = JSON.parse(Response.data);
            let Regionlist = [];
            let Callist = [];
            $(data).each(function (ind, val) {
                if (Regionlist.filter(row => row == val.region).length <= 0) {
                    Regionlist.push(val.region);
                }
            })
            let startIndex = new Date(body.To).getDate();
            let tHead = "<tr><th>Region</th>"
            for (var i = 1; i <= startIndex; i++) {
                let day = i <= 9 ? '0' + i : i;
                let concatdate = body.From.split("-")[0] + '-' + body.From.split("-")[1] + '-' + day;
                let datepa = Date.parse(concatdate)
                if (datepa == NaN) {
                    break;
                }
                tHead += "<th>" + concatdate + "</th>"
                Callist.push(concatdate)
            }
            $("#tblConsolidate thead").empty()
            $("#tblConsolidate tbody").empty();
            $("#tblConsolidate thead").append(tHead);
            let tr = "";
            $(Regionlist).each(function (ind, val) {
                tr += "<tr><td>" + val +"</td>";
                $(Callist).each(function (subind, subval) {
                    let countData = data.filter(row => row.region == val && row.enquirydate == subval);
                    let count = countData.length > 0 ? countData[0].enquiryCount : 0;
                    let Inr = countData.length > 0 ? countData[0].totalPremium : 0;
                    if (count > 0)
                        tr += "<td><a href='javascript:void(0)' onclick='ViewReport(" + ind + "," + subind + ")'>" + count + " (" + Math.round(Inr) + "/-INR)</td>";
                    else
                        tr += "<td>" + count + "</td>";
                    
                })
                tr += "</tr>";
            })
            $("#tblConsolidate tbody").append(tr);
            $(".Tableloader").eq(0).hide();
        });
    }
    function LoadYearConsolidate(SelectYear) {
        $(".Tableloader").eq(1).show();
        var body = {
            Token: JsonWebToken.token,
            Year: SelectYear.val.toString()
        };
        var model = {
            URL: Domain + "/api/BusinessReport/GetYearWiseCosolidate",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            let data = JSON.parse(Response.data);
            let Regionlist = [];
            let Callist = ['04', '05', '06', '07', '08', '09', '10', '11', '12', '01', '02', '03'];
            $(data).each(function (ind, val) {
                if (Regionlist.filter(row => row == val.region).length <= 0) {
                    Regionlist.push(val.region);
                }
            })
            $("#tblyearConsolidate tbody").empty();
            let tempYear = body.Year;
            let tr = "";
            $(Regionlist).each(function (ind, val) {
                tr += "<tr><td>" + val + "</td>";
                $(Callist).each(function (subind, subval) {
                    if (subval == '01' && tempYear == body.Year) {
                        let yr = parseInt(body.Year);
                        body.Year = (yr + 1).toString();
                    }
                    else if (subval == '04') {
                        body.Year = tempYear
                    }
                    let countData = data.filter(row => row.enquirydate == (body.Year + '-' + subval) && row.region == val);
                    let count = countData.length > 0 ? countData[0].enquiryCount : 0;
                    tr += "<td>" + count + "</td>";
                })
                tr += "</tr>";
            })
            $("#tblyearConsolidate tbody").append(tr);
            tr = "<tr><td>Total</td>";
            $("#tblyearConsolidate thead tr th").each(function (index, value) {
                if (index == 0)
                    return
                var sum = 0;
                $("#tblyearConsolidate tbody tr").each(function (ind, val) {
                    var td = $(this).find($("td"));
                    sum += parseInt($(td[index]).text())
                    console.log(sum)
                });
                tr += "<td>" + sum + "</td>";
            });
            tr += "</tr>";
            $("#tblyearConsolidate tbody").append(tr);
            $(".Tableloader").eq(1).hide();
        });
    }
    function loadUserProgress(paramdate) {
        $(".Tableloader").eq(2).show();
        let pthismonthdate = new Date(paramdate);
        let StartDate = DateFormate(startOfMonth(pthismonthdate));
        let EndDate = DateFormate(endOfMonth(pthismonthdate));
        var body = {
            Token: JsonWebToken.token,
            From: StartDate,
            To: EndDate
        };
        var model = {
            URL: Domain + "/api/BusinessReport/UserProgresive",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            $scope.UserProgresive=[]
            if (Response.data != "[]") {
                $scope.UserProgresive = JSON.parse(Response.data);
                MaxAmount = $scope.UserProgresive[0].totalPremium;
            }
            $(".Tableloader").eq(2).hide();
        });
    }
})
function ViewReport(row, column) {
    var tr = $("#tblConsolidate tbody tr");
    var td = $(tr[row]).find($("td"));
    var thr = $("#tblConsolidate thead tr");
    var thd = $(thr[0]).find($("th"));
    var body = {
        Token: JsonWebToken.token,
        Date: $(thd[column + 1]).text(),
        Region: $(td[0]).text()
    };
    var model = {
        URL: Domain + "/api/BusinessReport/ShowAboutConsolidate",
        PostString: JSON.stringify(body)
    }
    $.ajax({
        url: CallApiPostMethod,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(model),
        success: function (Response) {
            console.log(Response)
            if (Response != "") {
                let datamodel = JSON.parse(Response);
                let tr = "";
                $(datamodel).each(function (index, value) {
                    tr += "<tr>"
                    tr += "<td>" + value.rn + "</td>" 
                    tr += "<td>" + value.enQuiryNo + "</td>" 
                    tr += "<td>" + value.motortype + "</td>" 
                    tr += "<td>" + value.policyno + "</td>" 
                    tr += "</tr>";
                })
                $("#tblInfo tbody").empty();
                $("#tblInfo tbody").append(tr);
                $("#tblInfo").show()
            }
            
        },
        error: function (Response) {

        }
    })
}

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