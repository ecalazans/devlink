import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3xaKqtlTlUz1B2UGLOff-T6974QLqpJQ",
  authDomain: "reactlinks-196e6.firebaseapp.com",
  projectId: "reactlinks-196e6",
  storageBucket: "reactlinks-196e6.firebasestorage.app",
  messagingSenderId: "649762688747",
  appId: "1:649762688747:web:e107096f08c852242d78ae"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }