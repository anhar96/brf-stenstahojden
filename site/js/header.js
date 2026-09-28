import { auth }
from "./firebase-config.js";

import {
    onAuthStateChanged,
    signOut
}
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

async function loadHeader() {

    const headerElement =
        document.getElementById("header");

    if (!headerElement) {
        return;
    }

    const response =
        await fetch("components/header.html");

    const html =
        await response.text();

    headerElement.innerHTML = html;
    console.log(
    document.getElementById("userMenu")
);

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener(
            "click",
            () => {

                mainNav.classList.toggle("show");

                if (
                    mainNav.classList.contains("show")
                ) {

                    menuToggle.textContent = "✕";

                } else {

                    menuToggle.textContent = "☰";

                }

            }
        );
    }

    const userMenu =
        document.getElementById("userMenu");
console.log("userMenu:", userMenu);
    onAuthStateChanged(auth, (user) => {

        if (!user) {
console.log("USER:", user);
``
           userMenu.innerHTML = `
    <a href="login.html" class="login-btn">
        Logga in
    </a>
`;

            return;
        }
console.log("USER:");
console.log(user);

console.log("USERMENU:");
console.log(userMenu);
if (!userMenu) {
    console.error("userMenu saknas");
    return;
}
console.log("USER:", user);
``

        userMenu.innerHTML = `
            <span class="user-email">
                👤 ${user.email}
            </span>

            <button id="logoutButton">
                Logga ut
            </button>
        `;

        document
            .getElementById("logoutButton")
            .addEventListener(
                "click",
                async () => {

                    await signOut(auth);

                    window.location.href =
                        "index.html";

                }
            );

    });

}

document.addEventListener(
    "DOMContentLoaded",
    loadHeader
);