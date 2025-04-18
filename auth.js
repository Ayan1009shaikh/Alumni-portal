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

const signupForm = document.getElementById("signup");
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const role = document.getElementById("role").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: role
    });

    if (role === "student") {
      window.location.href = "student-details.html";
    } else if (role === "mentor") {
      window.location.href = "mentor-details.html";
    } else if (role === "college") {
      window.location.href = "college-details.html";
    }
  } catch (error) {
    alert("Signup Error: " + error.message);
  }
});

const loginForm = document.getElementById("login");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const role = docSnap.data().role;
      if (role === "student") {
        window.location.href = "student-dashboard.html";
      } else if (role === "mentor") {
        window.location.href = "mentor-dashboard.html";
      } else if (role === "college") {
        window.location.href = "college-dashboard.html";
      }
    } else {
      alert("User role not found.");
    }
  } catch (error) {
    alert("Login Error: " + error.message);
  }
});