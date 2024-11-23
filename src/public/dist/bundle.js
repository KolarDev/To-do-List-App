/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/public/js/index.js":
/*!********************************!*\
  !*** ./src/public/js/index.js ***!
  \********************************/
/***/ (() => {

eval("// Wait for the DOM to load\n/* --------------------- Authentication Page Logic --------------------- */\nconst loginToggle = document.getElementById(\"login-toggle\");\nconst signupToggle = document.getElementById(\"signup-toggle\");\nconst loginForm = document.getElementById(\"login-form\");\nconst signupForm = document.getElementById(\"signup-form\");\nconst authStatus = document.getElementById(\"auth-status\");\n\n// Toggle between Login and Signup forms\nloginToggle.addEventListener(\"click\", () => {\n  loginToggle.classList.add(\"active\");\n  signupToggle.classList.remove(\"active\");\n  loginForm.classList.remove(\"hidden\");\n  signupForm.classList.add(\"hidden\");\n  authStatus.innerText = \"\";\n});\nsignupToggle.addEventListener(\"click\", () => {\n  signupToggle.classList.add(\"active\");\n  loginToggle.classList.remove(\"active\");\n  signupForm.classList.remove(\"hidden\");\n  loginForm.classList.add(\"hidden\");\n  authStatus.innerText = \"\";\n});\n\n// Handle Signup Form Submission\nif (signupForm) {\n  signupForm.addEventListener(\"submit\", async e => {\n    e.preventDefault();\n    const username = document.getElementById(\"signup-username\").value.trim();\n    const email = document.getElementById(\"signup-email\").value.trim();\n    const password = document.getElementById(\"signup-password\").value.trim();\n    try {\n      const response = await fetch(\"http://127.0.0.1:9000/api/v1/users/signup\", {\n        method: \"POST\",\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify({\n          username,\n          email,\n          password\n        })\n      });\n      const data = await response.json();\n      if (response.ok) {\n        authStatus.innerText = \"Signup successful! Redirecting to main page...\";\n        authStatus.className = \"success\";\n        setTimeout(() => {\n          window.location.href = \"main\";\n        }, 2000);\n      } else {\n        authStatus.innerText = data.message || \"Signup failed.\";\n        authStatus.className = \"error\";\n      }\n    } catch (error) {\n      authStatus.innerText = \"An error occurred. Please try again.\";\n      authStatus.className = \"error\";\n      console.error(\"Signup Error:\", error);\n    }\n  });\n}\n\n// Handle Login Form Submission\nif (loginForm) {\n  loginForm.addEventListener(\"submit\", async e => {\n    e.preventDefault();\n    const email = document.getElementById(\"login-email\").value.trim();\n    const password = document.getElementById(\"login-password\").value.trim();\n    try {\n      const response = await fetch(\"http://127.0.0.1:9000/api/v1/users/login\", {\n        method: \"POST\",\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify({\n          email,\n          password\n        })\n      });\n      const data = await response.json();\n      console.log(data); ////\n\n      if (response.ok) {\n        authStatus.innerText = \"Login successful! Redirecting to main page...\";\n        authStatus.className = \"success\";\n        setTimeout(() => {\n          window.location.href = \"main\";\n        }, 2000);\n      } else {\n        authStatus.innerText = data.message || \"Login failed.\";\n        authStatus.className = \"error\";\n      }\n    } catch (error) {\n      authStatus.innerText = \"An error occurred. Please try again.\";\n      authStatus.className = \"error\";\n      console.error(\"Login Error:\", error);\n    }\n  });\n}\n\n/* --------------------- Main Page Logic --------------------- */\nif (window.location.pathname.endsWith(\"main\")) {\n  const logoutBtn = document.getElementById(\"logout-btn\");\n  const greeting = document.getElementById(\"greeting\");\n  const addTaskForm = document.getElementById(\"add-task-form\");\n  const tasksTableBody = document.querySelector(\"#tasks-table tbody\");\n  const mainStatus = document.getElementById(\"main-status\");\n  const allTasksBtn = document.getElementById(\"all-tasks-btn\");\n  const inProgressBtn = document.getElementById(\"in-progress-btn\");\n  const completedBtn = document.getElementById(\"completed-btn\");\n  const deletedBtn = document.getElementById(\"deleted-btn\");\n  const editModal = document.getElementById(\"edit-modal\");\n  const closeButton = document.querySelector(\".close-button\");\n  const editTaskForm = document.getElementById(\"edit-task-form\");\n  let currentFilter = \"all\";\n\n  // Fetch user info to display greeting\n  async function fetchUserInfo() {\n    try {\n      const response = await fetch(\"http://127.0.0.1:9000/api/v1/users/me\", {\n        method: \"GET\",\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        credentials: \"include\"\n      });\n      if (response.ok) {\n        const data = await response.json();\n        const user = data.data.user; // Access the 'user' object in 'data'\n        console.log(user);\n        greeting.innerText = `Hello, ${user.username}`;\n        // Optionally, set profile picture if available\n      } else {\n        // If not authenticated, redirect to login\n        window.location.href = \"/\";\n      }\n    } catch (error) {\n      console.error(\"Fetch User Info Error:\", error);\n      window.location.href = \"/\";\n    }\n  }\n  fetchUserInfo();\n\n  // Handle Logout\n  logoutBtn.addEventListener(\"click\", async () => {\n    try {\n      const response = await fetch(\"http://127.0.0.1:9000/api/v1/users/logout\", {\n        method: \"POST\",\n        headers: {\n          \"Content-Type\": \"application/json\"\n        }\n      });\n      if (response.ok) {\n        window.location.href = \"/\";\n      } else {\n        mainStatus.innerText = \"Failed to logout.\";\n        mainStatus.className = \"error\";\n      }\n    } catch (error) {\n      mainStatus.innerText = \"An error occurred during logout.\";\n      mainStatus.className = \"error\";\n      console.error(\"Logout Error:\", error);\n    }\n  });\n\n  // Handle Add Task Form Submission\n  addTaskForm.addEventListener(\"submit\", async e => {\n    e.preventDefault();\n    const title = document.getElementById(\"task-title\").value.trim();\n    const description = document.getElementById(\"task-desc\").value.trim();\n    const dueDate = document.getElementById(\"task-duedate\").value;\n    const status = document.getElementById(\"task-status\").value;\n    const priority = document.getElementById(\"task-priority\").value;\n    try {\n      const response = await fetch(\"http://127.0.0.1:9000/api/v1/tasks\", {\n        method: \"POST\",\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify({\n          title,\n          description,\n          dueDate,\n          status,\n          priority\n        })\n      });\n      const data = await response.json();\n      if (response.ok) {\n        mainStatus.innerText = \"Task added successfully!\";\n        mainStatus.className = \"success\";\n        addTaskForm.reset();\n        fetchTasks();\n      } else {\n        mainStatus.innerText = data.message || \"Failed to add task.\";\n        mainStatus.className = \"error\";\n      }\n    } catch (error) {\n      mainStatus.innerText = \"An error occurred. Please try again.\";\n      mainStatus.className = \"error\";\n      console.error(\"Add Task Error:\", error);\n    }\n  });\n\n  // Fetch and Display Tasks\n  async function fetchTasks() {\n    try {\n      let url = \"http://127.0.0.1:9000/api/v1/tasks\";\n      if (currentFilter !== \"all\") {\n        url += `?status=${encodeURIComponent(currentFilter)}`;\n      }\n      const response = await fetch(url, {\n        method: \"GET\",\n        headers: {\n          \"Content-Type\": \"application/json\"\n        }\n      });\n      const tasks = await response.json();\n      if (response.ok) {\n        renderTasks(tasks);\n      } else {\n        mainStatus.innerText = \"Failed to fetch tasks.\";\n        mainStatus.className = \"error\";\n      }\n    } catch (error) {\n      mainStatus.innerText = \"An error occurred. Please try again.\";\n      mainStatus.className = \"error\";\n      console.error(\"Fetch Tasks Error:\", error);\n    }\n  }\n\n  // Render Tasks in the Table\n  function renderTasks(tasks) {\n    tasksTableBody.innerHTML = \"\";\n    if (tasks.length === 0) {\n      const noTasksRow = document.createElement(\"tr\");\n      const noTasksCell = document.createElement(\"td\");\n      noTasksCell.colSpan = 7;\n      noTasksCell.innerText = \"No tasks available.\";\n      noTasksCell.style.textAlign = \"center\";\n      noTasksRow.appendChild(noTasksCell);\n      tasksTableBody.appendChild(noTasksRow);\n      return;\n    }\n    tasks.forEach(task => {\n      const row = document.createElement(\"tr\");\n      const titleCell = document.createElement(\"td\");\n      titleCell.innerText = task.title;\n      row.appendChild(titleCell);\n      const descCell = document.createElement(\"td\");\n      descCell.innerText = task.description;\n      row.appendChild(descCell);\n      const dueDateCell = document.createElement(\"td\");\n      dueDateCell.innerText = new Date(task.dueDate).toLocaleDateString();\n      row.appendChild(dueDateCell);\n      const statusCell = document.createElement(\"td\");\n      statusCell.innerText = task.status;\n      row.appendChild(statusCell);\n      const priorityCell = document.createElement(\"td\");\n      priorityCell.innerText = task.priority;\n      row.appendChild(priorityCell);\n      const updateCell = document.createElement(\"td\");\n      const updateBtn = document.createElement(\"button\");\n      updateBtn.innerText = \"Update\";\n      updateBtn.classList.add(\"update-btn\");\n      updateBtn.addEventListener(\"click\", () => openEditModal(task));\n      updateCell.appendChild(updateBtn);\n      row.appendChild(updateCell);\n      const deleteCell = document.createElement(\"td\");\n      const deleteBtn = document.createElement(\"button\");\n      deleteBtn.innerText = \"Delete\";\n      deleteBtn.classList.add(\"delete-btn\");\n      deleteBtn.addEventListener(\"click\", () => deleteTask(task._id));\n      deleteCell.appendChild(deleteBtn);\n      row.appendChild(deleteCell);\n      tasksTableBody.appendChild(row);\n    });\n  }\n\n  // Handle Task Filtering\n  allTasksBtn.addEventListener(\"click\", () => {\n    currentFilter = \"all\";\n    setActiveFilterButton(allTasksBtn);\n    fetchTasks();\n  });\n  inProgressBtn.addEventListener(\"click\", () => {\n    currentFilter = \"In Progress\";\n    setActiveFilterButton(inProgressBtn);\n    fetchTasks();\n  });\n  completedBtn.addEventListener(\"click\", () => {\n    currentFilter = \"Completed\";\n    setActiveFilterButton(completedBtn);\n    fetchTasks();\n  });\n  deletedBtn.addEventListener(\"click\", () => {\n    currentFilter = \"Deleted\";\n    setActiveFilterButton(deletedBtn);\n    fetchTasks();\n  });\n  function setActiveFilterButton(activeButton) {\n    document.querySelectorAll(\".nav-btn\").forEach(btn => btn.classList.remove(\"active\"));\n    activeButton.classList.add(\"active\");\n  }\n\n  // Delete Task\n  async function deleteTask(taskId) {\n    if (!confirm(\"Are you sure you want to delete this task?\")) return;\n    try {\n      const response = await fetch(`http://127.0.0.1:9000/api/tasks/${taskId}`, {\n        method: \"DELETE\",\n        headers: {\n          \"Content-Type\": \"application/json\"\n        }\n      });\n      const data = await response.json();\n      if (response.ok) {\n        mainStatus.innerText = \"Task deleted successfully!\";\n        mainStatus.className = \"success\";\n        fetchTasks();\n      } else {\n        mainStatus.innerText = data.message || \"Failed to delete task.\";\n        mainStatus.className = \"error\";\n      }\n    } catch (error) {\n      mainStatus.innerText = \"An error occurred. Please try again.\";\n      mainStatus.className = \"error\";\n      console.error(\"Delete Task Error:\", error);\n    }\n  }\n\n  /* --------------------- Edit Task Modal Logic --------------------- */\n  const openEditModal = task => {\n    editTaskForm.reset();\n    document.getElementById(\"edit-task-id\").value = task._id;\n    document.getElementById(\"edit-task-title\").value = task.title;\n    document.getElementById(\"edit-task-desc\").value = task.description;\n    document.getElementById(\"edit-task-duedate\").value = task.dueDate.split(\"T\")[0];\n    document.getElementById(\"edit-task-status\").value = task.status;\n    document.getElementById(\"edit-task-priority\").value = task.priority;\n    editModal.classList.remove(\"hidden\");\n  };\n  const closeModal = () => {\n    editModal.classList.add(\"hidden\");\n  };\n  closeButton.addEventListener(\"click\", closeModal);\n  window.addEventListener(\"click\", e => {\n    if (e.target === editModal) {\n      closeModal();\n    }\n  });\n\n  // Handle Edit Task Form Submission\n  editTaskForm.addEventListener(\"submit\", async e => {\n    e.preventDefault();\n    const taskId = document.getElementById(\"edit-task-id\").value;\n    const title = document.getElementById(\"edit-task-title\").value.trim();\n    const description = document.getElementById(\"edit-task-desc\").value.trim();\n    const dueDate = document.getElementById(\"edit-task-duedate\").value;\n    const status = document.getElementById(\"edit-task-status\").value;\n    const priority = document.getElementById(\"edit-task-priority\").value;\n    try {\n      const response = await fetch(`http://127.0.0.1:9000/api/tasks/${taskId}`, {\n        method: \"PUT\",\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify({\n          title,\n          description,\n          dueDate,\n          status,\n          priority\n        })\n      });\n      const data = await response.json();\n      if (response.ok) {\n        mainStatus.innerText = \"Task updated successfully!\";\n        mainStatus.className = \"success\";\n        closeModal();\n        fetchTasks();\n      } else {\n        mainStatus.innerText = data.message || \"Failed to update task.\";\n        mainStatus.className = \"error\";\n      }\n    } catch (error) {\n      mainStatus.innerText = \"An error occurred. Please try again.\";\n      mainStatus.className = \"error\";\n      console.error(\"Update Task Error:\", error);\n    }\n  });\n\n  // Initial Fetch of All Tasks\n  fetchTasks();\n}\n\n//# sourceURL=webpack://to-do-list-app/./src/public/js/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/public/js/index.js"]();
/******/ 	
/******/ })()
;