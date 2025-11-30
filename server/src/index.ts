import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './config/db.js';
import genreRoutes from './routes/genre.routes.js';

// Initialize configuration
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// --- ROUTES ---
// Mount the genre routes at /api/genres
app.use('/api/genres', genreRoutes);

// Health Check
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'active', system: 'Nexus Audio Platform API' });
});

// Start Server & Connect DB
app.listen(PORT, async () => {
    console.log(`[server]: Nexus Audio API running at http://localhost:${PORT}`);

    // Test database connection
    await testConnection();
});