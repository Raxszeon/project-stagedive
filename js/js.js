// -------------------------------- LÄGG TILL NY SPELNING  ----------------------------------------------------------------------------------

function show_page(sida,id) {
	
	var vald_sida = document.getElementById(sida);

		// Visa framsidan
		if(sida == 'page_show_list') {
			document.getElementById('page_add').classList.remove("show");
			document.getElementById('page_show_spelning').classList.remove("show");
	
	
		// Visar vald spelning
		} else if(sida == 'page_show_spelning') {
			
			if(vald_sida.classList.contains("show")) {
				vald_sida.classList.remove("show");

			}else{
				vald_sida.classList.add("show");
				document.getElementById('page_add').classList.remove("show");
				
				// Kör funktionen som visar spelningen
				show_spelning(id);
				
				}
				
				

		// Visar Lägg till
		} else if(sida == 'page_add') {

			if(vald_sida.classList.contains("show")) {
				vald_sida.classList.remove("show");

			}else{
				vald_sida.classList.add("show");
				document.getElementById('page_show_spelning').classList.remove("show");
				}


		//Om något är fel så återgår den till star 	
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

		
		// Rensar så att formuläret är timt 
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
	
	// Tömmer diven med contacter innan den laddar in den igen.	
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
				spelning_box.setAttribute("onclick", "show_page('page_show_spelning','"+i+"')");			// Lägger till länk för att öppna varje 
				// show_page('page_show_spelning','')

				document.getElementById('spelningar_show').appendChild(spelning_box);						// Lägger in den nya diven på sidan	

				spelning_box.innerHTML = "<span class=\"artist\">"+spelningar[i].artist+"</span><br>";		// Fyller med innehåll...
				spelning_box.innerHTML += "<span class=\"datum\">"+spelningar[i].datum+"</span> - ";		
				spelning_box.innerHTML += "<span class=\"plats\">"+spelningar[i].arrangemang+", "+spelningar[i].stad+"</span>";	
			} // raderad
		} // loop
	} // localstorage
}


// -------------------- TA BORT VALD SPELNING ------------------------------------------------------------------------------------------

function raderaSpelning(id) {
		
	// Här kan vi addera en animation när spelningen raderas, använd id nedan
	//document.getElementById('spelning_'+id); 
	
	show_page('','');
			
	
	document.getElementById("spelning_"+id).classList.add("delete");

	
	  setTimeout(function(){  
			// Öppnar arrayen	
			var spelningar = JSON.parse(localStorage.spelningar);
			
			// Sätter valt id till null
			delete spelningar[id];
			
			// Uppdaterar localstorage
			localStorage.spelningar = JSON.stringify(spelningar);
		
			// Uppdatera visningslistan
			showSpelningar();

	}, 500);		
	

}


