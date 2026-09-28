console.log("HEADER.JS LADDAD");

async function loadHeader() {

    const headerElement =
        document.getElementById("header");

    console.log("headerElement:", headerElement);

    if (!headerElement) {
        console.error("Hittar inte #header");
        return;
    }

    const response =
        await fetch("components/header.html");

    const html =
        await response.text();

    headerElement.innerHTML = html;

}

document.addEventListener(
    "DOMContentLoaded",
    loadHeader
);