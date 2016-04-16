var start;

// Will hold current time
var curr;
var imgInd = 1;


// Takes the time in milliseconds and converts it in a usable fashion
function formatTime(time) {
    // converts the time in hours
    var hours = Math.floor(time / (1000 * 60 * 60));
    // converts the time to minutes
    var minutes = Math.floor(time / (1000 * 60)) % 60;
    // converts the time to seconds
    var seconds = Math.floor(time / 1000) % 60;

    // formatting for seconds
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    seconds = ":" + seconds

    // formatting for hours
    if (hours == 0) {
        hours = "";
    } else {
        hours += ":";
    }

    // formatting for minutes
    if (minutes == 0) {
        minutes = "";
    }
    // returns the final result as a string
    return hours + minutes + seconds;
}



// Update the time from load
function updateInfo() {
    // gets the currrent time
    date = new Date();
    curr = date.getTime();

    // changes what the html document displays as the time
    document.getElementById('time').innerHTML = formatTime((curr - start));


    if (Math.floor((curr - start) / 1000 / 60 * 5) % 2 == 1) {
        document.getElementById("pic").src = imgInd + ".jpg";
        imgInd = imgInd + 1 % 5 + 1;
        if (imgInd = 4) {
            imgInd = 1
        }
    }

    // delays the function for 1ms
    setInterval(updateInfo, 100);
}
/*
window.addEventListener("load", updateInfo);
window.onload = function() {
    document.getElementById("time").innerHTML = "DEFAULT_TIME";
    if (readCookie("startTime") !="" && readCookie("startTime") != null) {
        start = readCookie("startTime");
    } else {
        // Time when extensions starts
        var date = new Date();
        start = date.getTime();
    }
    console.log(start);
}
window.onunload = function() {
    console.log("Start=" + start);
    if (readCookie("startTime") == null) {
        createCookie("startTime", start, 1);
    }
}*/
window.addEventListener("load", updateInfo);
window.onload = function() {
    document.getElementById("time").innerHTML = "DEFAULT_TIME";
    console.log("hey");
    if (readCookie("startTime") != "undefined" && readCookie("startTime") != null && readCookie("startTime") != "") {
        console.log("1");
        start = readCookie("startTime");
    } else { // Time when extensions starts
        console.log("2");
        var date = new Date();
        start = date.getTime();
    }
    console.log(start);
}
window.onunload = function() {
    console.log("Start=" + start);
    if (readCookie("startTime") != null) {
        createCookie("startTime", start, 1 / 24 / 20);
    }
    if (start == "") {
        eraseCookie("startTime");
    }
}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var end = "; end=" + date.toGMTString();
    } else var end = "";
    document.cookie = name + "=" + value + end + "; path=/";
}

function readCookie(name) {
    var newName = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var ck = ca[i];
        while (ck.charAt(0) == ' ') {
            ck = ck.substring(1, ck.length);
        }
        if (ck.indexOf(newName) == 0) {
            return ck.substring(newName.length, ck.length);
        }
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}
