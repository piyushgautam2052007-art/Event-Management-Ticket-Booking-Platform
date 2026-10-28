const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", function () {
navMenu.classList.toggle("active");
});

const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const searchBtn = document.getElementById("searchBtn");
const eventCards = document.querySelectorAll(".event-card");
const noEvents = document.getElementById("noEvents");

function filterEvents() {
const searchText = searchInput.value.toLowerCase();
const selectedCategory = categorySelect.value;

let count = 0;

eventCards.forEach(function (card) {
    const eventName = card.querySelector("h3").textContent.toLowerCase();
    const eventCategory = card.dataset.category;

    const nameMatch = eventName.includes(searchText);
    const categoryMatch =
        selectedCategory === "all" ||
        eventCategory === selectedCategory;

    if (nameMatch && categoryMatch) {
        card.style.display = "";
        count++;
    } else {
        card.style.display = "none";
    }
});

if (count === 0) {
    noEvents.style.display = "block";
} else {
    noEvents.style.display = "none";
}
}

searchBtn.addEventListener("click", filterEvents);
searchInput.addEventListener("input", filterEvents);
categorySelect.addEventListener("change", filterEvents);

const bookButtons = document.querySelectorAll(".book-btn");

bookButtons.forEach(function (button) {
button.addEventListener("click", function () {
const card = button.closest(".event-card");
const eventName = card.querySelector("h3").textContent;

    alert(
        "Great Choice!\n\nYou selected: " +
        eventName +
        "\n\nBooking feature is coming soon!"
    );
});

});

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function (event) {
event.preventDefault();

const name = document.getElementById("name").value.trim();
const email = document.getElementById("email").value.trim();
const message = document.getElementById("message").value.trim();

if (name === "" || email === "" || message === "") {
    formMessage.textContent = "Please fill all fields.";
    formMessage.style.color = "red";
    return;
}

if (!email.includes("@") || !email.includes(".")) {
    formMessage.textContent = "Please enter a valid email.";
    formMessage.style.color = "red";
    return;
}

formMessage.textContent =
    "Thank you, " + name + "! Your message has been submitted.";

formMessage.style.color = "green";
contactForm.reset();
});
