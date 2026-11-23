

const defaultUser = {
    name: "Pratiksha Sharma",
    email: "pratiksha@example.com",
    phone: "9876543210",
    gender: "",
    dob: "",
    city: "Mathura",
    address: ""
};




const defaultBookings = [
    {
        id: 101,
        eventName: "Live Music Festival",
        date: "2026-10-15",
        venue: "Mathura Stadium",
        quantity: 2,
        price: 499,
        status: "Completed"
    },
    {
        id: 102,
        eventName: "Tech Innovation Summit",
        date: "2026-10-22",
        venue: "India Expo Centre",
        quantity: 1,
        price: 799,
        status: "Completed"
    },
    {
        id: 103,
        eventName: "University Sports Meet",
        date: "2026-11-28",
        venue: "University Ground",
        quantity: 2,
        price: 299,
        status: "Confirmed"
    },
    {
        id: 104,
        eventName: "Creative Design Workshop",
        date: "2026-12-02",
        venue: "Creative Hall",
        quantity: 1,
        price: 399,
        status: "Cancelled"
    }
];




function loadData(key, defaultValue) {

    const savedData = localStorage.getItem(key);

    if (savedData) {

        try {
            return JSON.parse(savedData);
        } catch (error) {
            console.error("Unable to read saved data:", error);
        }

    }

    return defaultValue;
}


let user = loadData("eventhubProfile", defaultUser);

let bookings = loadData("eventhubBookings", defaultBookings);




function saveData(key, data) {

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );

}




const profileAvatar =
    document.getElementById("profileAvatar");

const profileModal =
    document.getElementById("profileModal");

const profileForm =
    document.getElementById("profileForm");

const notification =
    document.getElementById("notification");

const bookingList =
    document.getElementById("bookingList");

const emptyBookings =
    document.getElementById("emptyBookings");

const formError =
    document.getElementById("formError");




function displayProfile() {

    document.getElementById("displayName").textContent =
        user.name;

    document.getElementById("displayEmail").textContent =
        user.email;

    document.getElementById("infoName").textContent =
        user.name;

    document.getElementById("infoEmail").textContent =
        user.email;

    document.getElementById("infoPhone").textContent =
        user.phone || "Not specified";

    document.getElementById("infoGender").textContent =
        user.gender || "Not specified";

    document.getElementById("infoDob").textContent =
        user.dob || "Not specified";

    document.getElementById("infoCity").textContent =
        user.city || "Not specified";

    document.getElementById("infoAddress").textContent =
        user.address || "Not specified";




    const initials = user.name
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map(word => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

    profileAvatar.textContent = initials || "U";

}



function displayStatistics() {

    const confirmed = bookings.filter(
        booking => booking.status === "Confirmed"
    ).length;

    const completed = bookings.filter(
        booking => booking.status === "Completed"
    ).length;

    const cancelled = bookings.filter(
        booking => booking.status === "Cancelled"
    ).length;


    document.getElementById("totalBookings").textContent =
        bookings.length;

    document.getElementById("confirmedBookings").textContent =
        confirmed;

    document.getElementById("completedBookings").textContent =
        completed;

    document.getElementById("cancelledBookings").textContent =
        cancelled;

    document.getElementById("bookingCount").textContent =
        bookings.length + " Bookings";

}



function formatDate(dateString) {

    const date = new Date(dateString + "T00:00:00");

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

}




function displayBookings(filter = "All") {

    bookingList.innerHTML = "";

    const filteredBookings = bookings.filter(booking => {

        return filter === "All" ||
            booking.status === filter;

    });


    if (filteredBookings.length === 0) {

        emptyBookings.style.display = "block";

        return;

    }

    emptyBookings.style.display = "none";


    filteredBookings.forEach(booking => {

        const card = document.createElement("div");

        card.className = "booking-card";


        const info = document.createElement("div");

        info.className = "booking-info";


        const heading = document.createElement("h3");

        heading.textContent = booking.eventName;


        const date = document.createElement("p");

        date.textContent =
            "Date: " + formatDate(booking.date);


        const venue = document.createElement("p");

        venue.textContent =
            "Venue: " + booking.venue;


        const tickets = document.createElement("p");

        tickets.textContent =
            "Tickets: " + booking.quantity;


        info.append(
            heading,
            date,
            venue,
            tickets
        );


        const right = document.createElement("div");

        right.className = "booking-right";


        const price = document.createElement("p");

        price.className = "booking-price";

        price.textContent =
            "₹" + booking.price * booking.quantity;


        const status = document.createElement("span");

        status.className =
            "status status-" +
            booking.status.toLowerCase();

        status.textContent = booking.status;


        right.append(price, status);


       

        if (booking.status === "Confirmed") {

            const cancelButton =
                document.createElement("button");

            cancelButton.className = "cancel-booking";

            cancelButton.textContent = "Cancel Booking";

            cancelButton.addEventListener("click", function () {

                cancelBooking(booking.id);

            });

            right.appendChild(cancelButton);

        }


        card.append(info, right);

        bookingList.appendChild(card);

    });

}




const filterButtons =
    document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        displayBookings(button.dataset.filter);

    });

});




function cancelBooking(bookingId) {

    const confirmation = confirm(
        "Are you sure you want to cancel this booking?"
    );

    if (!confirmation) {
        return;
    }


    bookings = bookings.map(booking => {

        if (booking.id === bookingId) {

            return {
                ...booking,
                status: "Cancelled"
            };

        }

        return booking;

    });


    saveData("eventhubBookings", bookings);

    displayBookings(
        document.querySelector(".filter-btn.active").dataset.filter
    );

    displayStatistics();

    showNotification("Booking cancelled successfully!");

}




function openModal() {

    document.getElementById("editName").value =
        user.name;

    document.getElementById("editEmail").value =
        user.email;

    document.getElementById("editPhone").value =
        user.phone;

    document.getElementById("editGender").value =
        user.gender;

    document.getElementById("editDob").value =
        user.dob;

    document.getElementById("editCity").value =
        user.city;

    document.getElementById("editAddress").value =
        user.address;

    formError.textContent = "";

    profileModal.classList.add("show");

}



function closeModal() {

    profileModal.classList.remove("show");

}




document.getElementById("editProfileBtn")
    .addEventListener("click", openModal);

document.getElementById("editInfoBtn")
    .addEventListener("click", openModal);

document.getElementById("closeModal")
    .addEventListener("click", closeModal);

document.getElementById("cancelEdit")
    .addEventListener("click", closeModal);




profileModal.addEventListener("click", function (event) {

    if (event.target === profileModal) {
        closeModal();
    }

});




function validateProfile(name, email, phone) {

    if (name.length < 2) {

        return "Name must contain at least 2 characters.";

    }

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        return "Please enter a valid email address.";

    }

    const phonePattern = /^[6-9]\d{9}$/;

    if (!phonePattern.test(phone)) {

        return "Enter a valid 10-digit Indian mobile number.";

    }

    return "";

}




profileForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const name =
        document.getElementById("editName").value.trim();

    const email =
        document.getElementById("editEmail").value.trim();

    const phone =
        document.getElementById("editPhone").value.trim();

    const gender =
        document.getElementById("editGender").value;

    const dob =
        document.getElementById("editDob").value;

    const city =
        document.getElementById("editCity").value.trim();

    const address =
        document.getElementById("editAddress").value.trim();


  

    const error = validateProfile(name, email, phone);

    if (error) {

        formError.textContent = error;

        return;

    }


  

    if (dob) {

        const selectedDate = new Date(dob + "T00:00:00");

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        if (selectedDate > today) {

            formError.textContent =
                "Date of birth cannot be in the future.";

            return;

        }

    }


   

    user = {
        name,
        email,
        phone,
        gender,
        dob,
        city,
        address
    };


   

    saveData("eventhubProfile", user);


   

    displayProfile();

    closeModal();

    showNotification("Profile updated successfully!");

});




function showNotification(message) {

    notification.textContent = message;

    notification.classList.add("show");

    setTimeout(function () {

        notification.classList.remove("show");

    }, 2500);

}




document.getElementById("logoutBtn")
    .addEventListener("click", function () {

        const confirmation = confirm(
            "Do you want to leave the profile page?"
        );

        if (confirmation) {

            window.location.href =
                "../../frontend/home/home.html";

        }

    });




function initializeProfile() {

    displayProfile();

    displayStatistics();

    displayBookings();

}




initializeProfile();