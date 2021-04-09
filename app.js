//SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');

//EVENT HANDLERS
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteOrCheck);

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

function deleteOrCheck(e) {
	const item = e.target; //item will be whichever element is clicked on

	//DELETE TODO
	if (item.classList[0] === 'trash-btn') {
		const todo = item.parentElement; //to get access to the actual <li> and not the trash-btn
		//ANIMATION
		todo.classList.add('fall');
		todo.addEventListener('transitionend', () => todo.remove()); //eventListener that will run function only when the transition is done
	}

	//MARK TODO COMPLETED
	if (item.classList[0] === 'complete-btn') {
		const todo = item.parentElement;
		todo.classList.toggle('completed'); //adds/removes the class 'completed' to the todoList div
	}
}
