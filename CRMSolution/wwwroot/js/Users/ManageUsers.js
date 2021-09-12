/// <reference path="../../lib/angularjs/angular.min.js" />
var app = angular.module("app", []);
app.controller("manageuser", function ($scope, $http) {
    $scope.userList = null;
    $scope.userListMaster = null;
    $scope.userListSuperMaster = null;
    $scope.UnregisteruserList = null;
    $scope.UnregisteruserListMaster = null;
    $scope.TotalUser = null;
    $scope.TotalAcitveUser = null;
    $scope.TotalDeactiveUser = null;
    $scope.signinfo = "";
    $scope.DropDownSign = "+";
    $scope.IsModelShow = false;
    $scope.UserKits = null;
    $scope.Utility = null;
    $scope.BulkKits = null;
    $scope.IsCreateUser = false;
    $scope.RegisterOrDeregister = null;
    $scope.Regions = null;
    $scope.Region = null;
    $scope.ReasonForDeregOrReg = null;
    $scope.CurrentPageRecord = 10;
    $scope.StartPageRecord = 0;
    $scope.ShowNH = false;
    $scope.RiportingManager = null;
    $scope.SelectRoleByFilter = null;
    $scope.ReportingList = null;
    $scope.LoadPrivileges = null;
    $scope.IsEditRecord = false;
    $scope.IsDownloadRecord = false;
    $scope.SelecteRegion = null;
    $scope.SelectRegionList = [];
    $scope.SelectBranch = null;
    $scope.SelectBranchList = [];
    $scope.RoleTypeList = [];
    var TempstartDate = null;
    var TempEndDate = null;
    var deRegisterUser = null;
    var GlobalModal = null;
    var TotalUserData = [];
    var tablebinderIndex = 10;
    UserExist();
    //LoadUser();
    LoadTokenInfo();
    RoleTypeList();
    function LoadTokenInfo() {
        let body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/user/GetUserInfo",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            let data = JSON.parse(Response.data);
            if (data.roleID == 1 || data.roleID == 28)
                $scope.ShowNH = true
            else
                $scope.ShowNH = false;
        }, function () {
        })
    }
    function LoadUser(startDate,endDate) {
        let fetchmodel = JSON.parse(window.localStorage.getItem("token"));
        GlobalModal = fetchmodel;
        let body = {
            Token: fetchmodel.token,
            startDate: startDate,
            endDate: endDate
        };
        var model = {
            URL: Domain + "/api/user/UserListData",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            let Respo = JSON.parse(Response.data);
            BindUserList(Respo);
            try {
                let checkHaveUser = JSON.parse(window.localStorage.getItem("create"))
                if (checkHaveUser != null) {
                    $("#btnAddUser").click()
                }
            }
            catch (ex) { }
        }, function () {
        })
        LoadPrivileges();
        GetRegions();
    }
    $scope.Next = function () {
        let TotalLen = $scope.userListMaster.length;
        if ($scope.CurrentPageRecord < TotalLen) {
            $scope.StartPageRecord = $scope.CurrentPageRecord + 1;
            $scope.CurrentPageRecord = $scope.CurrentPageRecord + 10;
            $scope.userList = $scope.userListMaster.slice($scope.StartPageRecord, $scope.CurrentPageRecord + 1);
        }
    }
    $scope.Prev = function () {
        if ($scope.StartPageRecord > 0) {
            $scope.StartPageRecord = $scope.StartPageRecord - 10;
            $scope.CurrentPageRecord = $scope.CurrentPageRecord - 10;
            if ($scope.StartPageRecord < 10) {
                $scope.StartPageRecord = 0;
                $scope.CurrentPageRecord = 10;
            }
            $scope.userList = $scope.userListMaster.slice($scope.StartPageRecord, $scope.CurrentPageRecord + 1);
        }
    }
    $scope.UserInfo = function (index, model, signinfo, table) {
        let CheckIndex = null;
        $(table + "  tbody  tr").find($(signinfo)).each(function (ind, val) {
            if ($(val).text() == "-") {
                CheckIndex = ind
            }
        })
        console.log(CheckIndex);
        if (CheckIndex != null) {
            $(table + " > tbody > tr").eq(CheckIndex + 1).remove();
            $(signinfo).eq(CheckIndex).text("+")
        }
        if (CheckIndex == index && $(signinfo).eq(CheckIndex).text() == "+")
            return;

        if ($(signinfo).eq(index).text() == "-") {
            $(signinfo).eq(index).text("+")
        }
        else if ($(signinfo).eq(index).text() == "+") {
            let body = {
                Token: JsonWebToken.token,
                UserID: model.userid,
            };
            var model = {
                URL: Domain + "/api/user/SingleUserInfo",
                PostString: JSON.stringify(body)
            }
            $http.post(CallApiPostMethod, model).then(function (Response) {
                let data = JSON.parse(Response.data);
                let row = "<tr>" +
                    "<td colspan='8'>" +
                    "<div class='userFullDet'>" +
                    "<ul>" +
                    "<li>Email:<br /><span>" + data.emailAddress + "</span></li>";
                if (data.mobileNo != "****") {
                    row += "<li>Phone<br /><span>" + data.mobileNo + "</span></li>";
                }
                row += "<li>PAN<br /><span>" + data.panNumber + "</span></li>" +
                    "<li>Aadhar<br /><span>" + data.adhaarNumber + "</span></li>" +
                    "<li>Reporting To<br /><span>" + data.reportingManager + "</span></li>" +
                    "<li>Created By<br /><span>" + data.createdBy + "</span></li>" +
                    "<li>Refral Code<br /><span>" + data.refercode + "</span></li>" +
                    "<li>Password<br /><span>" + data.password + "</span></li>" +
                    "<li>Link<br /><span>" + data.linkUrl + "</span></li>" +
                    "</ul>" +
                    "</div>" +
                    "</td>" +
                    "</tr>";
                $(signinfo).eq(index).text("-");
                $(table + " > tbody > tr").eq(index).after(row);
            }, function (Response) {
            });
        }
    }
    $scope.LoadSubUsers = function (index, model, signinfo, table) {
        if (signinfo == "-") {
            //$("#UserListData > tbody > tr").eq(index + 1).remove();
            $(table + " > tbody > tr").eq(index + 1).remove();
            $scope.DropDownSign = "+";
        }
        else if (signinfo == "+") {
            let body = {
                Token: JsonWebToken.token,
                UserID: model.userid,
            };
            var modelRe = {
                URL: Domain + "/api/user/SubUserListInfo",
                PostString: JSON.stringify(body)
            }
            $http.post(CallApiPostMethod, modelRe).then(function (Response) {
                let dataList = JSON.parse(Response.data);
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
                $(table + " > tbody > tr").eq(index).after(row);
            }, function (Response) {
            });
        }
    }
    $scope.redirect = function (model, option) {
        if ($scope.LoadPrivileges.editrecord == 1) {
            let body = {
                Token: JsonWebToken.token,
                UserID: model.userid,
            };
            var modelRe = {
                URL: Domain + "/api/Setup/EncryptOrDecrypt",
                PostString: JSON.stringify(body)
            }
            $http.post(CallApiPostMethod, modelRe).then(function (Response) {
                window.location.href = "/myaccount/User/MyProfile?userid=" + Response.data + "&action=" + option;
            })
        }
    }
    $scope.redirectPrv = function (model) {
        if ($scope.LoadPrivileges.editrecord == 1) {
            let body = {
                Token: JsonWebToken.token,
                UserID: model.userid,
            };
            var modelRe = {
                URL: Domain + "/api/Setup/EncryptOrDecrypt",
                PostString: JSON.stringify(body)
            }
            $http.post(CallApiPostMethod, modelRe).then(function (Response) {
                window.location.href = "/myaccount/user/Priv?userid=" + Response.data;
            })
        }
    }
    $scope.showModel = function (model, action) {
        if (action == "deregister")
            $scope.RegisterOrDeregister = "Deregister";
        else if (action == "register")
            $scope.RegisterOrDeregister = "Register";
        else
            $scope.IsDeregister = null;

        $scope.IsModelShow = true;
        deRegisterUser = model;
    }
    $scope.ConfirmationDeregister = function (IsDereg) {
        if (IsDereg) {
            if ($scope.ReasonForDeregOrReg != null) {
                var body = {
                    Token: JsonWebToken.token,
                    Userid: deRegisterUser.userid,
                    RegisterOrDeregister: $scope.RegisterOrDeregister,
                    Reason: $scope.ReasonForDeregOrReg
                };
                var model = {
                    URL: Domain + "/api/User/Dereg",
                    PostString: JSON.stringify(body)
                }
                $http.post(CallApiPostMethod, model).then(function (Response) {
                    $scope.IsModelShow = false;
                    deRegisterUser = null;
                    LoadUser(TempstartDate, TempEndDate);
                }, function (Response) {
                    $scope.IsModelShow = false;
                    deRegisterUser = null;
                })
            }
            else {
                alert("Reason is required.")
            }
        }
        else {
            $scope.IsModelShow = false;
            deRegisterUser = null;
        }
    }
    $scope.RegionFilter = function (Region) {
        if (Region == null)
            $scope.userList = $scope.userListMaster;
        else
            $scope.userList = $scope.userListMaster.filter(row => row.regionid == Region.id);
    }
    $scope.FilterUserListByName = function (UserFilter) {
        if ($("#nav-home-tab").hasClass("active")) {
            filterActiveOrInactiveUser(UserFilter, "userList", "userListMaster", $scope.StartPageRecord, $scope.CurrentPageRecord);
        }
        else {
            filterActiveOrInactiveUser(UserFilter, "UnregisteruserList", "UnregisteruserListMaster", 0, $scope.UnregisteruserListMaster.length-1);
        }
        
    }
    $scope.DownloadUserList = function (option) {
        var body = null;
        var url = null;
        if ($scope.RiportingManager == null) {
            body = {
                Token: JsonWebToken.token,
                Option: option,
                StartDate: TempstartDate,
                EndDate: TempEndDate
            };
            url = "/api/User/GetUserReport";
        }
        else {
            body = {
                Token: JsonWebToken.token,
                UserID: $scope.RiportingManager.userID,
                StartDate: TempstartDate,
                EndDate: TempEndDate
            };
            url = "/api/User/GetUserListWithFilter";
        }
        var model = {
            URL: Domain + url,
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            window.open(Response.data, "_blank");
        }, function (Response) {

        })
    }
    $scope.BindReportings = function () {
        if ($scope.SelectRoleByFilter == null) {
            $scope.RiportingManager = null;
            LoadUser(TempstartDate, TempEndDate);
        }
        else {
            let body = {
                Token: JsonWebToken.token,
                RoleID: $scope.SelectRoleByFilter.roleid,
                startDate: TempstartDate,
                endDate: TempEndDate
            };
            var model = {
                URL: Domain + "/api/user/GetUserFilterByRole",
                PostString: JSON.stringify(body)
            }
            $http.post(CallApiPostMethod, model).then(function (Response) {
                if (Response.data != "" || Response.data != null) {
                    let data = JSON.parse(Response.data);
                    $scope.ReportingList = data;
                }
            }, function (Response) {
            });
        }
    }
    $scope.FilterUsers = function (RiportingManager) {
        let body = {
            Token: JsonWebToken.token,
            UserID: RiportingManager.userID.toString(),
            startDate: TempstartDate,
            endDate: TempEndDate
        };
        var model = {
            URL: Domain + "/api/user/GetUsersListFilterByUserID",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            if (Response.data != "" || Response.data != null) {
                let data = JSON.parse(Response.data);
                //$scope.ReportingList = data;
                BindUserList(data);
            }
        }, function (Response) {
        });
    }
    $scope.FilterUserWithRegion = function (region) {
        $scope.StartPageRecord = 0;
        $scope.CurrentPageRecord = 10;
        if (region == null) {
            $scope.userListMaster = $scope.userListSuperMaster
            $scope.userList = $scope.userListMaster.slice($scope.StartPageRecord, $scope.CurrentPageRecord);
            $scope.SelectBranchList = [];
        }
        else {
            $scope.userListMaster = $scope.userListSuperMaster.filter(row => row.regionid == region.id)
            $scope.userList = $scope.userListMaster.slice($scope.StartPageRecord, $scope.CurrentPageRecord);
            GetCities(region.id);
        }
    }
    $scope.FilterUserWithBranch = function (region, branch) {
        $scope.StartPageRecord = 0;
        $scope.CurrentPageRecord = 10;
        $scope.userListMaster = $scope.userListSuperMaster.filter(row => row.regionid == region.id && row.branchID == branch.id);
        $scope.userList = $scope.userListMaster.slice($scope.StartPageRecord, $scope.CurrentPageRecord);
    }
    $scope.AddNewUser = function () {
        var auto_refresh = setInterval(
            function () {
                if ($('#div').is(':visible')) {

                }
                else {
                    clearInterval(auto_refresh);
                    if (SaveUser == true) {
                        LoadUser(TempstartDate, TempEndDate);
                    }
                }
            }, 100);
    }
    function filterActiveOrInactiveUser(UserFilter, scopeList, scopeMasterList, StartPageRecord, CurrentPageRecord) {
        if (UserFilter == "" || UserFilter == null)
            $scope[scopeList] = $scope[scopeMasterList].slice(StartPageRecord, CurrentPageRecord + 1);
        else
            $scope[scopeList] = $scope[scopeMasterList].filter(row => row.username.toLowerCase().includes(UserFilter.toLowerCase()) ||
                row.emailAddress.toLowerCase().includes(UserFilter.toLowerCase()) ||
                row.referCode.toLowerCase().includes(UserFilter.toLowerCase()) ||
                row.posCode.toLowerCase().includes(UserFilter.toLowerCase())).slice(0, 10);
    }
    function BindUserList(Respo) {
        try {
            let Uniqueusers = [];
            let UniqueActiveusers = [];
            let activeUserLength = Respo.filter(row => row.active == true).length;
            TotalUserData = Respo;
            $scope.userListMaster = TotalUserData.filter(row => row.active == true);
            $scope.userListSuperMaster = $scope.userListMaster;
            $scope.userList = $scope.userListMaster.slice($scope.StartPageRecord, $scope.CurrentPageRecord);
            $scope.UnregisteruserList = TotalUserData.filter(row => row.active != true);
            $scope.UnregisteruserListMaster = $scope.UnregisteruserList;
            if (Respo.length > 0) {
                $(Respo).each(function (inde, value) {
                    if (!Uniqueusers.includes(value.userid)) {
                        Uniqueusers.push(value.userid);
                    }
                    if (!UniqueActiveusers.includes(value.userid) && value.active == true) {
                        UniqueActiveusers.push(value.userid);
                    }
                })
            }
            $scope.TotalUser = Uniqueusers.length;
            $scope.TotalAcitveUser = UniqueActiveusers.length;//Response.data.length;
            $scope.TotalDeactiveUser = Respo.length - activeUserLength;
        }
        catch (ex) {}
    }
    function UserExist() {
        GlobalModal = JSON.parse(window.localStorage.getItem("token"))
        var body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/Account/TokeExist",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            if (Response.data != "Success") {
                window.location.href = "/Account/Login";
            }
        }, function (Resp) { })
    }
    function BindTable(tbldata) {
        //if (tablebinderIndex >= tbldata.length)
        //    return;
        //let lastIndex = tablebinderIndex + 10;
        //if (tbldata.length < lastIndex) {
        //    lastIndex = tbldata.length;
        //}
        //let temptable = $scope.userList;
        //for (var i = tablebinderIndex; i < lastIndex; i++) {
        //    temptable.push(tbldata[i]);
        //}
        $scope.userList = tbldata;
    }
    function LoadPrivileges() {
        var body = {
            Token: JsonWebToken.token,
            Privilegeid: 1
        }
        var model = {
            URL: Domain + "/api/Home/DashBoardPrivilages",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            let navgrouplistMaster = JSON.parse(Response.data);
            $scope.UserKits = navgrouplistMaster.filter(row => row.separation == 'UserKits')
            $scope.Utility = navgrouplistMaster.filter(row => row.separation == 'Utility')
            $scope.BulkKits = navgrouplistMaster.filter(row => row.separation == 'BulkKits')
            let avail = navgrouplistMaster.filter(row => row.privilegeName == 'Create User')
            if (avail.length > 0) {
                $scope.LoadPrivileges = avail[0];
                if ($scope.LoadPrivileges.addrecord == 1)
                    $scope.IsCreateUser = true;
                if ($scope.LoadPrivileges.editrecord == 1)
                    $scope.IsEditRecord = true
                if ($scope.LoadPrivileges.downloadData == 1)
                    $scope.IsDownloadRecord = true
            }
            let CheckEdit = navgrouplistMaster.filter(row => row.privilegeName == 'Manage Zone')
            if (CheckEdit.length > 0) {
                $scope.LoadPrivileges = CheckEdit[0];
                if ($scope.LoadPrivileges.editrecord == 1)
                    $scope.IsEditRecord = true
                if ($scope.LoadPrivileges.downloadData == 1)
                    $scope.IsDownloadRecord = true
            }
        }, function (Response) {
        })
    }
    function GetRegions() {
        let body = {
            Token: GlobalModal.token
        };
        var model = {
            URL: Domain + "/api/user/GetRegions",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "RegionList")
    }
    function GetCities(regionid) {
        let body = {
            Token: JsonWebToken.token,
            ID: regionid
        };
        var model = {
            URL: Domain + "/api/user/GetCities",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model,"SelectBranchList")
    }
    function RoleTypeList() {
        let body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/user/roletypes",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "RoleTypeList");
    }
    function BindtypeData(url, body, scope) {
        $http.post(url, body).then(function (Response) {
            $scope[scope] = JSON.parse(Response.data);
            if (scope == "RegionList") {
                $scope.SelectRegionList = $scope[scope];
            }
        }, function () {
        })
    }
    $(function () {
        var start = moment().subtract(0, 'days');
        var end = moment();
        function cb(start, end) {
            TempstartDate = start.format('YYYY-MM-DD');
            TempEndDate = end.format('YYYY-MM-DD')
            $('#reportrange span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
            LoadUser(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'))
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
});

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
    $scope.ReferAndPosSeries = null;
    $scope.IsRegionList = false;
    $scope.IsMultiselectRegion = false;
    $scope.IsRoletypeAdmin = false;
    $scope.IsPos = false;
    $scope.IsRefer = false;
    $scope.IsAlternet = true;
    $scope.LOGO = null;
    $scope.Alternatecode = null;
    $scope.IsDocReq = true;
    $scope.UserRegionBranchData = null;
    var checkHaveUser = null;
    var usermodel = null;
    var PanCard = null;
    var AdharCardnum = null;
    var DOB = null;
    RoleTypes();
    //GetCities();
    SetLogo();
    GetRegions();
    $scope.IsRegionshow = function () {
        //alert("ok");
        if ($scope.IsRegionList)
            $scope.IsRegionList = false;
        else
            $scope.IsRegionList = true;
    }
    $scope.BindTeam = function (roletype) {
        BindTeamFun(roletype);
    }
    $scope.BindUser = function (TeamType) {
        BindUserFun(TeamType);
    }
    $scope.SelectedTeamUser = function (TeamType) {
        let body = {
            Token: JsonWebToken.token,
            ID: TeamType.userid
        };
        var model = {
            URL: Domain + "/api/user/UserallocatedDetail",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            let res = JSON.parse(Response.data);
            let Region = $scope.RegionList.filter(row => row.id == res[0].regionID)[0];
            $scope.Region = Region;
            GetCities(res[0].regionID, res[0].branchID)
        }, function () {
        });
        //get
    }
    $scope.Register = function () {
        let roleid = parseInt($scope.RoleType.roleid);
        if ($scope.fullname == null || $scope.Mobile == null || $scope.email == null) {
            //Return message field.
        }
        else {
            let Validation = "";
            if (!checkEmail($scope.email)) {
                Validation = "\nEnter valid email";
            }
            if (!phonenumber($scope.Mobile)) {
                Validation += "\nEnter valid mobile no";
            }
            if (Namevalidation($scope.fullname)) {
                Validation += "\nEnter valid name";
            }
            if (Validation == "") {
                let Regions = [];
                if ($scope.RoleType.roleid == 21) {
                    $(".RegionModel").each(function () {
                        if ($(this).prop("checked")) {
                            let region = {
                                RegionID: parseInt($(this).val()),
                                BranchID: $scope.City == null ? 0 : $scope.City.id
                            };
                            Regions.push(region);
                        }
                    })
                }
                else {
                    let region = {
                        RegionID: $scope.Region == undefined || $scope.Region == null ? 0 : $scope.Region.id,
                        BranchID: $scope.City == null ? 0 : $scope.City.id
                    };
                    Regions.push(region);
                }
                if (DOB != null) {
                    DOB = new Date(DOB)
                }
                let body = {
                    Token: JsonWebToken.token,
                    UserName: $scope.fullname,
                    Active: true,
                    EmailAddress: $scope.email,
                    MobileNo: $scope.Mobile,
                    RoleId: roleid,
                    KeyAccountManager: $scope.TeamUser.userid,
                    ReferVal: $scope.ReferAndPosSeries.referVal,
                    ReferPrifix: $scope.ReferAndPosSeries.referPrifix,
                    PosVal: $scope.ReferAndPosSeries.posVal,
                    PosPrifix: $scope.ReferAndPosSeries.posPrifix,
                    Regions: Regions,
                    Alternatecode: $scope.Alternatecode,
                    IsDocRequred: roleid == 8 ? $scope.IsDocReq : null,
                    PanNum: PanCard,
                    AdharNum: AdharCardnum,
                    DOB: DOB
                };
                window.localStorage.removeItem("create")
                var model = {
                    URL: Domain + "/api/user/UserSaverData",
                    PostString: JSON.stringify(body)
                }
                PostAction(CallApiPostMethod, model, "Response")
            }
            else {
                alert(Validation);
            }
        }
    }
    $scope.BindBranchCity = function (region) {
        GetCities(region.id, null);
    }
    function BindTeamFun(roletype) {
        if (roletype != null) {
            let body = {
                Token: JsonWebToken.token,
                ID: roletype.roleid
            };
            var model = {
                URL: Domain + "/api/user/RoleTeamList",
                PostString: JSON.stringify(body)
            };
            if (roletype.roleid == 21) {
                $scope.IsMultiselectRegion = true;
            }
            else {
                $scope.IsMultiselectRegion = false;
            }
            if (roletype.roleid == 8) {
                $scope.IsPos = true;
                $scope.IsRefer = true;
            }
            else if (roletype.roleid == 26 || roletype.roleid == 27) {
                $scope.IsPos = false;
                $scope.IsRefer = true;
            }
            else {
                $scope.IsPos = false;
                $scope.IsRefer = false;
            }

            if (roletype.roleid == 1 || roletype.roleid == 30 || roletype.roleid == 23)
                $scope.IsRoletypeAdmin = true;
            else
                $scope.IsRoletypeAdmin = false;

            try {
                if (checkHaveUser != null) {
                    let bodytemp = {
                        Token: JsonWebToken.token,
                        Userid: checkHaveUser.userID
                    };
                    var modeltemp = {
                        URL: Domain + "/api/user/SingleUserInfo",
                        PostString: JSON.stringify(bodytemp)
                    };
                    $http.post(CallApiPostMethod, modeltemp).then(function (Response) {
                        if (Response.data == "") {
                            BindtypeData(CallApiPostMethod, model, "TeamTypeList");
                            GetReferAndPosSeries(roletype.roleid);
                        }
                        else {
                            usermodel = JSON.parse(Response.data);
                            BindtypeData(CallApiPostMethod, model, "TeamTypeList", usermodel.roleID);
                            GetReferAndPosSeries(roletype.roleid);
                        }
                    })
                }
                else {
                    BindtypeData(CallApiPostMethod, model, "TeamTypeList");
                    GetReferAndPosSeries(roletype.roleid);
                }
            }
            catch (ex) {
                BindtypeData(CallApiPostMethod, model, "TeamTypeList");
                GetReferAndPosSeries(roletype.roleid);
            }
        }
        else {
            $scope.IsRoletypeAdmin = false;
            $scope.IsMultiselectRegion = false;
        }
    }
    function BindUserFun(TeamType) {
        let userid = null;
        let body = {
            Token: JsonWebToken.token,
            ID: TeamType.roleid
        };
        var model = {
            URL: Domain + "/api/user/TeamList",
            PostString: JSON.stringify(body)
        }
        if (usermodel != null)
            userid = usermodel.userID
        BindtypeData(CallApiPostMethod, model, "TeamUserList", userid)
    }
    function SetLogo() {
        $scope.LOGO = window.localStorage.getItem("logo")
    }
    function RoleTypes() {
        let FillRole = null;
        try {
            if (window.localStorage.getItem("create") != null) {
                checkHaveUser = JSON.parse(window.localStorage.getItem("create"))
                $scope.fullname = checkHaveUser.firstName + ' ' + checkHaveUser.lastName;
                $scope.Mobile = checkHaveUser.mobile;
                $scope.email = checkHaveUser.email;
                FillRole = 8;
                PanCard = checkHaveUser.panNo;
                AdharCardnum = parseInt(checkHaveUser.aadhaarNo);
                DOB = checkHaveUser.dob
            }
        }
        catch (ex) { }
        GlobalModal = JSON.parse(window.localStorage.getItem("token"));
        let body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/user/roletypes",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "RoleTypeList", FillRole);
    }
    function GetCities(regionid, cityID) {
        //BindGetUrl("http://corecrmapi.stariengineering.com/api/user/GetCities", "CityList");
        let body = {
            Token: JsonWebToken.token,
            ID: regionid
        };

        var model = {
            URL: Domain + "/api/user/GetCities",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            $scope.CityList = JSON.parse(Response.data);
            if (cityID != null) {
                let citydata = $scope.CityList.filter(row => row.id == cityID)[0];
                $scope.City = citydata;
            }
        }, function () {
        })
    }
    function GetRegions() {
        let body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/user/GetRegions",
            PostString: JSON.stringify(body)
        };
        BindtypeData(CallApiPostMethod, model, "RegionList")
    }
    function GetUserRegionIDandBranchID(userID) {
        let body = {
            Token: JsonWebToken.token,
            Userid: userID
        };
        var model = {
            URL: Domain + "/api/user/GetUserRegionndBranch",
            PostString: JSON.stringify(body)
        };
        BindtypeData(CallApiPostMethod, model, "UserRegionBranchData");
    }
    function GetReferAndPosSeries(roleID) {
        let body = {
            Token: JsonWebToken.token,
            ID: roleID
        };
        var model = {
            URL: Domain + "/api/user/ReferAndPosSeries",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "ReferAndPosSeries");
    }
    function BindtypeData(url, body, scope,SelectOption) {
        $http.post(url, body).then(function (Response) {
            try {
                $scope[scope] = JSON.parse(Response.data);
            }
            catch (ex) { }
            switch (scope) {
                case "ReferAndPosSeries":
                    if (Response.data == "" || Response.data == null) {
                        $scope.ReferAndPosSeries = null;
                    }
                    break;
                case "RegionList":
                    let temp = []
                    temp = JSON.parse(Response.data);
                    let lst = [];
                    $scope.RegionList = null;
                    $.each(temp, function (index, inputArray) {
                        let i = lst.findIndex(row => row.id == inputArray.id);
                        if (i < 0) {
                            lst.push(inputArray);
                        }
                    });
                    $scope.RegionList = lst;
                    break;
                case "RoleTypeList":
                    if (SelectOption != null) {
                        $scope.RoleType = $scope[scope].filter(row => row.roleid == SelectOption)[0];
                        BindTeamFun($scope.RoleType);
                    }
                    break;
                case "TeamTypeList":
                    if (SelectOption != null) {
                        $scope.TeamType = $scope[scope].filter(row => row.roleid == SelectOption)[0];
                        BindUserFun($scope.TeamType);
                    }
                    break;
                case "TeamUserList":
                    if (SelectOption != null) {
                        $scope.TeamUser = $scope[scope].filter(row => row.userid == SelectOption)[0];
                        GetUserRegionIDandBranchID(checkHaveUser.userID);
                    }
                    break;
                case "UserRegionBranchData":
                    $scope.Region = $scope.RegionList.filter(row => row.id == $scope[scope].regionClient)[0];
                    GetCities($scope.Region.id, $scope[scope].branchClient);
                    break;
            }
        }, function () {
        })
    }
    function PostAction(url, body, scope) {
        $http.post(url, body).then(function (Response) {
            alert(Response.data);
            if (scope == "Response") {
                SaveUser = true;
            }
        }, function () {
        })
    }
    function BindGetUrl(url, scope) {
        $http.get(url).then(function (Response) {
            $scope[scope] = Response.data;
        })
    }
    
    //**********************Pankaj*******************

    //***********************end*********************
});

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