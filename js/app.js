// $(document).ready( function() {

//Put focus on the input field right away
$('input:text').focus();
//Hide initial warning to add task
$('.warning').hide();


/* VIEW
* We need an input validator that checks whether the user has typed in something
* It should give the user a message to enter something if they haven't typed anything in
*/

function InputView() {
	this.element = $('.input-field');
	this.button = $('.btn-warning');
	this.button.click(this.validateInput.bind(this));
	var self = this.validateInput.bind(this);
	this.element.keydown(this.validateInput.bind(this));
}

InputView.prototype.validateInput = function(event) {
	var inputVal = $('.input-field').val();
	if($.trim(inputVal) === "") {
		$('.warning').fadeIn(300);
	} else {
		$('.warning').fadeOut(300);
		listView.addListItem(inputVal);
	}
}; // End validateInput function

var inputView = new InputView();

//----------------------------------
//----------------------------------

function ListView() {
	this.element = $('#sortable');
	this.element.on('click', '.icon-trash-empty', this.deleteListItem.bind(this));
	this.element.on('click', '.icon-ok-circled2', this.checkListItem.bind(this))
}

ListView.prototype.addListItem = function(value) {
	//Add icons for completion and deletion
	var completeMark = '<span class="completeMark icon-ok-circled2" contenteditable="false"></span>';
	var deleteMark = '<span class="deleteMark icon-trash-empty" contenteditable="false"></span>';
	var listItem = "<li class='tasks' contenteditable='true'>";
	listItem += completeMark;
	listItem += value;
	listItem += deleteMark + "</li>";
	$('#sortable').append(listItem)
	.css({
		opacity : 0,
		marginTop : "-10px"
	})
	.animate({
		opacity : 1,
		marginTop : 0
	}, 300); //End append with animation
	$('input:text').val('').focus();
}

ListView.prototype.checkListItem = function(event) {
	$(event.target).closest('span').toggleClass('icon-ok-circled2').toggleClass('icon-ok-circled')
		.closest('li')
		.toggleClass('checked');
}

ListView.prototype.deleteListItem = function() {
	$(event.target).closest('li').attr("contenteditable", "false").fadeOut('fast').remove(10000);
}

var listView = new ListView();



//Controller

// var completeMark = '<span class="completeMark icon-ok-circled2" contenteditable="false"></span>';
// var deleteMark = '<span class="deleteMark icon-trash-empty" contenteditable="false"></span>';

// //Sub Feature of Adding tasks by pressing enter
// $('.input-field').on('keydown', function (event) {
// 	if(event.which === 13) {
// 		event.preventDefault();
// 		var $newTask = $('input:text').val();
// 		if(!$.trim($newTask)) { 
// 			$('.warning').fadeIn(300);
// 		} else { 
// 			$('.warning').fadeOut(300);
// 			$('<li class="tasks" contenteditable="true">'+ completeMark + $newTask + deleteMark + '</li>').prependTo('#sortable')
// 			.css({
// 				opacity : 0,
// 				marginTop : "-10px"
// 			})
// 			.animate({
// 				opacity : 1,
// 				marginTop : 0
// 			}, 300);
// 			$('input:text').val('').focus();
// 		} //End if statement to determine whether to show warning
// 	} //End if statement to determine whether Enter has been pressed
// }); // End on keydown



// //Complete the tasks
// $('#sortable').on('click', '.completeMark', function(event){
// 		$(event.target).closest('span').toggleClass('icon-ok-circled2').toggleClass('icon-ok-circled')
// 		.closest('li')
// 		.toggleClass('checked');
// });//End click

// //Delete the tasks
// $('#sortable').on('click', '.deleteMark', function(event){
// 	event.preventDefault();
// 		$(this).removeClass('icon-trash-empty');
// 		$(this).addClass('icon-trash-1');
// 		$(this).parent().attr("contenteditable", "false").fadeOut(1000).remove(100000);
// });//End click


// //Feature to delete all tasks
// $('form').submit(function(event) {
// 	event.preventDefault();
// 	$('#sortable').children().fadeOut(500);
// 	$('#sortable').children().remove(1000);
// }); //End submit function

// }); //End ready