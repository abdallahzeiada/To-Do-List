let taskInput = document.getElementById("task");
let submitBtn = document.getElementById("submit");
let tasksContainer = document.querySelector(".tasks");
let tasksArray = [];
if (localStorage.getItem("tasks")) {
  tasksArray = JSON.parse(localStorage.getItem("tasks"));
}
getData();
submitBtn.onclick = () => {
  if (taskInput.value != "") {
    createTask(taskInput.value);
    taskInput.value = "";
    addTaskToPage(tasksArray);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }
};

function createTask(val) {
  const task = {
    id: Date.now(),
    title: val,
    completed: false,
  };
  tasksArray.push(task);
}

function addTaskToPage(arr) {
  tasksContainer.innerHTML = "";
  arr.forEach((task) => {
    let taskElement = `<div class="task" data-id="${task.id}">
    <p class="title">${task.title}</p>
    <span class="del">Delete</span>
  </div>`;
    tasksContainer.innerHTML += taskElement;
  });
}

function getData() {
  if (localStorage.getItem("tasks")) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    addTaskToPage(tasks);
  }
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove();
    let dataId = e.target.parentElement.getAttribute("data-id");
    removeEle(dataId);
  }
  if (e.target.classList.contains("title")) {
    document.querySelector(".task").classList.toggle("done");
  }
});

function removeEle(taskId) {
  tasksArray = tasksArray.filter((ele) => ele.id != +taskId);
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
}
