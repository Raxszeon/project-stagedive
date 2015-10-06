// SKICKAR EN FÖRFRÅGAN TILL GOOGLE OM ATT SÖKA FRAM KORDINATER TILL VALD PLATS
function findLocation(location){

	// Prioriterar sökningar inom sverige
	location+='+sverige';
	ajaxRequest("https://maps.googleapis.com/maps/api/geocode/json?address="+location+"&key=AIzaSyC9_UOXzrd-P4BUM2LApWgZ0pN_FHW9bsg", response);
	}

function ajaxRequest(url, callback) {
    var XHR = null;
    if (XMLHttpRequest) {
        XHR = new XMLHttpRequest();
    } else {
        XHR = new ActiveXObject("Microsoft.XMLHTTP"); 
    }
    XHR.onreadystatechange = function () {
        if (XHR.readyState == 4 || XHR.readyState == "complete") {
            if (XHR.status == 200) {
                callback(XHR); 
            } else {
                alert("fel på servern");
                /*
	              Här skall vi nog försöka skapa en bild som visas 
	              istället för varningsrutan. ???
                */
            }
            
        }
    }
    XHR.open("GET", url, true);
    XHR.send(null);
}


// tolkar svar från google api och sparar koordinater i variabler. Lägger sedan till markör på ny karta samt zoomar.
function response(XHR){ 
	

	var geoData=JSON.parse(XHR.responseText);
    var results=geoData.results; 
    
    if(results.length == 0) {
	    
	// Felmeddelande.när den ej hittar något ???     
	    
    } else {
   
	    var lng=results[0].geometry.location.lng;
	    var lat=results[0].geometry.location.lat;
	
		map='http://maps.googleapis.com/maps/api/staticmap?center=' + lat + ',' + lng;  
		map +='&zoom=7&size=320x400&style=element:labels|visibility:on&markers=color:red|' + lat + ',' + lng;
	
		document.getElementById('map').src=map;
	}
}
