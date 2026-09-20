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

    let visibleEvents = 0;

    eventCards.forEach(function (card) {

        const eventName = card
            .querySelector("h3")
            .textContent
            .toLowerCase();

        const eventCategory = card.dataset.category;

        const matchesSearch = eventName.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            eventCategory === selectedCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = "block";
            visibleEvents++;
        } else {
            card.style.display = "none";
        }
    });

    if (visibleEvents === 0) {
        noEvents.style.display = "block";
    } else {
        noEvents.style.display = "none";
    }
}

searchBtn.addEventListener("click", filterEvents);

searchInput.addEventListener("keyup", function () {
    filterEvents();
});

categorySelect.addEventListener("change", filterEvents);

const bookButtons = document.querySelectorAll(".book-btn");

bookButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const eventCard = button.closest(".event-card");
        const eventName = eventCard.querySelector("h3").textContent;

        alert(
            "You selected: " +
            eventName +
            "\nBooking page will be connected with the booking module."
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
        return;
    }

    formMessage.textContent =
        "Thank you! Your message has been submitted.";

    contactForm.reset();
});