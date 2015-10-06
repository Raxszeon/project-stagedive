// ------------- KONTROLLERAR ATT FORMULÄRET ÄR RÄTT IFYLLT INNAN DET BEHANDLAS ----------------

function validate_form(e) {
		e.preventDefault();
		var artist 		= document.getElementById('artist'); 
		var arrangemang = document.getElementById('arrangemang'); 
		var stad 		= document.getElementById('stad'); 
		var datum 		= document.getElementById('datum');
		var error = 0;
				
		// ---- KONTROLLERAR ARTISTNAMNET ------------------------------------------------------
		if(!artist || artist.value.length < 2) { 
				artist.classList.add("red");
				error = 1;
			}else{
				artist.classList.remove("red");	
				}
		
		// ---- KONTROLLERAR ARRANGEMANG -------------------------------------------------------
		if(!arrangemang || arrangemang.value.length < 2) { 
				arrangemang.classList.add("red");
				error = 1;
			}else{ 
				arrangemang.classList.remove("red"); 
				}
					
		// ---- KONTROLLERAR STAD -------------------------------------------------------------
		if(!stad || stad.value.length < 2) { 
				stad.classList.add("red");
				error = 1;
			}else{ 
				stad.classList.remove("red"); 
			}

		// ---- KONTROLLERAR DATUM ------------------------------------------------------------
		if(!datum.value) { 
				datum.classList.add("red");
				error = 1;
			}else{ 
				datum.classList.remove("red"); 
			}


// Om inga fel har upptäckts går den vidare och lägger till spelningen ------------------------
	if(error == 0){
		addSpelning();
	}
	// Men om det finns fel läggs classen red till där fel är upptäckta och formuläret stannar.
		
}