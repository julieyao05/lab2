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
	$(function () {
  		$('[data-toggle="popover"]').popover()
	});	
	$('.addBtn').click(function() {
		ga('send', 'event', 'add', 'click');
	});
}


