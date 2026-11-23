
/* Mobile Menu */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", function () {
    navMenu.classList.toggle("active");
});

navMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navMenu.classList.remove("active");
    });
});


/* Search Events */

const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const searchBtn = document.getElementById("searchBtn");
const eventCards = document.querySelectorAll(".event-card");
const noEvents = document.getElementById("noEvents");

function filterEvents() {
    const searchText = searchInput.value.toLowerCase().trim();
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

    noEvents.style.display = count === 0 ? "block" : "none";
}

searchBtn.addEventListener("click", filterEvents);
searchInput.addEventListener("input", filterEvents);
categorySelect.addEventListener("change", filterEvents);


/* Booking Success Modal */

const bookingModal = document.getElementById("bookingModal");
const closeModal = document.getElementById("closeModal");
const okModal = document.getElementById("okModal");

const modalEventName = document.getElementById("modalEventName");
const modalEventDate = document.getElementById("modalEventDate");
const modalEventLocation = document.getElementById("modalEventLocation");

function openBookingModal(card) {
    const eventName = card.querySelector("h3").textContent;
    const eventDate = card.querySelector(".event-date").textContent;
    const eventLocation = card.querySelector(".event-location").textContent;

    modalEventName.textContent = eventName;
    modalEventDate.textContent = eventDate;
    modalEventLocation.textContent = eventLocation;

    bookingModal.classList.add("active");
    document.body.classList.add("modal-open");

    closeModal.focus();
}

function hideBookingModal() {
    bookingModal.classList.remove("active");
    document.body.classList.remove("modal-open");
}

const bookButtons = document.querySelectorAll(".book-btn");

bookButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const card = button.closest(".event-card");
        openBookingModal(card);
    });
});

closeModal.addEventListener("click", hideBookingModal);
okModal.addEventListener("click", hideBookingModal);

bookingModal.addEventListener("click", function (event) {
    if (event.target === bookingModal) {
        hideBookingModal();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && bookingModal.classList.contains("active")) {
        hideBookingModal();
    }
});


/* Contact Form */

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


/* Newsletter Form */

const newsletterForm = document.getElementById("newsletterForm");
const newsletterMessage = document.getElementById("newsletterMessage");

newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    newsletterMessage.textContent =
        "Thank you for subscribing to EventHub!";

    newsletterForm.reset();
});
