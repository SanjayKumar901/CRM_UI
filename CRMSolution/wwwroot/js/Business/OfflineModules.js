$(document).ready(function () {
    let Exist = window.localStorage.getItem("offlinePrivilege");
    if (Exist == null) {
        var body = {
            Token: JsonWebToken.token,
            Privilegeid: 12
        }
        var model = {
            URL: Domain + "/api/Home/DashBoardPrivilages",
            PostString: JSON.stringify(body)
        }
        $.ajax({
            url: CallApiPostMethod,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(model),
            success: function (Response) {
                loadRadio(Response);
                window.localStorage.setItem("offlinePrivilege", JSON.stringify(lst))
            },
            error: function (Response) {
            }
        })
    }
    else {
        loadRadio(Exist);
    }
    
})
function loadRadio(str) {
    let lst = JSON.parse(str).filter(row => row.separation != "");
    let index = window.localStorage.getItem("selectedindex")
    $(lst).each(function (ind, ele) {
        if (index != null) {
            if (index == ind) {
                $("#options").append("<input class='dd' type='radio' checked onchange='change(" + ind + ")' name='offline' value='" + ele.privilegeName + "'/>" + ele.privilegeName)
            }
            else {
                $("#options").append("<input class='dd' type='radio' onchange='change(" + ind + ")' name='offline' value='" + ele.privilegeName + "'/>" + ele.privilegeName)
            }
        }
        else {
            $("#options").append("<input class='dd' type='radio' onchange='change(" + ind + ")' name='offline' value='" + ele.privilegeName + "'/>" + ele.privilegeName)
        }
    })
}
function change(obj) {
    //alert(obj)
    window.localStorage.setItem("selectedindex", obj)
    obj = $(".dd:checked").val();
    $.ajax({
        url: defaultpage + "/Business/SelectOfflineModules?option=" + obj,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (Response) {
            window.location.href = window.location.href
        },
        error: function (Response) {
        }
    })
}
