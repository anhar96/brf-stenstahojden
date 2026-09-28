console.log("HEADER.JS LADDAD");

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
    

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");

  menuToggle.addEventListener(
    "click",
    () => {

        mainNav.classList.toggle("show");

        if (mainNav.classList.contains("show")) {
            menuToggle.textContent = "✕";
        } else {
            menuToggle.textContent = "☰";
        }

    }
);

}

document.addEventListener(
    "DOMContentLoaded",
    loadHeader
);