import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC8EdsMa0V1gxv4Hu90bu8UTe9AbOvwYbw",
    authDomain: "premium-shopping-29d3b.firebaseapp.com",
    projectId: "premium-shopping-29d3b",
    storageBucket: "premium-shopping-29d3b.firebasestorage.app",
    messagingSenderId: "873053661312",
    appId: "1:873053661312:web:fa4fdaa5dc0739edff9e65",
    measurementId: "G-Z1374G77BN"
  };
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db,auth };