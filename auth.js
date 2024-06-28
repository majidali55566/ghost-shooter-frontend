// auth.js

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const rollno = loginForm.querySelector('input[name="username"]').value;
      const password = loginForm.querySelector('input[name="password"]').value;

      console.log(rollno + password);

      try {
        const response = await fetch(
          "https://scoreapi-z32i.onrender.com/api/users/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ rollno, password }),
          }
        );
        const data = response.json();
        if (response.status === 400) {
          document.querySelector(".login-status").innerHTML =
            "wrong password or rollno";
        }
        if (response.ok) {
          localStorage.setItem("token", data.token);
          document.querySelector(".login-status").innerHTML =
            "Login successful!";
          window.location.href = "/game"; // Redirect to the game page
        } else {
          document.querySelector(".login-status").innerHTML = "Login failed";
        }
      } catch (error) {
        console.error("Error:", error);
        document.querySelector(".login-status").innerHTML = "Login failed";
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const rollno = signupForm.querySelector('input[name="username"]').value;
      const newEmail = signupForm.querySelector('input[name="email"]').value;
      const password = signupForm.querySelector('input[name="password"]').value;
      console.log(rollno + password);
      try {
        const response = await fetch(
          "https://scoreapi-z32i.onrender.com/api/users/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ rollno, password }),
            credentials: true,
          }
        );
        const data = await response.json();

        if (response.status === 400) {
          document.querySelector(".registration-message").innerHTML =
            "User is already register";
          window.location = "/login.html";
        }

        if (response.ok) {
          localStorage.setItem("token", data.token);
          window.location.href = "./game.html";
          alert("Signup successful! Please login.");
        } else {
          document.querySelector(".registration-message").innerHTML =
            "Registerattion failed";
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error:", error);
        document.querySelector(".registration-message").innerHTML =
          "Registerattion failed";
      }
    });
  }
});
