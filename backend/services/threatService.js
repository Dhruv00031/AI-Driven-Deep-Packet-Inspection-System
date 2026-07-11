/*
==========================================================
File Name : threatService.js

Purpose :

Sirf attack packets retrieve karna.

Ye file sirf database se
threat related operations karegi.

==========================================================
*/

const Packet = require("../models/Packet");

// ==========================================================
// Get All Threat Packets
// ==========================================================

const getThreatPackets = async () => {

    try {

        const threats = await Packet
            .find({
                attack: { $ne: "None" }
            })
            .sort({ _id: -1 });

        return threats;

    }

    catch (error) {

        throw error;

    }

};

module.exports = {

    getThreatPackets

};






// Q1 Why use $ne?

// $ne means "Not Equal".
// Hum sirf wahi packets chahte hain
// jinka attack "None" nahi hai.


// Q2 Why not use status?

// Future me status
// INFO, WARNING, SAFE,
// ya aur bhi values ho sakti hain.
// Attack field reliable rahega.