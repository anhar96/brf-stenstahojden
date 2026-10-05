import { auth, db } from "./firebase-config.js";

import {
    createUserWithEmailAndPassword,
    deleteUser
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

import {
    deleteDoc,
    updateDoc,
    doc,
    getDoc,
    serverTimestamp,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const registerForm =
    document.getElementById("registerForm");

const registerStatus =
    document.getElementById("registerStatus");

registerForm.addEventListener(
    "submit",
    async (event) => {
        event.preventDefault();

        const email = document
            .getElementById("registerEmail")
            .value
            .trim()
            .toLowerCase();

        const password =
            document.getElementById("registerPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            showStatus(
                "Lösenorden stämmer inte överens.",
                "error"
            );

            return;
        }

        let createdUser = null;

        try {
                const inviteReference =
                  doc(db, "invites", email);

            console.log("HÄMTAR INVITE");

                const inviteSnapshot =
                     await getDoc(inviteReference);

            console.log("INVITE HÄMTAD");
            if (
                !inviteSnapshot.exists() ||
                inviteSnapshot.data().used === true
            ) {
                showStatus(
                    "Det finns ingen giltig inbjudan för e-postadressen.",
                    "error"
                );

                return;
            }

            const invite = inviteSnapshot.data();

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                console.log("USER SKAPAD");
console.log(userCredential.user);

            createdUser = userCredential.user;
                    console.log("SKRIVER USER");
                    console.log("USER SKAPAD");

            await setDoc(
                doc(db, "users", createdUser.uid),
                {
                    email,
                    role: invite.role,
                    createdAt: serverTimestamp()
                }
            );
            console.log("USER SPARAD");

            console.log("UPPDATERAR INVITE");

           await updateDoc(inviteReference, {
                    used: true,
                    usedAt: serverTimestamp(),
                    usedBy: createdUser.uid
            });
                console.log("INVITE UPPDATERAD");
            showStatus(
                "Kontot är aktiverat. Du skickas till adminpanelen.",
                "success"
            );

            window.location.href = "admin.html";
        } catch (error) {
            console.error(
                "Registreringen misslyckades:",
                error
            );

            /*
             * Om Authentication-kontot skapades men Firestore-steget
             * misslyckades tar vi bort det ofullständiga kontot.
             */
            if (createdUser) {
                try {
                    await deleteUser(createdUser);
                } catch (deleteError) {
                    console.error(
                        "Det ofullständiga kontot kunde inte tas bort:",
                        deleteError
                    );
                }
            }

            if (
                error.code === "auth/email-already-in-use"
            ) {
                showStatus(
                    "E-postadressen har redan ett konto.",
                    "error"
                );
            } else if (
                error.code === "auth/weak-password"
            ) {
                showStatus(
                    "Välj ett starkare lösenord.",
                    "error"
                );
            } else {
                showStatus(
                    "Kontot kunde inte aktiveras.",
                    "error"
                );
            }
        }
    }
);

function showStatus(message, type) {
    registerStatus.textContent = message;
    registerStatus.className =
        `admin-status ${type}`;
}