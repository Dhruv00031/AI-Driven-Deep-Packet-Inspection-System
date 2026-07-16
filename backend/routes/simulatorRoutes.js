/*
==========================================================
Simulator Routes
==========================================================
*/

const express = require("express");

const router = express.Router();

const simulatorController = require("../controllers/simulatorController");

router.post("/simulator/sql", simulatorController.generateSQLAttack);

module.exports = router;