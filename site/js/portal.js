import { auth, db }
from "./firebase-config.js";

import {
    onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

import {
    doc,
    getDoc
}
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href =
            "login.html";

        return;
    }
const userInfo =
    document.getElementById("userInfo");

if (userInfo) {

    userInfo.textContent =
        user.email;

}
    const userRef =
        doc(db, "users", user.uid);

    const userDoc =
        await getDoc(userRef);

    if (!userDoc.exists()) {

        window.location.href =
            "login.html";

        return;
    }

    const userData =
        userDoc.data();

    document.getElementById("memberInfo")
        .innerHTML = `

            <p>
                Inloggad som:
                ${user.email}
            </p>

            <p>
                Roll:
                ${userData.role}
            </p>

        `;

});