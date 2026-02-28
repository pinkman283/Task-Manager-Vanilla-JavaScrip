const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");
const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedBtn = document.getElementById("completedBtn");
const clearBtn = document.getElementById("clearBtn");

let tasks = [];


function handleAdd() {
  const taskText = input.value.trim();
  if (taskText === "") return;

  tasks.push({ text: taskText, completed: false });

  saveTasks();
  addTask(taskText);

  input.value = "";
}


function addTask(text, completed = false) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;

  if (completed) span.classList.add("completed");

  span.addEventListener("click", () => {
    span.classList.toggle("completed");

    const task = tasks.find(t => t.text === text);
    task.completed = !task.completed;

    saveTasks();
    updateCounter();
  });


  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";

  delBtn.addEventListener("click", () => {
    li.remove();

    tasks = tasks.filter(t => t.text !== text);
    saveTasks();
    updateCounter();
  });

  li.append(span, delBtn);
  updateCounter();
  taskList.append(li);
}


function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


window.addEventListener("DOMContentLoaded", () => {
  const stored = localStorage.getItem("tasks");

  if (stored) {
    tasks = JSON.parse(stored);
    tasks.forEach(t => addTask(t.text, t.completed));
  }
});


addBtn.addEventListener("click", handleAdd);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleAdd();
  }
});

function updateCounter(){
    const left= tasks.filter(t=> !t.completed).length;
    counter.textContent = `${left} tasks left`;
}

function filterTask(type){
    const item= document.querySelectorAll("#taskList li");

    item.forEach(li => {
        const text = li.querySelector("span").textContent;
        const task = tasks.find(t => t.text === text);

        if(type === "all") li.style.display = "flex";
        if(type === "active") li.style.display= task.completed ? "none" : "flex";
        if(type === "completed") li.style.display= task.completed ? "flex" : "none";
    })

}

allBtn.onclick= () => filterTask("all");
activeBtn.onclick= () => filterTask("active");
completedBtn.onclick= () => filterTask("completed");

clearBtn.addEventListener("click", () => {
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
    taskList.innerHTML = "";
    tasks.forEach(t => addTask(t.text,t.completed));
    updateCounter();
})