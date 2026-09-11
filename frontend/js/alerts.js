/*
==========================================================
File Name : alerts.js

Purpose :

Threat Monitor JavaScript

Responsibilities :

• Fetch Threat Packets
• Display Threat Table
• Search Threats
• Auto Refresh

Search Fields :

• Packet ID
• Attack
• Severity
• Source IP
• Status

==========================================================
*/


// ==========================================================
// Global Variables
// ==========================================================

let threats = [];


// ==========================================================
// Threat Table
// ==========================================================

const threatTable = document.getElementById("threatTable");


// ==========================================================
// Threat Search
// ==========================================================

const threatSearch = document.getElementById("threatSearch");


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


    // ------------------------------------------------------
    // Backend / Network Error
    // ------------------------------------------------------

    if (response === null) {

        console.log("Unable to fetch threats.");

        return;

    }


    // ------------------------------------------------------
    // API Error
    // ------------------------------------------------------

    if (!response.success) {

        console.log(response.message);

        return;

    }


    // ------------------------------------------------------
    // Store Threats
    // ------------------------------------------------------

    threats = response.data || [];


    // ------------------------------------------------------
    // Apply Search
    // ------------------------------------------------------

    applyThreatSearch();

}


// ==========================================================
// Render Threats
// ==========================================================

function renderThreats(threatList) {

    threatTable.innerHTML = "";


    // ======================================================
    // No Threats
    // ======================================================

    if (threatList.length === 0) {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td colspan="5" class="text-center">

                No Threats Detected

            </td>

        `;

        threatTable.appendChild(row);

        return;

    }


    // ======================================================
    // Threat Rows
    // ======================================================

    threatList.forEach(packet => {

        const row = document.createElement("tr");


        row.innerHTML = `

            <td>
                ${packet.packet_id || "-"}
            </td>


            <td>
                ${packet.attack || "-"}
            </td>


            <td>

                <span class="badge ${getSeverityClass(packet.severity)}">

                    ${packet.severity || "-"}

                </span>

            </td>


            <td>
                ${packet.source_ip || "-"}
            </td>


            <td>

                <span class="badge ${getStatusClass(packet.status)}">

                    ${packet.status || "-"}

                </span>

            </td>

        `;


        threatTable.appendChild(row);

    });

}


// ==========================================================
// Search Threats
// ==========================================================

function applyThreatSearch() {


    // ------------------------------------------------------
    // Get Search Keyword
    // ------------------------------------------------------

    const keyword =

        (threatSearch?.value || "")

            .trim()

            .toLowerCase();


    // ------------------------------------------------------
    // Filter Threats
    // ------------------------------------------------------

    const filteredThreats = threats.filter(packet => {


        const packetId =

            String(packet.packet_id || "")

                .toLowerCase();


        const attack =

            String(packet.attack || "")

                .toLowerCase();


        const severity =

            String(packet.severity || "")

                .toLowerCase();


        const sourceIP =

            String(packet.source_ip || "")

                .toLowerCase();


        const status =

            String(packet.status || "")

                .toLowerCase();


        return (

            packetId.includes(keyword) ||

            attack.includes(keyword) ||

            severity.includes(keyword) ||

            sourceIP.includes(keyword) ||

            status.includes(keyword)

        );

    });


    // ------------------------------------------------------
    // Display Filtered Results
    // ------------------------------------------------------

    renderThreats(filteredThreats);

}


// ==========================================================
// Search Event
// ==========================================================

if (threatSearch) {

    threatSearch.addEventListener(

        "input",

        applyThreatSearch

    );

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

setInterval(

    refreshThreats,

    5000

);