// Restricted sites
var restricted = [];
// Restricted sitesin appropriate formatTime
var format = [];


// Takes the restricted sites and updates them
function updateSites() {
    // clears restricted sites;
    restricted = [];

    // initial index for sites
    var ind = 0;
    // get the text from the site textarea
    var siteInfo = document.getElementById("sites").value;

    // Adds a newline character to the site so there is always one at the end
    siteInfo += "\n";

    // will store site temporarily
    var site;

    // loops through test to obtain all sites and adds them to the list
    while (siteInfo.indexOf("\n") != -1) {
        // Assigns site to first line
        site = siteInfo.substring(0, siteInfo.indexOf("\n"));
        // Adds site to list if not already present
        if (restricted.indexOf(site) == -1 && site.length != 0) {
            restricted[restricted.length] = site;
        }
        //Updates siteInfo accordingly
        siteInfo = siteInfo.substring(siteInfo.indexOf("\n") + 1);

        // Call function to reformat sites in format
        // that webRequest can process "*://site.com/*"
        formatIt();
    }

}

function formatIt() {
    //clears format.
    format = [];
    // initialize counter
    var i = 0;
    // new site in correct format
    var temp;
    // loops through each restricted site
    for (i = 0; i < restricted.length; i++) {
        // finds the web portion of the url
        var first = restricted[i].indexOf(".") + 1;
        var second = restricted[i].indexOf(".", restricted[i].indexOf(".") + 1);

        // adds required formatting
        temp = "https://www." + restricted[i].substring(first, second) + "com*";
        format[i] = temp;
    }
}

function workIt() {
    var surl;
    console.log("hey");
    chrome.tabs.query({
            "active": true,
            "lastFocusedWindow": true
        },
        function(tabs) {
            surl = tabs[0].url;
            console.log(surl);
            var i;
            for (i = 0; i< restricted.length; i++){
              if (String(url).indexOf("facebook") != -1) {
                  chrome.tabs.update(tabs.id, {
                      url: "https://www.hmc.edu/"
                  });
              }
            }
        }
    );
    setInterval(workIt, 3000);

}

// Waits until page loads to call function
window.onload = function() {
    var butt = document.getElementById("saveIt");
    butt.addEventListener("click", updateSites);
    workIt();
}
