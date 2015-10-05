// $(document).ready(function(){

//Put focus on the input field right away
$('input:text').focus();
//Hide initial warning to add task
$('.warning').hide();



/* TodoList App
=============================*/
function TodoList() {
	this.localStoredItems = new LocalStorage();
	this.inputView = new InputView();
	this.listView = new ListView();

	for (var i = 0; i < this.localStoredItems.localItems.length; i++) {
		this.listView.addItem(this.localStoredItems.localItems[i]);
	}
}


TodoList.prototype.addItem = function(value) {
	this.listView.addItem(value);
	this.calcItemsLeft();
	this.localStoredItems.addItem(value);
};


TodoList.prototype.removeCompleted = function() {
	this.listView.removeCompleted();
	this.calcItemsLeft();
	this.localStoredItems.save();
};

TodoList.prototype.removeAll = function() {
	this.listView.removeAll();
	this.calcItemsLeft();
	this.localStoredItems.removeAll();
};

TodoList.prototype.calcItemsLeft = function() {
	var todos = {
		active : 0,
		checked : 0
	}
	var allItems = this.listView.taskListUl.children();
	allItems.each(function() {
		if($(this).hasClass('checked')) {
			todos.checked++;
		} else {
			todos.active++;
		}
	}); // End allItems.each()
	var html = "Tasks left to do: " + todos.active;
	html += " Tasks checked " + todos.checked;
	$('#itemsLeft').text(html);
}; //End calcItemsLeft



/* LocalStorage
=============================*/
function LocalStorage() {
	this.localItems = [];
	this.load();
}

LocalStorage.prototype.save = function() {
	localStorage.setItem('2doList', JSON.stringify(this.localItems));
};

LocalStorage.prototype.load = function() {
	var localItems = localStorage.getItem('2doList');
	if(localItems) {
		this.localItems = JSON.parse(localItems);
		console.log(localItems);
	}
};

LocalStorage.prototype.addItem = function(value) {
	this.localItems.push(value);
	this.save();
};

LocalStorage.prototype.removeItem = function(index) {
	this.localItems.splice(index, 1);
	this.save();
};

LocalStorage.prototype.removeAll = function() {
	this.localItems = [];
	this.save();
}



/* InputView
=============================*/
function InputView() {
	var self = this;
	this.input = $('input:text');
	this.addButton = $('#addButton');
	this.removeCompletedButton = $('#removeCompleted');
	this.removeAllButton = $('#removeAllButton');

	// Attach event handlers on the buttons
	this.addButton.on('click', this.validateInput.bind(this));
	this.removeCompletedButton.on('click', this.removeCompleted.bind(this));
	this.removeAllButton.on('click', this.removeAll.bind(this));
	this.input.on('keydown', function(event) {
		if(event.which == 13) {
			self.addButton.click();
		}
	})

}


//InputView methods on the prototype
//----------------------------------
InputView.prototype.validateInput = function(event) {
	var $inputVal = $('input:text').val();
	var $warning = $('.warning');
	if($.trim($inputVal) == "") {
		$warning.fadeIn();
	} else {
		$warning.fadeOut();
		// Add ListItem to the overall app list
		todoListApp.addItem($inputVal);
	}
};


InputView.prototype.removeCompleted = function() {
	todoListApp.removeCompleted();
}

InputView.prototype.removeAll = function() {
	todoListApp.removeAll();
};


/* ListView
=============================*/
function ListView() {
	this.taskListUl = $('#taskList')
	this.taskListUl.on('click', 'span.completeMark', this.checkItem.bind(this));
	this.taskListUl.on('click', 'span.deleteMark', this.removeItem.bind(this));
}

//ListView methods on the prototype
//----------------------------------
ListView.prototype.addItem = function(value) {
	// Adding the checked and delete icons
	var completeMark = "<span class='completeMark icon-ok-circled2' contenteditable='false'></span>";
	var deleteMark = "<span class='deleteMark icon-trash-empty' contenteditable='false'></span>";
	var task = "<li class='tasks' contenteditable='true'>";
	task += completeMark + value + deleteMark; 
	task += "</li>";
	// Prepend the tasks to the taskList ul
	this.taskListUl.append(task).find('li')
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
}; // End addItem();

ListView.prototype.removeItem = function(event) {
	$(event.target).closest('span.deleteMark').toggleClass('icon-trash-1').toggleClass('icon-trash-empty')
	.closest('li').fadeOut(function(){
		var itemIndex = $(this).index();
		// We now need to delete this item from localStorage
		todoListApp.localStoredItems.removeItem(itemIndex);
		$(this).remove();
		todoListApp.calcItemsLeft();
		//Gotta delete this from localStorage
	});
};

ListView.prototype.removeCompleted = function() {
	$checkedTasks = $('li.checked');
	$checkedTasks.each(function(index){
			
			todoListApp.localStoredItems.removeItem(index);
	}) // End each function to remove each checked item from localStorage
	.fadeOut(function(){
		$(this).remove();
		todoListApp.calcItemsLeft();
		//Gotta delete this from localStorage
	});
};

ListView.prototype.removeAll = function() {
	$allTasks = $('li');
	$allTasks.fadeOut(function(){
		$(this).remove();
		todoListApp.calcItemsLeft();
	});
};

ListView.prototype.checkItem = function(event) {
	$(event.target).closest('span').toggleClass('icon-ok-circled').toggleClass('icon-ok-circled2')
	.closest('li').toggleClass('checked');
	todoListApp.calcItemsLeft();
}

// Initiate app
var todoListApp = new TodoList();

// }); //End ready