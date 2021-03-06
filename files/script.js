var $=function(id) { return document.getElementById(id); }; 

var search = [ // Search Engines
    ["", "https://duckduckgo.com/html?q="], // DuckDuckGo (Default)
    ["!g", "https://www.google.com/search?q="], // Google
    ["!a", "https://myanimelist.net/search/all?q="], // MyAnimeList
    ["!i", "https://www.google.co.uk/search?tbm=isch&q="], // Google Images
    ["!y", "https://www.youtube.com/results?search_query="], // YouTube
    ["!w", "https://en.wikipedia.org/w/index.php?search="], // Wikipedia
    ["!n", "https://www.nyaa.se/?page=search&term="], //Nyaa
	["!t", "https://torrentz2.eu/search?f="], //torrentz2
];

function updateClock(){
    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    var seconds = currentTime.getSeconds()
    if (minutes < 10){
        minutes = "0" + minutes
    }
    if (seconds < 10){
    	seconds = "0" + seconds
    }
    var t_str = hours + ":" + minutes + ":" + seconds + " ";

    document.getElementById('time').innerHTML = t_str;
}

var i,ss="";

function init() {
    for(i=0;i<search.length;i++) if(search[i][0]=="") ss=search[i][1];
    if(ss=="") alert("Error: Missing default search engine!");

    showSearchList();

    updateClock();
	window.setInterval(function(){
		updateClock();
	}, 1000);
}

function handleQuery(e,q) { // Handle search query
    var key = e.keyCode || e.which;
 
    if(key == 13) { // Enter
        //var x=q.lastIndexOf("!");
        var x = q.indexOf("!");
 
        //if(x!=-1 && x>=q.length-2) {
        if(x == 0) {
            for(var i = 0; i < search.length; i++) {
                //if(search[i][0]==q.substr(x)) { // Find "*!i"
                if(search[i][0] == q.substr(0,2)) { // Find "!i*"
                    //window.open(search[i][1]+q.substr(0,x).replace(/&/g,"%26"));
                    window.open(search[i][1] + q.substr(2).replace(/&/g,"%26"));
 
                    $('q').value = "";
                    $('q').focus();
                    return true;
                }
            }
            // Invalid "!i", use default
            //window.open(ss+q.substr(0,x).replace(/&/g,"%26"));
            window.open(ss + q.substr(2).replace(/&/g,"%26"));
        } else {
            // "!i" where not specified, use default
            window.open(ss + q.replace(/&/g,"%26"));
        }
 
        $('q').value = "";
        $('q').focus();
    }
}

function showSearchList(){
    ele = document.getElementById("searchlist");
    //ele.innerHTML += "Available prefixes: " + '<br>'
    for (var i = search.length - 1; i >= 0; i--) {
        ele.innerHTML += search[i][0].toString() + '<br>';
    }
}