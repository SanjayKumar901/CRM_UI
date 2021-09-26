$(document).ready(function () {
    debugger;
    var baseUrl = "";
    var bodyDynamicId = $('#dynamicId');
    baseUrl = window.location.origin.split('//')[1];
    bodyDynamicId.removeClass();

    //By queryParama
    var queryParam = GetParameterValues('clientName');
    bodyDynamicId.addClass(queryParam);

    //By baseUrl
    //if (baseUrl == 'localhost:49832') {
    //    bodyDynamicId.addClass('backgroundChange');
    //}
    //else {
    //    bodyDynamicId.addClass('default');
    //}
});

function GetParameterValues(param) {
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < url.length; i++) {
        var urlparam = url[i].split('=');
        if (urlparam[0] == param) {
            return urlparam[1];
        }
    }
} 
