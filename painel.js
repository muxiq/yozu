import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

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

onAuthStateChanged(auth, async (user) => {
  if (!user) return (window.location.href = "login.html");
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const data = snap.data();
    document.getElementById("nome").value = data.nome || "";
    document.getElementById("bio").value = data.bio || "";
    document.getElementById("avatar").value = data.avatar || "";
    document.getElementById("link1").value = data.link1 || "";
    document.getElementById("link2").value = data.link2 || "";
  }
});

window.salvar = async function () {
  const user = auth.currentUser;
  if (!user) return;
  const ref = doc(db, "users", user.uid);
  await setDoc(ref, {
    nome: document.getElementById("nome").value,
    bio: document.getElementById("bio").value,
    avatar: document.getElementById("avatar").value,
    link1: document.getElementById("link1").value,
    link2: document.getElementById("link2").value,
    username: user.email.split("@")[0],
  });
  alert("Perfil salvo!");
};
