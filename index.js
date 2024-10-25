const cron = require('node-cron');
const express = require("express");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser"); // Add this import
const connectDB = require("./config/db");
const LogModel = require("./models/logModel");
const YanTokenContract = require("./utils/contract");

// Load env variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 80;

const tokenReceiver = '0x1e8049B997f8CD04F320B24A3395F1aCadcF3E09';

// Run every 5 minutes
cron.schedule('*/5 * * * *', async () => {
    try {
        const mintToken = await YanTokenContract.mintTokens(tokenReceiver, 1);
        
        if (mintToken) {
            const log = new LogModel({ 
                token: 1,
                datetime: new Date()  // Add datetime field
            });
            
            const savedLog = await log.save();
            
            if(savedLog) {
                console.log(`Token: 1\nDatetime: ${new Date().toISOString()}`);
            }
        }
    } catch (error) {
        console.error('Minting or logging failed:', error);
    }
});

// Basic error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});