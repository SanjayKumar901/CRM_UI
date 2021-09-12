var app = angular.module("app", []);
app.controller("Renewal", function ($scope, $http) {
    $scope.IsMultiselectRegion = false;
    $scope.IsCloseRegionBtn = false;
    $scope.userList = null;
    $scope.userMasterList = null;
    $scope.startdate = null;
    $scope.enddate = null;
    $scope.RenewalList = null;
    $scope.RenewalHealthList = null;
    $scope.Search = null;
    $scope.SelectedProduct = "Motor";
    LoadUser();
    $(".Tableloader").hide();
    $scope.GetData = function () {
        $(".Tableloader").eq(0).show();
        let UserList = [];
        $(".UserModel").each(function () {
            if ($(this).prop("checked"))
                UserList.push($(this).val())
        })

        let body = {
            Token: JsonWebToken.token,
            Product: $scope.SelectedProduct,
            UserList: UserList.join(","),
            StartDate: $("#fromDate").val(),
            EndDate: $("#toDate").val()
        };
        var model = {
            URL: Domain + "/api/Products/GetRenewData",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            let Respo = JSON.parse(Response.data);
            if ($scope.SelectedProduct=="Motor")
                $scope.RenewalList = Respo;
            else if ($scope.SelectedProduct == "Health")
                $scope.RenewalHealthList = Respo;
            $(".Tableloader").eq(0).hide();
        }, function () {
        })
    }
    $scope.SelectProduct = function (Product) {
        $scope.SelectedProduct = Product;
    }
    $scope.GotoQuote = function (EnqNo) {
        EnqNo = EnqNo.replace("/", "_");
        let currentdomain = "";
        if ($scope.SelectedProduct == "Motor")
            currentdomain = window.location.origin + "/?RnwM=" + EnqNo + "&user=" + JsonWebToken.token+"&type=motor";
        else if ($scope.SelectedProduct == "Health")
            currentdomain = window.location.origin + "/?RnwH=" + EnqNo + "&user=" + JsonWebToken.token + "&type=hlt";
        window.open(currentdomain, "_blank");
    }
    $scope.IsRegionshow = function () {
        if ($scope.IsMultiselectRegion == false) {
            $scope.IsMultiselectRegion = true
            $scope.IsCloseRegionBtn = true
        }
        else {
            $scope.IsMultiselectRegion = false
            $scope.IsCloseRegionBtn = false
        }
    }
    $scope.IsCloseRegions = function () {
        $scope.IsMultiselectRegion = false;
        $scope.IsCloseRegionBtn = false;
    }
    $scope.findUser = function (findmodel) {
        $scope.userList = $scope.userMasterList.filter(row => row.userName.toLowerCase().includes(findmodel.toLowerCase()));
    }
    function LoadUser() {
        let fetchmodel = JSON.parse(window.localStorage.getItem("token"));
        GlobalModal = fetchmodel;
        let body = {
            Token: fetchmodel.token
        };
        var model = {
            URL: Domain + "/api/user/ActiveUserList",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            let Respo = JSON.parse(Response.data);
            $scope.userList = Respo;
            $scope.userMasterList = $scope.userList;
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