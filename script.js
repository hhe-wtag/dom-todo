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
