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


// ==========================================================
// Packet Table
// ==========================================================

const packetTable = document.getElementById("packetTable");


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
// Load Dashboard Statistics
// ==========================================================

async function loadDashboard() {

    const response = await getDashboardData();

    if (response === null) {

        console.log("Unable to connect to dashboard API.");

        return;

    }

    if (!response.success) {

        console.log(response.message);

        return;

    }

    const dashboard = response.data;

    totalPackets.textContent = dashboard.totalPackets;

    safePackets.textContent = dashboard.safePackets;

    attackPackets.textContent = dashboard.attackPackets;

    tcpPackets.textContent = dashboard.tcpPackets;

}


// ==========================================================
// Load Recent Packets
// ==========================================================

async function loadPackets() {

    const response = await getPackets();

    if (response === null) {

        console.log("Unable to fetch packets.");

        return;

    }

    if (!response.success) {

        console.log(response.message);

        return;

    }

    // Purane rows remove karo
    packetTable.innerHTML = "";

    // Latest 10 packets
    const packets = response.data.slice(0, 10);

    packets.forEach(packet => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${packet.packet_id}</td>

            <td>${packet.source_ip}</td>

            <td>${packet.destination_ip}</td>

            <td>

                <span class="badge ${getStatusClass(packet.status)}">

                    ${packet.status}

                </span>

            </td>

        `;

        // ==========================================================
        // Row Click Event
        // ==========================================================

        row.style.cursor = "pointer";

        row.addEventListener("click", () => {

            window.location.href =
                `packet-details.html?packetId=${packet.packet_id}`;

        });

        packetTable.appendChild(row);

    });

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

setInterval(refreshDashboard, 5000);







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