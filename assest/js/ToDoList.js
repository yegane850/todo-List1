let $ = document;
let inputElem = $.querySelector("input[name='add']");
let addTodoForm = $.querySelector(".add");
let todoUlElem = $.querySelector(".todos");
let todoCountElem = $.querySelector("#todo-count");

let itemToDelete;

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.forEach(todo => addNewTodo(todo, false));
}

function saveTodos() {
  const todos = [];
  todoUlElem.querySelectorAll('li span').forEach(span => {
    todos.push(span.innerHTML);
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

function updateTodoCount() {
  let count = todoUlElem.children.length;
  todoCountElem.innerHTML = `You Have ${count} pending tasks`;
}

function showToast(message) {
  Toastify({
    text: message,
    duration: 800,
    gravity: "top",
    position: 'center',
    backgroundColor: "linear-gradient(to right, #4caf50, #8bc34a)",
  }).showToast();
}

function addNewTodo(newTodoValue, showToastMessage = true) {
  let newTodoLi = $.createElement("li");
  newTodoLi.className = "list-group-item d-flex justify-content-between align-items-center";

  let newTodoTitleSpan = $.createElement("span");
  newTodoTitleSpan.innerHTML = newTodoValue;

  let newTodoTrash = $.createElement("i");
  newTodoTrash.className = "fa fa-trash-o delete";
  newTodoTrash.style.cursor = "pointer";

  

  newTodoLi.append(newTodoTitleSpan, newTodoTrash);
  todoUlElem.append(newTodoLi);
  saveTodos();
  updateTodoCount();
  if (showToastMessage) {
    showToast("مورد به لیست اضافه شد.");
  }
}

addTodoForm.addEventListener("submit", function (event) {
  event.preventDefault();
});

inputElem.addEventListener("keydown", function (event) {
  let newTodoValue = event.target.value.trim();

  if (event.keyCode === 13) {
    if (newTodoValue) {
      event.preventDefault();
      inputElem.value = "";
      addNewTodo(newTodoValue);
    }
  }
});

document.getElementById("save-todo").addEventListener("click", function () {
  let newTodoValue = inputElem.value.trim();
  if (newTodoValue) {
    inputElem.value = "";
    addNewTodo(newTodoValue);
  }
});

document.getElementById("confirm-delete-all").addEventListener("click", function () {
  todoUlElem.innerHTML = "";
  localStorage.removeItem('todos');
  updateTodoCount();
  showToast("همه موارد حذف شدند.");
  $('#clearAllModal').modal('hide');
});

loadTodos();