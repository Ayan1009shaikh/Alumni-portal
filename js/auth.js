console.log("auth.js is connected - FAKE MODE");

const signupForm = document.getElementById("signup");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const role = document.getElementById("role").value;

    console.log("Fake Signup Submitted");
    console.log("Email:", email);
    console.log("Role:", role);

    // Simulate redirect based on role
    if (role === "student") {
      window.location.href = "student-details.html";
    } else if (role === "mentor") {
      window.location.href = "mentor-details.html";
    } else if (role === "college") {
      window.location.href = "college-details.html";
    }
  });
}

const loginForm = document.getElementById("login");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    console.log("Fake Login Submitted");
    console.log("Email:", email);

    // Always redirect to student dashboard for now
    window.location.href = "student-dashboard.html";
  });
}
