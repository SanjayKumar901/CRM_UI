var app = angular.module("app", []);
app.controller("userFeedback", function ($scope, $http) {
    $scope.FeedBackModel = null;
    $scope.FeedbackText = null;
    $scope.FeadbackList = [];
    $scope.RatingCounter = [];
    LoadFeedback();
    loadRatingTag();
    $scope.AddFeedback = function () {
        let body = {
            Token: JsonWebToken.token,
            SelectedFeedbackID: $scope.FeedBackModel.id,
            FeedbackText: $scope.FeedbackText,
            Rating: $(".ratingcheck:checked").length
        };
        let model = {
            URL: Domain + "/api/Home/AddFadBack",
            PostString: JSON.stringify(body)
        };
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
        }, function () {
        });
    }
    $scope.checkRate = function (checkRate) {
        $(".ratingcheck").each(function (ind, val) {
            if ($(".ratingcheck").eq(ind)[0].checked== true) {
                $(".ratingcheck").eq(ind)[0].checked= false
            }
        })
        for (var i = 0; i <= checkRate; i++) {
            $(".ratingcheck").eq(i)[0].checked = true
        }
    }
    function LoadFeedback() {
        let body = {
            Token: JsonWebToken.token
        };
        let model = {
            URL: Domain + "/api/Master/GetFadBackOptions",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "FeadbackList")
    }
    function loadRatingTag() {
        for (var i = 0; i < 5; i++) {
            $scope.RatingCounter.push(i);
        }
    }
    function BindtypeData(url, body, scope) {
        $http.post(url, body).then(function (Response) {
            if (Response.data != "") {
                $scope[scope] = JSON.parse(Response.data);
            }
        }, function () {
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