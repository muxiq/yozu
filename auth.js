import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

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

window.criarConta = function () {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      const user = userCredential.user;
      sendEmailVerification(user).then(() => {
        alert("Verifique seu e-mail antes de continuar.");
      });
    })
    .catch((error) => {
      alert(error.message);
    });
};

window.login = function () {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user.emailVerified) {
        window.location.href = "painel.html";
      } else {
        alert("Você precisa verificar seu e-mail para continuar.");
      }
    })
    .catch((error) => {
      alert(error.message);
    });
};
