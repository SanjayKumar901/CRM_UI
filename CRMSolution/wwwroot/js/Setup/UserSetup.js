var app = angular.module("app", []);
app.controller("usersetup", function ($scope, $http) {
    $scope.RegionList = null;
    $scope.BranchList = null;
    $scope.FilterRoleList = null;
    $scope.TeamUser = null;
    $scope.TeamUserList = null;
    $scope.TeamRole = null;
    $scope.TeamTypeList = null;
    $scope.checkedRoleModel = null;
    $scope.SetupAction = null;
    $scope.RoleList = null;
    $scope.PrivilegeList = null;
    $scope.UserList = null;
    $scope.MoveRegion = null;
    $scope.MoveRegionList = null;
    $scope.MoveBranch = null;
    $scope.MoveBranchList = null;
    $scope.IsWithRoleID = false;
    $scope.IsWithRoleRegion = false;
    $scope.IsRole = false;
    $scope.IsTeamUser = false;
    $scope.IsRegion = false;
    $scope.IsBranch = false;
    $scope.AlterNateCOde = null;
    $scope.RMCOde = null;

    $scope.SaveRecord = function () {
        switch ($scope.SetupAction) {
            case "WithRoleID":
                SaveWithRoleID();
                break;
            case "WithPrivilegeID":
                SaveWithPrivID();
                break;
            case "WithRoleType":
                SaveWithRoleType();
                break;
            case "WithRoleRegion":
                SaveWithRoleRegion();
                break;
            case "WithAlternateCode":
                SaveAlternateCode();
                break;
            case "WithRMCode":
                SaveRMCode();
                break;
        }
    }
    $scope.changeAction = function (SetupAction) {
        AllFalse();
        switch (SetupAction) {
            case "WithRoleID":
                AllTrue()
                $scope.FilterRoleList = null;
                $scope.TeamUserList = null;
                $scope.IsWithRoleRegion = false;
                $scope.MoveRegionList = null;
                $scope.MoveBranchList = null;
                $scope.IsWithRoleID = false;
                $scope.AlterNateCOde = null;
                $scope.RMCOde = null;
                break;
            case "WithPrivilegeID":
                $scope.FilterRoleList = null;
                $scope.TeamUserList = null;
                $scope.IsWithRoleRegion = false;
                $scope.MoveRegionList = null;
                $scope.MoveBranchList = null;
                $scope.IsWithRoleID = false;
                $scope.AlterNateCOde = null;
                $scope.RMCOde = null;
                GetPrivList();
                break;
            case "WithRoleType":
                $scope.PrivilegeList = null;
                $scope.IsWithRoleID = true;
                $scope.FilterRoleList = null;
                $scope.TeamUserList = null;
                $scope.IsWithRoleRegion = false;
                $scope.MoveRegionList = null;
                $scope.MoveBranchList = null;
                $scope.AlterNateCOde = null;
                $scope.RMCOde = null;
                break;
            case "WithRoleRegion":
                $scope.PrivilegeList = null;
                $scope.IsWithRoleID = true;
                $scope.FilterRoleList = null;
                $scope.TeamUserList = null;
                $scope.IsWithRoleRegion = true;
                $scope.IsWithRoleID = false;
                $scope.AlterNateCOde = null;
                $scope.RMCOde = null;
                GetRegionList();
                break;
            case "WithAlternateCode":
                $scope.FilterRoleList = null;
                $scope.TeamUserList = null;
                $scope.IsWithRoleRegion = false;
                $scope.MoveRegionList = null;
                $scope.MoveBranchList = null;
                $scope.IsWithRoleID = false;
                $scope.AlterNateCOde = null;
                $scope.RMCOde = null;
                break;
            case "WithRMCode":
                $scope.FilterRoleList = null;
                $scope.TeamUserList = null;
                $scope.IsWithRoleRegion = false;
                $scope.MoveRegionList = null;
                $scope.MoveBranchList = null;
                $scope.IsWithRoleID = false;
                $scope.AlterNateCOde = null;
                $scope.RMCOde = null;
                break;
        }
        if ($scope.RoleList == null || $scope.RoleList.length <= 0) {
            GetRoleList();
        }
    }
    $scope.changeRole = function (obj) {
        //if ($scope.SetupAction != "WithRoleRegion") {
        let body = {
            Token: JsonWebToken.token,
            ID: obj.roleID
        };
        var model = {
            URL: Domain + "/api/setup/UserlistWithRoletype",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "UserList")
        //}
        if ($scope.SetupAction == "WithRoleID") {//|| $scope.SetupAction == "WithRoleRegion") {
            let body = {
                Token: JsonWebToken.token,
                ID: obj.roleID
            };
            var model = {
                URL: Domain + "/api/user/RoleTeamList",
                PostString: JSON.stringify(body)
            };
            BindtypeData(CallApiPostMethod, model, "TeamTypeList");
        }
    }
    $scope.changeTeamRole = function (obj) {
        let body = {
            Token: JsonWebToken.token,
            ID: obj.roleid
        };
        var model = {
            URL: Domain + "/api/user/TeamList",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "TeamUserList")
    }
    $scope.changeTeamUser = function (obj) {
        let body = {
            Token: JsonWebToken.token,
            ID: obj.userid
        };
        var model = {
            URL: Domain + "/api/setup/RegionlistWithUserID",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "RegionList")
    }
    $scope.changeRegionZone = function (obj, scope) {
        let body = {
            Token: JsonWebToken.token,
            ID: obj.id
        };

        var model = {
            URL: Domain + "/api/user/GetCities",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, scope)
    }
    function AllFalse() {
        $scope.IsRole = false;
        $scope.IsTeamUser = false;
        $scope.IsRegion = false;
        $scope.IsBranch = false;
    }
    function AllTrue() {
        $scope.IsRole = true;
        $scope.IsTeamUser = true;
        $scope.IsRegion = true;
        $scope.IsBranch = true;
    }
    function GetPrivList() {
        let body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/User/PrivilegeList",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "PrivilegeList")
    }
    function GetRoleList() {
        let body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/user/roletypes",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "RoleList")
    }
    function GetToken() {
        GlobalModal = JSON.parse(window.localStorage.getItem("token"));
    }
    function SaveWithPrivID() {
        let EmpIDList = [];
        let PrivList = [];
        let tabledata = $("#tblusers tbody tr");
        $("input:checkbox:checked", tabledata).each(function () {
            EmpIDList.push($(this).attr("value"));
        })
        let EmpIDCollection = EmpIDList.join(",");
        let tablePriv = $("#tblpriv tbody tr");
        $("input:checkbox:checked", tablePriv).each(function () {
            PrivList.push($(this).attr("value"));
        })
        let PrivCollection = PrivList.join(",");

        let body = {
            Token: JsonWebToken.token,
            SeprateUsers: EmpIDCollection,
            SepratePriveles: PrivCollection
        };
        var model = {
            URL: Domain + "/api/setup/SetupUserPrivilege",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
        });
    }
    function SaveWithRoleType() {
        let roleid = $("input[name='RoleRadio']:checked").val();
        if (roleid > 0) {
            let EmpIDList = [];
            let tabledata = $("#tblusers tbody tr");
            $("input:checkbox:checked", tabledata).each(function () {
                EmpIDList.push($(this).attr("value"));
            })
            let EmpIDCollection = EmpIDList.join(",");

            let body = {
                Token: JsonWebToken.token,
                SeprateUsers: EmpIDCollection,
                RoleID: parseInt(roleid)
            };
            var model = {
                URL: Domain + "/api/setup/SetupUserRoleType",
                PostString: JSON.stringify(body)
            }
            $http.post(CallApiPostMethod, model).then(function (Response) {
                alert(Response.data);
            });
        }
    }
    function SaveWithRoleID() {
        let EmpIDList = [];
        let ReportingManagerID = $scope.TeamUser.userid;
        let Region = $scope.RegionModel.id;
        let Branch = $scope.BranchModel.id;
        let tabledata = $("#tblusers tbody tr");
        $("input:checkbox:checked", tabledata).each(function () {
            EmpIDList.push($(this).attr("value"));
        })
        let EmpIDCollection = EmpIDList.join(",");

        let body = {
            Token: JsonWebToken.token,
            SeprateUsers: EmpIDCollection,
            ReportingManagerID: ReportingManagerID,
            RegionID: Region,
            BranchID: Branch
        };
        var model = {
            URL: Domain + "/api/setup/UpdateReportingManager",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
        });
    }
    function SaveWithRoleRegion() {
        let EmpIDList = [];
        let tabledata = $("#tblusers tbody tr");
        $("input:checkbox:checked", tabledata).each(function () {
            EmpIDList.push($(this).attr("value"));
        });
        let EmpIDCollection = EmpIDList.join(",");
        let UserID = EmpIDCollection;
        let Region = $scope.MoveRegion.id;
        let Branch = $scope.MoveBranch.id;

        let body = {
            Token: JsonWebToken.token,
            SeprateUsers: UserID.toString(),
            RegionID: Region,
            BranchID: Branch
        };
        var model = {
            URL: Domain + "/api/setup/UpdateRegionWithTeam",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
        });
    }
    function GetRegionList() {
        let body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/user/GetRegions",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "MoveRegionList")
    }
    function BindtypeData(url, body, scope) {
        $http.post(url, body).then(function (Response) {
            try {
                if (scope == "PrivilegeList") {
                    let jsonData = JSON.parse(Response.data);
                    $scope[scope] = jsonData.privilegeMaster
                }
                else if (scope == "RoleList") {
                    let roledata = JSON.parse(Response.data);
                    let lstRole = [];
                    $(roledata).each(function (obje, inde) {
                        var modelMerger = {
                            roleName: inde.rolename,
                            roleID: inde.roleid,
                        }
                        lstRole.push(modelMerger);
                    })
                    $scope[scope] = lstRole;
                }
                else {
                    $scope[scope] = JSON.parse(Response.data);
                }
            }
            catch (ex) { }
        });
    }
    function SaveAlternateCode() {
        let EmpIDList = [];
        let tabledata = $("#tblusers tbody tr");
        $("input:checkbox:checked", tabledata).each(function () {
            EmpIDList.push($(this).attr("value"));
        })
        let EmpIDCollection = EmpIDList.join(",");

        let body = {
            Token: JsonWebToken.token,
            SeprateUsers: EmpIDCollection,
            AlterNateCode: $scope.AlterNateCOde
        };
        var model = {
            URL: Domain + "/api/setup/UpdateAlterNateCode",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
        });
    }
    function SaveRMCode() {
        let EmpIDList = [];
        let tabledata = $("#tblusers tbody tr");
        $("input:checkbox:checked", tabledata).each(function () {
            EmpIDList.push($(this).attr("value"));
        })
        let EmpIDCollection = EmpIDList.join(",");

        let body = {
            Token: JsonWebToken.token,
            SeprateUsers: EmpIDCollection,
            RMCOde: $scope.RMCOde
        };
        var model = {
            URL: Domain + "/api/setup/UpdateRMCode",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
        });
    }
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