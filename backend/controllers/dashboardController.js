/*
==========================================================
Dashboard Controller

Purpose :

Dashboard request handle karna.

==========================================================
*/

const dashboardService = require("../services/dashboardService");

const getDashboard = async (req, res) => {

    try {

        const stats = await dashboardService.getDashboardStats();

        res.status(200).json({

            success: true,

            message: "Dashboard data fetched successfully.",

            data: stats

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

    getDashboard

};