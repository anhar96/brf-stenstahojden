

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

}

document.addEventListener(
    "DOMContentLoaded",
    loadHeader
);