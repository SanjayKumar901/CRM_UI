
var app = angular.module("app", []);
app.controller("HealthBusiness", function ($scope, $http) {
    $scope.BusinessReport = null;
    var GlobalModal = null;
    GetToken();
    GetBusinessReport();
    function GetBusinessReport() {
        let body = {
            Token: GlobalModal.token,
            FromDate: "2020-05-01",
            ToDate: "2020-05-14",
        };
        BindtypeData("http://localhost:50972/api/BusinessReport/HealthBusinessReports", body, "BusinessReport")
    }
    function GetToken() {
        GlobalModal = JSON.parse(window.localStorage.getItem("token"));
    }
    function BindtypeData(url, body, scope) {
        $http.post(url, body).then(function (Response) {
            $scope[scope] = Response.data;
        }, function () {
        })
    }
});

app.controller("navcontroller", function ($scope, $http) {
    var GlobalModal = null;
    GetToken();
    //$("#userName").text(data.firstName + " " + data.lastName)
    //$("#WelcomeText").text(GetWelcome())
    var navgrouplist = []
    var navgrouplistMaster = null;
    $scope.Navs = null;
    var model = {
        Token: GlobalModal.token
    }
    $http.post("http://localhost:50972/api/Home/DashBoardPrivilages", model).then(function (Response) {
        navgrouplistMaster = Response.data
        var counter = 0;
        $(Response.data).each(function (index, value) {
            if (navgrouplist.filter(row => row.privilegeName == value.privilegeGroupName).length <= 0) {
                var prv = {
                    privid: counter,
                    privilegeName: value.privilegeGroupName,
                    url: value.url
                }
                counter += 1;
                navgrouplist.push(prv)
            }
        })
        $scope.Navs = navgrouplist;
    }, function (Response) {
    })
    $scope.submenu = function (nav) {
        var submenu = navgrouplistMaster.filter(row => row.privilegeGroupName == nav.privilegeName)
        var navul = "<ul class='first-level'>";
        $("#sidebarnav ul").each(function () {
            $(this).remove();
        })

        $(submenu).each(function (index, value) {
            navul += "<li  class='sidebar-item'><a href='" + value.url + "' class='sidebar-link'><span class='hide-menu'>" + value.privilegeName + "</span></a></li>"
        })
        navul += "</ul>"
        $("#sidebarnav").find('> li').eq(nav.privid).after(navul)
    }
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