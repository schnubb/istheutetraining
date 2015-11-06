/*
* Main Javascripts.
*
*/
if(iourl === undefined) {
    var iourl = window.location.protocol + "//";
        iourl+= window.location.hostname;
        iourl+= (window.location.port === "")?":64566" : ":"+window.location.port;
}

var socket;

$(document).ready(function(){
    socket = io.connect(iourl)
});
