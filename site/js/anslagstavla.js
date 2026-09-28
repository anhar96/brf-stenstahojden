import { db } from "./firebase-config.js";

import {
    collection,
    getDocs
}
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

async function loadNotices() {

    const anslagDiv = document.getElementById("anslag");

    const querySnapshot =
        await getDocs(collection(db, "anslag"));

    console.log("Antal anslag:", querySnapshot.size);

    anslagDiv.innerHTML = "";

    querySnapshot.forEach((documentSnapshot) => {

        const data = documentSnapshot.data();

        const cssClass =
            data.important
                ? "anslag-kort viktigt"
                : "anslag-kort";

        anslagDiv.innerHTML += `
            <div class="${cssClass}">
                <h3>${data.title}</h3>
                <p>${data.message}</p>
            </div>
        `;

    });

}

loadNotices();