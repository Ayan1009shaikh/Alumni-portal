console.log("auth.js is connected");

import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// SIGNUP
const signupForm = document.getElementById("signup");
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const role = document.getElementById("role").value;

  console.log("Signup form submitted");
  console.log("Email:", email);
  console.log("Role selected:", role);

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: role
    });

    if (role === "student") {
      console.log("Redirecting to student-details.html...");
      window.location.href = "student-details.html";
    } else if (role === "mentor") {
      console.log("Redirecting to mentor-details.html...");
      window.location.href = "mentor-details.html";
    } else if (role === "college") {
      console.log("Redirecting to college-details.html...");
      window.location.href = "college-details.html";
    }
  } catch (error) {
    console.error("Signup Error:", error.message);
    alert("Signup Error: " + error.message);
  }
});

// LOGIN
const loginForm = document.getElementById("login");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  console.log("Login form submitted");

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const role = docSnap.data().role;
      console.log("User role:", role);

      if (role === "student") {
        console.log("Redirecting to student-dashboard.html...");
        window.location.href = "student-dashboard.html";
      } else if (role === "mentor") {
        console.log("Redirecting to mentor-dashboard.html...");
        window.location.href = "mentor-dashboard.html";
      } else if (role === "college") {
        console.log("Redirecting to college-dashboard.html...");
        window.location.href = "college-dashboard.html";
      }
    } else {
      alert("User role not found in Firestore.");
    }
  } catch (error) {
    console.error("Login Error:", error.message);
    alert("Login Error: " + error.message);
  }
});
