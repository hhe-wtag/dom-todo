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
    toggleTodoDone(todo.id);
  });

  return $todoText;
}

function toggleTodoDone(todoId) {
  todos = todos.map((todo) =>
    todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
  );
  renderTodos();
}

function createEditTodoEl(todo) {
  const $editInput = document.createElement("input");
  $editInput.type = "text";
  $editInput.value = todo.title;

  $editInput.addEventListener("input", (e) => {
    updateTodoTitle(todo.id, e.target.value);
  });

  return $editInput;
}

function updateTodoTitle(todoId, newTitle) {
  todos = todos.map((todo) =>
    todo.id === todoId ? { ...todo, title: newTitle } : todo
  );
}

function createEditButton(todo) {
  const $editBtn = document.createElement("button");
  $editBtn.innerText = todo.isEditing ? "Save" : "Edit";

  $editBtn.addEventListener("click", () => {
    handleTodoEdit(todo);
  });

  return $editBtn;
}

function handleTodoEdit(editingTodo) {
  todos = todos.map((todo) =>
    todo.id === editingTodo.id ? { ...todo, isEditing: !todo.isEditing } : todo
  );

  renderTodos();
}

function createDeleteButton(todoItemEl) {
  const $deleteBtn = document.createElement("button");
  $deleteBtn.innerText = "Delete";

  $deleteBtn.addEventListener("click", () => handleDeleteTodo(todoItemEl));

  return $deleteBtn;
}

function handleDeleteTodo(todoItemEl) {
  const deletedTodoId = parseInt(todoItemEl.querySelector("span").id);
  todos = todos.filter((todo) => todo.id !== deletedTodoId);

  renderTodos();
}
