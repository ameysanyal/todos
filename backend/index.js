import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import todosRoute from './routes/todoRoute.js';
import cron from 'node-cron';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

// Solution for keeping the backend service always active (cron job)
cron.schedule('*/10 * * * *', async () => {
    try {
        const response = await axios.get(`https://todos-backend-z4nv.onrender.com`);
        console.log(`Pinging backend service, status: ${response.status}`);
    } catch (error) {
        console.error('Error pinging backend service:', error);
    }
});

// Define a route for the root path
app.get('/', (req, res) => {
    console.log('Root path accessed');
    return res.status(200).send('Welcome to todos app backend');
});

app.use('/todos', todosRoute);

mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });
