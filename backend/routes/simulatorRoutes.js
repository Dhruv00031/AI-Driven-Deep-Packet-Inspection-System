/*
==========================================================
Simulator Routes
==========================================================
*/

const express = require("express");

const router = express.Router();

const simulatorController = require("../controllers/simulatorController");

router.post("/simulator/sql", simulatorController.generateSQLAttack);

router.post("/simulator/xss", simulatorController.generateXSSAttack);

module.exports = router;