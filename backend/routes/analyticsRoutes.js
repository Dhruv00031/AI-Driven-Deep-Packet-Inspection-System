/*
==========================================================
File Name : analyticsRoutes.js

Purpose :

Analytics APIs

==========================================================
*/

const express = require("express");

const router = express.Router();

const analyticsController =

    require("../controllers/analyticsController");

// ==========================================================
// Analytics
// ==========================================================

router.get(

    "/analytics",

    analyticsController.getAnalytics

);

module.exports = router;