//SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');

//EVENT HANDLERS
todoBtn.addEventListener('click', addTodo);

//FUNCTIONS
function addTodo(e) {
	//PREVENT FORM FROM SUBMITTING
	e.preventDefault();
	//CREATE TODO DIV
	const todoDiv = document.createElement('div');
	todoDiv.classList.add('todo');
	//CREATE LI
	const newTodo = document.createElement('li');
	newTodo.innerText = todoInput.value;
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
	//CLEAR TODO INPUT FIELD
	todoInput.value = '';
}
