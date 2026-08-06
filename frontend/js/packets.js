/*
==========================================================
Packets Page

Purpose :

Display all captured packets.

Responsibilities :

• Fetch packets
• Display packets in table
• Refresh packets

Search, Filters and Delete
will be added later.

==========================================================
*/


// ==========================================================
// Global Variable
// ==========================================================

let packets = [];


// ==========================================================
// Load Packets
// ==========================================================

async function loadPackets() {

    const response = await getPackets();

    if (!response || !response.success) {

        alert("Unable to load packets.");

        return;

    }

    packets = response.data;

    applyFilters();

}


// ==========================================================
// Render Packets
// ==========================================================

function renderPackets(packetList) {

    const tableBody = document.getElementById("packetsTableBody");

    tableBody.innerHTML = "";

    if (packetList.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td colspan="9" class="text-center">

                    No Packets Found

                </td>

            </tr>

        `;

        return;

    }

    packetList.forEach(packet => {

        tableBody.innerHTML += `

            <tr>

                <td>${packet.packet_id}</td>

                <td>${packet.timestamp}</td>

                <td>${packet.source_ip}</td>

                <td>${packet.destination_ip}</td>

                <td>${packet.protocol}</td>

                <td>${packet.attack === "None" ? "Safe" : packet.attack}</td>

                <td>${packet.severity}</td>

                <td>${packet.status}</td>

                <td>

                    <button
                        class="btn btn-sm btn-primary view-btn"
                        data-id="${packet.packet_id}">

                        View

                    </button>

                </td>

            </tr>

        `;

    });

    // ==========================================================
    // View Button
    // ==========================================================

    document

        .querySelectorAll(".view-btn")

        .forEach(button => {

            button.addEventListener(

                "click",

                function () {

                    const packetId = this.dataset.id;

                    window.location.href =

                        `packet-details.html?id=${packetId}`;

                }

            );

        });


}


// ==========================================================
// Search Packets
// ==========================================================

document

    .getElementById("searchInput")

    .addEventListener(

        "keyup",

        applyFilters

    );

// ==========================================================
// Protocol Filter
// ==========================================================

document

    .getElementById("protocolFilter")

    .addEventListener(

        "change",

        applyFilters

    );

// ==========================================================
// Attack Filter
// ==========================================================

document

    .getElementById("attackFilter")

    .addEventListener(

        "change",

        applyFilters

    );

// ==========================================================
// Apply All Filters
// ==========================================================

function applyFilters() {

    // ---------------------------------------
    // Current Filter Values
    // ---------------------------------------

    const keyword = document

        .getElementById("searchInput")

        .value

        .toLowerCase();

    const protocol = document

        .getElementById("protocolFilter")

        .value;

    const attack = document

        .getElementById("attackFilter")

        .value;

    // ---------------------------------------
    // Filter Packets
    // ---------------------------------------

    const filteredPackets = packets.filter(packet => {

        // ---------------------------------------
        // Search Filter
        // ---------------------------------------

        const matchesSearch =

            String(packet.packet_id || "")

                .toLowerCase()

                .includes(keyword)

            ||

            String(packet.source_ip || "")

                .toLowerCase()

                .includes(keyword)

            ||

            String(packet.destination_ip || "")

                .toLowerCase()

                .includes(keyword);

        // ---------------------------------------
        // Protocol Filter
        // ---------------------------------------

        const matchesProtocol =

            protocol === "All"

            ||

            packet.protocol === protocol;

        // ---------------------------------------
        // Attack Filter
        // ---------------------------------------

        let attackName = packet.attack;

        if (attackName === "None") {

            attackName = "Safe";

        }

        else if (attackName === "Cross Site Scripting (XSS)") {

            attackName = "XSS";

        }

        const matchesAttack =

            attack === "All"

            ||

            attackName === attack;

        // ---------------------------------------
        // Final Result
        // ---------------------------------------

        return (

            matchesSearch &&

            matchesProtocol &&

            matchesAttack

        );

    });

    renderPackets(filteredPackets);

}

// ==========================================================
// Refresh Button
// ==========================================================

document
    .getElementById("refreshPackets")
    .addEventListener(

        "click",

        loadPackets

);


// ==========================================================
// Initial Load
// ==========================================================

loadPackets();

