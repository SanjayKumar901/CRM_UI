var app = angular.module("app", []);
app.controller("UserPriv", function ($scope, $http) {
    $scope.Privilege = null;
    $scope.PrivilegeList = null;
    $scope.UserName = null;
    $scope.userid = null;
    $scope.IsSelectAll = false;
    $scope.AssignedPrivilege = null;
    $scope.PermisionValid = false;


    OnloadPage();
    $scope.SaveRecord = function () {
        let privilegeCollection = [];
        $("#PrvTable tbody tr").each(function (index, value) {
            let privilegeRow = {
                PrivilegeID: 0,
                NavBarMasterMenuID: 0,
                UserID: 0,
                Addrecord: 0,
                Editrecord: 0,
                deleterecord: 0,
                AsAdmin: 0,
                DownloadData:0
            };
            var td = $(this).find($("td"));
            privilegeRow.Addrecord = $(td).find($(".AddPerm")).prop("checked") ? 1 : 0
            privilegeRow.Editrecord = $(td).find($(".EditPerm")).prop("checked") ? 1 : 0
            privilegeRow.deleterecord = $(td).find($(".DeletetPerm")).prop("checked") ? 1 : 0
            privilegeRow.AsAdmin = $scope.PermisionValid ? $(td).find($(".AsAdmin")).prop("checked") ? 1 : 0 : 0
            privilegeRow.DownloadData = $scope.PermisionValid ? $(td).find($(".DownloadData")).prop("checked") ? 1 : 0 : 0
            if (privilegeRow.Addrecord == 1 || privilegeRow.Editrecord == 1 || privilegeRow.deleterecord == 1) {
                privilegeRow.PrivilegeID = $scope.PrivilegeList[index].privilegeID;
                privilegeRow.NavBarMasterMenuID = $scope.PrivilegeList[index].navBarMasterMenuID;
                privilegeRow.EuserID = $scope.userid;
                privilegeCollection.push(privilegeRow);
            }
        });
        console.log(privilegeCollection);
        SavePrivileges(privilegeCollection,"Save");
    }
    $scope.selectall = function () {
        if ($scope.IsSelectAll == false) {
            $(".AddPerm").prop("checked", true);
        }
        else {
            $(".AddPerm").prop("checked", false);
        }
    }
    $scope.DeleteRecord = function () {
        let privilegeCollection = [];
        $("#PrvTable tbody tr").each(function (index, value) {
            let privilegeRow = {
                PrivilegeID: 0,
                NavBarMasterMenuID: 0,
                UserID: 0,
                Addrecord: 0,
                Editrecord: 0,
                deleterecord: 0,
                AsAdmin: 0
            };
            var td = $(this).find($("td"));
            privilegeRow.Addrecord = $(td).find($(".AddPerm")).prop("checked") ? 1 : 0;
            if (privilegeRow.Addrecord == 1) {
                privilegeRow.PrivilegeID = $scope.PrivilegeList[index].privilegeID;
                privilegeRow.NavBarMasterMenuID = $scope.PrivilegeList[index].navBarMasterMenuID;
                privilegeRow.EuserID = $scope.userid;
                privilegeCollection.push(privilegeRow);
            }
        });
        SavePrivileges(privilegeCollection,"Delete")
    }
    function OnloadPage() {
        let querystring = new URLSearchParams(window.location.search);
        $scope.userid = querystring.get('userid')
        $scope.userid = $scope.userid.replace(/ /g, "+");
        var body = {
            Token: JsonWebToken.token,
            RegisterOrDeregister: $scope.userid
        };
        var model = {
            URL: Domain + "/api/User/PrivilegeList",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            let JsonResult = JSON.parse(Response.data);
            $scope.PrivilegeList = JsonResult.privilegeMaster;
            $scope.PermisionValid = JsonResult.roleID == 28 ? true : false;
        }, function (Response) {
        })
        //userInfo();
    }
    function userInfo() {
        
        //console.log(querystring.get('userid'));
        let body = {
            Token: JsonWebToken.token
        }
        var model = {
            URL: Domain + "/api/User/PrivilegeList",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            console.log(Response.data);
            let user = JSON.parse(Response.data);
            $scope.UserName = user.userName;
        }, function (Response) {
        })
    }
    function SavePrivileges(PrvList,Option) {
        let body = {
            Token: JsonWebToken.token,
            Rows: PrvList,
            Option: Option
        }
        var model = {
            URL: Domain + "/api/User/SavePrivileges",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);

        }, function (Response) {
        })
    }
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