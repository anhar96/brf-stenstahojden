import { db } from "./firebase-config.js";

import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    serverTimestamp,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

console.log("ADMIN.JS LADDAD");

const form = document.getElementById("anslagForm");
const titleInput = document.getElementById("title");
const messageInput = document.getElementById("message");
const importantInput = document.getElementById("important");
const status = document.getElementById("status");
const adminAnslag = document.getElementById("adminAnslag");
const submitButton = document.getElementById("submitButton");

let editingId = null;

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const title = titleInput.value.trim();
    const message = messageInput.value.trim();
    const important = importantInput.checked;

    try {

        if (editingId) {

            await updateDoc(
                doc(db, "anslag", editingId),
                {
                    title,
                    message,
                    important
                }
            );

            editingId = null;

            submitButton.textContent =
                "Publicera anslag";

            status.textContent =
                "✅ Anslaget uppdaterades";

        } else {

            await addDoc(
                collection(db, "anslag"),
                {
                    title,
                    message,
                    important,
                    createdAt: serverTimestamp()
                }
            );

            status.textContent =
                "✅ Anslaget publicerades";

        }

        form.reset();

    } catch (error) {

        console.error(error);

        status.textContent =
            "❌ Något gick fel";

    }

});

function loadAdminNotices() {

    console.log("loadAdminNotices körs");

    onSnapshot(
        collection(db, "anslag"),
        (snapshot) => {

            adminAnslag.innerHTML = "";

            if (snapshot.empty) {

                adminAnslag.innerHTML = `
                    <p>Inga anslag finns ännu.</p>
                `;

                return;
            }

            snapshot.forEach((documentSnapshot) => {

                const data =
                    documentSnapshot.data();

                const article =
                    document.createElement("article");

                article.className =
                    data.important
                        ? "admin-anslag viktigt"
                        : "admin-anslag";

                const title =
                    document.createElement("h3");

                title.textContent =
                    data.title;

                const message =
                    document.createElement("p");

                message.textContent =
                    data.message;

                const editButton =
                    document.createElement("button");

                editButton.textContent =
                    "Redigera";

                editButton.className =
                    "edit-button";

                editButton.addEventListener(
                    "click",
                    () => {

                        editingId =
                            documentSnapshot.id;

                        titleInput.value =
                            data.title;

                        messageInput.value =
                            data.message;

                        importantInput.checked =
                            data.important;

                        submitButton.textContent =
                            "Spara ändringar";

                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });

                    }
                );

                const deleteButton =
                    document.createElement("button");

                deleteButton.textContent =
                    "Ta bort";

                deleteButton.className =
                    "delete-button";

                deleteButton.addEventListener(
                    "click",
                    () => {
                        deleteNotice(
                            documentSnapshot.id
                        );
                    }
                );

                article.appendChild(title);
                article.appendChild(message);
                article.appendChild(editButton);
                article.appendChild(deleteButton);

                adminAnslag.appendChild(
                    article
                );

            });

        }
    );

}

async function deleteNotice(id) {

    const confirmed =
        confirm(
            "Vill du ta bort anslaget?"
        );

    if (!confirmed) {
        return;
    }

    try {

        await deleteDoc(
            doc(db, "anslag", id)
        );

        status.textContent =
            "✅ Anslaget togs bort";

    } catch (error) {

        console.error(error);

        status.textContent =
            "❌ Kunde inte ta bort anslaget";

    }

}

loadAdminNotices();