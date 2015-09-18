// $(document).ready( function() {

//Put focus on the input field right away
$('input:text').focus();
//Hide initial warning to add task
$('.warning').hide();


/* VIEW
* We need an input validator that checks whether the user has typed in something
* It should give the user a message to enter something if they haven't typed anything in
*/


/* Overall To-do-list App	
======================================*/

function TodoList () {
	var self = this;
	this.inputView = new InputView();
	this.listView = new ListView();
}

TodoList.prototype.addTask = function(value) {
	// This is used to add the task to the list view
	this.listView.addTask(value)
}



/* InputView
======================================*/

function InputView () {
	var self = this;
	this.input = $("input:text");
	this.button = $('#button');
	this.button.click(this.validateInput.bind(this));
	this.input.keydown(function(event){
		if(event.which == 13) {
			self.button.click();
		}
	});
}


InputView.prototype.validateInput = function() {
	var inputVal = $("input:text").val();
	if ($.trim(inputVal) == "") {
		$('.warning').fadeIn(300);
	} else {
		$('.warning').fadeOut(300);
		// Add the item to the list
		todoList.addTask(inputVal);
	}
	
};


/* ListView
======================================*/

function ListView () {
	this.taskListUl = $('#taskList');
	this.taskListUl.on('click', 'span.completeMark', this.checkTask.bind(this));
	this.taskListUl.on('click', 'span.deleteMark', this.deleteTask.bind(this));
}

ListView.prototype.addTask = function(value) {
	// Adding the checked and delete icons
	var completeMark = "<span class='completeMark icon-ok-circled2' contenteditable='false'></span>";
	var deleteMark = "<span class='deleteMark icon-trash-empty' contenteditable='false'></span>";
	var task = "<li class='tasks' contenteditable='true'>";
	task += completeMark + value + deleteMark; 
	task += "</li>";
	// Prepend the tasks to the taskList ul
	this.taskListUl.prepend(task).find('li')
	.css({
		opacity: 0,
		marginTop: "-10px"
	})
	.animate({
		opacity: 1,
		marginTop: 0
	}, 100); // End prepend and smooth list item entry
	// Put the focus back on the input and wipe previous entry
	$('input:text').val("").focus();

};// End addTask function


// Check the list items
ListView.prototype.checkTask = function (event) {
	$(event.target).closest('span').toggleClass('icon-ok-circled').toggleClass('icon-ok-circled2')
				.closest('li').toggleClass('checked');
}; // End checkTask function

// Delete the list items
ListView.prototype.deleteTask = function () {
	$(event.target).closest('span.deleteMark').toggleClass('icon-trash-1').toggleClass('icon-trash-empty')
				.closest('li.tasks').fadeOut(200, function() {
					this.remove();
				}); // End callback function

}; // End deleteTask function




// Initialize the app
var todoList = new TodoList();
// }); //End ready