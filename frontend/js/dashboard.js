/*
==========================================================
File Name : dashboard.js

Purpose :

Dashboard Page JavaScript

Responsibilities :

• Dashboard Statistics Load Karna
• Recent Packets Load Karna
• Dashboard Auto Refresh

Future Scope :

• Threat Monitor
• Charts
• Live Notifications

==========================================================
*/

// ==========================================================
// Store Packets
// ==========================================================

// ==========================================================
// Notification Tracking
// ==========================================================

let lastThreatId = null;

let allPackets = [];

let previousThreatCount = 0;

// ==========================================================
// Dashboard Cards
// ==========================================================

// Total Packets
const totalPackets = document.getElementById("totalPackets");

// Safe Packets
const safePackets = document.getElementById("safePackets");

// Threat Packets
const attackPackets = document.getElementById("attackPackets");

// TCP Packets
const tcpPackets = document.getElementById("tcpPackets");


const sqlButton = document.getElementById("sqlButton");


const xssButton = document.getElementById("xssButton");


// ==========================================================
// Packet Table
// ==========================================================

const packetTable = document.getElementById("packetTable");

// ==========================================================
// Search Box
// ==========================================================

const searchBox = document.getElementById("searchBox");


// ==========================================================
// Status Badge Color
// ==========================================================

/*
Packet ke status ke hisaab se
Bootstrap badge color return karega.
*/

function getStatusClass(status) {

    switch (status) {

        case "SAFE":

            return "bg-success";

        case "WARNING":

            return "bg-warning text-dark";

        case "MALICIOUS":

            return "bg-danger";

        default:

            return "bg-secondary";

    }

}


// ==========================================================
// Connection Error Banner
//
// IMPORTANT :
// Pehle fetch fail hone pe sirf console.log hota tha,
// screen pe kuch dikhta hi nahi tha (packets 0 reh
// jaate the bina kisi wajah ke). Ab real error
// screen ke top pe ek banner me dikhega.
// ==========================================================

function showConnectionError(message) {

    let banner = document.getElementById("connectionErrorBanner");

    if (!banner) {

        banner = document.createElement("div");

        banner.id = "connectionErrorBanner";

        banner.style.cssText =
            "position:fixed;top:0;left:0;right:0;z-index:9999;" +
            "background:#dc3545;color:#fff;padding:10px 16px;" +
            "font-family:sans-serif;font-size:14px;text-align:center;";

        document.body.prepend(banner);

    }

    banner.textContent = "Backend Connection Issue : " + message;

    banner.style.display = "block";

}

function hideConnectionError() {

    const banner = document.getElementById("connectionErrorBanner");

    if (banner) {

        banner.style.display = "none";

    }

}


// ==========================================================
// Load Dashboard Statistics
// ==========================================================

async function loadDashboard() {

    const response = await getDashboardData();

    if (response === null) {

        console.log("Unable to connect to dashboard API.");

        showConnectionError(
            "Backend se connect nahi ho pa raha (network/CORS/server down)."
        );

        return;

    }

    if (!response.success) {

        console.log(response.message);

        showConnectionError(response.message || "Unknown error");

        return;

    }

    hideConnectionError();

    const dashboard = response.data;

    //Update cards

    totalPackets.textContent = dashboard.totalPackets;

    safePackets.textContent = dashboard.safePackets;

    attackPackets.textContent = dashboard.attackPackets;

    tcpPackets.textContent = dashboard.tcpPackets;

    // ==========================================================
    // Check for New Threat
    // ==========================================================

    const threatResponse = await getThreats();

    if (threatResponse.success && threatResponse.data.length > 0) {

        const latestThreat = threatResponse.data[0];

        const currentId = latestThreat._id;

        if (currentId !== lastThreatId) {

            lastThreatId = currentId;

            addNotification(latestThreat);

            showThreatNotification(latestThreat);

        }
    }
}

// ==========================================================
// Display Packets
// ==========================================================

function displayPackets(packets) {

    packetTable.innerHTML = "";

    packets.forEach(packet => {

        const row = document.createElement("tr");

        row.style.cursor = "pointer";

        row.innerHTML = `

            <td>${packet.packet_id || packet._id}</td>

            <td>${packet.source_ip}</td>

            <td>${packet.destination_ip}</td>

            <td>

                <span class="badge ${getStatusClass(packet.status)}">

                    ${packet.status}

                </span>

            </td>

        `;

        row.addEventListener("click", () => {

            const packetId = packet.packet_id || packet._id;

            window.location.href =
                `packet-details.html?id=${packetId}`;

        });

        packetTable.appendChild(row);

    });

}


// ==========================================================
// Search Packet
// ==========================================================

searchBox.addEventListener("keyup", () => {

    const keyword = searchBox.value.toLowerCase();

    const filteredPackets = allPackets.filter(packet => {

        const id = String(

            packet.packet_id || packet._id || ""

        ).toLowerCase();

        return id.includes(keyword);

    });

    displayPackets(filteredPackets);

});

// ==========================================================
// Load Recent Packets
// ==========================================================

async function loadPackets() {

    const response = await getPackets();

    if (response === null) {

        console.log("Unable to fetch packets.");

        showConnectionError(
            "Backend se connect nahi ho pa raha (network/CORS/server down)."
        );

        return;

    }

    if (!response.success) {

        console.log(response.message);

        showConnectionError(response.message || "Unknown error");

        return;

    }

    allPackets = response.data.slice(0, 25);

    displayPackets(allPackets);

}


// ==========================================================
// Refresh Dashboard
// ==========================================================

/*
Ye function poore dashboard ko
refresh karega.

Har refresh me

• Cards
• Packet Table

update honge.
*/

async function refreshDashboard() {

    await loadDashboard();

    await loadPackets();

}


// ==========================================================
// Attack Simulator Buttons
// ==========================================================

sqlButton.addEventListener("click", async () => {

    const response = await generateSQLAttack();

    alert(response.message);

    await loadDashboard();

    await loadPackets();

});



xssButton.addEventListener("click", async () => {

    const response = await generateXSSAttack();

    alert(response.message);

    await loadDashboard();

    await loadPackets();

});


// ==========================================================
// Initial Load
// ==========================================================

refreshDashboard();


// ==========================================================
// Auto Refresh
// ==========================================================

/*
Har 5 seconds baad

Dashboard automatically update hoga.
*/

const REFRESH_INTERVAL = 5000;

setInterval(

    refreshDashboard,

    REFRESH_INTERVAL

);







/*

Q1. Why create refreshDashboard()?

Ek hi function se
poora dashboard
update ho jata hai.

--------------------------------

Q2. Why use async/await?

Backend se response
aane ka wait karta hai.

--------------------------------

Q3. Why clear packetTable first?

Purane packets remove
karne ke liye.

--------------------------------

Q4. Why create getStatusClass() separately?

Code reusable
aur readable rehta hai.

--------------------------------

Q5. Why use setInterval()?

Dashboard ko
live monitoring
jaisa experience
dene ke liye.

*/

/*

Q6. Why use textContent?

HTML render nahi karta.

Safe hota hai.


Q7. Why create loadDashboard()?

Code modular rehta hai.

Future me refresh bhi
isi function se hoga.


Q8. Why check response == null?

Network issue hone par
api.js null return karta hai.


Q9. Why call loadDashboard() at bottom?

Page load hote hi
dashboard update ho jaye.


Q10. Can we call it again?

Yes.

Isi function ko
5 second baad
dobara call kar sakte hain.

*/