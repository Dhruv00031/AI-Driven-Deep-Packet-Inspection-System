/*
==========================================================
File Name : app.js

Purpose :
Ye backend project ka entry point hai.

Yahi se Express Server start hoga.

Responsibilities :

• Express Server Start Karna
• MongoDB Connect Karna
• Middleware Load Karna
• Routes Register Karna

Future Scope :

• Authentication
• Logging
• Error Handling
• APIs

==========================================================
*/

// ==========================================================
// Required Imports
// ==========================================================

// Express Framework
const express = require("express");

// CORS
// Frontend ko backend access dene ke liye
const cors = require("cors");

// Environment Variables
require("dotenv").config();

// MongoDB Connection
const connectDB = require("./config/db");


const packetRoutes = require("./routes/packetRoutes");


const dashboardRoutes = require("./routes/dashboardRoutes");


const threatRoutes = require("./routes/threatRoutes");


// ==========================================================
// Create Express App
// ==========================================================

const app = express();

// ==========================================================
// Connect MongoDB
// ==========================================================

// Backend start hone se pehle
// database connect hona zaruri hai.
connectDB();

// ==========================================================
// Middlewares
// ==========================================================

// Incoming JSON ko automatically
// JavaScript Object me convert karega.
app.use(express.json());

// Frontend requests allow karega.
app.use(cors());


app.use("/api",packetRoutes);


app.use("/api",dashboardRoutes);


app.use("/api", threatRoutes);


/*
==========================================================
Threat Controller

Purpose :

Threat request handle karna.

==========================================================
*/


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

// ==========================================================
// Home Route
// ==========================================================

// Sirf testing ke liye.
app.get("/", (req, res) => {

    res.status(200).json({

        success: true,

        message: "AI Driven DPI Backend Running Successfully"

    });

});

// ==========================================================
// Server
// ==========================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log();

    console.log("===========================================");

    console.log(" AI Driven DPI Backend Started ");

    console.log("===========================================");

    console.log(`Server Running On Port : ${PORT}`);

    console.log("===========================================");

    console.log();

});





// Q1. Why Express?

// Express lightweight backend framework hai.
// APIs banana easy ho jata hai.


// Q2. Why express.json()?

// Browser JSON bhejta hai.
// Ye automatically object me convert karta hai.


// Q3. Why CORS?

// Frontend aur Backend
// alag ports pe chalenge.
// Browser unhe block karega.
// CORS unhe communicate karne deta hai.


// Q4. Why connectDB() before app.listen()?

// Agar database connect nahi hua,
// to backend chalana useless hai.


// Q5. Why create app object?

// Express app hi
// pura backend server represent karta hai.


// ==========================================================
// END OF FILE
// ===========================================================