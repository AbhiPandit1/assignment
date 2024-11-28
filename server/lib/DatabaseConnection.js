// db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const mongoDbConnection = mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log(`Connected to MongoDB ${process.env.MONGODB_URI}`))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

export default mongoDbConnection;
