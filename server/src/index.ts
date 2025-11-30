import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import promisePool, { testConnection } from './config/db.js';

// Initialize configuration
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow requests from client
app.use(express.json()); // Parse JSON bodies

// 1. Health Check
app.get('/', (req: Request, res: Response) => {
    res.json({ status: 'active', system: 'Nexus Audio Platform API' });
});

// 2. GET All Genres (Departments) - The first Real Data Route
app.get('/api/genres', async (req: Request, res: Response) => {
    try {
        // Query the database
        const [rows] = await promisePool.query('SELECT * FROM genres');
        // Send data back to frontend
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error fetching genres' });
    }
});

// Start Server & Connect DB
app.listen(PORT, async () => { // <--- ASYNC HERE
    console.log(`[server]: Nexus Audio API running at http://localhost:${PORT}`);

    // Test the connection immediately
    await testConnection(); // <--- ACTIVATE CONNECTION
});