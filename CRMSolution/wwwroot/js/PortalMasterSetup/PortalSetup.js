var app = angular.module("app", []);
app.controller("portalSetup", function ($scope, $http) {
    $scope.MOTtblList = [];
    $scope.HLTtblList = [];
    $scope.MOTInsurerList = [];
    $scope.HLTInsurerList = [];
    $scope.HLTSetupList = [];
    $scope.MOTSetupList = [];
    GetInsurerList()
    $scope.SelectTab = function (Tab) {
        switch (Tab) {
            case "PosSetup":
                GetInsurerList();
                break;
            case "PosHLTSetup":
                GetHltInsurerList();
                break;
        }
    }
    $scope.AddMore = function (tbl) {
        $scope[tbl].push({ row: 1 });
    }
    $scope.RemoveRow = function (tbl,index) {
        $scope[tbl].splice(index, 1);
    }
    $scope.SaveData = function () {
        let SaveLst = [];
        let FlagSaveOrNot = true;
        $(".Mottable tbody tr").each(function (index, value) {
            if (($(".Motins").eq(index).val() == null) || ($(".motpos").eq(index).prop("checked") == false && $(".motenduser").eq(index).prop("checked") == false && $(".both").eq(index).prop("checked") == false)) {
                FlagSaveOrNot = false
                return
            }
            SaveLst.push({
                BrokerName: $(".Motins option:selected").eq(index).text(),
                OnlyPOS: $(".motpos").eq(index).prop("checked"),
                UserOnly: $(".motenduser").eq(index).prop("checked"),
                Both: $(".both").eq(index).prop("checked"),
            })
        });
        if (FlagSaveOrNot == true) {
            SavePosMotorQuoteSetup(SaveLst, Domain + "/api/PortalMasterSetup/SavePosMotorQuoteSetup")
        }
        console.log(SaveLst)
    }
    $scope.SaveHltData = function () {
        let SaveLst = [];
        let FlagSaveOrNot = true;
        $(".HLTtable tbody tr").each(function (index, value) {
            if (($(".HLTins").eq(index).val() == null) || ($(".hltpos").eq(index).prop("checked") == false &&
                $(".hltenduser").eq(index).prop("checked") == false &&
                $(".hltboth").eq(index).prop("checked") == false)) {
                FlagSaveOrNot = false
                return
            }
            SaveLst.push({
                BrokerName: $(".HLTins option:selected").eq(index).text(),
                OnlyPOS: $(".hltpos").eq(index).prop("checked"),
                UserOnly: $(".hltenduser").eq(index).prop("checked"),
                Both: $(".hltboth").eq(index).prop("checked"),
                Suminsured: $(".hltsuminsured").eq(index).val()==""? null: parseFloat($(".hltsuminsured").eq(index).val()),
            })
        });
        if (FlagSaveOrNot == true) {
            SavePosMotorQuoteSetup(SaveLst, Domain + "/api/PortalMasterSetup/SavePosHLTQuoteSetup")
        }
        console.log(SaveLst)
    }
    $scope.SelectCheck = function (removeselect1, removeselect2, index) {
        $(removeselect1).eq(index).prop("checked", false);
        $(removeselect2).eq(index).prop("checked", false);
    }
    function SavePosMotorQuoteSetup(SaveLst,URL) {
        let body = {
            Token: JsonWebToken.token,
            saveRestrictQuote: SaveLst
        };
        let model = {
            URL: URL,
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data)
        }, function () {
        })
    }
    function GetInsurerList() {
        $scope.MOTtblList = [];
        $scope.MOTtblList.push({row:1});
        let body = {
            Token: JsonWebToken.token,
            Product:'MOT'
        };
        let model = {
            URL: Domain + "/api/PortalMasterSetup/GetInsurerCompanies",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, 'MOTInsurerList');
    }
    function GetHltInsurerList() {
        $scope.HLTtblList = [];
        $scope.HLTtblList.push({ row: 1 });
        let body = {
            Token: JsonWebToken.token,
            Product: 'HLT'
        };
        let model = {
            URL: Domain + "/api/PortalMasterSetup/GetInsurerCompanies",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, 'HLTInsurerList');
    }
    function GetHLTSetupList() {
        let body = {
            Token: JsonWebToken.token,
            Product: 'HLT'
        };
        let model = {
            URL: Domain + "/api/PortalMasterSetup/GetInsurerCompanies",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, 'HLTSetupList');
    }
    function BindtypeData(url, body, scope) {
        $http.post(url, body).then(function (Response) {
            $scope[scope] = JSON.parse(Response.data);
            if (scope == "MOTInsurerList") {
                $scope[scope] = JSON.parse(ResponseData.data).filter(row => row.carInsurance == true || row.twowheelerInsurance == true)
            }
        }, function () {
        })
    }
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