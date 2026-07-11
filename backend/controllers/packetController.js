/*
==========================================================
File Name : packetController.js

Purpose :

Client Request Handle Karna.

Controller ka kaam hai

Request lena

↓

Service ko call karna

↓

Response bhejna

==========================================================
*/

const packetService = require("../services/packetService");



// ==========================================================
// Get All Packets
// ==========================================================

const getPackets = async (req, res) => {

    try {

        const packets = await packetService.getAllPackets();

        res.status(200).json({

            success: true,

            totalPackets: packets.length,

            data: packets

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==========================================================
// Get Single Packet
// ==========================================================

const getPacket = async (req, res) => {

    try {

        const packet = await packetService.getPacketById(

            req.params.packetId

        );

        if (!packet) {

            return res.status(404).json({

                success: false,

                message: "Packet not found."

            });

        }

        res.status(200).json({

            success: true,

            message: "Packet fetched successfully.",

            data: packet

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    getPackets,
    getPacket

};







// Q1 Why Controller?

// Business logic aur
// HTTP Request handling
// alag rakhte hain.


// Q2 Why status(200)?

// Successful GET Request.


// Q3 Why status(500)?

// Internal Server Error.