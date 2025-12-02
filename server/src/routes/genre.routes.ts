import { Router } from 'express';
import {
    getGenres,
    getGenresWithSubGenres,
    getCatalogStatistics,
} from '../controllers/genre.controller.js';

const router = Router();

// GET /api/genres/with-sub-genres - Must be before / to avoid conflict
router.get('/with-sub-genres', getGenresWithSubGenres);

// GET /api/genres/statistics
router.get('/statistics', getCatalogStatistics);

// GET /api/genres
router.get('/', getGenres);

export default router;