import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAlAQtjoRvqDdDACGJuEJME4Q_z8siak3E",
  authDomain: "alumni-deca1.firebaseapp.com",
  projectId: "alumni-deca1",
  storageBucket: "alumni-deca1.appspot.com",  // FIXED typo here
  messagingSenderId: "934426996327",
  appId: "1:934426996327:web:f4d094c5d763235bc82ec2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
