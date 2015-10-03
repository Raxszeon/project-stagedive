// -------------------------------- LÄGG TILL NY SPELNING  ----------------------------------------------------------------------------------

function show_page(sida,id) {
	
	var vald_sida = document.getElementById(sida);

		// Visa framsidan ----------------------------------------------------------------
		if(sida == 'page_show_list') {
			document.getElementById('page_add').classList.remove("show");
			document.getElementById('page_show_spelning').classList.remove("show");
			document.getElementById('page_show_topplista').classList.remove("show");
	
		// Visar vald spelning ----------------------------------------------------------------
		} else if(sida == 'page_show_spelning') {
			
			if(vald_sida.classList.contains("show")) {
				vald_sida.classList.remove("show");
			}else{
				vald_sida.classList.add("show");
				document.getElementById('page_add').classList.remove("show");
				document.getElementById('page_show_topplista').classList.remove("show");
				
				// Kör funktionen som visar spelningen
				show_spelning(id);			
				}
				
		// Visar Lägg till ----------------------------------------------------------------
		} else if(sida == 'page_add') {

			if(vald_sida.classList.contains("show")) {
				vald_sida.classList.remove("show");
			}else{
				vald_sida.classList.add("show");
				document.getElementById('page_show_spelning').classList.remove("show");
				document.getElementById('page_show_topplista').classList.remove("show");

				}
				
		// Visar topplista ----------------------------------------------------------------
		} else if(sida == 'page_show_topplista') {

			if(vald_sida.classList.contains("show")) {
				vald_sida.classList.remove("show");
			}else{
				vald_sida.classList.add("show");
				document.getElementById('page_show_spelning').classList.remove("show");
				document.getElementById('page_add').classList.remove("show");

				showTopplista();						
				}

		//Om något är fel så återgår den till star 	 ----------------------------------------------------------------
		}else{
			document.getElementById('page_add').classList.remove("show");
			document.getElementById('page_show_spelning').classList.remove("show");
		}
}


// -------------------------------- VISA VALD SPELNING  ----------------------------------------------------------------------------------

function show_spelning(id) {
	
	var spelningar = JSON.parse(localStorage.spelningar)[id];
	
	// Uppdaterar kartan med aktuella platsen
	findLocation(spelningar.stad);
	
	// Skriver ut informationen om spelningen
	document.getElementById("spelning_rubrik").innerHTML = spelningar.artist;
	document.getElementById("spelning_info").innerHTML = spelningar.datum+" - "+spelningar.arrangemang+", "+spelningar.stad;

	// Lägger till Radera-knapp
	document.getElementById("delete_button").setAttribute("onclick", "raderaSpelning("+id+")");	 
	
}

// -------------------------------- LÄGG TILL NY SPELNING  ----------------------------------------------------------------------------------

function addSpelning() {
	// Skapar objektet med spelningen
	var addSpelning = {};
		addSpelning.artist 			= document.getElementById("artist").value;
		addSpelning.arrangemang 	= document.getElementById("arrangemang").value;
		addSpelning.stad 			= document.getElementById("stad").value;
		addSpelning.datum 			= document.getElementById("datum").value;	
		addSpelning.favorit 		= false;
		addSpelning.favorit_rank	= ''; 	
		
		// Rensar så att formuläret är tomt 
		document.getElementById("artist").value = '';
		document.getElementById("arrangemang").value = '';
		document.getElementById("stad").value = '';
		document.getElementById("datum").value = '';
		
		// Kontrollera om localstorage finns med sparad data
		if(localStorage.spelningar === undefined) {
			
			var spelningar = [];
				spelningar.push(addSpelning);				
				localStorage.spelningar = JSON.stringify(spelningar);
				
		// Det fanns sparad localstorage, lägg till i denna
		} else {
			var spelningar = JSON.parse(localStorage.spelningar);
				spelningar.push(addSpelning);
				localStorage.spelningar = JSON.stringify(spelningar);
				}

 		// En Kort fördröjning sker innan menyn döjs
 		  setTimeout(function(){  
	 		  document.getElementById('page_add').classList.remove("show");
			}, 200);	
			
		// Uppdaterar sidan	
		showSpelningar()
}

// -------------------------------- VISAR LISTA MED SPELNINGAR ---------------------------------------------------------------------------

function showSpelningar() {
	
	// Tömmer diven med spelningar innan den laddar in den igen.	
	document.getElementById('spelningar_show').innerHTML = '';
	
	// Ifall det inte finns något sparat i localstorage så visas detta
	if(localStorage.spelningar === undefined) {
		document.getElementById('spelningar_show').innerHTML = 'Inga spelningar är sparade';
	
	// Om spelningar finns registrerade i localstorage skrivs dessa ut
	} else {
		spelningar = JSON.parse(localStorage.spelningar);
				
		for(var i=0; i<spelningar.length; i++){
		
			// Kontrollerar först om posten i arrayen är raderad eller ej
			if(spelningar[i] == null) {
				// Gör inget ifall den är satt till "null"

			// Spelningen är EJ raderad och loopas igenom som vanligt
			}else{
			var spelning_box=document.createElement('div');													// Skapar Div med spelningen
				spelning_box.id = "spelning_"+i; 															// Sätter ett ID på diven 
				// show_page('page_show_spelning','')

				document.getElementById('spelningar_show').appendChild(spelning_box);						// Lägger in den nya diven på sidan	

				spelning_box.innerHTML = "<span class=\"artist\" id=\"artist_"+i+"\">"+spelningar[i].artist+"</span><br>";	// Fyller på med innehåll
				document.getElementById('artist_'+i).setAttribute("onclick", "show_page('page_show_spelning','"+i+"')");	// Gör Artist länkbar		
				
				// Kontrollerar ifall en spelning är favorit-markerad och skapar länk för att ändra detta
				if(spelningar[i].favorit == true) {
					spelning_box.innerHTML += "<div class=\"favorit_star\" id=\"favorit_"+i+"\">&#9733;</div>";		
					document.getElementById('favorit_'+i).setAttribute("onclick", "favorit("+i+",false)");
					
				}else{
					spelning_box.innerHTML += "<div class=\"favorit_star\" id=\"favorit_"+i+"\">&#9734;</div>";							
					document.getElementById('favorit_'+i).setAttribute("onclick", "favorit("+i+",true)");
					}

				spelning_box.innerHTML += "<span class=\"datum\">"+spelningar[i].datum+"</span> - ";		
				spelning_box.innerHTML += "<span class=\"plats\">"+spelningar[i].arrangemang+", "+spelningar[i].stad+"</span>";	
			} // raderad
		} // loop
	} // localstorage
}

// -------------------------------- VISA TOPPLISTAN ---------------------------------------------------------------------------

function showTopplista() {
	document.getElementById('topplista_show').innerHTML = '';
	
	// Ifall det inte finns något sparat i localstorage så visas detta
	if(localStorage.spelningar === undefined) {
		document.getElementById('topplista_show').innerHTML = 'Inga spelningar är sparade. Går ej att skapa en topplista då.';
	
	// Om spelningar finns registrerade i localstorage skrivs dessa ut
	} else {
		spelningar = JSON.parse(localStorage.spelningar);
		
		for(var i=0; i<spelningar.length; i++){
		
			if(spelningar[i] == null || spelningar[i].favorit == false) {
				/*
					I loopen kontrollerar den om spelningen är raderade eller satt till favorit=False
					Om så är fallet hoppar den över denna posten.
				*/
			}else{
			var spelning_box=document.createElement('div');													// Skapar Div med spelningen
				spelning_box.id = "spelning_"+i; 															// Sätter ett ID på diven 
				document.getElementById('topplista_show').appendChild(spelning_box);						// Lägger in den nya diven på sidan	
				spelning_box.innerHTML = "<span class=\"artist\" id=\"favorit_artist_"+i+"\">"+spelningar[i].artist+"</span><br>";	// Fyller på med innehåll
				document.getElementById('favorit_artist_'+i).setAttribute("onclick", "show_page('page_show_spelning','"+i+"')");	// Gör Artist länkbar		
				
				// Klickar man på stjärnan i Topplistan raderas den valda posten.
				spelning_box.innerHTML += "<div class=\"favorit_star\" id=\"favorit_favorit_"+i+"\">&#9733;</div>";		
				document.getElementById('favorit_favorit_'+i).setAttribute("onclick", "favorit("+i+",false)");

				spelning_box.innerHTML += "<span class=\"datum\">"+spelningar[i].datum+"</span> - ";		
				spelning_box.innerHTML += "<span class=\"plats\">"+spelningar[i].arrangemang+", "+spelningar[i].stad+"</span>";	
			} // raderad
		} // loop
	} // localstorage
}



// -------------------- TA BORT VALD SPELNING ------------------------------------------------------------------------------------------

function raderaSpelning(id) {
		
	// Visar starsidan
	show_page('','');

	// Animation på vald post startar			
	document.getElementById("spelning_"+id).classList.add("delete");

	// En viss fördröjning sker innan en spelning raderas från listan. För att kompensera animationen
	  setTimeout(function(){ 
			var spelningar = JSON.parse(localStorage.spelningar);	// Öppnar arrayen	
			delete spelningar[id]; 									// Sätter valt id till null
			localStorage.spelningar = JSON.stringify(spelningar);	// Uppdaterar localstorage
			showSpelningar();										// Uppdatera visningslistan
	}, 5000);		
}


// -------------------- SÄTT VALD SPELNING TILL FAVORIT ------------------------------------------------------------------------------------------

function favorit(id,val) {
	 
	// Funktion för att markera en spelning som favorit			
	var spelningar = JSON.parse(localStorage.spelningar);
	spelningar[id].favorit = val;
	localStorage.spelningar = JSON.stringify(spelningar);

	showSpelningar();
	showTopplista();
	}