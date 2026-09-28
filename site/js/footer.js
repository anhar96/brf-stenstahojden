async function loadFooter() {

    console.log("footer.js körs");

    const response =
        await fetch("components/footer.html");

    console.log("Status:", response.status);

    const html =
        await response.text();

    console.log(html);

    document.getElementById("footer").innerHTML =
        html;

}

loadFooter();