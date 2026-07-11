/*
==========================================================
File Name : Packet.js

Purpose :
Packet document ka Mongoose Model define karna.

Ye model MongoDB ke
captured_packets collection ko represent karega.

Future Scope :
• Validation
• Indexing
• Virtual Fields

==========================================================
*/

const mongoose = require("mongoose");

// ==========================================================
// Packet Schema
// ==========================================================

const packetSchema = new mongoose.Schema(
{
    packet_id: String,

    timestamp: String,

    source_ip: String,

    destination_ip: String,

    protocol: String,

    source_port: Number,

    destination_port: Number,

    packet_length: Number,

    payload: String,

    status: String,

    attack: String,

    severity: String,

    matched_pattern: String
},
{
    collection: "captured_packets"
}
);

// ==========================================================
// Export Model
// ==========================================================

module.exports = mongoose.model("Packet", packetSchema);







// Q1. What is a Schema?

// Schema batata hai
// document ka structure kya hoga.


// Q2. Why create a Model?

// Model ke through hi
// MongoDB pe CRUD operations karte hain.


// Q3. Why mention collection name?

// Taaki Mongoose directly
// existing collection use kare.