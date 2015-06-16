$(document).ready( function() {

$('input:text').focus();

//Hide initial warning to add task
$('.warning').hide();


//Add icons for completion and deletion
var completeMark = '<span class="completeMark"></span>'
var deleteMark = '<span class="deleteMark"></span>'



//Make instructions appear and disappear
$('.intro h3').addClass('close');
$('.intro h3').on('click', function() {
	var $instructions = $(this).next('p');
	if ($instructions.is(':visible')) {
		$instructions.slideUp(200);
		$(this).addClass('open')
	} else { 
		$instructions.slideDown(200);
		$(this).removeClass('open');
	} //End if else statement
}); //End on click


//Sub Feature of Adding tasks by pressing enter
$('.input-field').on('keydown', function (event) {
	if(event.which === 13) {
		event.preventDefault();
		var $newTask = $('input:text').val();
		if(!$.trim($newTask)) { 
			$('.warning').fadeIn(300);
		} else { 
			$('.warning').fadeOut(300);
			$('<li class="tasks" contenteditable="true">'+ $newTask + completeMark + deleteMark + '</li>').prependTo('#sortable')
			.css({
				opacity : 0,
				marginTop : "-10px"
			})
			.animate({
				opacity : 1,
				marginTop : 0
			}, 300);
			prioritize();
		} //End if statement
		$('input:text').val('').focus();
	} //End if statement
}); // End on keydown


//Make the Task List Sortable
// $(function() {
// 	$('#sortable').sortable({
// 		axis : "y",
// 		cancel : ':input, button, [contenteditable]'
// 	});
// })// End sortable function


//Add contenteditable = true via a dblclick handler
// $(function(){
//  $('#sortable').on('dblclick', 'li', function(){
//    $(this).attr('contenteditable', 'true');
//  });
// });


//Make it possible to complete tasks
// $('#sortable').on('click', 'li', function(){
// 	$(this).toggleClass('selected');

// }); //End Click

//Feature to delete selected tasks
$('.delete').on('click', function(event) {
	event.preventDefault();
	$('li').fadeOut(1000);
	$('li').remove();
});


//Feature to add priority colors to tasks based on position
function prioritize() {
$('#sortable').children().filter(function(index) {
	console.log(index);
	if (index >= 6) {
		$(this).addClass("chill");
	} else if (index > 2 && index < 6) {
		$(this).addClass("medium");
	} else {
		$(this).addClass("hot");
	}
	return false;
	}); //End filter
}

}); //End ready