// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5Nr380TU2BWy9AYTA_fRs8yuWOKmwv6o",
  authDomain: "volunteermap-c689d.firebaseapp.com",
  projectId: "volunteermap-c689d",
  storageBucket: "volunteermap-c689d.appspot.com",
  messagingSenderId: "719658268096",
  appId: "1:719658268096:web:03b83accfd4abdd009c425"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = firebase.firestore();