/// <reference path="../../lib/angularjs/angular.min.js" />
var app = angular.module("app", []);
app.controller("manageuser", function ($scope, $http) {
    $scope.userList = null;
    $scope.TotalUser = null;
    $scope.TotalAcitveUser = null;
    $scope.TotalDeactiveUser = null;
    $scope.signinfo = "+";
    $scope.DropDownSign = "+"
    var GlobalModal = null;
    LoadUser();
    UserExist();
    function LoadUser() {
        let model = JSON.parse(window.localStorage.getItem("user"));
        let fetchmodel = JSON.parse(window.localStorage.getItem("token"));
        let body = {
            Token: fetchmodel.token
        };

        $http.post("http://localhost:50972/api/user/UserListData", body).then(function (Response) {
            let activeUserLength = Response.data.filter(row => row.active == true).length;
            $scope.userList = Response.data;
            $scope.TotalUser = Response.data.length;
            $scope.TotalAcitveUser = activeUserLength;//Response.data.length;
            $scope.TotalDeactiveUser = Response.data.length - activeUserLength;
        }, function () {
        })
    }

    $scope.UserInfo = function (index, model, signinfo) {
        if (signinfo == "-") {
            $("#UserListData > tbody > tr").eq(index + 1).remove();
            $scope.signinfo = "+";
        }
        else if (signinfo == "+") {
            let body = {
                Token: GlobalModal.token,
                UserID: model.userid,
            };
            $http.post("http://localhost:50972/api/user/SingleUserInfo", body).then(function (Response) {
                let data = Response.data;
                let row = "<tr>" +
                    "<td colspan='8'>" +
                    "<div class='userFullDet'>" +
                    "<ul>" +
                    "<li>Email:<br /><span>" + data.emailAddress + "</span></li>" +
                    "<li>Phone<br /><span>" + data.mobileNo + "</span></li>" +
                    "<li>PAN<br /><span>" + data.panNumber + "</span></li>" +
                    "<li>Aadhar<br /><span>" + data.adhaarNumber + "</span></li>" +
                    "<li>Reporting To<br /><span>" + data.reportingManager + "</span></li>" +
                    "<li>Created By<br /><span>" + data.createdBy + "</span></li>" +
                    "<li>Refral Code<br /><span>" + data.refercode + "</span></li>" +
                    "<li>Password<br /><span>" + data.password + "</span></li>" +
                    "</ul>" +
                    "</div>" +
                    "</td>" +
                    "</tr>";
                $scope.signinfo = "-";
                $("#UserListData > tbody > tr").eq(index).after(row);
            }, function (Response) {
            });
        }
    }
    $scope.LoadSubUsers = function (index, model, signinfo) {
        if (signinfo == "-") {
            $("#UserListData > tbody > tr").eq(index + 1).remove();
            $scope.DropDownSign = "+";
        }
        else if (signinfo == "+") {
            let body = {
                UserID: model.userid,
            };
            $http.post("http://localhost:50972/api/user/SubUserListInfo", body).then(function (Response) {
                let dataList = Response.data;
                let row = "";
                let temprow = "";
                let startRow = "<tr><td colspan='8'>";
                let endRow = "</td></tr>";
                $(dataList).each(function (ind, data) {
                    temprow = "<div class='userFullDet'>" +
                        "<ul>" +
                        "<li>Email:<br /><span>" + data.emailAddress + "</span></li>" +
                        "<li>Phone<br /><span>" + data.mobileNo + "</span></li>" +
                        "<li>PAN<br /><span>" + data.panNumber + "</span></li>" +
                        "<li>Aadhar<br /><span>" + data.adhaarNumber + "</span></li>" +
                        "<li>Reporting To<br /><span>" + data.reportingManager + "</span></li>" +
                        "<li>Created By<br /><span>" + data.createdBy + "</span></li>" +
                        "<li>Refral Code<br /><span>" + data.refercode + "</span></li>" +
                        "<li>Password<br /><span>" + data.password + "</span></li>" +
                        "</ul>" +
                        "</div>";
                    row += temprow;
                });
                row = startRow + row + endRow;
                $scope.DropDownSign = "-";
                $("#UserListData > tbody > tr").eq(index).after(row);
            }, function (Response) {
            });
        }
    }
    $scope.redirect = function (model, option) {
        window.location.href = "/User/MyProfile?userid=" + model.userid + "&action=" + option;
    }
    function UserExist() {
        GlobalModal = JSON.parse(window.localStorage.getItem("token"))
        var body = {
            Token: GlobalModal.token
        };
        $http.post("http://localhost:50972/api/Account/TokeExist", body).then(function (Response) {
            if (Response.data != "Success") {
                window.location.href = "/Account/Login";
            }
        }, function (Resp) { })
    }
    //By Pankaj
    //$("#userDetailsShow, #userDetailsShow02, #userPOSShow").hide();
    //$("#userDetails").click(function () {
    //    $("#userDetailsShow").toggle(500);
    //    $("#userDetails").toggleClass("UserDetailsTR22");
    //    $("#userDetailsShow02").hide();
    //});
    //$("#userDetails02").click(function () {
    //    $("#userDetailsShow02").toggle(500);
    //    $("#userDetails02").toggleClass("UserDetailsTR22");
    //    $("#userDetailsShow").hide();
    //});
    //$("#userPOS").click(function () {
    //    $("#userPOSShow").toggle(500);
    //    $("#userDetailsShow, #userDetailsShow02").hide();
    //});
    //END
})

app.controller("AddUser", function ($scope, $http) {
    $scope.RoleType = null;
    $scope.RoleTypeList = null;
    $scope.TeamType = null;
    $scope.TeamTypeList = null;
    $scope.TeamUser = null;
    $scope.TeamUserList = null;
    $scope.City = null;
    $scope.CityList = null;
    $scope.Region = null;
    $scope.RegionList = null;
    $scope.userAllocation = null;
    $scope.fullname = null;
    $scope.Mobile = null;
    $scope.email = null;
    $scope.Response = null;
    var GlobalModal = null;
    RoleTypes();
    GetCities();
    GetRegions();
    function RoleTypes() {
        GlobalModal = JSON.parse(window.localStorage.getItem("token"));
        let body = {
            Token: GlobalModal.token,
            ID: 1
        };
        BindtypeData("http://localhost:50972/api/user/roletypes", body, "RoleTypeList");
    }
    function GetCities() {
        BindGetUrl("http://localhost:50972/api/user/GetCities", "CityList");
    }
    function GetRegions() {
        BindGetUrl("http://localhost:50972/api/user/GetRegions", "RegionList");
    }
    $scope.BindTeam = function (roletype) {
        let body = {
            Token: GlobalModal.token,
            ID: roletype.roleid
        };
        BindtypeData("http://localhost:50972/api/user/RoleTeamList", body, "TeamTypeList")
    }
    $scope.BindUser = function (TeamType) {
        let body = {
            Token: GlobalModal.token,
            ID: TeamType.roleid
        };
        BindtypeData("http://localhost:50972/api/user/TeamList", body, "TeamUserList")
    }
    $scope.SelectedTeamUser = function (TeamType) {
        let body = {
            Token: GlobalModal.token,
            ID: TeamType.userid
        };

        $http.post("http://localhost:50972/api/user/UserallocatedDetail", body).then(function (Response) {
            let citydata = $scope.CityList.filter(row => row.id == Response.data[0].branchID)[0];
            $scope.City = citydata;
            let Region = $scope.RegionList.filter(row => row.id == Response.data[0].regionID)[0];
            $scope.Region = Region;
        }, function () {
        })
    }
    $scope.Register = function () {
        let roleid = parseInt($scope.RoleType.roleid);
        if ($scope.fullname == null || $scope.Mobile == null || $scope.email == null) {
            //Return message field.
        }
        else {
            let Regions = [];
            let region = {
                RegionID: $scope.Region.id,
                BranchID: $scope.City.id
            };
            Regions.push(region);
            let body = {
                Token: GlobalModal.token,
                //ClientID: 45,
                UserName: $scope.fullname,
                Active: true,
                //CreateBy: 3690,
                EmailAddress: $scope.email,
                MobileNo: $scope.Mobile,
                RoleId: roleid,
                KeyAccountManager: $scope.TeamUser.userid,
                Regions: Regions,
                //bhCityId: $scope.City.cityID
            };
            PostAction("http://localhost:50972/api/user/UserSaverData", body, "Response")
        }
    }
    function BindtypeData(url, body, scope) {
        $http.post(url, body).then(function (Response) {
            $scope[scope] = Response.data;
        }, function () {
        })
    }
    function PostAction(url, body, scope) {
        $http.post(url, body).then(function (Response) {
            alert(Response.data);
        }, function () {
        })
    }
    function BindGetUrl(url, scope) {
        $http.get(url).then(function (Response) {
            $scope[scope] = Response.data;
        })
    }
})

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