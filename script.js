const todoInput = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("add-todo-btn");
const taskListContainer = document.getElementById("task-list-container");
const taskList = document.getElementById("task-list");

addTodoBtn.addEventListener("click", addTodo);

/**
 * Adding todo, clearing input after adding
 */
function addTodo() {
  const newTodo = document.createElement("li");

  newTodo.innerHTML = todoInput.value;
  newTodo.style.cursor = "pointer";
  newTodo.style.listStyleType = "circle";

  // Add edit icon for making the todo editable later
  const editIcon = document.createElement("button");
  editIcon.innerHTML = "✏️";
  editIcon.style.cursor = "pointer";
  editIcon.style.marginLeft = "10px";

  newTodo.appendChild(editIcon);
  taskList.append(newTodo);

  todoInput.value = "";
}

/**
 * Update todo using Event Delegation to
 * capture click and perform edit or complete todo action
 */
taskList.addEventListener("click", handleTodoClick);

function handleTodoClick(event) {
  const clickedElement = event.target;

  // Handle marking todo as completed or not
  if (clickedElement.tagName === "LI" && !clickedElement.isContentEditable) {
    if (clickedElement.style.textDecoration === "") {
      clickedElement.style.textDecoration = "line-through";
      clickedElement.style.listStyleType = "disc";
    } else {
      clickedElement.style.textDecoration = "";
      clickedElement.style.listStyleType = "circle";
    }
  }

  // Handle editing the todo item when the edit button is clicked
  if (clickedElement.tagName === "BUTTON") {
    const todoItem = clickedElement.parentElement;

    if (todoItem.isContentEditable) {
      todoItem.contentEditable = "false";
      clickedElement.innerHTML = "✏️";
    } else {
      todoItem.contentEditable = "true";
      clickedElement.innerHTML = "✔️";
      todoItem.focus();
    }
  }
}
