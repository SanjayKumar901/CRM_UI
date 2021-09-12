angular.module("app", []).controller("navcontroller", function ($scope, $http) {
    var data = JSON.parse(window.localStorage.getItem("user"));
    $("#userName").text(data.firstName + " " + data.lastName)
    $("#WelcomeText").text(GetWelcome())
    var navgrouplist = []
    var navgrouplistMaster = null;
    $scope.Navs = null;
    var model = {
        "userid": data.userID
    }
    $http.post("http://localhost:64503/api/values/DashBoardPrivilages", model).then(function (Response) {
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
});