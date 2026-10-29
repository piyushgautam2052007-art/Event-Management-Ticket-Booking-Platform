const profileForm = document.getElementById("profileForm");
const editBtn = document.getElementById("editBtn");
const cancelBtn = document.getElementById("cancelBtn");
const profileMessage = document.getElementById("profileMessage");
const bookingList = document.getElementById("bookingList");
const emptyBookings = document.getElementById("emptyBookings");

const profileFields = {
    name: document.getElementById("fullName"),
    email: document.getElementById("email"),
    phone: document.getElementById("phone"),
    city: document.getElementById("city")
};

// Sample profile data for this frontend demonstration.
const defaultProfile = {
    name: "Pratiksha Sharma",
    email: "pratiksha@example.com",
    phone: "",
    city: "Mathura"
};

let profile = { ...defaultProfile };

// Sample booking history; no backend or real booking records.
const bookings = [
    {
        id: "EVT101",
        eventName: "Live Music Festival",
        date: "15 October 2026",
        tickets: 2,
        amount: 998,
        status: "Confirmed"
    },
    {
        id: "EVT102",
        eventName: "Tech Innovation Summit",
        date: "22 October 2026",
        tickets: 1,
        amount: 799,
        status: "Confirmed"
    }
];

function updateProfileDisplay() {
    document.getElementById("sidebarName").textContent = profile.name;
    document.getElementById("sidebarEmail").textContent = profile.email;

    document.getElementById("displayName").textContent = profile.name;
    document.getElementById("displayEmail").textContent = profile.email;

    document.getElementById("displayPhone").textContent =
        profile.phone || "Not provided";

    document.getElementById("displayCity").textContent =
        profile.city || "Not provided";

    document.getElementById("avatar").textContent =
        profile.name.trim().charAt(0).toUpperCase() || "?";
}

function fillProfileForm() {
    profileFields.name.value = profile.name;
    profileFields.email.value = profile.email;
    profileFields.phone.value = profile.phone;
    profileFields.city.value = profile.city;
}

function openEditForm() {
    fillProfileForm();

    profileMessage.textContent = "";

    document.getElementById("editProfile").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    profileFields.name.focus({ preventScroll: true });
}

editBtn.addEventListener("click", openEditForm);

profileForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = profileFields.name.value.trim();
    const email = profileFields.email.value.trim();
    const phone = profileFields.phone.value.trim();
    const city = profileFields.city.value.trim();

    if (name.length < 2) {
        profileMessage.textContent =
            "Please enter a name with at least 2 characters.";
        profileFields.name.focus();
        return;
    }

    if (phone !== "" && !/^[0-9]{10}$/.test(phone)) {
        profileMessage.textContent =
            "Enter a valid 10-digit phone number.";
        profileFields.phone.focus();
        return;
    }

    profile = {
        name: name,
        email: email,
        phone: phone,
        city: city
    };

    updateProfileDisplay();

    profileMessage.textContent =
        "Profile updated for this session.";

    fillProfileForm();
});

cancelBtn.addEventListener("click", function () {
    fillProfileForm();

    profileMessage.textContent =
        "Your unsaved changes have been discarded.";
});

function renderBookings() {
    bookingList.innerHTML = "";

    if (bookings.length === 0) {
        emptyBookings.style.display = "block";
        return;
    }

    emptyBookings.style.display = "none";

    bookings.forEach(function (booking) {
        const card = document.createElement("article");
        card.className = "booking-card";

        const info = document.createElement("div");
        info.className = "booking-info";

        const title = document.createElement("h3");
        title.textContent = booking.eventName;

        const date = document.createElement("p");
        date.textContent = "Date: " + booking.date;

        const tickets = document.createElement("p");
        tickets.textContent = "Tickets: " + booking.tickets;

        const amount = document.createElement("p");
        amount.textContent =
            "Total: ₹" + booking.amount +
            " | Booking ID: " + booking.id;

        const status = document.createElement("span");
        status.className = "booking-status";
        status.textContent = booking.status;

        info.append(title, date, tickets, amount);
        card.append(info, status);

        bookingList.appendChild(card);
    });
}

document.getElementById("logoutBtn").addEventListener("click", function () {
    const shouldLogout = window.confirm(
        "This is a demo profile page. Do you want to return to the home page?"
    );

    if (shouldLogout) {
        window.location.href = "../../frontend/home/home.html";
    }
});

// Highlight the relevant sidebar link when clicked.
document.querySelectorAll(".sidebar-links a").forEach(function (link) {
    link.addEventListener("click", function () {
        document.querySelectorAll(".sidebar-links a").forEach(function (item) {
            item.classList.remove("active");
        });

        link.classList.add("active");
    });
});

// Initialize the page.
updateProfileDisplay();
fillProfileForm();
renderBookings();