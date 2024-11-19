// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    /* --------------------- Authentication Page Logic --------------------- */
    const loginToggle = document.getElementById("login-toggle");
    const signupToggle = document.getElementById("signup-toggle");
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const authStatus = document.getElementById("auth-status");
  
    // Toggle between Login and Signup forms
    loginToggle.addEventListener("click", () => {
      loginToggle.classList.add("active");
      signupToggle.classList.remove("active");
      loginForm.classList.remove("hidden");
      signupForm.classList.add("hidden");
      authStatus.innerText = "";
    });
  
    signupToggle.addEventListener("click", () => {
      signupToggle.classList.add("active");
      loginToggle.classList.remove("active");
      signupForm.classList.remove("hidden");
      loginForm.classList.add("hidden");
      authStatus.innerText = "";
    });
  
    // Handle Signup Form Submission
    if (signupForm) {
      signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
  
        const username = document.getElementById("signup-username").value.trim();
        const email = document.getElementById("signup-email").value.trim();
        const password = document.getElementById("signup-password").value.trim();
  
        try {
          const response = await fetch(
            "http://127.0.0.1:9000/api/v1/users/signup",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, email, password }),
            }
          );
  
          const data = await response.json();
  
          if (response.ok) {
            authStatus.innerText =
              "Signup successful! Redirecting to main page...";
            authStatus.className = "success";
            setTimeout(() => {
              window.location.href = "main.html";
            }, 2000);
          } else {
            authStatus.innerText = data.message || "Signup failed.";
            authStatus.className = "error";
          }
        } catch (error) {
          authStatus.innerText = "An error occurred. Please try again.";
          authStatus.className = "error";
          console.error("Signup Error:", error);
        }
      });
    }
  
    // Handle Login Form Submission
    if (loginForm) {
      loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
  
        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value.trim();
  
        try {
          const response = await fetch(
            "http://127.0.0.1:9000/api/v1/users/login",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            }
          );
  
          const data = await response.json();
          console.log(data); ////
  
          if (response.ok) {
            authStatus.innerText =
              "Login successful! Redirecting to main page...";
            authStatus.className = "success";
            setTimeout(() => {
              window.location.href = "main.html";
            }, 2000);
          } else {
            authStatus.innerText = data.message || "Login failed.";
            authStatus.className = "error";
          }
        } catch (error) {
          authStatus.innerText = "An error occurred. Please try again.";
          authStatus.className = "error";
          console.error("Login Error:", error);
        }
      });
    }
  
    
  });
  