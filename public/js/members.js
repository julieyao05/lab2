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
	/*$.getJSON("data.json", function (json) {
		array = JSON.parse(json);
	});
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
	});*/
}

function addMemberToMom(name, side) {
	if(side == "Dad") {
		var ol = document.getElementById("dadlist");
	}
	else {
		/* search for mom's list */
		var ol = document.getElementById("momlist");
	}

	/* create ax button element */
	var button = document.createElement("button");
	button.setAttribute("id", name);

	var a = document.createElement("a");
	a.setAttribute('href', "javascript:void(0)");
	a.setAttribute("title", "Add New Member");
	a.onclick = function () {
		window.open("info?info="+name,"Ratting","width=550,height=170,0,status=0"); 
	}

	a.appendChild(document.createTextNode(name));

	button.appendChild(a);
	ol.appendChild(button);

}

function removeMember(name) {
	if(name == "dad" || name =="uncle") {
		var ol = document.getElementById("dadlist");
	}
	else {
		/* search for mom's list */
		var ol = document.getElementById("momlist");
	}

	ol.removeChild(document.getElementById(name));
}

function edit() {
	/**
	We're defining the event on the `body` element, 
	because we know the `body` is not going away.
				  Second argument makes sure the callback only fires when 
				  the `click` event happens only on elements marked as `data-editable`
				*/
	$('body').on('click', '[data-editable]', function(){
			  
		var $el = $(this);
				              
		var $input = $('<input id="editfield"/>').val( $el.text() );
		$el.replaceWith( $input );
		console.log($input);
				  
		var save = function(){
			var $span = $('<span data-editable />').text( $input.val() );
			$input.replaceWith( $span );
		};
				  
		/**
		We're defining the callback with `one`, because we know that
		the element will be gone just after that, and we don't want 
		any callbacks leftovers take memory. 
		Next time `p` turns into `input` this single callback 
		will be applied again.
		*/
		$input.one('blur', save).focus();
				  
	});
	return; 
		        	
}