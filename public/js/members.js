'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})


/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript connected!");
	var array;
	$.getJSON("data.json", function (json) {
		array = JSON.parse(json);
			/* loop through data, check the first that matches data*/
	});
	// use array
	$('#me').onClick(function (e) {
		window.href.location = "info?info=me";
	});
	$('#mom').onClick(function (e) {
		window.href.location = "info?info=mom";
	});
	$('#dad').onClick(function (e) {
		window.href.location = "info?info=dad";	
	});
	$('#uncle').onClick(function (e) {
		window.href.location = "info?info=uncle";
	});
	
}

function anagrammedName(name) {
	// Thanks, Internet Anagram Server!
	
	if (name == "Doug Engelbart") {
		return "Notable Grudge";
	} 
	else if (name == "Ivan Sutherland") {
		return "Vandal Heist Run";
	}
	else if (name == "JCR Licklider") {
		return "Crick Rid Jell";
	}
	else if (name == "Vannevar Bush") {
		return "Ravens Van Hub";
	}
	else if (name == "Alan C. Kay") {
		return "Canal Yak";
	}
	else if (name == "Allen Newell") {
		return "Ellen All New";
	}
	else if (name == "Lucy Suchman") {
		return "Lunacy Chums";
	}
	else if (name == "Grace Hopper") {
		return "Gear Chopper";
	}
	else {
		console.log(name + " not known for anagramming.");
		return name;
	}
}

function addMemberToMom() {
	/* search for mom's list */
	var ol = document.getElementById("momlist");
	/* create a button element */
	var button = document.createElement("button");
	button.appendChild(document.createTextNode("Uncle"));
	button.setAttribute("type", "button");
	button.setAttribute("onclick", "location.href='info?info=uncle'");
	ol.appendChild(button);

}