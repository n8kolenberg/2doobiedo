$(document).ready( function() {

//Main Feature of Adding Tasks
$('.submit-btn').on('click', function (event){
	event.preventDefault();
	var newTask = $('.input-field').val()
	$('#sortable').prepend("<li>"+newTask+"</li>");
	$('.input-field').val('')

}); //End on click


//Sub Feature of Adding tasks by pressing enter
$('.input-field').on('keydown', function (event) {
	if(event.which === 13) {
		event.preventDefault();
		var newTask = $('.input-field').val();
		$('#sortable').prepend("<li>"+newTask+"</li>");
		$('.input-field').val('')
		
	}
}); // End on keydown

$('#sortable').sortable({axis : "y"});

// $('#sortable li').on('click', function(){
// 	alert($(this).text());
// });
var updatedItem;

$('#sortable li').on('dblclick', function (){
	$(this).toggleClass('listclick');
	updatedItem = prompt('Update Item');
	$(this).html("<li>"+updatedItem+"</li>"); //End replaceWith callback

}); //End sortable


//Selectable




}); //End ready