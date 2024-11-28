import express from 'express';
import dotenv from 'dotenv';
import mongoDbConnection from './lib/DatabaseConnection.js';
import userRouter from './router/UserRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Parsing JSON
app.use(express.urlencoded({ extended: true })); // For parsing urlencoded data
app.use(cookieParser());

// Basic route for the root URL
app.use('/api', userRouter);
mongoDbConnection;
// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
