/*
==========================================================
File Name : analyticsController.js

Purpose :

Analytics API Controller

Responsibilities :

• Receive Request
• Call Service
• Return Response

==========================================================
*/

const analyticsService = require("../services/analyticsService");

// ==========================================================
// Get Analytics
// ==========================================================

async function getAnalytics(req, res) {

    try {

        const analytics =

            await analyticsService.getAnalytics();

        res.json({

            success: true,

            data: analytics

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

}

module.exports = {

    getAnalytics

};