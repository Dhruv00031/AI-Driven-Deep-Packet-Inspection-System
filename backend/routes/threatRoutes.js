/*
==========================================================
Threat Routes

Purpose :

Threat related APIs define karna.

==========================================================
*/

const express = require("express");

const router = express.Router();

const threatController = require("../controllers/threatController");

// ==========================================================
// GET : All Threat Packets
// ==========================================================

router.get("/threats", threatController.getThreats);

module.exports = router;