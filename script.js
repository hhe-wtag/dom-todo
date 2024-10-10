const todoInput = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("add-todo-btn");
const taskListContainer = document.getElementById("task-list-container");
const taskList = document.getElementById("task-list");

addTodoBtn.addEventListener("click", addTodo);

function addTodo() {
  const newTodo = document.createElement("li");
  newTodo.innerHTML = todoInput.value;
  const editIcon = document.createElement("span");
  newTodo.style.listStyleType = "circle";
  taskList.append(newTodo);

  todoInput.value = "";
}
