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

function loadTodos() {
  // check if todos exist in local storage
  if (localStorage.getItem("todos")) {
    // if exist, get todos from local storage and convert to object
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}

function saveTodos() {
  // convert todos object to string and save to local storage
  localStorage.setItem("todos", JSON.stringify(todos));
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
  // get todo list element
  const todoList = document.querySelector(".todo-list");
  // clear todo list
  todoList.innerHTML = "";
  // loop through todos and render each todo
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    todoList.innerHTML += TodoComponent(todo);
  }
}

function addTodo(event) {
  event.preventDefault();
  const newTodo = {
    id: crypto.randomUUID(),
    name: event.target.todo.value,
    isDone: false,
  };

  // add new todo to todos
  todos.push(newTodo);
  // clear input value
  event.target.todo.value = "";
  // rerender todo list and save todos
  renderTodoList();
  saveTodos();
}

function toggleDone(id) {
  // loop through todos and find todo with same id then toggle isDone
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todos[i].isDone = !todos[i].isDone;
      break;
    }
  }
  // rerender todo list and save todos
  renderTodoList();
  saveTodos();
}

function deleteTodo(id) {
  // filter out todo with id
  todos = todos.filter((todo) => todo.id !== id);
  // rerender todo list and save todos
  renderTodoList();
  saveTodos();
}
