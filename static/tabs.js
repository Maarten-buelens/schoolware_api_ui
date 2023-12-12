

const time = new Date();
var state = 1

function tabs(tab) {
    var element = document.getElementById("content");
    state = tab

    //for agenda
    if (tab == 1) {
        document.cookie = "page=1;expires=Fri, 31 Dec 9999 23:59:59 GMT";
        document.getElementById("1").classList.add("hover");
        document.getElementById("2").classList.remove("hover");
        document.getElementById("3").classList.remove("hover");
        document.getElementById("4").classList.remove("hover");


        element.innerHTML = "<div class='loader'></div>";


        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            element.innerHTML =
                this.responseText;
            display_current_date();
        }
        if (time.getMonth() + 1 < 10) {
            month = time.getMonth() + 1
            var month = "0" + month.toString();

        }
        else {
            var month = time.getMonth() + 1;
        }
        if (time.getDate()< 10) {
            day = time.getDate();
            var day = "0" + day.toString();
        }
        else {
            var day = time.getDate();
        }

        xhttp.open("GET", "/agenda?date=" + `${time.getFullYear()}-${month}-${day}` + " 00:00:00");

        xhttp.send();

        


    }

    //for punten
    if (tab == 2) {
        document.cookie = "page=2;expires=Fri, 31 Dec 9999 23:59:59 GMT";
        document.getElementById("1").classList.remove("hover");
        document.getElementById("2").classList.add("hover");
        document.getElementById("3").classList.remove("hover");
        document.getElementById("4").classList.remove("hover");


        element.innerHTML = "<div class='loader'></div>";
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            element.innerHTML = "<div class='loader'></div>".innerHTML =
                this.responseText;
        }
        xhttp.open("GET", "/punten");
        xhttp.send();
    }

    //for todo
    if (tab == 3) {
        document.cookie = "page=3;expires=Fri, 31 Dec 9999 23:59:59 GMT";
        document.getElementById("1").classList.remove("hover");
        document.getElementById("2").classList.remove("hover");
        document.getElementById("3").classList.add("hover");
        document.getElementById("4").classList.remove("hover");


        element.innerHTML = "<div class='loader'></div>";
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            element.innerHTML = "<div class='loader'></div>".innerHTML =
                this.responseText;
        }
        xhttp.open("GET", "/todo");
        xhttp.send();

    }

    //for todo
    if (tab == 4) {
            document.cookie = "page=4;expires=Fri, 31 Dec 9999 23:59:59 GMT";
            document.getElementById("1").classList.remove("hover");
            document.getElementById("2").classList.remove("hover");
            document.getElementById("3").classList.remove("hover");
            document.getElementById("4").classList.add("hover");
    
    
            element.innerHTML = "<div class='loader'></div>";
            const xhttp = new XMLHttpRequest();
            xhttp.onload = function () {
                element.innerHTML = "<div class='loader'></div>".innerHTML =
                    this.responseText;
            }
            xhttp.open("GET", "/jaartotaal");
            xhttp.send();
    
        }
}

function agenda_date() {

}


