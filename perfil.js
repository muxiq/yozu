import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCEGoJkW1hwoXZSq3N1HIn3igPlf2pEUIw",
  authDomain: "yozuuu1.firebaseapp.com",
  projectId: "yozuuu1",
  storageBucket: "yozuuu1.appspot.com",
  messagingSenderId: "465076109752",
  appId: "1:465076109752:web:8bfc73f1f3809b85ef4f4d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const username = location.pathname.split("/").pop();
const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  const data = doc.data();
  if (data.username === username) {
    document.getElementById("nome").textContent = data.nome;
    document.getElementById("avatar").src = data.avatar;
    document.getElementById("bio").textContent = data.bio;
    if (data.link1) document.getElementById("links").innerHTML += `<a href="${data.link1}" target="_blank">${data.link1}</a>`;
    if (data.link2) document.getElementById("links").innerHTML += `<a href="${data.link2}" target="_blank">${data.link2}</a>`;
  }
});
