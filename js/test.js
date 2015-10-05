// $(document).ready( function() {

//Put focus on the input field right away
$('input:text').focus();
//Hide initial warning to add task
$('.warning').hide();



/* Overall To-do-list App	
======================================*/

function TodoList() {
	var self = this;
	this.localList = new LocalList();
	this.inputView = new InputView();
	this.listView = new ListView();

	for (var i = 0; i < this.localList.listItems.length; i++) {
		this.listView.addTask(this.localList.listItems[i]);
	}

}

TodoList.prototype.addTask = function(value) {
	// This is used to add the task to the list view
	this.listView.addTask(value);
	this.localList.addListItem(value);
	this.listView.calcTasksLeft();
};

TodoList.prototype.calcTasksLeft = function() {
	this.listView.calcTasksLeft();
};


TodoList.prototype.deleteTask = function() {
	this.listView.deleteTask();
	this.listView.calcTasksLeft();
}


TodoList.prototype.removeItemFromLocal = function(index) {
	this.localList.removeListItem(index);
}

TodoList.prototype.deleteMultiple = function(value) {
	this.localList.removeListItem(value);
	this.listView.deleteMultiple(value);
	this.listView.calcTasksLeft();
}

/* InputView
======================================
======================================*/

function InputView() {
	var self = this;
	this.input = $("input:text");
	this.addButton = $('#addButton');
	this.removeCompletedButton = $('#removeCompleted');
	this.removeAllButton = $('#removeAllButton');

	this.addButton.click(this.validateInput.bind(this));
	this.removeCompletedButton.click(this.removeComplete.bind(this));
	this.removeAllButton.click(this.removeAllTasks.bind(this));
	this.input.keydown(function(event){
		if(event.which == 13) {
			self.addButton.click();
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
}; // End validateInput



InputView.prototype.removeAllTasks = function() {
	var $tasks = $('li');
	todoList.deleteMultiple($tasks);
}; // End removeAllTasks


InputView.prototype.removeComplete = function() {
	var $completedTasks = $('li.checked');
	todoList.deleteMultiple($completedTasks);
}; // End removeComplete function



/* ListView
======================================
======================================*/

function ListView () {
	this.taskListUl = $('#taskList');
	this.taskListUl.on('click', 'span.completeMark', this.checkTask.bind(this));
	this.taskListUl.on('click', 'span.deleteMark', this.deleteTask.bind(this));
}

// Function that will calculate the amount of tasks:
// as a total / checked off / still left to do
ListView.prototype.calcTasksLeft = function() {
	var todos = {
		active : 0,
		checked : 0
	}
	var allItems = $('li');
	allItems.each(function() {
		todos.total++;
		if($(this).hasClass('checked')) {
			todos.checked++;
		} else {
			todos.active++;
		}
	}); // End allItems.each()
	var html = "Tasks left to do: " + todos.active;
	html += " Tasks checked " + todos.checked;
	$('#itemsLeft').text(html);
}; // End calcTasksLeft


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
ListView.prototype.checkTask = function(event) {
	$(event.target).closest('span').toggleClass('icon-ok-circled').toggleClass('icon-ok-circled2')
				.closest('li').toggleClass('checked');
	// Recalc the tasks left			
	this.calcTasksLeft();
}; // End checkTask function


// Delete the list items (and remove from DOM)
ListView.prototype.deleteTask = function(event) {
	$(event.target).closest('span.deleteMark').toggleClass('icon-trash-1').toggleClass('icon-trash-empty')
				.closest('li.tasks')
				.slideUp(function() {
					var itemIndex = $(this).index();
					todoList.removeItemFromLocal(itemIndex);
				}).remove();
	// Recalc the tasks left			
	this.calcTasksLeft();
}; // End deleteTask function

ListView.prototype.deleteMultiple = function(value) {
	value.remove();
};


/* LocalStorage to store items
======================================
======================================*/
function LocalList() {
	this.listItems = [];
	this.load();
}

LocalList.prototype.load = function(value) {
	var listItems = localStorage.getItem('2doList');
	if(listItems) {
		this.listItems = JSON.parse(listItems);
		console.log(this.listItems);

	}
};

LocalList.prototype.save = function() {
	localStorage.setItem('2doList', JSON.stringify(this.listItems));
};

LocalList.prototype.addListItem = function(value) {
	this.listItems.push(value);
	this.save();
};

LocalList.prototype.removeListItem = function(index) {
	this.listItems.splice(index, 1);
	this.save();
};


// Initialize the app
var todoList = new TodoList();
// }); //End ready






$checkedItems.each(function(index) {
	var array = [];
	array.push(this);
	return array;
});



