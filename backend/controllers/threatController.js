/*
==========================================================
Threat Controller

Purpose :

Threat request handle karna.

==========================================================
*/

const threatService = require("../services/threatService");

const getThreats = async (req, res) => {

    try {

        const threats = await threatService.getThreatPackets();

        res.status(200).json({

            success: true,

            message: "Threat packets fetched successfully.",

            totalThreats: threats.length,

            data: threats

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

    getThreats

};