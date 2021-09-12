var app = angular.module("app", []);
app.controller("appcontroll", function ($scope, $http) {
    $scope.users = null;
    $scope.IsSave = false;
    $scope.UserResponse = [];
    $scope.GetSampleFile = function () {
        let body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/Setup/GetSampleBulkImportFle",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            if (Response.data == "Not Found.") {
                alert(Response.data)
            }
            else {
                window.open(Response.data, "_blank");
            }
        }).then(function (Response) {

        })
    }
    $scope.UploadFile = function () {
    /* $("#btnUpload").attr("disabled", "disabled");*/
        var form = new FormData();
        var file = $("#file").get(0);
        for (var i = 0; i < file.files.length; i++) {
            form.append("file_" + file.files[i].name, file.files[i])
        }
        form.append("Token", JsonWebToken.token);
        form.append("Domain", Domain);
        $.ajax({
            url: defaultpage + '/setup/CallFile',
            type: 'POST',
            dataType: 'json',
            data: form,
            contentType: false,
            processData: false,
            success: function (Response) {
                $("#btnUpload").removeAttr("disabled");
                $scope.IsSave = true;
                $scope.UserResponse = JSON.parse(Response.response);
                $scope.$apply()
            },
            error: function (Response) {
                alert('Error!');
            }
        })
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