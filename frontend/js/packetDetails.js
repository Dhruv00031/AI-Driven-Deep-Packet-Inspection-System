/*
==========================================================
File Name : packetDetails.js

Purpose :

Single packet load karna.

==========================================================
*/


// ==========================================================
// Get Packet ID
// ==========================================================

const params = new URLSearchParams(

    window.location.search

);

const packetId = params.get("id");


// ==========================================================
// HTML Container
// ==========================================================

const packetDetails = document.getElementById("packetDetails");


// ==========================================================
// Load Packet
// ==========================================================

async function loadPacket() {

    try {

        const response = await fetch(

            `http://localhost:5000/api/packets/${packetId}`

        );

        const result = await response.json();

        if (!result.success) {

            packetDetails.innerHTML =

            "<h4>Packet Not Found</h4>";

            return;

        }

        const packet = result.data;

        // ================================
        // Severity Badge
        // ================================

        let severityBadge = "";

        switch (packet.severity) {

            case "LOW":

                severityBadge =
                    '<span class="badge bg-success">LOW</span>';

                break;

            case "MEDIUM":

                severityBadge =
                    '<span class="badge bg-warning text-dark">MEDIUM</span>';

                break;

            case "HIGH":

                severityBadge =
                    '<span class="badge bg-orange text-white">HIGH</span>';

                break;

            case "CRITICAL":

                severityBadge =
                    '<span class="badge bg-danger">CRITICAL</span>';

                break;

            default:

                severityBadge =
                    `<span class="badge bg-secondary">${packet.severity}</span>`;

        }

        packetDetails.innerHTML = `

        <table class="table table-dark">

            <tr>

                <th>Packet ID</th>

                <td>${packet.packet_id}</td>

            </tr>

            <tr>

                <th>Source IP</th>

                <td>${packet.source_ip}</td>

            </tr>

            <tr>

                <th>Destination IP</th>

                <td>${packet.destination_ip}</td>

            </tr>

            <tr>

                <th>Protocol</th>

                <td>${packet.protocol}</td>

            </tr>

            <tr>

                <th>Status</th>

                <td>${packet.status}</td>

            </tr>

            <tr>

                <th>Attack</th>

                <td>${packet.attack}</td>

            </tr>

            <tr>

                <th>Severity</th>

                <td>${severityBadge}</td>

            </tr>

        </table>

        `;

    }

    catch(error){

        console.log(error);

    }

}

loadPacket();