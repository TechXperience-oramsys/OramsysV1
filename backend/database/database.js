"use strict";
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

let isConnected = false; // Track the connection state

async function connectDB() {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(process.env.DB_CONNECTION_CLUSTER, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = conn.connections[0].readyState === 1;
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}

module.exports = connectDB;
