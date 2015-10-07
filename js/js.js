// -------------------------------- LÄGG TILL NY SPELNING  ----------------------------------------------------------------------------------

function show_page(sida,id) {
	
	var vald_sida = document.getElementById(sida);
	
	// Spela upp click-ljud
	 document.getElementById("sound_click").play();	

		// Visa framsidan ----------------------------------------------------------------
		if(sida == 'page_show_list') {
			document.getElementById('page_add').classList.remove("show");
			document.getElementById('page_show_spelning').classList.remove("show");
			document.getElementById('page_show_topplista').classList.remove("show");
			document.getElementById('add').classList.remove("nav_active");
			document.getElementById('favourites').classList.remove("nav_active");
			document.getElementById('user').classList.add("nav_active");
	
		// Visar vald spelning ----------------------------------------------------------------
		} else if(sida == 'page_show_spelning') {
			
			if(vald_sida.classList.contains("show")) {
				vald_sida.classList.remove("show");
			}else{
				vald_sida.classList.add("show");
				document.getElementById('page_add').classList.remove("show");
				document.getElementById('page_show_topplista').classList.remove("show");
				document.getElementById('add').classList.remove("nav_active");
				document.getElementById('favourites').classList.remove("nav_active");
				document.getElementById('user').classList.add("nav_active");
				show_spelning(id);			
				}
				
		// Visar Lägg till ----------------------------------------------------------------
		} else if(sida == 'page_add') {

			if(vald_sida.classList.contains("show")) {
				vald_sida.classList.remove("show");
				document.getElementById('add').classList.remove("nav_active");
				
			}else{
				vald_sida.classList.add("show");
				document.getElementById('page_show_spelning').classList.remove("show");
				document.getElementById('page_show_topplista').classList.remove("show");
				document.getElementById('add').classList.add("nav_active");
				document.getElementById('favourites').classList.remove("nav_active");
				document.getElementById('user').classList.remove("nav_active");
				}
				
		// Visar topplista ----------------------------------------------------------------
		} else if(sida == 'page_show_topplista') {

			if(vald_sida.classList.contains("show")) {
				vald_sida.classList.remove("show");
				document.getElementById('favourites').classList.remove("nav_active");

			}else{
				vald_sida.classList.add("show");
				document.getElementById('page_show_spelning').classList.remove("show");
				document.getElementById('page_add').classList.remove("show");
				document.getElementById('add').classList.remove("nav_active");
				document.getElementById('favourites').classList.add("nav_active");
				document.getElementById('user').classList.remove("nav_active");
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
	
	// Kontrollerar ifall spelningen är favorit-markerad och skapar länk för att ändra detta
	if(spelningar.favorit == true) {
		document.getElementById('favorit_star_big').innerHTML = "&#9733;";		
		document.getElementById('favorit_star_big').setAttribute("onclick", "favorit("+id+",false,'show')");
		document.getElementById('favorit_star_big').classList.add("active");
		
		
	}else{
		document.getElementById('favorit_star_big').innerHTML = "&#9734;";							
		document.getElementById('favorit_star_big').setAttribute("onclick", "favorit("+id+",true,'show')");
		document.getElementById('favorit_star_big').classList.remove("active");

		}	
	
	
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
				
				//Sorterar om 
				spelningar.sort(sort_by_date);		
				
				localStorage.spelningar = JSON.stringify(spelningar);
				}

 		// En Kort fördröjning sker innan menyn döjs
 		  setTimeout(function(){  
	 		  document.getElementById('page_add').classList.remove("show");
	 		  
	 		  	// Spela upp ljud som visar att den är tillagd
	 		  	document.getElementById("sound_added").play();	
	 		  
			}, 200);	
			
		// Uppdaterar sidan	
		showSpelningar()
}
// -------------------------------- SORTERINGSMÖJLIGHETER FÖR ARRAY -------------------------------------------------------------------------

 function sort_by_date(a, b) {
	if(a.datum) { 
	    return new Date(a.datum).getTime() - new Date(b.datum).getTime();				
		}
	}

 function sort_by_rank(a, b) {
	if(a.favorit_rank) { 
	    return a.favorit_rank - b.favorit_rank;				
		}
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
		
		// Sorterar om efter datum och uppdaterar localStorage med nya sorteringen
		spelningar.sort(sort_by_date);		
		localStorage.spelningar = JSON.stringify(spelningar);
		

		// Loopar ut alla spelningar						
		for(var i=0; i<spelningar.length; i++){
			var spelning_box=document.createElement('div');													// Skapar Div med spelningen
				spelning_box.id = "spelning_"+i; 															// Sätter ett ID på diven 
				// show_page('page_show_spelning','')

				document.getElementById('spelningar_show').appendChild(spelning_box);						// Lägger in den nya diven på sidan	

				spelning_box.innerHTML = "<span class=\"artist\" id=\"artist_"+i+"\">"+spelningar[i].artist+"</span><br>";	// Fyller på med innehåll
				document.getElementById('artist_'+i).setAttribute("onclick", "show_page('page_show_spelning','"+i+"')");	// Gör Artist länkbar		
				
				// Kontrollerar ifall en spelning är favorit-markerad och skapar länk för att ändra detta
				if(spelningar[i].favorit == true) {
					spelning_box.innerHTML += "<div class=\"favorit_star\" id=\"favorit_"+i+"\">&#9733;</div>";		
					document.getElementById('favorit_'+i).setAttribute("onclick", "favorit("+i+",false,'start')");
					document.getElementById('favorit_'+i).classList.add("active");
					
				}else{
					spelning_box.innerHTML += "<div class=\"favorit_star\" id=\"favorit_"+i+"\">&#9734;</div>";							
					document.getElementById('favorit_'+i).setAttribute("onclick", "favorit("+i+",true,'start')");
					document.getElementById('favorit_'+i).classList.remove("active");
					}

				spelning_box.innerHTML += "<span class=\"datum\">"+spelningar[i].datum+"</span> - ";		
				spelning_box.innerHTML += "<span class=\"plats\">"+spelningar[i].arrangemang+", "+spelningar[i].stad+"</span>";	
		} // loop
	} // localstorage
}

// -------------------------------- VISA TOPPLISTAN ---------------------------------------------------------------------------

function showTopplista() {
	
	var count = 0;
	
	document.getElementById('topplista_show').innerHTML = '';
	
	// Ifall det inte finns något sparat i localstorage så visas detta
	if(localStorage.spelningar === undefined) {
		document.getElementById('topplista_show').innerHTML = 'Inga spelningar är sparade. Går ej att skapa en topplista då.';
	
	// Om spelningar finns registrerade i localstorage skrivs dessa ut
	} else {
		spelningar = JSON.parse(localStorage.spelningar);
		
		// Sorterar om efter ordning
		spelningar.sort(sort_by_rank);				
		
		for(var i=0; i<spelningar.length; i++){
		
			if(spelningar[i].favorit !== false) {
			var spelning_box=document.createElement('div');												// Skapar Div med spelningen
				spelning_box.id = "spelning_"+i; 														// Sätter ett ID på diven 
				document.getElementById('topplista_show').appendChild(spelning_box);					// Lägger in den nya diven på sidan	
				

				spelning_box.innerHTML = "<span>\"HEJ\"</span>"

				// Visar namnet på artsten och gör detta klickbart.
				spelning_box.innerHTML = "<span class=\"artist\" id=\"favorit_artist_"+i+"\">"+spelningar[i].artist+"</span><br>";	
				document.getElementById('favorit_artist_'+i).setAttribute("onclick", "show_page('page_show_spelning','"+i+"')");		
				
				// Klickar man på stjärnan i Topplistan raderas den valda posten.
				spelning_box.innerHTML += "<div class=\"favorit_star\" id=\"favorit_favorit_"+i+"\">&#9733;</div>";		
				document.getElementById('favorit_favorit_'+i).setAttribute("onclick", "favorit("+i+",false,'topplista')");
				document.getElementById('favorit_favorit_'+i).classList.add("active");
				

				spelning_box.innerHTML += "<span class=\"datum\">"+spelningar[i].datum+"</span> - ";		
				spelning_box.innerHTML += "<span class=\"plats\">"+spelningar[i].arrangemang+", "+spelningar[i].stad+"</span>";	
				count++; // Updaterar räknevärket med hur många som är favorit markerade

				//Drag and drop

				spelning_box.draggable = true;
				var source;
				spelning_box.ondragstart = function drag(event){
					source = event.target;
					event.dataTransfer.setData('text/plain', event.target.innerHTML);
					event.dataTransfer.effectAllowed = 'move';
				}				
				spelning_box.ondragover = function dragOver(event){
					event.preventDefault();
					event.dataTransfer.dropEffect = 'move';
				}
				spelning_box.ondrop=function drop(event){

					if(event.target.className == 'datum'
						|| event.target.className == 'plats'
						|| event.target.className == 'artist'
						|| event.target.classList[0] == 'favorit_star'){
						return false;
					}
					else{
						event.preventDefault();
						event.stopPropagation();
						source.innerHTML = event.target.innerHTML;
						event.target.innerHTML = event.dataTransfer.getData('text/plain');
					}
				}
			} // favorit
		} // loop
	} // localstorage
	
	if(count == 0) {
		document.getElementById('topplista_show').innerHTML = 'Du har ej favoritmarkerat några spelningar. Tryck på stjärnan intill spelningen för att skapa en topplista.';
	}
	
}



// -------------------- TA BORT VALD SPELNING ------------------------------------------------------------------------------------------

function raderaSpelning(id) {

	// Visar startsida
	show_page('','');

	// Animation på vald post startar			
	document.getElementById("spelning_"+id).classList.add("delete");
	
	// Spela upp raderaljud
	 document.getElementById("sound_delete").play();

	// En viss fördröjning sker innan en spelning raderas från listan. För att kompensera animationen
	  setTimeout(function(){ 
			var spelningar = JSON.parse(localStorage.spelningar);	// Öppnar arrayen	
			delete spelningar[id]; 									// Sätter valt id till null
			
			/* 
				Lånad kodsnutt ifrån: http://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript
				Viss förändring har skett i koden.
			*/ 
			// STÄDAR UPP ARRAYEN
			var len = spelningar.length, i;
			for(i = 0; i < len; i++ )
			    spelningar[i] && spelningar.push(spelningar[i]);  
			spelningar.splice(0 , len);  
			
			localStorage.spelningar = JSON.stringify(spelningar);	// Uppdaterar localstorage
			showSpelningar();										// Uppdatera visningslistan
	}, 2000);		
}


// -------------------- SÄTT VALD SPELNING TILL FAVORIT ------------------------------------------------------------------------------------------

function favorit(id,val,page) {
	 
	// Funktion för att markera en spelning som favorit			
	var spelningar = JSON.parse(localStorage.spelningar);
	spelningar[id].favorit = val;
	localStorage.spelningar = JSON.stringify(spelningar);

	showSpelningar();
	showTopplista();
	
	// Ifall man har valt att uppdatera favorit när man visar vald spelningen uppdateras även denna.
	if(page == 'show') {
		show_spelning(id);	
		}
	
	}