// Import the functions needed from the SDKs needed
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCuhmWkYSUoU3iE4nU0PrSrDh9-xjmtIWc",
    authDomain: "memomindapp.firebaseapp.com",
    projectId: "memomindapp",
    storageBucket: "memomindapp.firebasestorage.app",
    messagingSenderId: "1007780334488",
    appId: "1:1007780334488:web:6c80cba8dcdaa328d339ed",
    measurementId: "G-4DG35T0SHL"
  }; //takes firebase database information and connects

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Initializing and exporting Firestore
export const db = getFirestore(app);