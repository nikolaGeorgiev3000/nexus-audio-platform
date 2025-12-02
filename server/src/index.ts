import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './config/db.js';
import genreRoutes from './routes/genre.routes.js';
import trackRoutes from './routes/track.routes.js';

// Initialize configuration
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// --- ROUTES ---

// Root - API Documentation
app.get('/', (req: Request, res: Response) => {
    const baseUrl = `http://localhost:${PORT}`;
    res.json({
        name: 'Nexus Audio Platform API',
        version: '1.0.0',
        status: 'online',
        description: 'Premium audio marketplace API with iTunes integration',
        endpoints: {
            health: {
                method: 'GET',
                path: '/health',
                description: 'System health check'
            },
            genres: {
                listAll: {
                    method: 'GET',
                    path: '/api/genres',
                    description: 'Get all music genres'
                },
                getById: {
                    method: 'GET',
                    path: '/api/genres/:id',
                    description: 'Get single genre by ID'
                }
            },
            tracks: {
                byGenre: {
                    method: 'GET',
                    path: '/api/tracks/genre/:genreId',
                    description: 'Get all tracks for a specific genre',
                    example: `${baseUrl}/api/tracks/genre/1`
                },
                bySubGenre: {
                    method: 'GET',
                    path: '/api/tracks/subgenre/:subGenreId',
                    description: 'Get all tracks for a specific sub-genre'
                },
                byId: {
                    method: 'GET',
                    path: '/api/tracks/:id',
                    description: 'Get single track with full details'
                },
                search: {
                    method: 'GET',
                    path: '/api/tracks/search',
                    description: 'Search tracks with filters',
                    params: 'keyword, genreId, minBpm, maxBpm'
                },
                featured: {
                    method: 'GET',
                    path: '/api/tracks/featured',
                    description: 'Get featured/latest tracks',
                    params: 'limit (default: 12)'
                }
            }
        },
        features: [
            'iTunes API integration for real music previews',
            'High-resolution album artwork (600x600)',
            '30-second audio previews streamed from iTunes CDN',
            'Stored procedures for optimized queries',
            '5 main genres, 15 sub-genres, 120 curated tracks'
        ],
        documentation: 'Visit the frontend at http://localhost:5175'
    });
});

// Mount the genre routes at /api/genres
app.use('/api/genres', genreRoutes);

// Mount the track routes at /api/tracks
app.use('/api/tracks', trackRoutes);

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