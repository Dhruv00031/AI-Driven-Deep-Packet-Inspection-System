/*
==========================================================
File Name : analytics.js

Purpose :
AI-DPI Analytics Dashboard

Responsibilities :
• Fetch packet data
• Update analytics metrics
• Generate traffic timeline
• Generate protocol chart
• Generate severity chart
• Generate source/destination tables
• Generate AI network summary
• Search analytics data
• Auto refresh
==========================================================
*/


// ==========================================================
// DOM ELEMENTS
// ==========================================================

const topDestinationTable =
    document.getElementById("topDestinationTable");

const topSourceTable =
    document.getElementById("topSourceTable");

const totalPacketsElement =
    document.getElementById("totalPackets");

const threatPacketsElement =
    document.getElementById("threatPackets");

const dominantProtocolElement =
    document.getElementById("dominantProtocol");

const activeSourcesElement =
    document.getElementById("activeSources");

const analyticsSearch =
    document.getElementById("analyticsSearch");


// ==========================================================
// Chart Variables
// ==========================================================

let protocolChart = null;

let severityChart = null;

let trafficTimelineChart = null;


// ==========================================================
// Store All Packets
// ==========================================================

let allPackets = [];


// ==========================================================
// Load Analytics
// ==========================================================

async function loadAnalytics() {

    const response = await getPackets();

    // ------------------------------------------------------
    // API connection failed
    // ------------------------------------------------------

    if (response === null) {

        console.log("Unable to fetch analytics.");

        return;
    }


    // ------------------------------------------------------
    // API returned an error
    // ------------------------------------------------------

    if (!response.success) {

        console.log(response.message);

        return;
    }


    // ------------------------------------------------------
    // Store packet data
    // ------------------------------------------------------

    allPackets = response.data || [];


    // ------------------------------------------------------
    // Apply search
    // ------------------------------------------------------

    applyAnalyticsSearch();
}


// ==========================================================
// Apply Analytics Search
// ==========================================================

function applyAnalyticsSearch() {

    const keyword =
        (analyticsSearch?.value || "")
            .trim()
            .toLowerCase();


    // ------------------------------------------------------
    // No search keyword
    // ------------------------------------------------------

    if (!keyword) {

        updateAnalytics(allPackets);

        return;
    }


    // ------------------------------------------------------
    // Filter packets
    // ------------------------------------------------------

    const filteredPackets = allPackets.filter(packet => {

        const packetId =
            String(packet.packet_id || "")
                .toLowerCase();

        const sourceIP =
            String(packet.source_ip || "")
                .toLowerCase();

        const destinationIP =
            String(packet.destination_ip || "")
                .toLowerCase();

        const protocol =
            String(packet.protocol || "")
                .toLowerCase();

        const attack =
            String(packet.attack || "")
                .toLowerCase();

        const severity =
            String(packet.severity || "")
                .toLowerCase();

        const status =
            String(packet.status || "")
                .toLowerCase();


        return (
            packetId.includes(keyword) ||
            sourceIP.includes(keyword) ||
            destinationIP.includes(keyword) ||
            protocol.includes(keyword) ||
            attack.includes(keyword) ||
            severity.includes(keyword) ||
            status.includes(keyword)
        );

    });


    updateAnalytics(filteredPackets);
}


// ==========================================================
// Update All Analytics
// ==========================================================

function updateAnalytics(packets) {

    updateMetrics(packets);

    createTrafficTimeline(packets);

    createProtocolChart(packets);

    createSeverityChart(packets);

    createTopSourceTable(packets);

    createTopDestinationTable(packets);

    generateAISummary(packets);
}


// ==========================================================
// Analytics Metrics
// ==========================================================

function updateMetrics(packets) {

    const totalPackets = packets.length;


    // ------------------------------------------------------
    // Count threats
    // ------------------------------------------------------

    const threatCount = packets.filter(packet => {

        const status =
            String(packet.status || "")
                .toUpperCase();

        return status !== "SAFE";

    }).length;


    // ------------------------------------------------------
    // Count protocols
    // ------------------------------------------------------

    const protocolCount = {};

    packets.forEach(packet => {

        const protocol =
            String(packet.protocol || "OTHER")
                .toUpperCase();

        protocolCount[protocol] =
            (protocolCount[protocol] || 0) + 1;

    });


    // ------------------------------------------------------
    // Find dominant protocol
    // ------------------------------------------------------

    let dominantProtocol = "—";

    let highestProtocolCount = 0;

    Object.entries(protocolCount).forEach(
        ([protocol, count]) => {

            if (count > highestProtocolCount) {

                highestProtocolCount = count;

                dominantProtocol = protocol;
            }

        }
    );


    // ------------------------------------------------------
    // Count unique source IPs
    // ------------------------------------------------------

    const sourceIPs = new Set();

    packets.forEach(packet => {

        if (packet.source_ip) {

            sourceIPs.add(packet.source_ip);

        }

    });


    // ------------------------------------------------------
    // Update UI
    // ------------------------------------------------------

    if (totalPacketsElement) {

        totalPacketsElement.textContent =
            totalPackets;

    }


    if (threatPacketsElement) {

        threatPacketsElement.textContent =
            threatCount;

    }


    if (dominantProtocolElement) {

        dominantProtocolElement.textContent =
            dominantProtocol;

    }


    if (activeSourcesElement) {

        activeSourcesElement.textContent =
            sourceIPs.size;

    }

}


// ==========================================================
// Traffic Timeline
// ==========================================================

function createTrafficTimeline(packets) {

    const canvas =
        document.getElementById("trafficTimeline");

    const emptyMessage =
        document.getElementById("timelineEmpty");


    if (!canvas) {
        return;
    }


    // ------------------------------------------------------
    // Destroy previous chart
    // ------------------------------------------------------

    if (trafficTimelineChart) {

        trafficTimelineChart.destroy();

        trafficTimelineChart = null;
    }


    // ------------------------------------------------------
    // Empty state
    // ------------------------------------------------------

    if (packets.length === 0) {

        canvas.style.display = "none";

        if (emptyMessage) {

            emptyMessage.style.display = "flex";

        }

        return;
    }


    canvas.style.display = "block";

    if (emptyMessage) {

        emptyMessage.style.display = "none";

    }


    // ------------------------------------------------------
    // Group packets by timestamp
    // ------------------------------------------------------

    const timelineCount = {};


    packets.forEach(packet => {

        if (!packet.timestamp) {
            return;
        }


        // Example:
        // 2026-09-08 12:34:56
        //
        // We keep only HH:MM

        const timestamp =
            String(packet.timestamp);

        const timePart =
            timestamp.includes(" ")
                ? timestamp.split(" ")[1]
                : timestamp;


        const minute =
            timePart.substring(0, 5);


        if (!minute) {
            return;
        }


        timelineCount[minute] =
            (timelineCount[minute] || 0) + 1;

    });


    const sortedTimeline =
        Object.entries(timelineCount)
            .sort((a, b) =>
                a[0].localeCompare(b[0])
            );


    const labels =
        sortedTimeline.map(item => item[0]);

    const values =
        sortedTimeline.map(item => item[1]);


    // ------------------------------------------------------
    // Chart
    // ------------------------------------------------------

    const ctx =
        canvas.getContext("2d");


    trafficTimelineChart =
        new Chart(ctx, {

            type: "line",

            data: {

                labels: labels,

                datasets: [{

                    label: "Packets",

                    data: values,

                    borderColor: "#4de3f2",

                    backgroundColor:
                        "rgba(77, 227, 242, 0.08)",

                    borderWidth: 2,

                    fill: true,

                    tension: 0.35,

                    pointRadius: 2,

                    pointHoverRadius: 5

                }]

            },


            options: {

                responsive: true,

                maintainAspectRatio: false,

                interaction: {

                    intersect: false,

                    mode: "index"

                },


                plugins: {

                    legend: {

                        display: false

                    }

                },


                scales: {

                    x: {

                        grid: {

                            color:
                                "rgba(90, 120, 145, 0.08)"

                        },

                        ticks: {

                            color: "#60788e",

                            font: {

                                size: 9

                            },

                            maxTicksLimit: 10

                        }

                    },


                    y: {

                        beginAtZero: true,

                        ticks: {

                            precision: 0,

                            color: "#60788e",

                            font: {

                                size: 9

                            }

                        },

                        grid: {

                            color:
                                "rgba(90, 120, 145, 0.08)"

                        }

                    }

                }

            }

        });

}


// ==========================================================
// Protocol Chart
// ==========================================================

function createProtocolChart(packets) {

    const canvas =
        document.getElementById("protocolChart");


    if (!canvas) {
        return;
    }


    // ------------------------------------------------------
    // Count protocols
    // ------------------------------------------------------

    const protocolCount = {

        TCP: 0,

        UDP: 0,

        ICMP: 0,

        OTHER: 0

    };


    packets.forEach(packet => {

        const protocol =
            String(packet.protocol || "")
                .toUpperCase();


        switch (protocol) {

            case "TCP":

                protocolCount.TCP++;

                break;


            case "UDP":

                protocolCount.UDP++;

                break;


            case "ICMP":

                protocolCount.ICMP++;

                break;


            default:

                protocolCount.OTHER++;

        }

    });


    // ------------------------------------------------------
    // Destroy previous chart
    // ------------------------------------------------------

    if (protocolChart) {

        protocolChart.destroy();

        protocolChart = null;
    }


    // ------------------------------------------------------
    // Create chart
    // ------------------------------------------------------

    const ctx =
        canvas.getContext("2d");


    protocolChart =
        new Chart(ctx, {

            type: "doughnut",

            data: {

                labels: [

                    "TCP",

                    "UDP",

                    "ICMP",

                    "OTHER"

                ],


                datasets: [{

                    data: [

                        protocolCount.TCP,

                        protocolCount.UDP,

                        protocolCount.ICMP,

                        protocolCount.OTHER

                    ],

                    backgroundColor: [

                        "#4de3f2",

                        "#45e6a3",

                        "#f4c95d",

                        "#60788e"

                    ],

                    borderColor: "#0b1727",

                    borderWidth: 3

                }]

            },


            options: {

                responsive: true,

                maintainAspectRatio: false,


                plugins: {

                    legend: {

                        position: "bottom",

                        labels: {

                            color: "#8ea4ba",

                            boxWidth: 12,

                            padding: 15,

                            font: {

                                size: 9

                            }

                        }

                    }

                }

            }

        });

}


// ==========================================================
// Severity Chart
// ==========================================================

function createSeverityChart(packets) {

    const canvas =
        document.getElementById("severityChart");


    if (!canvas) {
        return;
    }


    // ------------------------------------------------------
    // Count severity levels
    // ------------------------------------------------------

    const severity = {

        LOW: 0,

        MEDIUM: 0,

        HIGH: 0,

        CRITICAL: 0

    };


    packets.forEach(packet => {

        const level =
            String(packet.severity || "")
                .toUpperCase();


        switch (level) {

            case "LOW":

                severity.LOW++;

                break;


            case "MEDIUM":

                severity.MEDIUM++;

                break;


            case "HIGH":

                severity.HIGH++;

                break;


            case "CRITICAL":

                severity.CRITICAL++;

                break;

        }

    });


    // ------------------------------------------------------
    // Destroy previous chart
    // ------------------------------------------------------

    if (severityChart) {

        severityChart.destroy();

        severityChart = null;
    }


    // ------------------------------------------------------
    // Create chart
    // ------------------------------------------------------

    const ctx =
        canvas.getContext("2d");


    severityChart =
        new Chart(ctx, {

            type: "bar",

            data: {

                labels: [

                    "LOW",

                    "MEDIUM",

                    "HIGH",

                    "CRITICAL"

                ],


                datasets: [{

                    label: "Threat Severity",

                    data: [

                        severity.LOW,

                        severity.MEDIUM,

                        severity.HIGH,

                        severity.CRITICAL

                    ],

                    backgroundColor: [

                        "#45e6a3",

                        "#f4c95d",

                        "#fd9b4d",

                        "#ff667d"

                    ],

                    borderRadius: 4,

                    borderWidth: 0

                }]

            },


            options: {

                responsive: true,

                maintainAspectRatio: false,


                plugins: {

                    legend: {

                        display: false

                    }

                },


                scales: {

                    x: {

                        grid: {

                            display: false

                        },

                        ticks: {

                            color: "#71889e",

                            font: {

                                size: 9

                            }

                        }

                    },


                    y: {

                        beginAtZero: true,

                        ticks: {

                            precision: 0,

                            color: "#60788e",

                            font: {

                                size: 9

                            }

                        },

                        grid: {

                            color:
                                "rgba(90, 120, 145, 0.08)"

                        }

                    }

                }

            }

        });

}


// ==========================================================
// Top Source IP Table
// ==========================================================

function createTopSourceTable(packets) {

    if (!topSourceTable) {
        return;
    }


    topSourceTable.innerHTML = "";


    const sourceCount = {};


    packets.forEach(packet => {

        const ip =
            packet.source_ip || "Unknown";


        sourceCount[ip] =
            (sourceCount[ip] || 0) + 1;

    });


    const sortedIPs =
        Object.entries(sourceCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);


    if (sortedIPs.length === 0) {

        topSourceTable.innerHTML = `
            <tr>
                <td colspan="2">
                    No source data available
                </td>
            </tr>
        `;

        return;
    }


    sortedIPs.forEach(([ip, count]) => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${ip}
            </td>

            <td>
                ${count}
            </td>

        `;


        topSourceTable.appendChild(row);

    });

}


// ==========================================================
// Top Destination IP Table
// ==========================================================

function createTopDestinationTable(packets) {

    if (!topDestinationTable) {
        return;
    }


    topDestinationTable.innerHTML = "";


    const destinationCount = {};


    packets.forEach(packet => {

        const ip =
            packet.destination_ip || "Unknown";


        destinationCount[ip] =
            (destinationCount[ip] || 0) + 1;

    });


    const sortedIPs =
        Object.entries(destinationCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);


    if (sortedIPs.length === 0) {

        topDestinationTable.innerHTML = `
            <tr>
                <td colspan="2">
                    No destination data available
                </td>
            </tr>
        `;

        return;
    }


    sortedIPs.forEach(([ip, count]) => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${ip}
            </td>

            <td>
                ${count}
            </td>

        `;


        topDestinationTable.appendChild(row);

    });

}


// ==========================================================
// AI Network Summary
// ==========================================================

function generateAISummary(packets) {

    const aiSummary =
        document.getElementById("aiSummary");


    if (!aiSummary) {
        return;
    }


    // ------------------------------------------------------
    // Empty state
    // ------------------------------------------------------

    if (packets.length === 0) {

        aiSummary.innerHTML = `

            <div class="summary-loading">

                No packet telemetry available
                for analysis.

            </div>

        `;

        return;
    }


    // ------------------------------------------------------
    // Basic counts
    // ------------------------------------------------------

    const totalPackets =
        packets.length;


    let threatCount = 0;


    const protocolCount = {};

    const sourceCount = {};


    packets.forEach(packet => {

        // --------------------------------------------------
        // Threat count
        // --------------------------------------------------

        const status =
            String(packet.status || "")
                .toUpperCase();


        if (status !== "SAFE") {

            threatCount++;

        }


        // --------------------------------------------------
        // Protocol count
        // --------------------------------------------------

        const protocol =
            String(packet.protocol || "OTHER")
                .toUpperCase();


        protocolCount[protocol] =
            (protocolCount[protocol] || 0) + 1;


        // --------------------------------------------------
        // Source count
        // --------------------------------------------------

        const source =
            packet.source_ip || "Unknown";


        sourceCount[source] =
            (sourceCount[source] || 0) + 1;

    });


    // ------------------------------------------------------
    // Most used protocol
    // ------------------------------------------------------

    let topProtocol = "—";

    let topProtocolCount = 0;


    Object.entries(protocolCount)
        .forEach(([protocol, count]) => {

            if (count > topProtocolCount) {

                topProtocol = protocol;

                topProtocolCount = count;

            }

        });


    // ------------------------------------------------------
    // Most active source
    // ------------------------------------------------------

    let topSource = "—";

    let topSourceCount = 0;


    Object.entries(sourceCount)
        .forEach(([source, count]) => {

            if (count > topSourceCount) {

                topSource = source;

                topSourceCount = count;

            }

        });


    // ------------------------------------------------------
    // Network health
    // ------------------------------------------------------

    let health = "SAFE";

    let healthClass = "safe";

    let recommendation =
        "No suspicious activity detected. Continue monitoring network traffic.";


    if (threatCount > 0) {

        health = "WARNING";

        healthClass = "warning";

        recommendation =
            "Suspicious packets detected. Monitor network traffic carefully.";

    }


    if (threatCount >= 10) {

        health = "CRITICAL";

        healthClass = "critical";

        recommendation =
            "High number of malicious packets detected. Immediate investigation is recommended.";

    }


    // ------------------------------------------------------
    // Render AI summary
    // ------------------------------------------------------

    aiSummary.innerHTML = `

        <div class="ai-summary-content">

            <div class="summary-main">

                <div class="summary-title">

                    <span class="summary-ai-icon">
                        ✦
                    </span>

                    <span>
                        AI Network Analysis
                    </span>

                </div>


                <p>
                    AI-DPI analyzed
                    <strong>${totalPackets}</strong>
                    captured packets and identified
                    <strong>${threatCount}</strong>
                    threat packets.
                </p>

            </div>


            <div class="summary-stats">

                <div class="summary-stat">

                    <span>
                        PACKETS
                    </span>

                    <strong>
                        ${totalPackets}
                    </strong>

                </div>


                <div class="summary-stat">

                    <span>
                        THREATS
                    </span>

                    <strong>
                        ${threatCount}
                    </strong>

                </div>


                <div class="summary-stat">

                    <span>
                        PROTOCOL
                    </span>

                    <strong>
                        ${topProtocol}
                    </strong>

                </div>


                <div class="summary-stat">

                    <span>
                        ACTIVE SOURCE
                    </span>

                    <strong>
                        ${topSource}
                    </strong>

                </div>

            </div>


            <div class="summary-health ${healthClass}">

                <div>

                    <span class="health-label">
                        NETWORK HEALTH
                    </span>

                    <strong>
                        ${health}
                    </strong>

                </div>

                <p>
                    ${recommendation}
                </p>

            </div>

        </div>

    `;

}


// ==========================================================
// Search Event
// ==========================================================

if (analyticsSearch) {

    analyticsSearch.addEventListener(
        "input",
        applyAnalyticsSearch
    );

}


// ==========================================================
// Initial Load
// ==========================================================

loadAnalytics();


// ==========================================================
// Auto Refresh
// ==========================================================

setInterval(loadAnalytics, 5000);