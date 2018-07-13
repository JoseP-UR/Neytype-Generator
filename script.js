function getURLParams(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

$(document).ready(function() {
    var json = $.getJSON('https://api.myjson.com/bins/136ura', function(dados) {
        // console.log(dados);
        return dados;
    });
    var regex = RegExp("[a-zA-Z]");

    $("#inpt").on("input", function() {
        var txt = $("#inpt").val().split("");
        var imgarr = [];
        var letras = json.responseJSON;
        for (var i = 0; i < txt.length; i++) {
            if (regex.test(txt[i])) {
                imgarr.push("<img src='" + letras[txt[i].toUpperCase()] + "' type='image/png'>");
            } else {
                imgarr.push(txt[i]);
            }

        }
        console.log(txt);
        // console.log(imgarr);
        $("#typezone").html(function() {
            if (!txt[0]) {
                return "";
            } else {
                return imgarr.join('');
            }
        });
    });
    if (getURLParams('type')) {
        $("#inpt").val(getURLParams('type'));
        $("#inpt").trigger("input");
    }
});