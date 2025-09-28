// src/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function connectDB() {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI not set in .env');
  await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/smart-habit-tracker");

  console.log('MongoDB connected successfully <3hhhhhhhhhhhh');
}

export { connectDB, mongoose };
