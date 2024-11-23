(() => {
  // Elements
  const addTaskForm = document.querySelector("#add-task-form");
  const tasksTableBody = document.querySelector("#tasks-table tbody");
  const editModal = document.querySelector("#edit-modal");
  const editTaskForm = document.querySelector("#edit-task-form");
  const mainStatus = document.querySelector("#main-status");

  // Fetch tasks from backend
  //   async function fetchTasks() {
  //     try {
  //       const response = await fetch("http://127.0.0.1:9000/api/v1/tasks");
  //       console.log(response);
  //       if (!response.ok) throw new Error("Failed to fetch tasks");
  //       const tasks = await response.json().data;
  //       renderTasks(tasks);
  //     } catch (error) {
  //       mainStatus.textContent = "Error fetching tasks: " + error.message;
  //     }
  //   }

  // Render tasks
  //   function renderTasks(tasks) {
  //     tasksTableBody.innerHTML = ""; // Clear table

  //     if (tasks.length === 0) {
  //       tasksTableBody.innerHTML = `<tr><td colspan="7">No tasks available.</td></tr>`;
  //       return;
  //     }

  //     tasks.forEach((task) => {
  //       const row = document.createElement("tr");

  //       row.innerHTML = `
  //           <td>${task.title}</td>
  //           <td>${task.description}</td>
  //           <td>${new Date(task.dueDate).toLocaleDateString()}</td>
  //           <td>${task.status}</td>
  //           <td>${task.priority}</td>
  //           <td><button onclick="editTask('${task._id}')">Edit</button></td>
  //           <td><button onclick="deleteTask('${task._id}')">Delete</button></td>
  //         `;

  //       tasksTableBody.appendChild(row);
  //     });
  //   }

  // Add Task
  addTaskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newTask = {
      title: document.querySelector("#task-title").value,
      description: document.querySelector("#task-desc").value,
      dueDate: document.querySelector("#task-duedate").value,
      status: document.querySelector("#task-status").value,
      priority: document.querySelector("#task-priority").value,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:9000/api/v1/tasks/add-task",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTask),
        }
      );
      if (!response.ok) throw new Error("Failed to add task");
      window.location.reload(); // Refresh the page
      addTaskForm.reset(); // Clear form
      mainStatus.textContent = "Task added successfully!";
    } catch (error) {
      mainStatus.textContent = "Error adding task: " + error.message;
    }
  });

  // Edit Task
  window.editTask = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:9000/api/v1/tasks/${id}`);
      if (!response.ok) throw new Error("Failed to fetch task details");
      const task = await response.json();

      // Populate modal with task data
      document.querySelector("#edit-task-id").value = id;
      document.querySelector("#edit-task-title").value = task.title;
      document.querySelector("#edit-task-desc").value = task.description;
      document.querySelector("#edit-task-duedate").value = task.dueDate;
      document.querySelector("#edit-task-status").value = task.status;
      document.querySelector("#edit-task-priority").value = task.priority;

      // Show modal
      editModal.classList.remove("hidden");
    } catch (error) {
      mainStatus.textContent = "Error loading task for edit: " + error.message;
    }
  };

  // Save Task Edits
  editTaskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // const id = document.querySelector("#edit-task-id").value;

    const updatedTask = {
      title: document.querySelector("#edit-task-title").value,
      description: document.querySelector("#edit-task-desc").value,
      dueDate: document.querySelector("#edit-task-duedate").value,
      status: document.querySelector("#edit-task-status").value,
      priority: document.querySelector("#edit-task-priority").value,
    };

    try {
      const response = await fetch(`http://127.0.0.1:9000/api/v1/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok) throw new Error("Failed to update task");
      window.location.reload(); // Refresh the page
      editModal.classList.add("hidden"); // Hide modal
      mainStatus.textContent = "Task updated successfully!";
    } catch (error) {
      mainStatus.textContent = "Error updating task: " + error.message;
    }
  });

  // Delete Task
  window.deleteTask = async (id) => {
    console.log(id);
    try {
      const response = await fetch(`http://127.0.0.1:9000/api/v1/tasks/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete task");
      window.location.reload(); // Refresh the page
      mainStatus.textContent = "Task deleted successfully!";
    } catch (error) {
      mainStatus.textContent = "Error deleting task: " + error.message;
    }
  };

  // Close modal functionality
  editModal.querySelector(".close-button").addEventListener("click", () => {
    editModal.classList.add("hidden");
  });

  // Initial fetch
  //fetchTasks();
})();
