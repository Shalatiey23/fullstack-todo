const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

async function fetchTasks() {
  const res = await fetch("http://localhost:3008/api/task");
  const tasks = await res.json();
  taskList.innerHTML = tasks.map(taskToHtml).join("");
}

function taskToHtml(task) {
  return `
        <li data-id="${task.id}" class="${task.completed ? "completed" : ""}">
            <input type="text" value="${task.description}" id="description-${
    task.id
  }" disabled />
            <input type="checkbox" ${
              task.completed ? "checked" : ""
            } onclick="toggleTask(${task.id}, ${task.completed})" />
            <button onclick="enableEdit(${task.id})" id="update-btn-${
    task.id
  }">Update</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        </li>
    `;
}

function enableEdit(id) {
  const descriptionInput = document.getElementById(`description-${id}`);
  const updateButton = document.getElementById(`update-btn-${id}`);

  descriptionInput.disabled = false;
  updateButton.textContent = "Save";
  updateButton.onclick = () => saveTask(id);
}

async function saveTask(id) {
  const newDescription = document.getElementById(`description-${id}`).value;
  const completed = document.querySelector(
    `[data-id="${id}"] input[type="checkbox"]`
  ).checked;

  await fetch(`http://localhost:3008/api/task/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description: newDescription, completed }),
  });
  fetchTasks();
}

taskForm.onsubmit = async (event) => {
  event.preventDefault();
  const description = document.getElementById("description").value;

  const res = await fetch("http://localhost:3008/api/task", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description }),
  });
  const newTask = await res.json();
  taskList.innerHTML += taskToHtml(newTask);
  taskForm.reset();
};

async function toggleTask(id, completed) {
  await fetch(`http://localhost:3008/api/task/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: !completed }),
  });
  fetchTasks();
}

async function deleteTask(id) {
  await fetch(`http://localhost:3008/api/task/${id}`, { method: "DELETE" });
  fetchTasks();
}

fetchTasks();