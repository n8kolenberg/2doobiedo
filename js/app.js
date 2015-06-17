$(document).ready( function() {

//Put focus on the input field right away
$('input:text').focus();
//Hide initial warning to add task
$('.warning').hide();


//Add icons for completion and deletion
var completeMark = '<span class="completeMark icon-ok-circled2"></span>'
var deleteMark = '<span class="deleteMark icon-trash-empty"></span>'



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
			$('input:text').val('').focus();
		} //End if statement to determine whether to show warning
	} //End if statement to determine whether Enter has been pressed
}); // End on keydown



//Complete the tasks
$('#sortable').on('click', '.completeMark', function(event){
	event.preventDefault();
	if($(this).hasClass('icon-ok-circled2')) {
		$(this).removeClass('icon-ok-circled2');
		$(this).addClass('icon-ok-circled');
		$(this).parent().css('text-decoration', 'line-through');
	} else {
		$(this).removeClass('icon-ok-circled');
		$(this).addClass('icon-ok-circled2');
		$(this).parent().css('text-decoration', 'none');
	} //End if statement
});//End click

//Delete the tasks
$('#sortable').on('click', '.deleteMark', function(event){
	event.preventDefault();
		$(this).removeClass('icon-trash-empty');
		$(this).addClass('icon-trash-1');
		$(this).parent().fadeOut(1000);
		$(this).parent().remove(100000);
});//End click


//Feature to delete selected tasks
$(':submit').on('submit', '#sortable', function(event) {
	event.preventDefault();
	$(this).children().fadeOut(500);
});












/*Other Tests I've tried throughout the assignment
============================================================
============================================================*/

// //Make instructions appear and disappear
// $('.intro h3').addClass('close');
// $('.intro h3').on('click', function() {
// 	var $instructions = $(this).next('p');
// 	if ($instructions.is(':visible')) {
// 		$instructions.slideUp(200);
// 		$(this).addClass('open')
// 	} else { 
// 		$instructions.slideDown(200);
// 		$(this).removeClass('open');
// 	} //End if else statement
// }); //End on click






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



//Feature to add priority colors to tasks based on position
// function prioritize() {
// $('#sortable').children().filter(function(index) {
// 	console.log(index);
// 	if (index >= 6) {
// 		$(this).addClass("chill");
// 	} else if (index > 2 && index < 6) {
// 		$(this).addClass("medium");
// 	} else {
// 		$(this).addClass("hot");
// 	}
// 	return false;
	// }); //End filter
// } //End prioritize function

}); //End ready