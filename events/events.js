let events = [];

const eventList = document.getElementById("eventList");
const search = document.getElementById("search");
const category = document.getElementById("category");
const noResult = document.getElementById("noResult");

const eventSelect = document.getElementById("eventSelect");
const quantity = document.getElementById("quantity");
const total = document.getElementById("total");

const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("bookingMessage");

fetch("events.json")
    .then(response => response.json())
    .then(data => {
        events = data;
        displayEvents(events);
        loadEventOptions(events);
    });

function displayEvents(data) {

    eventList.innerHTML = "";

    if (data.length === 0) {
        noResult.style.display = "block";
        return;
    }

    noResult.style.display = "none";

    data.forEach(event => {

        const card = document.createElement("div");

        card.className = "event-card";

        card.innerHTML = `
            <div class="icon">🎫</div>
            <span>${event.category}</span>
            <h3>${event.name}</h3>
            <p>📅 ${event.date}</p>
            <p>⏰ ${event.time}</p>
            <p>📍 ${event.venue}</p>
            <p>₹${event.price} per ticket</p>
            <button onclick="selectEvent(${event.id})">
                Book Now
            </button>
        `;

        eventList.appendChild(card);
    });
}

function loadEventOptions(data) {

    data.forEach(event => {

        const option = document.createElement("option");

        option.value = event.id;
        option.textContent = event.name;

        eventSelect.appendChild(option);
    });
}

function filterEvents() {

    const searchText = search.value.toLowerCase();
    const selectedCategory = category.value;

    const filtered = events.filter(event => {

        const matchesSearch =
            event.name.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            event.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayEvents(filtered);
}

search.addEventListener("input", filterEvents);
category.addEventListener("change", filterEvents);

function selectEvent(id) {

    eventSelect.value = id;

    document.getElementById("booking")
        .scrollIntoView({
            behavior: "smooth"
        });

    calculateTotal();
}

function calculateTotal() {

    const selectedId = Number(eventSelect.value);
    const selectedEvent =
        events.find(event => event.id === selectedId);

    const ticketQuantity = Number(quantity.value);

    if (!selectedEvent) {
        total.textContent = "₹0";
        return;
    }

    total.textContent =
        "₹" + selectedEvent.price * ticketQuantity;
}

eventSelect.addEventListener("change", calculateTotal);
quantity.addEventListener("input", calculateTotal);

bookingForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("bookingName").value.trim();

    const email =
        document.getElementById("bookingEmail").value.trim();

    const selectedEvent =
        events.find(
            event => event.id === Number(eventSelect.value)
        );

    if (
        name === "" ||
        email === "" ||
        !selectedEvent
    ) {
        bookingMessage.textContent =
            "Please fill all booking details.";

        return;
    }

    bookingMessage.textContent =
        "Booking confirmed for " +
        selectedEvent.name +
        ".";

    bookingForm.reset();

    total.textContent = "₹0";
});