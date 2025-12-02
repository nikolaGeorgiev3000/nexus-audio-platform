import { Router } from 'express';
import {
    getTracksBySubGenre,
    getTrackById,
    searchTracks,
    getTracksByGenre,
    getFeaturedTracks,
    getTracksByPriceRange,
} from '../controllers/track.controller.js';

const router = Router();

// GET /api/tracks/featured - Must be before /:trackId to avoid conflict
router.get('/featured', getFeaturedTracks);

// GET /api/tracks/search
router.get('/search', searchTracks);

// GET /api/tracks/price-range
router.get('/price-range', getTracksByPriceRange);

// GET /api/tracks/genre/:genreId
router.get('/genre/:genreId', getTracksByGenre);

// GET /api/tracks/sub-genre/:subGenreId
router.get('/sub-genre/:subGenreId', getTracksBySubGenre);

// GET /api/tracks/:trackId - Must be last to avoid catching other routes
router.get('/:trackId', getTrackById);

export default router;
