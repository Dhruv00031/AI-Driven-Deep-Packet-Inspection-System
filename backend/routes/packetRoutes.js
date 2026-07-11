/*
==========================================================
File Name : packetRoutes.js

Purpose :

Saare Packet APIs define karna.

==========================================================
*/

const express = require("express");

const router = express.Router();

const packetController = require("../controllers/packetController");

// ==========================================================
// GET : All Packets
// ==========================================================

router.get("/packets", packetController.getPackets);

router.get("/packets/:packetId", packetController.getPacket);

module.exports = router;






// Q1 Why Router?

// Express Router project ko
// modular banata hai.


// Q2 Why not write routes in app.js?

// app.js sirf backend start karega.
// APIs alag file me rahengi.