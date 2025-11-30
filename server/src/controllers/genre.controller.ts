import { type Request, type Response } from 'express';
import * as genreService from '../services/genre.service.js';

export const getGenres = async (req: Request, res: Response) => {
    try {
        const genres = await genreService.getAllGenres();
        res.json(genres);
    } catch (error) {
        console.error('Error in getGenres controller:', error);
        res.status(500).json({ error: 'Internal server error while fetching genres' });
    }
};