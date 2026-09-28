import { auth, db }
from "./firebase-config.js";

import {
    signInWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

import {
    doc,
    getDoc
}
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const loginButton =
    document.getElementById("loginButton");

const status =
    document.getElementById("loginStatus");

loginButton.addEventListener(
    "click",
    async () => {

        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;

        try {

            const userCredential =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            const user =
                userCredential.user;

            const userRef =
                doc(
                    db,
                    "users",
                    user.uid
                );

            const userDoc =
                await getDoc(userRef);

            if (!userDoc.exists()) {

                status.textContent =
                    "❌ Användaren saknar roll.";

                return;
            }

            const userData =
                userDoc.data();

            console.log(
                "ROLL:",
                userData.role
            );

            if (
                userData.role === "admin"
            ) {

                window.location.href =
                    "admin.html";

            } else if (
                userData.role === "member"
            ) {

                window.location.href =
                    "portal.html";

            } else {

                status.textContent =
                    "❌ Okänd roll.";

            }

        } catch (error) {

            console.error(error);

            status.textContent =
                "❌ Fel e-post eller lösenord";

        }

    }
);
console.log(
    document.getElementById("loginButton")
);