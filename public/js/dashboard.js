import { auth } from "./firebase-config.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/*
  ============================
  PROTECT DASHBOARD
  ============================
  - Jika user TIDAK login → redirect ke login.html
*/
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.replace("login.html");
  }
});

/*
  ============================
  LOGOUT FUNCTION
  ============================
  - Logout Firebase
  - Kembali ke halaman utama (index.html)
*/
window.logout = function () {
  signOut(auth)
    .then(() => {
      // ROOT DOMAIN = HALAMAN UTAMA
      window.location.replace("/");
    })
    .catch((error) => {
      console.error("Logout gagal:", error);
    });
};



