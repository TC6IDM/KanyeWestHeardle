// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1cQG5rHu60Htkh7SAtvpr-1TIWqLOZcU",
  authDomain: "kanyewestheardle-5be51.firebaseapp.com",
  projectId: "kanyewestheardle-5be51",
  storageBucket: "kanyewestheardle-5be51.appspot.com",
  messagingSenderId: "82489599869",
  appId: "1:82489599869:web:55b4565631cfe6132dce14",
  measurementId: "G-7722PTHKF9"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const imgDB = getStorage(FIREBASE_APP);