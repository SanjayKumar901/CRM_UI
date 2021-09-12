/// <reference path="../../lib/angularjs/angular.min.js" />

var app = angular.module("app", []);
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
    var GlobalModal = null;//JSON.parse(window.localStorage.getItem("token"));
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
    function BindtypeData(url, body,scope) {
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