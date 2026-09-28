// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDue_PPN3GJQrSfShJVNqi5QAn3zDYpfks",
  authDomain: "brf-stenstahojden.firebaseapp.com",
  projectId: "brf-stenstahojden",
  storageBucket: "brf-stenstahojden.firebasestorage.app",
  messagingSenderId: "885829667159",
  appId: "1:885829667159:web:795e313c9b6fe94fb01612",
  measurementId: "G-SKJTQC5GWZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);