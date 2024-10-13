const $todoInput = document.getElementById("todo-input");
const $addTodoBtn = document.getElementById("add-todo-btn");
const $todoList = document.getElementById("todo-list");

$addTodoBtn.addEventListener("click", handleAddTodo);

let todos = [];

function handleAddTodo() {
  const newTodo = {
    id: Date.now(),
    title: $todoInput.value,
    createdAt: Date.now().toLocaleString(),
  };
  if (newTodo.title.trim() === "") return;
  todos.push(newTodo);
  $todoInput.value = "";
  renderTodos();
}

function renderTodos() {
  $todoList.innerHTML = "";
  todos.forEach((todo) => {
    $todoList.append(createTodo(todo));
  });
}

function createTodo(todo) {
  const $newTodo = document.createElement("li");
  $newTodo.style.listStyleType = "none";
  $newTodo.innerHTML = `<span>${todo.title}</span>`;

  $newTodo.querySelector("span").addEventListener("click", () => {
    $newTodo.classList.toggle("completed");
  });

  return $newTodo;
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
