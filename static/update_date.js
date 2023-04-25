function update_date(up) {
    if (up) {


        time.setDate(time.getDate() + 1);



        var element = document.getElementById("content");
        document.cookie = "page=1;expires=Fri, 31 Dec 9999 23:59:59 GMT";
        element.innerHTML = "<div class='loader'></div>";
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            element.innerHTML =
                this.responseText;
            const weekday = ["Zondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag"];
  
            let day = weekday[time.getDay()];;
            date = `${day} ${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`;
            var date_element = document.getElementById("date");
            date_element.innerHTML = date;
        }
        
        if (time.getMonth() + 1 < 10) {
            month = time.getMonth() + 1
            var month = "0" + month.toString();

        }
        else {
            var month = time.getMonth() + 1;
        }


        xhttp.open("GET", "/agenda?date=" + `${time.getFullYear()}-${month}-${time.getDate()}` + " 00:00:00");
        xhttp.send();






    }

    else {


        time.setDate(time.getDate() - 1);


        var element = document.getElementById("content");
        document.cookie = "page=1;expires=Fri, 31 Dec 9999 23:59:59 GMT";
        element.innerHTML = "<div class='loader'></div>";
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            element.innerHTML =
                this.responseText;
            const weekday = ["Zondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag"];
  
            let day = weekday[time.getDay()];;
            date = `${day} ${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`;
            var date_element = document.getElementById("date");
            date_element.innerHTML = date;
        }
        if (time.getMonth() + 1 < 10) {
            month = time.getMonth() + 1
            var month = "0" + month.toString();

        }
        else {
            var month = time.getMonth() + 1;
        }


        xhttp.open("GET", "/agenda?date=" + `${time.getFullYear()}-${month}-${time.getDate()}` + " 00:00:00");
        xhttp.send();

    }
}