import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyD8yE32r0BpaDrj-roI9HeAKoGcx1jAeyA",
  authDomain: "swoosh-hub.firebaseapp.com",
  projectId: "swoosh-hub",
  storageBucket: "swoosh-hub.firebasestorage.app",
  messagingSenderId: "692715362732",
  appId: "1:692715362732:web:4f66f3884dc1f20421c209",
  measurementId: "G-EX7JLZYVVJ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
