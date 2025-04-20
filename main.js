import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

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
const appDiv = document.getElementById("app");

function renderLogin() {
  appDiv.innerHTML = `
    <div class="container">
      <h2>Login</h2>
      <input type="email" id="email" placeholder="Email">
      <input type="password" id="password" placeholder="Senha">
      <button onclick="login()">Entrar</button>
      <p style="text-align:center;margin:10px 0;">ou</p>
      <button onclick="register()">Criar conta</button>
    </div>
  `;
}

function renderDashboard(user, data) {
  appDiv.innerHTML = `
    <div class="container">
      <h2>Painel de ${user.email}</h2>
      <input id="nome" placeholder="Seu nome" value="${data?.nome || ''}">
      <input id="bio" placeholder="Bio" value="${data?.bio || ''}">
      <input id="avatar" placeholder="Link do avatar" value="${data?.avatar || ''}">
      <input id="link1" placeholder="Link 1" value="${data?.link1 || ''}">
      <input id="link2" placeholder="Link 2" value="${data?.link2 || ''}">
      <button onclick="salvar()">Salvar perfil</button>
      <button onclick="logout()" style="background:#900;">Sair</button>
    </div>
  `;
}

window.login = async function () {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("password").value;
  try {
    const cred = await signInWithEmailAndPassword(auth, email, senha);
    carregarPainel(cred.user);
  } catch (e) {
    alert("Erro ao entrar: " + e.message);
  }
};

window.register = async function () {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("password").value;
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, senha);
    await setDoc(doc(db, "perfis", cred.user.uid), {
      nome: "",
      bio: "",
      avatar: "",
      link1: "",
      link2: ""
    });
    carregarPainel(cred.user);
  } catch (e) {
    alert("Erro ao criar conta: " + e.message);
  }
};

window.logout = async function () {
  await signOut(auth);
  renderLogin();
};

window.salvar = async function () {
  const user = auth.currentUser;
  if (!user) return;
  const docRef = doc(db, "perfis", user.uid);
  await setDoc(docRef, {
    nome: document.getElementById("nome").value,
    bio: document.getElementById("bio").value,
    avatar: document.getElementById("avatar").value,
    link1: document.getElementById("link1").value,
    link2: document.getElementById("link2").value
  });
  alert("Perfil salvo!");
};

async function carregarPainel(user) {
  const ref = doc(db, "perfis", user.uid);
  const snap = await getDoc(ref);
  renderDashboard(user, snap.exists() ? snap.data() : {});
}

onAuthStateChanged(auth, (user) => {
  if (user) carregarPainel(user);
  else renderLogin();
});
