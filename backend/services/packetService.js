/*
==========================================================
File Name : packetService.js

Purpose :

Database se data retrieve karna.

Sirf database operations.

==========================================================
*/

const Packet = require("../models/Packet");



// ==========================================================
// Get All Packets
// ==========================================================

const getAllPackets = async () => {

    try {

        const packets = await Packet
            .find({})
            .sort({ _id: -1 });

        return packets;

    }

    catch (error) {

        throw error;

    }

};

// ==========================================================
// Get Packet By Packet ID
// ==========================================================

const getPacketById = async (packetId) => {

    try {

        const packet = await Packet.findOne({

            packet_id: packetId

        });

        return packet;

    }

    catch (error) {

        throw error;

    }

};

module.exports = {

    getAllPackets,

    getPacketById

};






// Q1 Why use Service Layer?

// Database ka sara code
// sirf isi file me rahe.
// Controller clean rahega.


// Q2 Why sort()?

// Latest packets
// sabse upar dikhane ke liye.


// Q3 Why toArray()?

// MongoDB cursor return karta hai.
// Cursor ko array me convert karte hain.


// Q4 Why use Model?

// Mongoose Model
// CRUD operations easy bana deta hai.