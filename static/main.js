$(document).ready(function() {
    // Get the base path
    var basePath = window.location.pathname;
    basePath = basePath.replace("/","")
    console.log(basePath);
    $("#" + basePath).addClass("active");
    console.log($("#" + basePath));
});