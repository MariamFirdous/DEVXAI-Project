const vehicleButtons = document.querySelectorAll(".vehicle");
const estimateBtn = document.getElementById("estimateBtn");
const result = document.getElementById("result");
const comparisonPanel = document.getElementById("comparisonPanel");
const comparisonResults = document.getElementById("comparisonResults");
const validationMessage = document.getElementById("validationMessage");

const fareElement = document.getElementById("fare");
const distanceResult = document.getElementById("distanceResult");
const timeResult = document.getElementById("timeResult");
const vehicleResult = document.getElementById("vehicleResult");
const routeSummary = document.getElementById("routeSummary");

const bookBtn = document.getElementById("bookBtn");
const successMessage = document.getElementById("successMessage");
const bookingStatus = document.getElementById("bookingStatus");
const statusTimeline = document.getElementById("statusTimeline");

const dataset = window.RideNovaData;
let selectedVehicle = "Bike";
let statusTimer = null;

const bookingStages = [
    { label: "Booking confirmed", message: "Ride booked successfully! Your driver will be assigned shortly." },
    { label: "Driver assigned", message: "Driver assigned successfully! Your cab is on the way to your pickup location." },
    { label: "Vehicle is on the way", message: "Your vehicle is on the way. Please keep your phone nearby for updates." },
    { label: "Almost at your pickup", message: "Your driver is very close. Please be ready at the pickup point." }
];

function setValidation(message = "") {
    validationMessage.textContent = message;
    validationMessage.classList.toggle("show", Boolean(message));
}

function populateLocationOptions() {
    ["pickup", "drop"].forEach((id) => {
        const select = document.getElementById(id);
        dataset.locations.forEach((location) => {
            const option = document.createElement("option");
            option.value = location;
            option.textContent = location;
            select.appendChild(option);
        });
    });
}

function getTripDetails() {
    const pickup = document.getElementById("pickup").value.trim();
    const drop = document.getElementById("drop").value.trim();
    return { pickup, drop };
}

function getRouteDistance(pickup, drop) {
    if (!pickup || !drop || pickup === drop) {
        return 0;
    }

    const direct = dataset.routes[pickup]?.[drop];
    if (direct) return direct;

    const reverse = dataset.routes[drop]?.[pickup];
    if (reverse) return reverse;

    return null;
}

function renderComparison(distance, vehicle) {
    if (!distance || distance <= 0) {
        comparisonPanel.classList.remove("show");
        return;
    }

    window.RideNovaComparison.render(comparisonResults, { distance, vehicle });
    comparisonPanel.classList.add("show");
}

function renderStatusTimeline(activeIndex = 0) {
    statusTimeline.innerHTML = bookingStages
        .map((stage, index) => {
            const state = index < activeIndex
                ? "complete"
                : index === activeIndex
                    ? "active"
                    : "";

            return `
                <div class="timeline-item ${state}">
                    <span class="timeline-dot"></span>
                    <span>${stage.label}</span>
                </div>
            `;
        })
        .join("");
}

function startBookingStatusFlow() {
    let currentStep = 0;
    bookingStatus.classList.add("show");
    renderStatusTimeline(currentStep);
    successMessage.textContent = bookingStages[0].message;
    successMessage.classList.add("show");

    clearInterval(statusTimer);
    statusTimer = setInterval(() => {
        currentStep += 1;
        if (currentStep >= bookingStages.length) {
            clearInterval(statusTimer);
            currentStep = bookingStages.length - 1;
        }
        renderStatusTimeline(currentStep);
        successMessage.textContent = bookingStages[currentStep].message;
    }, 1800);
}

function updateRoutePreview() {
    const { pickup, drop } = getTripDetails();

    if (!pickup && !drop) {
        routeSummary.textContent = "Route: —";
        return;
    }

    const from = pickup || "Pickup";
    const to = drop || "Drop";
    routeSummary.textContent = `Route: ${from} → ${to}`;
}

vehicleButtons.forEach((button) => {
    button.addEventListener("click", () => {
        vehicleButtons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        selectedVehicle = button.dataset.type;
        setValidation("");
        updateRoutePreview();
    });
});

["pickup", "drop"].forEach((id) => {
    document.getElementById(id).addEventListener("change", () => {
        updateRoutePreview();
        if (validationMessage.classList.contains("show")) {
            setValidation("");
        }
    });
});

estimateBtn.addEventListener("click", () => {
    const { pickup, drop } = getTripDetails();
    const distance = getRouteDistance(pickup, drop);

    if (!pickup || !drop || !distance || distance <= 0) {
        setValidation("Please select valid pickup and drop locations.");
        result.classList.remove("show");
        comparisonPanel.classList.remove("show");
        return;
    }

    const fare = dataset.baseFare + distance * dataset.vehicleRates[selectedVehicle].RideNova;
    const estimatedTime = Math.ceil(distance * 3);

    fareElement.textContent = Math.round(fare);
    distanceResult.textContent = `${distance.toFixed(1)} km`;
    timeResult.textContent = `${estimatedTime} min`;
    vehicleResult.textContent = selectedVehicle;
    routeSummary.textContent = `Route: ${pickup} → ${drop}`;

    successMessage.textContent = "";
    successMessage.classList.remove("show");
    result.classList.add("show");
    setValidation("");
    renderComparison(distance, selectedVehicle);
});

bookBtn.addEventListener("click", () => {
    successMessage.textContent = bookingStages[0].message;
    successMessage.classList.add("show");
    bookBtn.textContent = "Booked ✓";
    bookBtn.disabled = true;
    bookBtn.style.opacity = "0.85";
    startBookingStatusFlow();
});

populateLocationOptions();
updateRoutePreview();
renderStatusTimeline();