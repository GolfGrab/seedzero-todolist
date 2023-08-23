let todoList = localStorage.getItem("todoList")
  ? JSON.parse(localStorage.getItem("todoList"))
  : [];

const handleAddTodo = (e) => {
  e.preventDefault();
  const todoInput = document.querySelector("#todo-input");
  const todo = todoInput.value;
  if (todo.trim().length > 0) {
    const todoObj = {
      id: todo.replace(" ", "-"),
      todo: todo,
      isDone: false,
    };
    todoList.push(todoObj);
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }
  render();

  document.querySelector("#todo-input").value = "";
};

const handleDeleteTodo = (e) => {
  const todoId = e.target.id;
  todoList = todoList.filter((todo) => todo.id !== todoId);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  render();
};

const handleCheckbox = (e) => {
  const todoId = e.target.id;
  todoList.forEach((todo) => {
    if (todo.id === todoId) {
      todo.isDone = !todo.isDone;
    }
  });
  localStorage.setItem("todoList", JSON.stringify(todoList));
  render();
};

const render = () => {
  const todoListLength = todoList.length;
  const todoListElement = document.querySelector("#todo-list");
  todoListElement.innerHTML = "";
  for (let i = 0; i < todoListLength; i++) {
    const { id, todo, isDone } = todoList[i];
    const newTodoItem = /*html*/ `
      <li class="todo-list-item">
        <input
          type="checkbox"
          id=${id}
          ${isDone ? "checked" : ""}
          onclick="handleCheckbox(event)"
        />
        <label
          for="${id}"
          class="${isDone ? "label-checked" : ""}"
        >
          ${todo}
        </label>
        <button id=${id} onclick="handleDeleteTodo(event)">Delete</button>
      </li>
    `;
    todoListElement.insertAdjacentHTML("beforeend", newTodoItem);
  }
};

render(todoList);
