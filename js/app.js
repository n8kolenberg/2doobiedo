$(document).ready( function() {


//Hide initial warning to add task
$('.warning').hide();

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


//Use button click to add tasks
$('.submit-btn').on('click', function (event){
	event.preventDefault();
	var $newTask = $('input:text').val();
	if(!$.trim($newTask)) { 
		$('.warning').fadeIn(300);
	} else { 
		$('.warning').fadeOut(300);
		$('<li class="tasks">'+$newTask+'</li>').prependTo('ul#sortable')
		.css({
			opacity : 0,
			marginTop : "-10px"
		})
		.animate({
			opacity : 1,
			marginTop : 0
		}, 300);

		$('input:text').val('')
	} //End if statement
}); //End on click 


//Sub Feature of Adding tasks by pressing enter
$('.input-field').on('keydown', function (event) {
	if(event.which === 13) {
		event.preventDefault();
		$('.submit-btn').click();
		$('input:text').val('')
	} //End if statement
}); // End on keydown


//Make the Task List Sortable
$('#sortable').sortable({axis : "y"});


//Feature to edit added tasks/items
// var updatedItem;
// $('#sortable').on('dblclick', 'li', function (){
// 	updatedItem = prompt('Update Item');
// 	$(this).html('<li class="tasks">'+updatedItem+'</li>');
// });// End jQuery selection for updateItem function



//Make it possible to complete tasks
$('#sortable').on('click', 'li', function(){
	$(this).toggleClass('selected');

}); //End Click

//Feature to delete selected tasks
$('.delete').on('click', function(event) {
	event.preventDefault();
	$('.selected').slideUp();
});


//Priority colors
$('.tasks:lt(5)').addClass("hot");
$('.tasks:lt(10)').addClass("medium");



}); //End ready