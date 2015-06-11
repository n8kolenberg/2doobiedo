$(document).ready( function() {


//Hide initial warning to add task
$('.warning').hide();


//Use button click to add tasks
$('.submit-btn').on('click', function (event){
	event.preventDefault();
	var $newTask = $('input:text').val();
	if(!$.trim($newTask)) { 
		$('.warning').fadeIn(300);
	} else { 
		$('.warning').fadeOut(300);
		$('li:first').before("<li>"+$newTask+"</li>");
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


var updatedItem;
$('#sortable li').on('dblclick', function (){
	$(this).toggleClass('listclick');
	updatedItem = prompt('Update Item');
	$(this).html("<li>"+updatedItem+"</li>");

});// End jQuery selection for updateItem function



//Selectable




}); //End ready