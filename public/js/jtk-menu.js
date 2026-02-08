import { auth } from "./firebase-config.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  const jtkMenu = document.getElementById("jtkMenu");

  if (user) {
    jtkMenu?.classList.remove("hidden");
  } else {
    jtkMenu?.classList.add("hidden");
  }
});
