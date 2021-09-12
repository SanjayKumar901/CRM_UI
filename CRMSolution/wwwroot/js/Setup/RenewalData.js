var app = angular.module("app", []);
app.controller("importrenewal", function ($scope, $http) {

    $scope.ImportData = function () {
        var form = new FormData();
        var file = $("#file").get(0);
        for (var i = 0; i < file.files.length; i++) {
            form.append("file_" + file.files[i].name, file.files[i])
        }
        form.append("Token", JsonWebToken.token);
        form.append("Domain", Domain + "/api/setup/ImportRenewal");
        $.ajax({
            url: defaultpage + '/setup/ImportRenewalData',
            type: 'POST',
            dataType: 'json',
            data: form,
            contentType: false,
            processData: false,
            success: function (Response) {
                $("#btnUpload").removeAttr("disabled");
                alert(Response.response);
            },
            error: function (Response) {
                alert('Error!');
            }
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