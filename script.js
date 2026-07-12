let currentUser = null;

// Sign up
function signup() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  if (!username || !password) return alert("Enter both fields");

  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find(u => u.username === username)) {
    return alert("User already exists!");
  }
  users.push({username, password});
  localStorage.setItem("users", JSON.stringify(users));
  alert("Signup successful! Please login.");
}

// Login
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(u => u.username === username && u.password === password);
  if (!user) return alert("Invalid credentials");

  currentUser = username;
  document.getElementById("loginSection").style.display = "none";
  document.getElementById("taskSection").style.display = "block";
  document.getElementById("welcome").textContent = "Welcome, " + username;
  loadTasks();
}

// Logout
function logout() {
  currentUser = null;
  document.getElementById("loginSection").style.display = "block";
  document.getElementById("taskSection").style.display = "none";
}

// Add task
function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  let tasks = loadTasks();
  tasks.push({text: taskText});
  saveTasks(tasks);
  renderTasks(tasks);

  input.value = "";
}

// Save tasks
function saveTasks(tasks) {
  localStorage.setItem(currentUser + "_tasks", JSON.stringify(tasks));
}

// Load tasks
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem(currentUser + "_tasks")) || [];
  renderTasks(tasks);
  return tasks;
}

// Render tasks
function renderTasks(tasks) {
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks(tasks);
      renderTasks(tasks);
    };

    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

// Toggle night mode
document.getElementById("toggleTheme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
