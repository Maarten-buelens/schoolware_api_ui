function display_current_date(){
    const weekday = ["Zondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag"];
  
    let day = weekday[time.getDay()];;
    let month = time.getMonth()+ 1;
    let year = time.getFullYear();
  

    
    
    let currentDate = `${day} ${time.getDate()}/${month}/${year}`;
    var element = document.getElementById("date");
    element.innerHTML = currentDate;
    
   
  }

