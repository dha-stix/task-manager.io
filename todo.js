//SELECTORS
const submitBtn = document.querySelector(".add");
const clearBtn = document.querySelector(".clear");
const lists = document.querySelector(".todo-list");
const input = document.querySelector("input");
let todos;

//FUNCTIONS
const addTodo = (e) => {
  e.preventDefault();

  let inputValue = input.value;

  //Check if a todo inputted, throws back an error message if it's not
  if (!inputValue) {
    window.alert("Input field can't be empty");
  } else {
    //This runs if a todo is added
    let list = document.createElement("li");
    list.textContent = inputValue;

    //Add to local storage
    saveLocalTodos(input.value);

    //Clears the input field after a list has been added
    input.value = "";
  }
};

document.querySelector(".startBtn").addEventListener("click", function () {
  document.querySelector(".app").classList.add("show");
  document.querySelector(".intro-div").style.display = "none";
});

const clearTodo = (e) => {
  e.preventDefault();
  
  const todoList = document.querySelector(".todo-list");
  todoList.innerHTML = "";
  localStorage.removeItem("todos");
};

function saveLocalTodos(todo) {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.unshift(todo);
  localStorage.setItem("todos", JSON.stringify(todos));

  const todoList = document.querySelector(".todo-list");
  todoList.innerHTML = "";
  getTodos()
}

const getTodos = function () {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    let lists = document.querySelector(".todo-list");

    //This runs if a todo is added
    let list = document.createElement("li");
    list.textContent = todo;

    //Creates a span in order to wrap the buttons in a span for equal spacing (flex)
    let span = document.createElement("span");
    span.style.width = "30%";
    span.style.display = "flex";
    span.style.justifyContent = "space-between";

    //Adds the delete button to each todo-list created
    let deleteBtn = document.createElement("i");
    deleteBtn.className = "fas fa-trash-alt";
    deleteBtn.classList.add("delBtn");

    //Adds edit button to each todo-list created
    let editBtn = document.createElement("i");
    editBtn.className = "far fa-edit";
    editBtn.classList.add("editBtn");

    //An event that deletes each input by click the delete button
    deleteBtn.addEventListener("click", () => {
      lists.removeChild(list);
      removeTodo(todo);
    });

    //An event that edits each input by the clicking the edit button
    // editBtn Under Construction
    // editBtn.addEventListener("click", () => {
    //   input.value = list.textContent;
    //   input.focus();
    //   lists.removeChild(list);
    // });

    //Appends the delete and edit button to the span, the span to the list and each list to the ul
    span.appendChild(deleteBtn);
    span.appendChild(editBtn);
    list.appendChild(span);
    lists.appendChild(list);
  });
  showClearButton()
};

function removeTodo(todo) {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.splice(todos.indexOf(todo), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  showClearButton()
}

const showClearButton = ()  => {
  if(todos.length < 1){
    document.querySelector('#clearList').style.display = "none"
  }else{
    document.querySelector('#clearList').style.display = "block"
  }
}

//EVENTS
document.addEventListener("DOMContentLoaded", getTodos);
submitBtn.addEventListener("click", addTodo);
clearBtn.addEventListener("click", clearTodo);