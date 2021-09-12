var app = angular.module("app", []);
app.controller("mastervehicle", function ($scope, $http) {
    $scope.selectvehilceType = null;
    $scope.selectvehilceTypevar = null;
    $scope.selectManufacturer = null;
    $scope.selectManufacturervar = null;
    $scope.selectVehilcevar = null;
    $scope.selectedVehilceList=null
    $scope.ManufacturerList = null;
    $scope.VehicleList = null;
    $scope.ManufacturerName = null;
    $scope.IsPc = false;
    $scope.IsBike = false;
    $scope.VehicleName = null;
    $scope.FuelList = null;
    $scope.selectFuel = null;
    $scope.VariantName = null;
    $scope.VariantCC = null;
    $scope.SeatingCapacity = null;
    $scope.SeatingCapacity = null;
    $scope.ExShowroomPrice = null;
    $scope.VariantList=null
    LoadManufacturer();
    $scope.saveManufacture = function () {
        let body = {
            Token: JsonWebToken.token,
            IsCar: $scope.IsPc,
            IsBike: $scope.IsBike,
            IsActive: $("input[name='Active']:checked").val() == "true" ? true : false,
            ManufacturerName: $scope.ManufacturerName
        };
        var model = {
            URL: Domain + "/api/Setup/AddManufacturer",
            PostString: JSON.stringify(body)
        };
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
        }, function () {
        })
    }
    $scope.CallVehicle = function () {
        let body = {
            Token: JsonWebToken.token,
            VehicleProperty: "vehicle"
        };
        var model = {
            URL: Domain + "/api/setup/VehicleDetails",
            PostString: JSON.stringify(body)
        };
        BindtypeData(CallApiPostMethod, model, "VehicleList");
    }
    $scope.saveVehicle = function () {
        let body = {
            Token: JsonWebToken.token,
            VehicleType: $scope.selectvehilceType,
            ManufacturerID: $scope.selectManufacturer.manufacturerID,
            IsActive: $("input[name='VActive']:checked").val() == "true" ? true : false,
            VehicleName: $scope.VehicleName
        };
        var model = {
            URL: Domain + "/api/Setup/AddVehicle",
            PostString: JSON.stringify(body)
        };
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
        }, function () {
        })
    }
    $scope.CallVariants = function () {
        GetFuels();
        GetVariants();
    }
    $scope.changeselectManufacturer = function (Manufacturer) {
        let lstVehicles = $scope.VehicleList.filter(row => row.manufacturerID == Manufacturer.manufacturerID);
        $scope.selectedVehilceList = lstVehicles;
    }
    $scope.SaveVariant = function () {
        let body = {
            Token: JsonWebToken.token,
            VehicleID: $scope.selectVehilcevar.vehicleID,
            VariantName: $scope.VariantName,
            VehicleCC: parseInt($scope.VariantCC),
            SeatingCapacity: parseInt($scope.SeatingCapacity),
            ExShowroomPrice: parseFloat($scope.ExShowroomPrice),
            FuelID: parseInt($scope.selectFuel.fuelID),
            IsActive: $("input[name='varActive']:checked").val() == "true" ? true : false,
        };
        var model = {
            URL: Domain + "/api/Setup/AddVariant",
            PostString: JSON.stringify(body)
        };
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
        }, function () {
        })
    }
    function LoadManufacturer() {
        let body = {
            Token: JsonWebToken.token,
            VehicleProperty:"manufacturer"
        };
        var model = {
            URL: Domain + "/api/setup/VehicleDetails",
            PostString: JSON.stringify(body)
        };
        BindtypeData(CallApiPostMethod, model, "ManufacturerList");
    }
    function BindtypeData(url, body, scope) {
        $http.post(url, body).then(function (Response) {
            $scope[scope] = JSON.parse(Response.data);
        }, function () {
        })
    }
    function GetFuels() {
        let body = {
            Token: JsonWebToken.token,
            VehicleProperty: "fuels"
        };
        var model = {
            URL: Domain + "/api/setup/VehicleDetails",
            PostString: JSON.stringify(body)
        };
        BindtypeData(CallApiPostMethod, model, "FuelList");
    }
    function GetVariants() {
        let body = {
            Token: JsonWebToken.token,
            VehicleProperty: "variants"
        };
        var model = {
            URL: Domain + "/api/setup/VehicleDetails",
            PostString: JSON.stringify(body)
        };
        BindtypeData(CallApiPostMethod, model, "VariantList");
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