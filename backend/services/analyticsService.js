/*
==========================================================
File Name : analyticsService.js

Purpose :

Dashboard Analytics

==========================================================
*/

const Packet = require("../models/Packet");

// ==========================================================
// Get Analytics
// ==========================================================

async function getAnalytics() {

    // Get All Packets

    const packets = await Packet.find();

    // ======================================================
    // Statistics
    // ======================================================

    const analytics = {

        totalPackets: packets.length,

        tcpPackets: 0,

        udpPackets: 0,

        safePackets: 0,

        sqlPackets: 0,

        xssPackets: 0,

        lowSeverity: 0,

        mediumSeverity: 0,

        highSeverity: 0,

        criticalSeverity: 0

    };

    // ======================================================
    // Count Statistics
    // ======================================================

    packets.forEach(packet => {

        // ---------------------------
        // Protocol
        // ---------------------------

        if (packet.protocol === "TCP") {

            analytics.tcpPackets++;

        }

        else if (packet.protocol === "UDP") {

            analytics.udpPackets++;

        }

        // ---------------------------
        // Safe Packets
        // ---------------------------

        if (packet.status === "SAFE") {

            analytics.safePackets++;

        }

        // ---------------------------
        // Attack Types
        // ---------------------------

        if (packet.attack === "SQL Injection") {

            analytics.sqlPackets++;

        }

        if (packet.attack === "Cross Site Scripting (XSS)") {

            analytics.xssPackets++;

        }

        // ---------------------------
        // Severity
        // ---------------------------

        switch (packet.severity) {

            case "LOW":

                analytics.lowSeverity++;

                break;

            case "MEDIUM":

                analytics.mediumSeverity++;

                break;

            case "HIGH":

                analytics.highSeverity++;

                break;

            case "CRITICAL":

                analytics.criticalSeverity++;

                break;

        }

    });

    return analytics;

}

module.exports = {

    getAnalytics

};