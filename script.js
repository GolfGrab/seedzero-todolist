/*

type Todo = {
    id: string, // random string
    name: string,
    isDone: boolean,
    }

 type Todos = Todo[]

*/

let todos = [
  {
    id: "1",
    name: "Learn HTML",
    isDone: true,
  },
  {
    id: "2",
    name: "Learn CSS",
    isDone: true,
  },
  {
    id: "3",
    name: "Learn JS",
    isDone: false,
  },
];

init();

function init() {
  loadTodos();
  renderTodoList();
}

function TodoComponent(todo) {
  const { id, name, isDone } = todo;

  return /*html*/ `
    <li class="todo-item">
      <input
        type="checkbox"
        id=${id}
        ${isDone ? "checked" : ""}
        onclick="toggleDone('${id}')"
      />
      <label
        for="${id}"
        class="${isDone ? "checked" : ""}"
      >
        ${name}
      </label>
      <button id=${id} onclick="deleteTodo('${id}')">
        Delete
      </button>
    </li>
  `;
}

function renderTodoList() {
  const todoList = document.querySelector(".todo-list");
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    todoList.innerHTML += TodoComponent(todo);
  });
}

function addTodo(event) {
  event.preventDefault();
  todos.push({
    id: Math.random().toString(),
    name: event.target.todo.value,
    isDone: false,
  });
  event.target.todo.value = "";
  renderTodoList();
  saveTodos();
}

function toggleDone(id) {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      return {
        ...todo,
        isDone: !todo.isDone,
      };
    }
    return todo;
  });
  renderTodoList();
  saveTodos();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodoList();
  saveTodos();
}

function loadTodos() {
  if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
