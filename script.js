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
    isEditing: false,
    isCompleted: false,
  };

  if (newTodo.title.trim() === "") return;

  todos.push(newTodo);
  $todoInput.value = "";

  renderTodos();
}

function renderTodos() {
  $todoList.innerHTML = "";

  todos.forEach((todo) => {
    $todoList.append(createTodoItem(todo));
  });
}

function createTodoItem(todo) {
  const $todo = document.createElement("li");
  $todo.style.listStyleType = "none";

  $todo.append(
    todo.isEditing ? createEditTodoEl(todo) : createNormalTodoEl(todo)
  );

  $todo.append(createEditButton(todo));

  return $todo;
}

function createNormalTodoEl(todo) {
  const $todoText = document.createElement("span");
  $todoText.innerText = todo.title;

  $todoText.className = todo.isCompleted ? "completed" : "";

  $todoText.addEventListener("click", () => {
    handleToggleTodoCompleted(todo.id);
  });

  return $todoText;
}

function handleToggleTodoCompleted(todoId) {
  const todo = todos.find((todo) => todo.id === todoId);

  if (todo === undefined) return;

  todo.isCompleted = !todo.isCompleted;

  renderTodos();
}

function createEditTodoEl(todo) {
  const $editInput = document.createElement("input");
  $editInput.type = "text";
  $editInput.value = todo.title;

  $editInput.addEventListener("input", (e) => {
    handleTodoTitleUpdate(todo.id, e.target.value);
  });

  return $editInput;
}

function handleTodoTitleUpdate(todoId, newTitle) {
  const todo = todos.find((todo) => todo.id === todoId);

  if (todo === undefined) return;

  todo.title = newTitle;
}

function createEditButton(todo) {
  const $editBtn = document.createElement("button");
  $editBtn.innerText = todo.isEditing ? "Save" : "Edit";

  $editBtn.addEventListener("click", () => {
    handleTodoEdit(todo.id);
  });

  return $editBtn;
}

function handleTodoEdit(todoId) {
  const todo = todos.find((todo) => todo.id === todoId);

  if (todo === undefined) return;

  todo.isEditing = !todo.isEditing;

  renderTodos();
}
