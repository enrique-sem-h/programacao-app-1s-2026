import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBLIwGzcwzbdKJNDmr7WusdzzvljbotL9k",
    authDomain: "alugae-e1917.firebaseapp.com",
    projectId: "alugae-e1917",
    storageBucket: "alugae-e1917.firebasestorage.app",
    messagingSenderId: "708963571818",
    appId: "1:708963571818:web:445f37a426b8378ebf9213"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// npx expo install firebase 