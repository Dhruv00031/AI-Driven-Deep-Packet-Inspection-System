/*
==========================================================
File Name : db.js

Purpose :
MongoDB se backend ka connection establish karna.

Ye file sirf database connection handle karegi.

Future Scope :
• Atlas Support
• Connection Pooling
• Error Logging

==========================================================
*/

const mongoose = require("mongoose");

// Database connection function
const connectDB = async () => {

    try {

        // MongoDB se connection establish kar rahe hain
        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ MongoDB Connected");

    }

    catch (error) {

        console.log("❌ MongoDB Connection Failed");

        console.log(error.message);

        process.exit(1);

    }

};

module.exports = connectDB;