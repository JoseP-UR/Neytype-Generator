function getURLParams(sParam) { //get parameters from th url
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
    }); //fills the json variable with a response object from the myjson api
    var regex = RegExp("[a-zA-Z]"); //regular expression to differentiate numbers and symbols

    $("#inpt").on("input", function() {
        var txt = $("#inpt").val().split(""); //when the input is changed, this array is filled all over again, this is done so the code is made simpler and less complex
        var imgarr = []; //array that saves the image tags, this is what is rendered to the page
        var letras = json.responseJSON; //pass the json object to this object
        for (var i = 0; i < txt.length; i++) {
            if (regex.test(txt[i])) { //test the regular expression
                imgarr.push("<img src='" + letras[txt[i].toUpperCase()] + "' type='image/png'>"); //if it's a letter, pushes an image tag to the array
            } else {
                imgarr.push(txt[i]); //if it's not a letter, then pushes the character as it is
            }

        }
        console.log(txt);
        // console.log(imgarr);
        $("#typezone").html(function() { //changes the html of the typezone
            if (!txt[0]) {
                return ""; //if there's no text, instead of empty tags, it won't render anything
            } else {
                return imgarr.join(''); //renders the full array, without commas
            }
        });
    });
    if (getURLParams('type')) {
        $("#inpt").val(getURLParams('type')); //if there is a parameter called 'type' on the url, fills the input area and the input event is triggered
        $("#inpt").trigger("input");
    }
});