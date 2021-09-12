// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
var Messages = null;
var Domain = "http://localhost:50972";//CallAPIDomain();//
var CurentOrigin = window.location.origin;
var JsonWebToken = JSON.parse(window.localStorage.getItem("token"));
var CallApiPostMethod = "/Account/CallCheck";
var CallApiGetMethod = "/Account/CallGet";
var SaveUser = false;
var defaultpage = ""//"/myaccount";
var mont = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var mobileValidation = ["0000000000", "9999999999", "8888888888", "7777777777", "6666666666", "5555555555", "4444444444", "3333333333", "2222222222", "1111111111", "Nov", "Dec"];
$(document).ready(function () {
    $('.progress-barW').val('25');
    $(".Tableloader").text("Loading Data...");
    LoadLogo();
    OfflineMessage();
    CheckPageScript();
    CheckSupport();
    $("#userName").text(JSON.parse(window.localStorage.getItem("token")).userName);
    $("#btnAddUser").click(function () {
        $("#div").show();
        SaveUser = false;
    });
    $(".close").click(function () {
        $("#div").hide();
        window.localStorage.removeItem("create")
    });
    $("#AccountSettingShow").click(function () {
        $(".ShowAccount").show();
    })
    $("#CloseAccountSetting").click(function () {
        $(".ShowAccount").hide();
    })
    $("#gotoMypro").click(function () {
        window.location.href = "/myaccount/user/myprofile"
    })
    $("#ChangePass").click(function () {
        let fetchmodel = JSON.parse(window.localStorage.getItem("token"));
        let model = {
            Token: fetchmodel.token,
            OldPass: $("#OldPass").val(),
            NewPass: $("#NewPass").val(),
            ConfirmPass: $("#ConfirmPass").val()
        };
        let body = {
            URL: Domain + "/api/Account/ResetPass",
            PostString: JSON.stringify(model)
        };

        $.ajax({
            url: CallApiPostMethod,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(body),
            success: function (Response) {
                alert(Response);
                if (Response == "Data Updated Successfully.") {
                    Logout();
                }
            },
            error: function (Response) {

            }
        })
    })
    $("#logOut").click(function () {
        Logout();
    })
    $("#loadMessages").click(function () {
        $("#LoadingMessageList").empty()
        $("#LoadingMessageList").append("<a class='dropdown-item'>Loading...</a >")
        let fetchmodel = JSON.parse(window.localStorage.getItem("token"));
        let model = {
            Token: fetchmodel.token
        };
        let body = {
            URL: Domain + "/api/Home/QuoteRelatedMessageList",
            PostString: JSON.stringify(model)
        };
        $.ajax({
            url: CallApiPostMethod,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(body),
            success: function (Response) {
                $(".notification").hide();
                Messages = JSON.parse(Response);
                if (Messages.length > 0) {
                    let row = "";
                    $(Messages).each(function (idx, val) {
                        row += "<a class='dropdown-item' onclick='ShowMessage(" + val.id + ")'>" + val.message.slice(0, 10) + "...</a >";
                    })
                    $("#LoadingMessageList").empty()
                    $("#LoadingMessageList").append(row)
                }
                else {
                    $("#LoadingMessageList").empty()
                    $("#LoadingMessageList").append("<a class='dropdown-item'>No any messages.</a >")
                }
                console.log(Response)
            },
            error: function (Response) {
            }
        })
    });
    $("#CloseMessages").click(function () {
        $(".Createdmodal").hide();
    });
    function OfflineMessage() {
        let fetchmodel = JSON.parse(window.localStorage.getItem("token"));
        if (fetchmodel == null) {
            window.location.href = defaultpage//"/myaccount";
        }
        let model = {
            Token: fetchmodel.token
        };
        let body = {
            URL: Domain + "/api/Home/QuoteRelatedMessageCounter",
            PostString: JSON.stringify(model)
        };
        $.ajax({
            url: CallApiPostMethod,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(body),
            success: function (Response) {
                //alert(Response);
                if (Response <= 0)
                    $(".notification").hide();
                else {
                    $(".notification").show();
                    $(".notification").text(Response)
                }
            },
            error: function (Response) {
            }
        })
    }
    function LoadLogo() {
        if (window.localStorage.getItem("logo") != null) {
            $(".logoimage").attr("src", window.localStorage.getItem("logo"));
        }
        else {
            let querystring = new URLSearchParams(window.location.search);
            let qry = querystring.get("isrenew");
            if (qry == "renew") {
                $scope.isRenew = true;
            }
            let ss = window.location.host.replace("www.", "");
            var Body = {
                URL: ss
            };
            var model = {
                URL: Domain + "/api/Account/DomainLogo",
                PostString: JSON.stringify(Body)
            }
            $.ajax({
                url: CallApiPostMethod,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(model),
                success: function (Response) {
                    let LOGO = JSON.parse(Response).companyLogo;
                    $(".logoimage").attr("src", LOGO);
                    window.localStorage.setItem("logo", LOGO);
                },
                error: function (Response) {
                }
            })
        }
    }
    function CheckPageScript() {
        let model = {
            Token: JsonWebToken.token
        };
        let body = {
            URL: Domain + "/api/Master/GetPageScript",
            PostString: JSON.stringify(model)
        };
        $.ajax({
            url: CallApiPostMethod,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(body),
            success: function (Response) {
                if (Response != "[]") {
                    window.localStorage.setItem("scriptsdata", Response)
                    if (Response != "") {
                        $(JSON.parse(Response)).each(function (ind, val) {
                            if (val.pageUrl.toLowerCase().includes(window.location.pathname.toLowerCase())) {
                                $("#maybescript").append(val.script)
                            }
                        })
                    }
                }
            },
            error: function (Response) {
            }
        })
    }
    function CheckSupport() {
        let model = {
            Token: JsonWebToken.token
        };
        let body = {
            URL: Domain + "/api/Master/CheckConfigSupport",
            PostString: JSON.stringify(model)
        };
        $.ajax({
            url: CallApiPostMethod,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(body),
            success: function (Response) {
                if (Response != "") {
                    var json = JSON.parse(Response);
                    if (json.isActive) {
                        $("#isSupport").show()
                        $("#isSupport > a").attr("href", json.link)
                    }
                }
            },
            error: function (Response) {
            }
        })
    }
    try {
        $("#User").select2({
        })
        $("#UserActive").select2({
        });
        //Second Top Ready
        $(".select2me").select2({
        });
    }
    catch (ex) { }
});
function ShowMessage(messageid) {
    $(".notification").hide();
    $(".ShowMessages").show();
    let message = Messages.filter(row => row.id == messageid)[0]
    $("#singleOfflineMessage").text(message.message);
    $("#messageSubject").text(message.subject);
    let fetchmodel = JSON.parse(window.localStorage.getItem("token"));
    let model = {
        Token: fetchmodel.token,
        MessageID: messageid
    };
    let body = {
        URL: Domain + "/api/Home/ReadedMessage",
        PostString: JSON.stringify(model)
    };
    $.ajax({
        url: CallApiPostMethod,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(body),
        success: function (Response) {

        },
        error: function (Response) {
        }
    })
}
function Logout() {
    let fetchmodel = JSON.parse(window.localStorage.getItem("token"));
    let model = {
        Token: fetchmodel.token
    };
    let body = {
        URL: Domain + "/api/Account/LogOut",
        PostString: JSON.stringify(model)
    };

    $.ajax({
        url: CallApiPostMethod,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(body),
        success: function (Response) {
            window.location.href = "/";
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("navs");
            document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            window.localStorage.removeItem("scriptsdata");
            alert(Response);
        },
        error: function (Response) {

        }
    })
}
function checkEmail(email) {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(mailformat)) {
        return true;
    }
    else {
        return false;
    }
}
function phonenumber(inputtxt) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (inputtxt.match(phoneno)) {
        return true;
    }
    else {
        return false;
    }
}
function alphanumeric(inputtxt) {
    var letterNumber = /^[0-9a-zA-Z]+$/;
    if (inputtxt.match(letterNumber)) {
        return true;
    }
    else {
        return false;
    }
}
function Namevalidation(inputtext) {
    let exist = false;
    var numArray =
        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    $(numArray).each(function (inx, val) {
        if (inputtext.includes(val)) {
            exist = true;
            return true;
        }
    })
    return exist;
}
function CallAPIDomain() {
    var DomainMap = null;
    DomainMap = window.localStorage.getItem("getdomain");
    if (DomainMap == null) {
        $.ajax({
            url: "/Account/GetAPIDomain",
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            async: false,
            success: function (Response) {
                window.localStorage.setItem("getdomain", Response);
                DomainMap = Response;
            },
            error: function (Response) {

            }
        })
    }
    return DomainMap;
}
function endOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
function startOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}
function DateFormate(date) {
    let dateParam = new Date(date);
    let year = dateParam.getFullYear();
    let month = dateParam.getMonth() + 1;
    month = month > 9 ? month : "0" + month;
    let day = dateParam.getDate();
    day = day > 9 ? day : "0" + day;
    return year + "-" + month + "-" + day;
}
function OnlyNumAccept(event) {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
        return true
    }
    return false
}
function NotSpecialCharAccept(event) {
    let collectionKeys = ["`", "!", "@", "#", "$", "%", "^", "&", "*", "\\", "/", ".", "?", "<", ">", ":", ";", "'", ",", " ", "-"];
    if (collectionKeys.includes(event.key)) {
        return false
    }
    return true
}
function datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}
function dayDurationFromCurrent(duration) {
    var date = new Date()
    date = new Date(date.setDate(date.getDate() - duration))
    return date;
}
function ManageChars(data) {
    data.value = data.value.replaceAll(" ", "").replaceAll("-", "")
}