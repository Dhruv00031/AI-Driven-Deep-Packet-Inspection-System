/*
==========================================================
File Name : alerts.js

Purpose :

Threat Monitor JavaScript

Responsibilities :

• Fetch Threat Packets
• Display Threat Table
• Auto Refresh

Future Scope :

• Threat Filters
• Search
• Export Report
• AI Risk Analysis

Author : AI-DPI Team
==========================================================
*/


// ==========================================================
// Threat Table
// ==========================================================

const threatTable = document.getElementById("threatTable");


// ==========================================================
// Severity Badge
// ==========================================================

function getSeverityClass(severity) {

    switch (severity) {

        case "LOW":

            return "bg-success";

        case "MEDIUM":

            return "bg-warning text-dark";

        case "HIGH":

            return "bg-danger";

        case "CRITICAL":

            return "bg-dark";

        default:

            return "bg-secondary";

    }

}


// ==========================================================
// Status Badge
// ==========================================================

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
// Load Threats
// ==========================================================

async function loadThreats() {

    const response = await getThreats();

    if (response === null) {

        console.log("Unable to fetch threats.");

        return;

    }

    if (!response.success) {

        console.log(response.message);

        return;

    }

    // Purani rows remove karo
    threatTable.innerHTML = "";

    // Threat list
    const threats = response.data;

    // Agar koi threat nahi hai
    if (threats.length === 0) {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td colspan="5" class="text-center">

                No Threats Detected

            </td>

        `;

        threatTable.appendChild(row);

        return;

    }

    // Threat rows add karo
    threats.forEach(packet => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${packet.packet_id}</td>

            <td>${packet.attack}</td>

            <td>

                <span class="badge ${getSeverityClass(packet.severity)}">

                    ${packet.severity}

                </span>

            </td>

            <td>${packet.source_ip}</td>

            <td>

                <span class="badge ${getStatusClass(packet.status)}">

                    ${packet.status}

                </span>

            </td>

        `;

        threatTable.appendChild(row);

    });

}


// ==========================================================
// Refresh Threat Monitor
// ==========================================================

async function refreshThreats() {

    await loadThreats();

}


// ==========================================================
// Initial Load
// ==========================================================

refreshThreats();


// ==========================================================
// Auto Refresh
// ==========================================================

setInterval(refreshThreats, 5000);







/*

Q1. Why create separate badge functions?

Severity aur Status
alag-alag values use karte hain.

--------------------------------

Q2. Why clear the table first?

Duplicate rows
avoid karne ke liye.

--------------------------------

Q3. Why check threats.length?

Empty database me
user ko proper message
dikhana chahiye.

--------------------------------

Q4. Why use createElement()?

Professional DOM
manipulation ke liye.

--------------------------------

Q5. Why refresh every 5 seconds?

Real-time monitoring
experience dene ke liye.

*/