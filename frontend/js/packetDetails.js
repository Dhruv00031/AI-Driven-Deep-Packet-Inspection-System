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

const packetId = params.get("packetId");


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

                <td>${packet.severity}</td>

            </tr>

        </table>

        `;

    }

    catch(error){

        console.log(error);

    }

}

loadPacket();