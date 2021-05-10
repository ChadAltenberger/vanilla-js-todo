//SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//EVENT HANDLERS
document.addEventListener('DOMContentLoaded', getTodos);
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteOrCheck);
filterOption.addEventListener('change', filterTodos);

//FUNCTIONS
function addTodo(e) {
	//PREVENT FORM FROM SUBMITTING
	e.preventDefault();
	//CREATE TODO DIV
	const todoDiv = document.createElement('div');
	todoDiv.classList.add('todo');
	//CREATE <li>
	const newTodo = document.createElement('li');
	newTodo.innerText = todoInput.value;
	newTodo.classList.add('todo-item');
	todoDiv.appendChild(newTodo);
	//ADD TODO TO LOCAL STORAGE
	saveLocalTodos(todoInput.value);
	//CHECK MARK BUTTON
	const completedBtn = document.createElement('button');
	completedBtn.innerHTML = "<i class='fas fa-check'></i>";
	completedBtn.classList.add('complete-btn');
	todoDiv.appendChild(completedBtn);
	//TRASH BUTTON
	const trashBtn = document.createElement('button');
	trashBtn.innerHTML = "<i class='fas fa-trash'></i>";
	trashBtn.classList.add('trash-btn');
	todoDiv.appendChild(trashBtn);
	//APPEND TO LIST
	todoList.appendChild(todoDiv);
	//CLEAR TODO INPUT FIELD
	todoInput.value = '';
}

function deleteOrCheck(e) {
	const item = e.target; //item will be whichever element is clicked on

	//DELETE TODO
	if (item.classList[0] === 'trash-btn') {
		const todo = item.parentElement; //to get access to the actual <li> and not the trash-btn
		//ANIMATION
		todo.classList.add('fall');
		removeTodos(todo);
		todo.addEventListener('transitionend', () => todo.remove()); //eventListener that will run function only when the transition is done
	}

	//MARK TODO COMPLETED
	if (item.classList[0] === 'complete-btn') {
		const todo = item.parentElement;
		todo.classList.toggle('completed'); //adds/removes the class 'completed' to the todoList div
	}
	filterTodos();
}

function filterTodos(e) {
	const todos = todoList.childNodes; //gets access to each list item (todo)
	todos.forEach(todo => {
		switch (filterOption.value) {
			case 'all':
				todo.style.display = 'flex';
				break;
			case 'completed':
				if (todo.classList.contains('completed')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
			case 'uncompleted':
				if (!todo.classList.contains('completed')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
		}
	});
}

function saveLocalTodos(todo) {
	//CHECK IF THERE IS ALREADY A LIST OF TODOS IN LOCAL STORAGE
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos')); //parses the json data from the object(todos) into the array created above
	}
	todos.push(todo); //adds the most recently created todo onto the array of todos in local storage
	localStorage.setItem('todos', JSON.stringify(todos)); //sets the array back into local storage
}

function getTodos() {
	//CHECK IF THERE IS ALREADY A LIST OF TODOS IN LOCAL STORAGE
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos')); //parses the json data from the object(todos) into the array created above
	}
	todos.forEach(todo => {
		//CREATE TODO DIV
		const todoDiv = document.createElement('div');
		todoDiv.classList.add('todo');
		//CREATE <li>
		const newTodo = document.createElement('li');
		newTodo.innerText = todo;
		newTodo.classList.add('todo-item');
		todoDiv.appendChild(newTodo);
		//CHECK MARK BUTTON
		const completedBtn = document.createElement('button');
		completedBtn.innerHTML = "<i class='fas fa-check'></i>";
		completedBtn.classList.add('complete-btn');
		todoDiv.appendChild(completedBtn);
		//TRASH BUTTON
		const trashBtn = document.createElement('button');
		trashBtn.innerHTML = "<i class='fas fa-trash'></i>";
		trashBtn.classList.add('trash-btn');
		todoDiv.appendChild(trashBtn);
		//APPEND TO LIST
		todoList.appendChild(todoDiv);
	});
}

function removeTodos(todo) {
	//CHECK IF THERE IS ALREADY A LIST OF TODOS IN LOCAL STORAGE
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos')); //parses the json data from the object(todos) into the array created above
	}
	const todoIndex = todo.children[0].innerText; //gets the index of the specific <li> by navigating down through the todo <div>
	todos.splice(todos.indexOf(todoIndex), 1); //deletes 1 item starting from that specific index found in the line above
	localStorage.setItem('todos', JSON.stringify(todos)); //updates the local storage
}
