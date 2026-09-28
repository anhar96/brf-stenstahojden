import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDue_PPN3GJQrSfShJVNqi5QAn3zDYnFks",
    authDomain: "brf-stenstahojden.firebaseapp.com",
    projectId: "brf-stenstahojden",
    storageBucket: "brf-stenstahojden.firebasestorage.app",
    messagingSenderId: "885829667159",
    appId: "1:885829667159:web:795e313c9b6fe94fb01612",
    measurementId: "G-SKJTQC5GWZ"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

console.log("Firebase config laddad");