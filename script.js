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
  $newTodo.innerHTML = `<span id=${todo.id}>${todo.title}</span>`;

  $newTodo.append(createEditButton($newTodo));

  $newTodo.querySelector("span").addEventListener("click", () => {
    if (!$newTodo.isContentEditable) {
      $newTodo.classList.toggle("completed");
    }
  });

  return $newTodo;
}

function createEditButton(todoItemEl) {
  const $editBtn = document.createElement("button");
  let isEditing = false;

  $editBtn.innerText = "Edit";
  $editBtn.addEventListener("click", () => {
    handleTodoEdit(todoItemEl, isEditing);
    isEditing = !isEditing;
  });

  return $editBtn;
}

function handleTodoEdit(todoItemEl, isEditing) {
  if (isEditing) {
    todoItemEl.contentEditable = false;
    event.target.innerText = "Edit";
  } else {
    todoItemEl.contentEditable = true;
    event.target.innerText = "Save";
    todoItemEl.focus();
  }

  isEditing && updateTodo(todoItemEl);
}

function updateTodo(todoItemEl) {
  const updatedTodoId = parseInt(todoItemEl.querySelector("span").id);
  const updatedTodoTitle = todoItemEl.querySelector("span").innerText;

  todos = todos.map((todo) =>
    todo.id === updatedTodoId ? { ...todo, title: updatedTodoTitle } : todo
  );

  renderTodos();
}
