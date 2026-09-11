/*
==========================================================
File Name : packetDetails.js

Purpose :

Single packet load karna.

Responsibilities :

• Get Packet ID from URL
• Fetch selected packet
• Display packet information
• Display status and severity
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

const packetDetails = document.getElementById(

    "packetDetails"

);


// ==========================================================
// Create Severity Badge
// ==========================================================

function getSeverityBadge(severity) {

    switch (severity) {

        case "LOW":

            return `
                <span class="detail-badge badge-safe">
                    LOW
                </span>
            `;

        case "MEDIUM":

            return `
                <span class="detail-badge badge-warning">
                    MEDIUM
                </span>
            `;

        case "HIGH":

            return `
                <span class="detail-badge badge-high">
                    HIGH
                </span>
            `;

        case "CRITICAL":

            return `
                <span class="detail-badge badge-critical">
                    CRITICAL
                </span>
            `;

        default:

            return `
                <span class="detail-badge badge-neutral">
                    ${severity || "UNKNOWN"}
                </span>
            `;

    }

}


// ==========================================================
// Create Status Badge
// ==========================================================

function getStatusBadge(status) {

    switch (status) {

        case "SAFE":

            return `
                <span class="detail-badge badge-safe">
                    SAFE
                </span>
            `;

        case "WARNING":

            return `
                <span class="detail-badge badge-warning">
                    WARNING
                </span>
            `;

        case "MALICIOUS":

            return `
                <span class="detail-badge badge-critical">
                    MALICIOUS
                </span>
            `;

        default:

            return `
                <span class="detail-badge badge-neutral">
                    ${status || "UNKNOWN"}
                </span>
            `;

    }

}


// ==========================================================
// Load Packet
// ==========================================================

async function loadPacket() {

    // ------------------------------------------------------
    // Packet ID Check
    // ------------------------------------------------------

    if (!packetId) {

        packetDetails.innerHTML = `

            <div class="error-state">

                <div class="error-icon">

                    <i class="bi bi-exclamation-triangle-fill"></i>

                </div>

                <strong>
                    Packet ID Missing
                </strong>

                <span>
                    No packet identifier was provided in the URL.
                </span>

            </div>

        `;

        return;

    }


    try {

        // --------------------------------------------------
        // Use same-origin API
        //
        // This works with the deployed Render application.
        // --------------------------------------------------

        const result = await getPacket(packetId);


        // --------------------------------------------------
        // Packet Not Found
        // --------------------------------------------------

        if (!result.success) {

            packetDetails.innerHTML = `

                <div class="error-state">

                    <div class="error-icon">

                        <i class="bi bi-search"></i>

                    </div>

                    <strong>
                        Packet Not Found
                    </strong>

                    <span>
                        The requested packet could not be found
                        in the inspection database.
                    </span>

                </div>

            `;

            return;

        }


        // --------------------------------------------------
        // Packet Data
        // --------------------------------------------------

        const packet = result.data;


        // --------------------------------------------------
        // Display Packet Details
        // --------------------------------------------------

        packetDetails.innerHTML = `

            <div class="detail-row">

                <div class="detail-label">
                    PACKET ID
                </div>

                <div class="detail-value packet-id-value">
                    ${packet.packet_id || "-"}
                </div>

            </div>


            <div class="detail-row">

                <div class="detail-label">
                    TIMESTAMP
                </div>

                <div class="detail-value">
                    ${packet.timestamp || "-"}
                </div>

            </div>


            <div class="detail-row">

                <div class="detail-label">
                    SOURCE IP
                </div>

                <div class="detail-value">
                    ${packet.source_ip || "-"}
                </div>

            </div>


            <div class="detail-row">

                <div class="detail-label">
                    DESTINATION IP
                </div>

                <div class="detail-value">
                    ${packet.destination_ip || "-"}
                </div>

            </div>


            <div class="detail-row">

                <div class="detail-label">
                    PROTOCOL
                </div>

                <div class="detail-value">
                    ${packet.protocol || "-"}
                </div>

            </div>


            <div class="detail-row">

                <div class="detail-label">
                    PACKET LENGTH
                </div>

                <div class="detail-value">
                    ${packet.packet_length || "-"}
                </div>

            </div>


            <div class="detail-row">

                <div class="detail-label">
                    STATUS
                </div>

                <div class="detail-value">

                    ${getStatusBadge(packet.status)}

                </div>

            </div>


            <div class="detail-row">

                <div class="detail-label">
                    ATTACK
                </div>

                <div class="detail-value">
                    ${packet.attack || "None"}
                </div>

            </div>


            <div class="detail-row">

                <div class="detail-label">
                    SEVERITY
                </div>

                <div class="detail-value">

                    ${getSeverityBadge(packet.severity)}

                </div>

            </div>


            <div class="detail-row">

                <div class="detail-label">
                    MATCHED PATTERN
                </div>

                <div class="detail-value">
                    ${packet.matched_pattern || "-"}
                </div>

            </div>

        `;

    }

    catch (error) {

        console.error(
            "Packet Details Error:",
            error
        );


        packetDetails.innerHTML = `

            <div class="error-state">

                <div class="error-icon">

                    <i class="bi bi-cloud-slash"></i>

                </div>

                <strong>
                    Unable to Load Packet
                </strong>

                <span>
                    The packet could not be retrieved from
                    the AI-DPI backend.
                </span>

            </div>

        `;

    }

}


// ==========================================================
// Initial Load
// ==========================================================

loadPacket();