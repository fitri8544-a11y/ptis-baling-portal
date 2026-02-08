import { auth } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* ======================
   LOGIN
====================== */
window.login = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    document.getElementById("msg").innerText = "Sila isi email dan kata laluan";
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      // selepas login berjaya
      window.location.replace("jtk-dashboard.html");
    })
    .catch(() => {
      document.getElementById("msg").innerText = "LOGIN GAGAL";
    });
};

/* ======================
   RESET PASSWORD
====================== */
window.resetPassword = function () {
  const email = document.getElementById("email").value;

  if (!email) {
    alert("Sila masukkan email terlebih dahulu");
    return;
  }

  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Email reset kata laluan telah dihantar. Sila semak inbox.");
    })
    .catch((error) => {
      console.error(error);
      alert("Gagal menghantar email reset. Pastikan email betul.");
    });
};

