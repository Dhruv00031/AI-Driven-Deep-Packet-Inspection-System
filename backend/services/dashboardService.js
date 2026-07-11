/*
==========================================================
File Name : dashboardService.js

Purpose :
Dashboard ke liye statistics calculate karna.

Responsibilities :

• Total Packets
• Safe Packets
• Attack Packets
• TCP Count
• UDP Count

Author : AI-DPI Team
==========================================================
*/

const Packet = require("../models/Packet");

// ==========================================================
// Dashboard Statistics
// ==========================================================

const getDashboardStats = async () => {

    try {

        const totalPackets = await Packet.countDocuments();

        const safePackets = await Packet.countDocuments({

            status: "SAFE"

        });

        const attackPackets = await Packet.countDocuments({

            status: "ATTACK"

        });

        const tcpPackets = await Packet.countDocuments({

            protocol: "TCP"

        });

        const udpPackets = await Packet.countDocuments({

            protocol: "UDP"

        });

        return {

            totalPackets,

            safePackets,

            attackPackets,

            tcpPackets,

            udpPackets

        };

    }

    catch (error) {

        throw error;

    }

};

module.exports = {

    getDashboardStats

};






// Q1 Why countDocuments()?
//
// Kyunki hume sirf count chahiye,
// pura document load nahi karna.


// Q2 Why Service Layer?
//
// Dashboard calculation
// sirf isi file me rahe.