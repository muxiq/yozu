import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCEGoJkW1hwoXZSq3N1HIn3igPlf2pEUIw",
  authDomain: "yozuuu1.firebaseapp.com",
  projectId: "yozuuu1",
  storageBucket: "yozuuu1.appspot.com",
  messagingSenderId: "465076109752",
  appId: "1:465076109752:web:8bfc73f1f3809b85ef4f4d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById("app").innerHTML = `
  <h1>Yozu</h1>
  <p>Login e funcionalidades vindo em breve...</p>
`;