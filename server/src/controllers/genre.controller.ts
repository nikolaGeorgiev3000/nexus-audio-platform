import { type Request, type Response } from 'express';
import * as genreService from '../services/genre.service.js';

/**
 * GET /api/genres
 * Get all genres (simple list)
 */
export const getGenres = async (req: Request, res: Response) => {
    try {
        const genres = await genreService.getAllGenres();
        res.json(genres);
    } catch (error) {
        console.error('Error in getGenres controller:', error);
        res.status(500).json({ error: 'Internal server error while fetching genres' });
    }
};

/**
 * GET /api/genres/with-sub-genres
 * Get all genres with their sub-genres and track counts
 */
export const getGenresWithSubGenres = async (req: Request, res: Response) => {
    try {
        const genres = await genreService.getGenresWithSubGenres();
        res.json(genres);
    } catch (error) {
        console.error('Error in getGenresWithSubGenres controller:', error);
        res.status(500).json({ error: 'Internal server error while fetching genres with sub-genres' });
    }
};

/**
 * GET /api/genres/statistics
 * Get catalog statistics
 */
export const getCatalogStatistics = async (req: Request, res: Response) => {
    try {
        const stats = await genreService.getCatalogStatistics();
        res.json(stats);
    } catch (error) {
        console.error('Error in getCatalogStatistics controller:', error);
        res.status(500).json({ error: 'Internal server error while fetching catalog statistics' });
    }
};