/*
==========================================================
File Name : analytics.js

Purpose :

Analytics Dashboard JavaScript

Responsibilities :

• Fetch Packet Data
• Generate Charts
• Auto Refresh

Future Scope :

• Live Graphs
• AI Analytics
• Export Reports

==========================================================
*/

const topDestinationTable = document.getElementById("topDestinationTable");

const topSourceTable = document.getElementById("topSourceTable");

// ==========================================================
// Chart Variables
// ==========================================================

let protocolChart;

let severityChart;


// ==========================================================
// Load Analytics
// ==========================================================

async function loadAnalytics() {

    const response = await getPackets();

    if (response === null) {

        console.log("Unable to fetch analytics.");

        return;

    }

    if (!response.success) {

        console.log(response.message);

        return;

    }

    const packets = response.data;

    createProtocolChart(packets);

    createSeverityChart(packets);

    createTopSourceTable(packets);

    createTopDestinationTable(packets);

    generateAISummary(packets);

}


// ==========================================================
// Top Destination IP Table
// ==========================================================

function createTopDestinationTable(packets) {

    topDestinationTable.innerHTML = "";

    const destinationCount = {};

    packets.forEach(packet => {

        const ip = packet.destination_ip;

        if (destinationCount[ip]) {

            destinationCount[ip]++;

        }

        else {

            destinationCount[ip] = 1;

        }

    });

    const sortedIPs = Object.entries(destinationCount)

        .sort((a, b) => b[1] - a[1])

        .slice(0, 5);

    sortedIPs.forEach(([ip, count]) => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${ip}</td>

            <td>${count}</td>

        `;

        topDestinationTable.appendChild(row);

    });

}

// ==========================================================
// AI Network Summary
// ==========================================================

function generateAISummary(packets) {

    const aiSummary = document.getElementById("aiSummary");

    const totalPackets = packets.length;

    let threatCount = 0;

    const protocolCount = {};

    const sourceCount = {};

    packets.forEach(packet => {

        // Count Threats
        if (packet.status !== "SAFE") {

            threatCount++;

        }

        // Count Protocols
        protocolCount[packet.protocol] =
            (protocolCount[packet.protocol] || 0) + 1;

        // Count Source IPs
        sourceCount[packet.source_ip] =
            (sourceCount[packet.source_ip] || 0) + 1;

    });

    // ======================================================
    // Most Used Protocol
    // ======================================================

    const topProtocol = Object.keys(protocolCount).reduce(

        (a, b) => protocolCount[a] > protocolCount[b] ? a : b

    );

    // ======================================================
    // Most Active Source
    // ======================================================

    const topSource = Object.keys(sourceCount).reduce(

        (a, b) => sourceCount[a] > sourceCount[b] ? a : b

    );

    // ======================================================
    // Network Health
    // ======================================================

    let health = "🟢 SAFE";

    let recommendation = "No suspicious activity detected. Continue monitoring.";

    if (threatCount > 0) {

        health = "🟡 WARNING";

        recommendation =
            "Suspicious packets detected. Monitor traffic carefully.";

    }

    if (threatCount >= 10) {

        health = "🔴 CRITICAL";

        recommendation =
            "High number of malicious packets detected. Immediate investigation recommended.";

    }

    // ======================================================
    // AI Summary
    // ======================================================

    aiSummary.innerHTML = `

        <div class="alert alert-info">

            <h5>

                🧠 AI Network Analysis

            </h5>

            <hr>

            <p>

                <strong>Total Packets :</strong>
                ${totalPackets}

            </p>

            <p>

                <strong>Threat Packets :</strong>
                ${threatCount}

            </p>

            <p>

                <strong>Most Used Protocol :</strong>
                ${topProtocol}

            </p>

            <p>

                <strong>Most Active Source :</strong>
                ${topSource}

            </p>

            <p>

                <strong>Network Health :</strong>
                ${health}

            </p>

            <hr>

            <strong>Recommendation</strong>

            <p>

                ${recommendation}

            </p>

        </div>

    `;

}

// ==========================================================
// Protocol Chart
// ==========================================================

function createProtocolChart(packets) {

    let protocolCount = {

        TCP:0,

        UDP:0,

        ICMP:0,

        OTHER:0

    };


    packets.forEach(packet=>{

        switch(packet.protocol){

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


    const ctx = document
        .getElementById("protocolChart")
        .getContext("2d");


    if(protocolChart){

        protocolChart.destroy();

    }


    protocolChart = new Chart(ctx,{

        type:"pie",

        data:{

            labels:[

                "TCP",

                "UDP",

                "ICMP",

                "OTHER"

            ],

            datasets:[{

                data:[

                    protocolCount.TCP,

                    protocolCount.UDP,

                    protocolCount.ICMP,

                    protocolCount.OTHER

                ]

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    position: "top",

                    labels: {

                        boxWidth: 15,

                        font: {

                            size: 12

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

function createSeverityChart(packets){

    let severity={

        LOW:0,

        MEDIUM:0,

        HIGH:0,

        CRITICAL:0

    };


    packets.forEach(packet=>{

        switch(packet.severity){

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


    const ctx=document
        .getElementById("severityChart")
        .getContext("2d");


    if(severityChart){

        severityChart.destroy();

    }


    severityChart=new Chart(ctx,{

        type:"bar",

        data:{

            labels:[

                "LOW",

                "MEDIUM",

                "HIGH",

                "CRITICAL"

            ],

            datasets:[{

                label:"Threat Severity",

                data:[

                    severity.LOW,

                    severity.MEDIUM,

                    severity.HIGH,

                    severity.CRITICAL

                ]

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    position: "top",

                    labels: {

                        boxWidth: 15,

                        font: {

                            size: 12

                        }

                    }

                }

            },

            layout: {

                padding: 10

            },

            scales: {

                y: {

                    beginAtZero: true,

                    ticks: {

                        precision: 0

                    }

                }

            }

        }

    });

}



// ==========================================================
// Initial Load
// ==========================================================

loadAnalytics();



// ==========================================================
// Auto Refresh
// ==========================================================

setInterval(loadAnalytics,5000);



// ==========================================================
// Top Source IP Table
// ==========================================================

function createTopSourceTable(packets) {

    topSourceTable.innerHTML = "";

    const sourceCount = {};

    packets.forEach(packet => {

        const ip = packet.source_ip;

        if (sourceCount[ip]) {

            sourceCount[ip]++;

        }

        else {

            sourceCount[ip] = 1;

        }

    });

    const sortedIPs = Object.entries(sourceCount)

        .sort((a, b) => b[1] - a[1])

        .slice(0, 5);

    sortedIPs.forEach(([ip, count]) => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${ip}</td>

            <td>${count}</td>

        `;

        topSourceTable.appendChild(row);

    });

}



/*

Q1 Why destroy chart first?

Purana chart remove
karna zaruri hota hai,
warna multiple charts
ek dusre ke upar
ban jayenge.


--------------------------------

Q2 Why reuse getPackets()?

Backend me already
packet API bani hui hai.

Extra API ki
zarurat nahi.

--------------------------------

Q3 Why use switch?

Protocol aur Severity
count karna easy ho jata hai.

--------------------------------

Q4 Why auto refresh?

Live monitoring
experience ke liye.

--------------------------------

Q5 Why create two functions?

Single Responsibility Principle.

Har function
ek hi kaam kare.

*/