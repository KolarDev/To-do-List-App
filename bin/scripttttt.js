// // Wait for the DOM to load
// document.addEventListener("DOMContentLoaded", () => {
//   /* --------------------- Authentication Page Logic --------------------- */
//   const loginToggle = document.getElementById("login-toggle");
//   const signupToggle = document.getElementById("signup-toggle");
//   const loginForm = document.getElementById("login-form");
//   const signupForm = document.getElementById("signup-form");
//   const authStatus = document.getElementById("auth-status");

//   // Toggle between Login and Signup forms
//   loginToggle.addEventListener("click", () => {
//     loginToggle.classList.add("active");
//     signupToggle.classList.remove("active");
//     loginForm.classList.remove("hidden");
//     signupForm.classList.add("hidden");
//     authStatus.innerText = "";
//   });

//   signupToggle.addEventListener("click", () => {
//     signupToggle.classList.add("active");
//     loginToggle.classList.remove("active");
//     signupForm.classList.remove("hidden");
//     loginForm.classList.add("hidden");
//     authStatus.innerText = "";
//   });

//   // Handle Signup Form Submission
//   if (signupForm) {
//     signupForm.addEventListener("submit", async (e) => {
//       e.preventDefault();

//       const username = document.getElementById("signup-username").value.trim();
//       const email = document.getElementById("signup-email").value.trim();
//       const password = document.getElementById("signup-password").value.trim();

//       try {
//         const response = await fetch(
//           "http://127.0.0.1:9000/api/v1/users/signup",
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ username, email, password }),
//           }
//         );

//         const data = await response.json();

//         if (response.ok) {
//           authStatus.innerText =
//             "Signup successful! Redirecting to main page...";
//           authStatus.className = "success";
//           setTimeout(() => {
//             window.location.href = "main";
//           }, 2000);
//         } else {
//           authStatus.innerText = data.message || "Signup failed.";
//           authStatus.className = "error";
//         }
//       } catch (error) {
//         authStatus.innerText = "An error occurred. Please try again.";
//         authStatus.className = "error";
//         console.error("Signup Error:", error);
//       }
//     });
//   }

//   // Handle Login Form Submission
//   if (loginForm) {
//     loginForm.addEventListener("submit", async (e) => {
//       e.preventDefault();

//       const email = document.getElementById("login-email").value.trim();
//       const password = document.getElementById("login-password").value.trim();

//       try {
//         const response = await fetch(
//           "http://127.0.0.1:9000/api/v1/users/login",
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email, password }),
//           }
//         );

//         const data = await response.json();
//         console.log(data); ////

//         if (response.ok) {
//           authStatus.innerText =
//             "Login successful! Redirecting to main page...";
//           authStatus.className = "success";
//           setTimeout(() => {
//             window.location.href = "main";
//           }, 2000);
//         } else {
//           authStatus.innerText = data.message || "Login failed.";
//           authStatus.className = "error";
//         }
//       } catch (error) {
//         authStatus.innerText = "An error occurred. Please try again.";
//         authStatus.className = "error";
//         console.error("Login Error:", error);
//       }
//     });
//   }

//   // -------------------MAIN------------------------------
//   if (window.location.pathname.endsWith("main")) {
//     console.log("Main page logic running");
//     // document.addEventListener("DOMContentLoaded", () => {
//     // Fetch all "Edit" and "Delete" buttons dynamically

//     // Status message container
//     const mainStatus = document.getElementById("main-status");

//     // Utility to show status messages
//     function showStatus(message, isSuccess = true) {
//       mainStatus.textContent = message;
//       mainStatus.className = isSuccess ? "success" : "error";
//       setTimeout(() => (mainStatus.textContent = ""), 3000);
//     }

//     // ---------------- Add Task ---------------- //
//     const addTaskForm = document.getElementById("add-task-form");
//     const tasksTableBody = document.querySelector("#tasks-table tbody");

//     if (addTaskForm) {
//       addTaskForm.addEventListener("submit", async (e) => {
//         e.preventDefault();

//         const newTask = {
//           title: document.getElementById("task-title").value.trim(),
//           description: document.getElementById("task-desc").value.trim(),
//           dueDate: document.getElementById("task-duedate").value,
//           status: document.getElementById("task-status").value,
//           priority: document.getElementById("task-priority").value,
//         };

//         try {
//           const response = await fetch(
//             "http://127.0.0.1:9000/api/v1/tasks/add-task",
//             {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify(newTask),
//             }
//           );

//           if (response.ok) {
//             const savedTask = await response.json().data;
//             console.log(savedTask);
//             // Dynamically add the new task to the table
//             addTaskRow(savedTask);
//             addTaskForm.reset();
//             showStatus("Task added successfully!");
//           } else {
//             const error = await response.json();
//             showStatus(error.message || "Failed to add task.", false);
//           }
//         } catch (error) {
//           console.error("Add Task Error:", error);
//           showStatus("An error occurred. Please try again.", false);
//         }
//       });
//     }

//     // Add a row to the tasks table dynamically
//     function addTaskRow(task) {
//       const row = document.createElement("tr");
//       row.innerHTML = `
//       <td contenteditable="true">${task.title}</td>
//       <td contenteditable="true">${task.description}</td>
//       <td contenteditable="true">${new Date(
//         task.dueDate
//       ).toLocaleDateString()}</td>
//       <td contenteditable="true">${task.status}</td>
//       <td contenteditable="true">${task.priority}</td>
//       <td><button onclick="editTask(${task.id})">Edit</button></td>
//       <td><button onclick="deleteTask(${task.id})">Delete</button></td>
//     `;
//       tasksTableBody.appendChild(row);
//     }

//     // ---------------- Edit Task ---------------- //
//     const editModal = document.getElementById("edit-modal");
//     const editTaskForm = document.getElementById("edit-task-form");

//     window.editTask = async function (taskId) {
//       const taskRow = document
//         .querySelector(`button[onclick='editTask(${taskId})']`)
//         .closest("tr");

//       // Populate the modal inputs
//       document.getElementById("edit-task-id").value = taskId;
//       document.getElementById("edit-task-title").value =
//         taskRow.cells[0].textContent.trim();
//       document.getElementById("edit-task-desc").value =
//         taskRow.cells[1].textContent.trim();
//       document.getElementById("edit-task-duedate").value = new Date(
//         taskRow.cells[2].textContent
//       )
//         .toISOString()
//         .split("T")[0];
//       document.getElementById("edit-task-status").value =
//         taskRow.cells[3].textContent.trim();
//       document.getElementById("edit-task-priority").value =
//         taskRow.cells[4].textContent.trim();

//       editModal.classList.remove("hidden");
//     };

//     // Close modal
//     document.querySelector(".close-button").addEventListener("click", () => {
//       editModal.classList.add("hidden");
//     });

//     if (editTaskForm) {
//       editTaskForm.addEventListener("submit", async (e) => {
//         e.preventDefault();

//         const updatedTask = {
//           title: document.getElementById("edit-task-title").value.trim(),
//           description: document.getElementById("edit-task-desc").value.trim(),
//           dueDate: document.getElementById("edit-task-duedate").value,
//           status: document.getElementById("edit-task-status").value,
//           priority: document.getElementById("edit-task-priority").value,
//         };

//         const taskId = document.getElementById("edit-task-id").value;

//         try {
//           const response = await fetch(
//             `http://127.0.0.1:9000/api/v1/tasks/${taskId}`,
//             {
//               method: "PUT",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify(updatedTask),
//             }
//           );

//           if (response.ok) {
//             // Update the task row in the table
//             const taskRow = document
//               .querySelector(`button[onclick='editTask(${taskId})']`)
//               .closest("tr");
//             taskRow.cells[0].textContent = updatedTask.title;
//             taskRow.cells[1].textContent = updatedTask.description;
//             taskRow.cells[2].textContent = new Date(
//               updatedTask.dueDate
//             ).toLocaleDateString();
//             taskRow.cells[3].textContent = updatedTask.status;
//             taskRow.cells[4].textContent = updatedTask.priority;

//             editModal.classList.add("hidden");
//             showStatus("Task updated successfully!");
//           } else {
//             const error = await response.json();
//             showStatus(error.message || "Failed to update task.", false);
//           }
//         } catch (error) {
//           console.error("Edit Task Error:", error);
//           showStatus("An error occurred. Please try again.", false);
//         }
//       });
//     }

//     // ---------------- Delete Task ---------------- //
//     window.deleteTask = async function (taskId) {
//       try {
//         const response = await fetch(
//           `http://127.0.0.1:9000/api/v1/tasks/${taskId}`,
//           {
//             method: "DELETE",
//           }
//         );

//         if (response.ok) {
//           // Remove the task row from the table
//           document
//             .querySelector(`button[onclick='deleteTask(${taskId})']`)
//             .closest("tr")
//             .remove();
//           showStatus("Task deleted successfully!");
//         } else {
//           const error = await response.json();
//           showStatus(error.message || "Failed to delete task.", false);
//         }
//       } catch (error) {
//         console.error("Delete Task Error:", error);
//         showStatus("An error occurred. Please try again.", false);
//       }
//     };
//   }
//   //   document
//   //     .querySelectorAll("button[onclick^='editTask']")
//   //     .forEach((button) => {
//   //       button.addEventListener("click", (event) => {
//   //         const taskRow = event.target.closest("tr");
//   //         const taskId = getTaskId(event.target);
//   //         editTask(taskId, taskRow);
//   //       });
//   //     });

//   //   document
//   //     .querySelectorAll("button[onclick^='deleteTask']")
//   //     .forEach((button) => {
//   //       button.addEventListener("click", (event) => {
//   //         const taskId = getTaskId(event.target);
//   //         deleteTask(taskId);
//   //       });
//   //     });
//   //   //});

//   //   // Helper function to get task ID
//   //   function getTaskId(button) {
//   //     return button.getAttribute("onclick").match(/\d+/)[0];
//   //   }

//   //   // Edit Task function - save changes from contenteditable cells
//   //   function editTask(taskId, taskRow) {
//   //     // Gather updated values from each contenteditable cell
//   //     const updatedTask = {
//   //       title: taskRow.cells[0].textContent,
//   //       description: taskRow.cells[1].textContent,
//   //       dueDate: new Date(taskRow.cells[2].textContent).toISOString(),
//   //       status: taskRow.cells[3].textContent,
//   //       priority: taskRow.cells[4].textContent,
//   //     };

//   //     // Example of sending updates to the server (use your actual API endpoint)
//   //     fetch(`http://127.0.0.1:9000/api/v1/tasks/${taskId}`, {
//   //       method: "PUT",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify(updatedTask),
//   //     })
//   //       .then((response) => {
//   //         if (response.status === 200) {
//   //           alert("Task updated successfully!");
//   //         } else {
//   //           alert("Failed to update task.");
//   //         }
//   //       })
//   //       .catch((error) => console.error("Error:", error));
//   //   }

//   //   // Delete Task function
//   //   function deleteTask(taskId) {
//   //     fetch(`http://127.0.0.1:9000/api/v1/tasks/${taskId}`, {
//   //       method: "DELETE",
//   //     })
//   //       .then((response) => {
//   //         if (response.status === 204) {
//   //           // If the deletion was successful, remove the task row from the table
//   //           document
//   //             .querySelector(`button[onclick='deleteTask(${taskId})']`)
//   //             .closest("tr")
//   //             .remove();
//   //           alert("Task deleted successfully!");
//   //         } else {
//   //           alert("Failed to delete task.");
//   //         }
//   //       })
//   //       .catch((error) => console.error("Error:", error));
//   //   }
//   // }
// });

// // function editTask(taskId) {
// //   // Fetch task details from the backend (optional) or frontend storage
// //   const taskRow = document
// //     .querySelector(`button[onclick='editTask(${taskId})']`)
// //     .closest("tr");

// //   // Get task details from the table row (if stored in frontend)
// //   const title = taskRow.children[0].textContent.trim();
// //   const description = taskRow.children[1].textContent.trim();
// //   const dueDate = taskRow.children[2].textContent.trim();
// //   const status = taskRow.children[3].textContent.trim();
// //   const priority = taskRow.children[4].textContent.trim();

// //   // Populate the modal inputs
// //   document.getElementById("edit-task-id").value = taskId;
// //   document.getElementById("edit-task-title").value = title;
// //   document.getElementById("edit-task-desc").value = description;
// //   document.getElementById("edit-task-duedate").value = dueDate;
// //   document.getElementById("edit-task-status").value = status;
// //   document.getElementById("edit-task-priority").value = priority;

// //   // Show the modal
// //   const modal = document.getElementById("edit-modal");
// //   modal.classList.remove("hidden");
// // }

// // // Close modal function
// // document.querySelector(".close-button").addEventListener("click", () => {
// //   document.getElementById("edit-modal").classList.add("hidden");
// // });

// //   /* --------------------- Main Page Logic --------------------- */
// //   if (window.location.pathname.endsWith("main")) {
// //     const logoutBtn = document.getElementById("logout-btn");
// //     const greeting = document.getElementById("greeting");
// //     const addTaskForm = document.getElementById("add-task-form");
// //     const tasksTableBody = document.querySelector("#tasks-table tbody");
// //     const mainStatus = document.getElementById("main-status");

// //     const allTasksBtn = document.getElementById("all-tasks-btn");
// //     const inProgressBtn = document.getElementById("in-progress-btn");
// //     const completedBtn = document.getElementById("completed-btn");
// //     const deletedBtn = document.getElementById("deleted-btn");

// //     const editModal = document.getElementById("edit-modal");
// //     const closeButton = document.querySelector(".close-button");
// //     const editTaskForm = document.getElementById("edit-task-form");

// //     let currentFilter = "all";

// //     // Fetch user info to display greeting
// //     async function fetchUserInfo() {
// //       try {
// //         const response = await fetch("http://127.0.0.1:9000/api/v1/users/me", {
// //           method: "GET",
// //           headers: { "Content-Type": "application/json" },
// //           credentials: "include",
// //         });

// //         if (response.ok) {
// //           const data = await response.json();
// //           const user = data.data.user; // Access the 'user' object in 'data'
// //           console.log(user);
// //           greeting.innerText = `Hello, ${user.username}`;
// //           // Optionally, set profile picture if available
// //         } else {
// //           // If not authenticated, redirect to login
// //           window.location.href = "index.html";
// //         }
// //       } catch (error) {
// //         console.error("Fetch User Info Error:", error);
// //         window.location.href = "index.html";
// //       }
// //     }

// //     fetchUserInfo();

// //     // Handle Logout
// //     logoutBtn.addEventListener("click", async () => {
// //       try {
// //         const response = await fetch(
// //           "http://127.0.0.1:9000/api/v1/users/logout",
// //           {
// //             method: "POST",
// //             headers: { "Content-Type": "application/json" },
// //           }
// //         );

// //         if (response.ok) {
// //           window.location.href = "index";
// //         } else {
// //           mainStatus.innerText = "Failed to logout.";
// //           mainStatus.className = "error";
// //         }
// //       } catch (error) {
// //         mainStatus.innerText = "An error occurred during logout.";
// //         mainStatus.className = "error";
// //         console.error("Logout Error:", error);
// //       }
// //     });

// //     // Handle Add Task Form Submission
// //     addTaskForm.addEventListener("submit", async (e) => {
// //       e.preventDefault();

// //       const title = document.getElementById("task-title").value.trim();
// //       const description = document.getElementById("task-desc").value.trim();
// //       const dueDate = document.getElementById("task-duedate").value;
// //       const status = document.getElementById("task-status").value;
// //       const priority = document.getElementById("task-priority").value;

// //       try {
// //         const response = await fetch(
// //           "http://127.0.0.1:9000/api/v1/tasks/add-task",
// //           {
// //             method: "POST",
// //             headers: { "Content-Type": "application/json" },
// //             body: JSON.stringify({
// //               title,
// //               description,
// //               dueDate,
// //               status,
// //               priority,
// //             }),
// //           }
// //         );

// //         const data = await response.json();

// //         if (response.ok) {
// //           mainStatus.innerText = "Task added successfully!";
// //           mainStatus.className = "success";
// //           addTaskForm.reset();
// //           fetchTasks();
// //         } else {
// //           mainStatus.innerText = data.message || "Failed to add task.";
// //           mainStatus.className = "error";
// //         }
// //       } catch (error) {
// //         mainStatus.innerText = "An error occurred. Please try again.";
// //         mainStatus.className = "error";
// //         console.error("Add Task Error:", error);
// //       }
// //     });

// //     // Fetch and Display Tasks
// //     async function fetchTasks() {
// //       try {
// //         let url = "http://127.0.0.1:9000/api/v1/tasks";
// //         if (currentFilter !== "all") {
// //           url += `?status=${encodeURIComponent(currentFilter)}`;
// //         }

// //         const response = await fetch(url, {
// //           method: "GET",
// //           headers: { "Content-Type": "application/json" },
// //         });

// //         const result = await response.json();

// //         if (response.ok) {
// //           renderTasks(result.data.tasks);
// //         } else {
// //           mainStatus.innerText = "Failed to fetch tasks.";
// //           mainStatus.className = "error";
// //         }
// //       } catch (error) {
// //         mainStatus.innerText = "An error occurred. Please try again.";
// //         mainStatus.className = "error";
// //         console.error("Fetch Tasks Error:", error);
// //       }
// //     }
// //   }

// //     // Render Tasks in the Table
// //     function renderTasks(tasks) {
// //       tasksTableBody.innerHTML = "";

// //       if (tasks.length === 0) {
// //         const noTasksRow = document.createElement("tr");
// //         const noTasksCell = document.createElement("td");
// //         noTasksCell.colSpan = 7;
// //         noTasksCell.innerText = "No tasks available.";
// //         noTasksCell.style.textAlign = "center";
// //         noTasksRow.appendChild(noTasksCell);
// //         tasksTableBody.appendChild(noTasksRow);
// //         return;
// //       }

// //       tasks.forEach((task) => {
// //         const row = document.createElement("tr");

// //         const titleCell = document.createElement("td");
// //         titleCell.innerText = task.title;
// //         row.appendChild(titleCell);

// //         const descCell = document.createElement("td");
// //         descCell.innerText = task.description;
// //         row.appendChild(descCell);

// //         const dueDateCell = document.createElement("td");
// //         dueDateCell.innerText = new Date(task.dueDate).toLocaleDateString();
// //         row.appendChild(dueDateCell);

// //         const statusCell = document.createElement("td");
// //         statusCell.innerText = task.status;
// //         row.appendChild(statusCell);

// //         const priorityCell = document.createElement("td");
// //         priorityCell.innerText = task.priority;
// //         row.appendChild(priorityCell);

// //         const updateCell = document.createElement("td");
// //         const updateBtn = document.createElement("button");
// //         updateBtn.innerText = "Update";
// //         updateBtn.classList.add("update-btn");
// //         updateBtn.addEventListener("click", () => openEditModal(task));
// //         updateCell.appendChild(updateBtn);
// //         row.appendChild(updateCell);

// //         const deleteCell = document.createElement("td");
// //         const deleteBtn = document.createElement("button");
// //         deleteBtn.innerText = "Delete";
// //         deleteBtn.classList.add("delete-btn");
// //         deleteBtn.addEventListener("click", () => deleteTask(task._id));
// //         deleteCell.appendChild(deleteBtn);
// //         row.appendChild(deleteCell);

// //         tasksTableBody.appendChild(row);
// //       });
// //     }

// //     // Handle Task Filtering
// //     allTasksBtn.addEventListener("click", () => {
// //       currentFilter = "all";
// //       setActiveFilterButton(allTasksBtn);
// //       fetchTasks();
// //     });

// //     inProgressBtn.addEventListener("click", () => {
// //       currentFilter = "In Progress";
// //       setActiveFilterButton(inProgressBtn);
// //       fetchTasks();
// //     });

// //     completedBtn.addEventListener("click", () => {
// //       currentFilter = "Completed";
// //       setActiveFilterButton(completedBtn);
// //       fetchTasks();
// //     });

// //     deletedBtn.addEventListener("click", () => {
// //       currentFilter = "Deleted";
// //       setActiveFilterButton(deletedBtn);
// //       fetchTasks();
// //     });

// //     function setActiveFilterButton(activeButton) {
// //       document
// //         .querySelectorAll(".nav-btn")
// //         .forEach((btn) => btn.classList.remove("active"));
// //       activeButton.classList.add("active");
// //     }

// //     // Delete Task
// //     async function deleteTask(taskId) {
// //       if (!confirm("Are you sure you want to delete this task?")) return;

// //       try {
// //         const response = await fetch(
// //           `http://127.0.0.1:9000/api/tasks/${taskId}`,
// //           {
// //             method: "DELETE",
// //             headers: { "Content-Type": "application/json" },
// //           }
// //         );

// //         const data = await response.json();

// //         if (response.ok) {
// //           mainStatus.innerText = "Task deleted successfully!";
// //           mainStatus.className = "success";
// //           fetchTasks();
// //         } else {
// //           mainStatus.innerText = data.message || "Failed to delete task.";
// //           mainStatus.className = "error";
// //         }
// //       } catch (error) {
// //         mainStatus.innerText = "An error occurred. Please try again.";
// //         mainStatus.className = "error";
// //         console.error("Delete Task Error:", error);
// //       }
// //     }

// //     /* --------------------- Edit Task Modal Logic --------------------- */
// //     const openEditModal = (task) => {
// //       editTaskForm.reset();
// //       document.getElementById("edit-task-id").value = task._id;
// //       document.getElementById("edit-task-title").value = task.title;
// //       document.getElementById("edit-task-desc").value = task.description;
// //       document.getElementById("edit-task-duedate").value =
// //         task.dueDate.split("T")[0];
// //       document.getElementById("edit-task-status").value = task.status;
// //       document.getElementById("edit-task-priority").value = task.priority;
// //       editModal.classList.remove("hidden");
// //     };

// //     const closeModal = () => {
// //       editModal.classList.add("hidden");
// //     };

// //     closeButton.addEventListener("click", closeModal);

// //     window.addEventListener("click", (e) => {
// //       if (e.target === editModal) {
// //         closeModal();
// //       }
// //     });

// //     // Handle Edit Task Form Submission
// //     editTaskForm.addEventListener("submit", async (e) => {
// //       e.preventDefault();

// //       const taskId = document.getElementById("edit-task-id").value;
// //       const title = document.getElementById("edit-task-title").value.trim();
// //       const description = document
// //         .getElementById("edit-task-desc")
// //         .value.trim();
// //       const dueDate = document.getElementById("edit-task-duedate").value;
// //       const status = document.getElementById("edit-task-status").value;
// //       const priority = document.getElementById("edit-task-priority").value;

// //       try {
// //         const response = await fetch(
// //           `http://127.0.0.1:9000/api/tasks/${taskId}`,
// //           {
// //             method: "PUT",
// //             headers: { "Content-Type": "application/json" },
// //             body: JSON.stringify({
// //               title,
// //               description,
// //               dueDate,
// //               status,
// //               priority,
// //             }),
// //           }
// //         );

// //         const data = await response.json();

// //         if (response.ok) {
// //           mainStatus.innerText = "Task updated successfully!";
// //           mainStatus.className = "success";
// //           closeModal();
// //           fetchTasks();
// //         } else {
// //           mainStatus.innerText = data.message || "Failed to update task.";
// //           mainStatus.className = "error";
// //         }
// //       } catch (error) {
// //         mainStatus.innerText = "An error occurred. Please try again.";
// //         mainStatus.className = "error";
// //         console.error("Update Task Error:", error);
// //       }
// //     });

// //     // Initial Fetch of All Tasks
// //     fetchTasks();
// //   }
