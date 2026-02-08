import { initializeApp } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDxZSjjGrzDPuw8b4XUM-8BVwq9cmCtghA",
  authDomain: "ptiszonkualaketil.firebaseapp.com",
  projectId: "ptiszonkualaketil",
  storageBucket: "ptiszonkualaketil.firebasestorage.app",
  messagingSenderId: "634031867148",
  appId: "1:634031867148:web:5ffe2b9427e31f17563529"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

