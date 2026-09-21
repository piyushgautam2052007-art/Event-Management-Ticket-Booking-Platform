const editButton = document.getElementById("editButton");

editButton.addEventListener("click", function() {

    const name = prompt(
        "Enter your name:",
        document.getElementById("userName").textContent
    );

    if (name !== null && name.trim() !== "") {
        document.getElementById("userName").textContent = name;
    }

});