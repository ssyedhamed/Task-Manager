const form = document.querySelector(".form");
const addBtn = document.querySelector(".add-btn");
const removeBtn = document.querySelector(".remove-btn");
const input = document.getElementById("input");
const taskContainer = document.querySelector(".task-container");

const removeTask = (id) => {
  let tasks = [];
  if (localStorage.getItem("tasks") === null) {
    taskContainer.innerHTML = "Start adding your tasks today";
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    const filteredTasks = tasks.filter((task) => {
      return task.id != id;
    });
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  }
  getTasks();
};

const getTasks = (e) => {
  let tasks = [null];
  if (
    localStorage.getItem("tasks") === null ||
    JSON.parse(localStorage.getItem("tasks")).length === 0
  ) {
    taskContainer.innerHTML = `
    <div class="task mt-3 row align-items-center justify-content-center text-center">
        <h5 class="col">Tasks list is empty</h5>
    </div>
    `;
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    const allTasks = tasks.map((task) => {
      return ` 
    <div class="task mt-3 row align-items-center justify-content-center ">
        <div class="content  col ">
          ${task.title}
        </div>
        <div class="rbtn-container col-2">  
          <button onclick="removeTask('${task.id}')" class="remove-btn btn btn-danger text-light ">X</button>
        </div>
    </div>
        `;
    });
    const output = allTasks.join("");
    taskContainer.innerHTML = output;
  }
};
getTasks();

const addTask = (e) => {
  e.preventDefault();
  let tasks = [];
  if (input.value === "") {
    alert("Please fill the field");
  } else {
    const task = input.value;
    if (localStorage.getItem("tasks") != null) {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.unshift({
      id: Date.now(),
      title: task,
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  getTasks();
  document.getElementById("input").value = "";
};

form.addEventListener("submit", addTask);
