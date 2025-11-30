import { Router } from 'express';
import { getGenres } from '../controllers/genre.controller.js';

const router = Router();

// GET /api/genres
router.get('/', getGenres);

export default router;