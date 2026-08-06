/*
==========================================================
Settings Page

Purpose :

Manage application settings.

Responsibilities :

• Load statistics
• Save user preferences
• Delete all packets

==========================================================
*/


// ==========================================================
// Load Statistics
// ==========================================================

async function loadStatistics() {

    const response = await getPackets();

    if (!response || !response.success) {

        return;

    }

    const packets = response.data;

    document.getElementById("totalPackets").textContent = packets.length;

    const threats = packets.filter(packet =>

        packet.status === "Threat"

    );

    document.getElementById("totalThreats").textContent = threats.length;

}


// ==========================================================
// Save Preferences
// ==========================================================

function savePreferences() {

    localStorage.setItem(

        "autoRefresh",

        document.getElementById("autoRefresh").checked

    );

    localStorage.setItem(

        "notifications",

        document.getElementById("notifications").checked

    );

    localStorage.setItem(

        "darkTheme",

        document.getElementById("darkTheme").checked

    );

}


// ==========================================================
// Load Preferences
// ==========================================================

function loadPreferences() {

    document.getElementById("autoRefresh").checked =

        localStorage.getItem("autoRefresh") === "true";

    document.getElementById("notifications").checked =

        localStorage.getItem("notifications") === "true";

    document.getElementById("darkTheme").checked =

        localStorage.getItem("darkTheme") === "true";

}


// ==========================================================
// Preference Listeners
// ==========================================================

document

.getElementById("autoRefresh")

.addEventListener("change", savePreferences);


document

.getElementById("notifications")

.addEventListener("change", savePreferences);


document

.getElementById("darkTheme")

.addEventListener("change", savePreferences);


// ==========================================================
// Delete All Packets
// ==========================================================

document

.getElementById("deleteAllPackets")

.addEventListener(

    "click",

    async function () {

        const confirmDelete = confirm(

            "Delete all packets?"

        );

        if (!confirmDelete) {

            return;

        }

        const response = await deleteAllPackets();

        if (response.success) {

            alert(response.message);

            loadStatistics();

        }

        else {

            alert("Unable to delete packets.");

        }

    }

);


// ==========================================================
// Initial Load
// ==========================================================

loadPreferences();

loadStatistics();