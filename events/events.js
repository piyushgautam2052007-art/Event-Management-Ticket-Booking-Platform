// Event data
const events = [
    {
        id: 1,
        name: "Live Music Festival",
        date: "15 October 2026",
        time: "6:00 PM",
        venue: "Mathura Stadium",
        description: "Enjoy live music performances and entertainment.",
        ticketPrice: 499
    },
    {
        id: 2,
        name: "Tech Innovation Summit",
        date: "22 October 2026",
        time: "10:00 AM",
        venue: "India Expo Centre",
        description: "Explore technology, innovation and new ideas.",
        ticketPrice: 799
    },
    {
        id: 3,
        name: "University Sports Meet",
        date: "28 October 2026",
        time: "9:00 AM",
        venue: "University Ground",
        description: "Enjoy exciting university sports activities.",
        ticketPrice: 299
    }
];

const eventList = document.getElementById("eventList");
const eventDetails = document.getElementById("eventDetails");
const eventSelect = document.getElementById("eventSelect");
const ticketQuantity = document.getElementById("ticketQuantity");
const totalPrice = document.getElementById("totalPrice");
const bookButton = document.getElementById("bookButton");

// Display event cards
function displayEvents() {
    eventList.innerHTML = "";

    events.forEach(function (event) {
        const card = document.createElement("div");

        card.className = "event-card";

        card.innerHTML = `
            <h3>${event.name}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Time:</strong> ${event.time}</p>
            <p><strong>Venue:</strong> ${event.venue}</p>
            <p><strong>Ticket Price:</strong> ₹${event.ticketPrice}</p>
            <button onclick="showEventDetails(${event.id})">
                View Details
            </button>
        `;

        eventList.appendChild(card);
    });
}

// Show event details
function showEventDetails(eventId) {
    const event = events.find(function (item) {
        return item.id === eventId;
    });

    eventDetails.innerHTML = `
        <h3>${event.name}</h3>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Time:</strong> ${event.time}</p>
        <p><strong>Venue:</strong> ${event.venue}</p>
        <p><strong>Description:</strong> ${event.description}</p>
        <p><strong>Ticket Price:</strong> ₹${event.ticketPrice}</p>
    `;

    eventSelect.value = event.id;
    calculateTotal();
}

// Add events to dropdown
function populateEventDropdown() {
    events.forEach(function (event) {
        const option = document.createElement("option");

        option.value = event.id;
        option.textContent =
            `${event.name} - ₹${event.ticketPrice}`;

        eventSelect.appendChild(option);
    });
}

// Calculate total ticket price
function calculateTotal() {
    const selectedEventId = Number(eventSelect.value);
    const quantity = Number(ticketQuantity.value);

    const selectedEvent = events.find(function (event) {
        return event.id === selectedEventId;
    });

    if (selectedEvent && quantity > 0) {
        totalPrice.textContent =
            selectedEvent.ticketPrice * quantity;
    } else {
        totalPrice.textContent = "0";
    }
}

// Update total when event changes
eventSelect.addEventListener("change", function () {
    calculateTotal();
});

// Update total when ticket quantity changes
ticketQuantity.addEventListener("input", function () {
    calculateTotal();
});

// Booking button
bookButton.addEventListener("click", function () {
    const selectedEventId = Number(eventSelect.value);
    const quantity = Number(ticketQuantity.value);

    if (!selectedEventId) {
        alert("Please select an event.");
        return;
    }

    if (quantity < 1) {
        alert("Please enter at least 1 ticket.");
        return;
    }

    const selectedEvent = events.find(function (event) {
        return event.id === selectedEventId;
    });

    const total = selectedEvent.ticketPrice * quantity;

    alert(
        `Booking confirmed!\n\n` +
        `Event: ${selectedEvent.name}\n` +
        `Tickets: ${quantity}\n` +
        `Total Price: ₹${total}`
    );
});

// Start the page
displayEvents();
populateEventDropdown();