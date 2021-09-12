var app = angular.module("app", []);
app.controller("usersFeedback", function ($scope, $http) {
    $scope.FeedbackList = [];
    $scope.FeedbackListMaster = [];
    $scope.FeadbackOptionList = [];
    $scope.FeedBackModel = null;
    $scope.RatingCounter = [];
    LoadFeedback();
    LoadFeedbackList();
    loadRatingTag();
    $scope.filterwithfeedbackoption = function (FeedBackModel) {
        if (FeedBackModel == null) {
            $scope.FeedbackList = $scope.FeedbackListMaster;
        }
        if ($scope.FeedbackListMaster.length > 0) {
            $scope.FeedbackList = $scope.FeedbackListMaster.filter(row => row.feedbackOptionID = FeedBackModel.id);
        }
        
    }
    function loadRatingTag() {
        for (var i = 0; i < 5; i++) {
            $scope.RatingCounter.push(i);
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
        BindtypeData(CallApiPostMethod, model, "FeadbackOptionList")
    }
    function LoadFeedbackList() {
        let body = {
            Token: JsonWebToken.token
        };
        let model = {
            URL: Domain + "/api/User/UsersFeedbackList",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "FeedbackList")
    }
    function BindtypeData(url, body, scope) {
        $http.post(url, body).then(function (Response) {
            if (Response.data != "") {
                $scope[scope] = JSON.parse(Response.data);
                if (scope == "FeedbackList") {
                    $scope.FeedbackListMaster = $scope[scope]
                }
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