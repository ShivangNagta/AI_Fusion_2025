
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwPVBjuU3UeJcJmvivBz2nlgIgXoAG13w",
  authDomain: "template-f9b41.firebaseapp.com",
  projectId: "template-f9b41",
  storageBucket: "template-f9b41.firebasestorage.app",
  messagingSenderId: "664303124811",
  appId: "1:664303124811:web:010fcae194dd6e2a9528ce",
  measurementId: "G-KLH57SQMSD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();