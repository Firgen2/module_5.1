document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const showAllBtn = document.getElementById("showAll");
    const showCompletedBtn = document.getElementById("showCompleted");
    const showActiveBtn = document.getElementById("showActive");
  
    let tasks = [];
  
    function renderTasks(filter = "all") {
      taskList.innerHTML = "";
      let filteredTasks = tasks;
      if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
      } else if (filter === "active") {
        filteredTasks = tasks.filter(task => !task.completed);
      }
  
      filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.className = "task-item";
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTask(index));
        
        const taskText = document.createElement("span");
        taskText.className = task.completed ? "completed" : "";
        taskText.textContent = task.text;
        taskText.addEventListener("dblclick", () => editTask(index, taskText));
  
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.className = "edit-input";
        editInput.value = task.text;
        editInput.addEventListener("blur", () => saveEdit(index, editInput));
  
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Удалить";
        deleteBtn.addEventListener("click", () => deleteTask(index));
  
        taskItem.append(checkbox, taskText, editInput, deleteBtn);
        taskList.appendChild(taskItem);
      });
    }
  
    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = "";
        renderTasks();
      }
    }
  
    function deleteTask(index) {
      tasks.splice(index, 1);
      renderTasks();
    }
  
    function toggleTask(index) {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
    }
  
    function editTask(index, taskText) {
      const editInput = taskText.nextSibling;
      taskText.style.display = "none";
      editInput.style.display = "inline";
      editInput.focus();
    }
  
    function saveEdit(index, editInput) {
      tasks[index].text = editInput.value;
      editInput.style.display = "none";
      renderTasks();
    }
  
    addTaskBtn.addEventListener("click", addTask);
    showAllBtn.addEventListener("click", () => renderTasks("all"));
    showCompletedBtn.addEventListener("click", () => renderTasks("completed"));
    showActiveBtn.addEventListener("click", () => renderTasks("active"));
  
    renderTasks();
  });
  