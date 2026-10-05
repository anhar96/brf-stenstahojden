import { db } from "./firebase-config.js";

import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    serverTimestamp,
    setDoc,
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
const inviteForm = document.getElementById("inviteForm");
const inviteEmailInput = document.getElementById("inviteEmail");
const inviteStatus = document.getElementById("inviteStatus");
const inviteList = document.getElementById("inviteList");

if (inviteForm) {
    inviteForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = inviteEmailInput.value
            .trim()
            .toLowerCase();

        const allowedDomain = "@brfstenstahojden.se";

        if (!email.endsWith(allowedDomain)) {
            inviteStatus.textContent =
                "E-postadressen måste tillhöra brfstenstahojden.se.";

            inviteStatus.className = "admin-status error";
            return;
        }

        try {
            await setDoc(
                doc(db, "invites", email),
                {
                    email,
                    role: "admin",
                    used: false,
                    createdAt: serverTimestamp()
                }
            );

            inviteForm.reset();

            inviteStatus.textContent =
                "Inbjudan har skapats.";

            inviteStatus.className =
                "admin-status success";
        } catch (error) {
            console.error(
                "Kunde inte skapa inbjudan:",
                error
            );

            inviteStatus.textContent =
                "Inbjudan kunde inte skapas.";

            inviteStatus.className =
                "admin-status error";
        }
    });
}

if (inviteList) {
    onSnapshot(
        collection(db, "invites"),
        (snapshot) => {
            inviteList.innerHTML = "";

            if (snapshot.empty) {
                inviteList.innerHTML =
                    "<p>Det finns inga aktiva inbjudningar.</p>";

                return;
            }

            snapshot.forEach((inviteSnapshot) => {
                const invite = inviteSnapshot.data();

                if (invite.used) {
                    return;
                }

                const item = document.createElement("article");
                item.className = "admin-anslag";

                const information = document.createElement("div");

                const emailHeading = document.createElement("h3");
                emailHeading.textContent = invite.email;

                const roleText = document.createElement("p");
                roleText.textContent = "Roll: Administratör";

                information.append(emailHeading, roleText);

                const removeButton =
                    document.createElement("button");

                removeButton.type = "button";
                removeButton.className = "delete-button";
                removeButton.textContent = "Ta bort inbjudan";

                removeButton.addEventListener(
                    "click",
                    async () => {
                        const confirmed = window.confirm(
                            `Ta bort inbjudan för ${invite.email}?`
                        );

                        if (!confirmed) {
                            return;
                        }

                        await deleteDoc(
                            doc(
                                db,
                                "invites",
                                inviteSnapshot.id
                            )
                        );
                    }
                );

                item.append(information, removeButton);
                inviteList.appendChild(item);
            });
        }
    );
}

loadAdminNotices();