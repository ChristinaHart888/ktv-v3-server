// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ktv-v3.firebaseapp.com",
  projectId: "ktv-v3",
  storageBucket: "ktv-v3.firebasestorage.app",
  messagingSenderId: "1026247318707",
  appId: "1:1026247318707:web:40ed0e5975d1269552e4c6",
  measurementId: "G-MYMWCYBBE8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);