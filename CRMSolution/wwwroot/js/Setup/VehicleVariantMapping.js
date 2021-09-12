var app = angular.module("app", []);
app.controller("vehiceMapp", function ($scope, $http) {
    $scope.Vehicle = null;
    $scope.makeModel = null;
    $scope.MakeModelList = null;
    $scope.Modal = null;
    $scope.ModalList = null;
    $scope.Variant = null;
    $scope.VariantList = null;
    $scope.FuelModal = null;
    $scope.FuelModalList = null;
    $scope.Comp = null;
    $scope.CompList = null;
    $scope.MappingList = null;
    $scope.changeVehhicle = function (vehilcel) {
        let body = {
            Token: JsonWebToken.token,
            Type: vehilcel
        };
        var model = {
            URL: Domain + "/api/setup/GetMotors",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "MakeModelList")
    }
    $scope.changeMake = function (MakeModel) {
        let body = {
            Token: JsonWebToken.token,
            Type: $scope.Vehicle,
            ID: MakeModel.manufacturerID
        };
        var model = {
            URL: Domain + "/api/setup/GetModels",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "ModalList")
    }
    $scope.changeModal = function (Modal) {
        let body = {
            Token: JsonWebToken.token,
            ID: Modal.vehicleID
        };
        var model = {
            URL: Domain + "/api/setup/GetVariants",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "VariantList")
    }
    $scope.OnFuelChange = function () {
        let body = {
            Token: JsonWebToken.token,
            Product:"motor"
        };
        var model = {
            URL: Domain + "/api/setup/GetCompanies",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "CompList")
    }
    $scope.GetDetails = function () {
        let body = {
            Token: JsonWebToken.token,
            make: $scope.makeModel.manufacturername,
            model: $scope.Modal.vehicleName,
            varientId: $scope.Variant.variantID,
            companyId: $scope.Comp.companyID,
            fuel: $scope.FuelModal.fuelname,
            vehiletypeId: $scope.Vehicle,
        };
        var model = {
            URL: Domain + "/api/Master/GetCompanyVehicleDetails",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "MappingList")
    }
    $scope.mapped = function (model) {
        let body = {
            Token: JsonWebToken.token,
            companyId: $scope.Comp.companyID,
            BrokerId: model.id,
            varientId: $scope.Variant.variantID,
            isMapp: model.isMapp
        };
        var model = {
            URL: Domain + "/api/Master/MapVehicle",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
        });
    }
    function ManageFuels(ReponseData) {
        let lst = [];
        let fnam = "";
        $(ReponseData).each(function (index, val) {
            switch (val.fuelID) {
                case 101:
                    fnam = "Petrol"
                    break;
                case 102:
                    fnam = "Diesel"
                    break;
                case 103:
                    fnam = "Petrol CNG"
                    break;
                case 104:
                    fnam = "Petrol LPG"
                    break;
                case 105:
                    fnam = "Battery"
                    break;
                case 106:
                    fnam = "Electric"
                    break;
                case 107:
                    fnam = "Hybrid"
                    break;
                case 1101:
                    fnam = "Hybrid"
                    break;
            }
            let valdata = {
                fuelID: val.fuelID,
                fuelname: fnam
            };
            if (lst.findIndex(row => row.fuelID == val.fuelID) < 0)
                lst.push(valdata);
        })
        $scope.FuelModalList = lst;
    }
    function BindtypeData(url, body, scope) {
        $http.post(url, body).then(function (Response) {
            try {
                $scope[scope] = JSON.parse(Response.data);
                if (scope == "VariantList") {
                    ManageFuels(JSON.parse(Response.data))
                }
            }
            catch (ex) { }
        });
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