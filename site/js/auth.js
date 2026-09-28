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

    console.log(
        "Inloggad:",
        user.email
    );

    const userRef =
        doc(
            db,
            "users",
            user.uid
        );

    const userDoc =
        await getDoc(userRef);

    if (!userDoc.exists()) {

        console.error(
            "Användaren finns inte i users collection"
        );

        return;
    }

    const userData =
        userDoc.data();
if (userData.role !== "admin") {

    alert(
        "Du har inte behörighet till adminpanelen."
    );

    window.location.href =
        "index.html";

    return;

}
    console.log(
        "ROLL:",
        userData.role
    );

});