
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDNpKCVirOSzomDt8OhcTJRObM4Ha4Q7rw",
  authDomain: "login-signup-1058e.firebaseapp.com",
  projectId: "login-signup-1058e",
  storageBucket: "login-signup-1058e.firebasestorage.app",
  messagingSenderId: "819972743004",
  appId: "1:819972743004:web:1f21e0927bf1e58720ab99",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// ✅ Initialize Auth
export const auth = getAuth(app);
export const db = getFirestore(app);