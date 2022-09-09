const addTodoInput = document.querySelector(".todo-input");
const todobutton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

todobutton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
todoList.addEventListener("click", completeTodo);
todoList.addEventListener("click", addSubTask);
todoList.addEventListener("click", completeSubTodo);
todoList.addEventListener("click", deleteSubTodo);
todoList.addEventListener("click", showHide);

function addTodo(event) {
  event.preventDefault();

  //create to do item
  const newTodo = document.createElement("li");
  const todoTitle = document.getElementById("input").value;
  const todoTitleContainer = document.createElement("div"); //create span for todo item container
  const todoDescription = document.getElementById("description").value;
  const descriptionContainer = document.createElement("div"); //create span for todo item container
  const descriptionTitle = document.createElement("span");
  const showHideDescription = document.createElement("span");
  const todoDate = document.getElementById("due-date").value;
  const todoDateContainer = document.createElement("div");
  const subTodo = document.createElement("ul");

  //get input field value
  todoTitleContainer.innerText = todoTitle;
  descriptionContainer.innerText = todoDescription;
  todoDateContainer.innerText = "Due Date: " + todoDate;
  //newTodo.innerText = todoDescription;
  if (todoTitle === "") {
    alert("Please enter a to do item");
  } else {
    //set input fields to default
    document.getElementById("input").value = "";
    document.getElementById("description").value = "";
    //document.getElementById("due-date").value = "";

    //add class names to items
    newTodo.classList.add("todo-item-card");
    todoTitleContainer.classList.add("todo-item");
    descriptionContainer.classList.add("todo-description");
    subTodo.classList.add("sub-todo-list");
    todoDateContainer.classList.add("due-date");
    showHideDescription.setAttribute("id", "arrow");
    showHideDescription.classList.add("rotated-image");
    descriptionTitle.innerHTML = "Description:";
    //showHideDescription.classList.add("showHide");

    todoList.appendChild(newTodo);
    newTodo.appendChild(todoTitleContainer);
    newTodo.appendChild(descriptionTitle);
    newTodo.appendChild(showHideDescription);
    newTodo.appendChild(descriptionContainer);
    newTodo.appendChild(todoDateContainer);
    newTodo.appendChild(subTodo);

    //render subtask button
    const subTaskBtn = document.createElement("button");
    subTaskBtn.innerHTML =
      '<span class="material-symbols-outlined">add_circle</span>';
    subTaskBtn.classList.add("add-sub-task-btn");
    todoTitleContainer.appendChild(subTaskBtn);

    //render done button
    const doneBtn = document.createElement("button");
    doneBtn.innerHTML = '<span class="material-symbols-outlined">done</span>';
    doneBtn.classList.add("done-btn");
    todoTitleContainer.appendChild(doneBtn);

    //render delete button
    const removeBtn = document.createElement("button");
    removeBtn.innerHTML =
      '<span class="material-symbols-outlined">delete</span>';
    removeBtn.classList.add("delete-btn");
    todoTitleContainer.appendChild(removeBtn);

    const dueDate = document.getElementById("due-date").value;
    const date = new Date(dueDate).getTime();
    const todaysDate = new Date().setHours(0, 0, 0, 0);
    console.log(date);
    console.log(todaysDate);

    if (date < todaysDate) {
      console.log("over due");
      todoDateContainer.classList.add("over-due");
    } else {
      console.log("still have time");
    }
  }
}

// COMPLETE TO DO
function completeTodo(event) {
  const element = event.target;

  if (element.classList[0] === "done-btn") {
    const todoItem = element.parentElement;
    const subList =
      element.parentElement.nextElementSibling.nextElementSibling
        .nextElementSibling.nextElementSibling.nextElementSibling;
    todoItem.classList.toggle("done");
    //item.classList.toggle("done");
    subList.classList.toggle("done");
  }
}

// COMPLETE SUBTO DO
function completeSubTodo(event) {
  const element = event.target;

  if (element.classList[0] === "sub-done-btn") {
    const todoItem = element.parentElement;
    todoItem.classList.toggle("done");
    //working here on for loop
    const list = element.parentElement.parentElement;
    const array = Array.prototype.slice.call(list.childNodes);
    var x = 0;
    console.log(array);
    for (let i = 0; i < array.length; i++) {
      // console.log(array[i]);
      if (array[i].classList.contains("done")) {
        console.log("Has done class");
        x++;
      } else {
        console.log("No done class");
      }
      console.log(x);
      if (array.length == x) {
        console.log("they are the same!");
        console.log(array[i].parentElement);
        array[
          i
        ].parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.classList.add(
          "done"
        );
      } else {
        console.log("they are NOT the same");
        array[
          i
        ].parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.classList.remove(
          "done"
        );
      }
    }
  }
}

// DELETE TO DO
function deleteTodo(event) {
  const element = event.target;

  if (element.classList[0] === "delete-btn") {
    const todoItem = element.parentElement;
    const item = element.parentElement.parentElement;
    item.remove();
    todoItem.remove();
  }
}

// DELETE SUB TO DO
function deleteSubTodo(event) {
  const element = event.target;

  if (element.classList[0] === "sub-delete-btn") {
    const todoItem = element.parentElement;
    todoItem.remove();
  }
}

// ADD SUBTASK
function addSubTask(event) {
  const element = event.target;

  if (element.classList[0] === "add-sub-task-btn") {
    //create sub Task
    const newSubTodoItem = document.createElement("li");
    newSubTodoItem.classList.add("sub-todo-item");
    const subTodoTitle = prompt("Enter the sub task", "Sub Task");
    const subTodoList =
      element.parentElement.nextElementSibling.nextElementSibling
        .nextElementSibling.nextElementSibling.nextElementSibling;
    newSubTodoItem.innerText = subTodoTitle;

    //create subtask done button
    const subDoneBtn = document.createElement("button");
    subDoneBtn.innerHTML =
      '<span class="material-symbols-outlined">done</span>';
    subDoneBtn.classList.add("sub-done-btn");

    //create subtask delete button
    const subDeleteBtn = document.createElement("button");
    subDeleteBtn.innerHTML =
      '<span class="material-symbols-outlined">delete</span>';
    subDeleteBtn.classList.add("sub-delete-btn");

    // append subtask stuff

    newSubTodoItem.appendChild(subDoneBtn);
    newSubTodoItem.appendChild(subDeleteBtn);
    subTodoList.appendChild(newSubTodoItem);

    element.parentElement.classList.remove("done");
  }
}

function pastDateCheck(dueDate) {
  const setDueDate = dueDate;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  console.log(setDueDate);
  console.log(today);
}

function checkDueDate() {
  const dueDate = document.getElementById("due-date").value;
  const date = new Date(dueDate).getTime();
  const todaysDate = new Date().getTime();
  //todaysDate.setHours(0, 0, 0, 0);
  console.log("due date " + date);
  console.log("today " + todaysDate);

  if (date < todaysDate) {
    console.log("over due");
  } else {
    console.log("still have time");
  }
}

function showHide(event) {
  const element = event.target;

  if (
    element.id === "arrow" &&
    element.getAttribute("class") == "rotated-image"
  ) {
    element.classList.remove("rotated-image");
    element.nextElementSibling.classList.add("hide");
  } else if (element.id === "arrow") {
    element.classList.add("rotated-image");
    element.nextElementSibling.classList.remove("hide");
  }
}
