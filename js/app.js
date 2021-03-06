$(document).ready( function() {

//Put focus on the input field right away
$('input:text').focus();
//Hide initial warning to add task
$('.warning').hide();


//Add icons for completion and deletion
var completeMark = '<span class="completeMark icon-ok-circled2" contenteditable="false"></span>';
var deleteMark = '<span class="deleteMark icon-trash-empty" contenteditable="false"></span>';



//Sub Feature of Adding tasks by pressing enter
$('.input-field').on('keydown', function (event) {
	if(event.which === 13) {
		event.preventDefault();
		var $newTask = $('input:text').val();
		if(!$.trim($newTask)) { 
			$('.warning').fadeIn(300);
		} else { 
			$('.warning').fadeOut(300);
			$('<li class="tasks" contenteditable="true">'+ completeMark + $newTask + deleteMark + '</li>').prependTo('#sortable')
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
		$(this).parent().css({
			'text-decoration' : 'line-through',
			'color' : 'rgba(44, 62, 80, 0.5)'
		}); //End .css
	} else {
		$(this).removeClass('icon-ok-circled');
		$(this).addClass('icon-ok-circled2');
		$(this).parent().css({
			'text-decoration' : 'none',
			'color' : 'rgba(44, 62, 80, 1)'
		}); //End .css
	} //End if statement
});//End click

//Delete the tasks
$('#sortable').on('click', '.deleteMark', function(event){
	event.preventDefault();
		$(this).removeClass('icon-trash-empty');
		$(this).addClass('icon-trash-1');
		$(this).parent().attr("contenteditable", "false").fadeOut(1000).remove(100000);
		// $(this).parent().remove(100000);
});//End click


//Feature to delete all tasks
$('form').submit(function(event) {
	event.preventDefault();
	$('#sortable').children().fadeOut(500);
	$('#sortable').children().remove(1000);
}); //End submit function




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


// Wanted to try to preload images using jQuery
// var bgImage = new Image();
// bgImage.src = "img/notebook.jpeg";
// bgImage.onload();
// // 	function(){
// // 	$('.wrapper').css({
// // 		backgroundImage : url('../img/notebook.jpeg'),
// // 		backgroundSize : 'cover'
// // 	});
// // });//End onload function

}); //End ready