import { type Request, type Response } from 'express';
import * as trackService from '../services/track.service.js';

/**
 * GET /api/tracks/sub-genre/:subGenreId
 * Get all tracks for a specific sub-genre
 */
export const getTracksBySubGenre = async (req: Request, res: Response) => {
    try {
        const subGenreId = parseInt(req.params.subGenreId);

        if (isNaN(subGenreId)) {
            return res.status(400).json({ error: 'Invalid sub-genre ID' });
        }

        const tracks = await trackService.getTracksBySubGenre(subGenreId);
        res.json(tracks);
    } catch (error) {
        console.error('Error in getTracksBySubGenre controller:', error);
        res.status(500).json({ error: 'Internal server error while fetching tracks' });
    }
};

/**
 * GET /api/tracks/:trackId
 * Get a single track by ID with full details
 */
export const getTrackById = async (req: Request, res: Response) => {
    try {
        const trackId = parseInt(req.params.trackId);

        if (isNaN(trackId)) {
            return res.status(400).json({ error: 'Invalid track ID' });
        }

        const track = await trackService.getTrackById(trackId);

        if (!track) {
            return res.status(404).json({ error: 'Track not found' });
        }

        res.json(track);
    } catch (error) {
        console.error('Error in getTrackById controller:', error);
        res.status(500).json({ error: 'Internal server error while fetching track' });
    }
};

/**
 * GET /api/tracks/search
 * Search tracks with advanced filters
 * Query params: keyword, genreId, minBpm, maxBpm
 */
export const searchTracks = async (req: Request, res: Response) => {
    try {
        const { q, keyword, genreId, minBpm, maxBpm } = req.query;

        const filters: trackService.SearchFilters = {
            keyword: (q || keyword) as string | undefined,
            genreId: genreId ? parseInt(genreId as string) : undefined,
            minBpm: minBpm ? parseInt(minBpm as string) : undefined,
            maxBpm: maxBpm ? parseInt(maxBpm as string) : undefined,
        };

        const tracks = await trackService.searchTracks(filters);
        res.json(tracks);
    } catch (error) {
        console.error('Error in searchTracks controller:', error);
        res.status(500).json({ error: 'Internal server error while searching tracks' });
    }
};

/**
 * GET /api/tracks/genre/:genreId
 * Get all tracks for a specific genre (across all sub-genres)
 */
export const getTracksByGenre = async (req: Request, res: Response) => {
    try {
        const genreId = parseInt(req.params.genreId);

        if (isNaN(genreId)) {
            return res.status(400).json({ error: 'Invalid genre ID' });
        }

        const tracks = await trackService.getTracksByGenre(genreId);
        res.json(tracks);
    } catch (error) {
        console.error('Error in getTracksByGenre controller:', error);
        res.status(500).json({ error: 'Internal server error while fetching tracks' });
    }
};

/**
 * GET /api/tracks/featured
 * Get featured tracks (latest tracks across all genres)
 * Query params: limit (default: 12)
 */
export const getFeaturedTracks = async (req: Request, res: Response) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 12;

        if (isNaN(limit) || limit < 1 || limit > 100) {
            return res.status(400).json({ error: 'Invalid limit (must be 1-100)' });
        }

        const tracks = await trackService.getFeaturedTracks(limit);
        res.json(tracks);
    } catch (error) {
        console.error('Error in getFeaturedTracks controller:', error);
        res.status(500).json({ error: 'Internal server error while fetching featured tracks' });
    }
};

/**
 * GET /api/tracks/price-range
 * Get tracks within a specific price range
 * Query params: minPrice, maxPrice
 */
export const getTracksByPriceRange = async (req: Request, res: Response) => {
    try {
        const { minPrice, maxPrice } = req.query;

        if (!minPrice || !maxPrice) {
            return res.status(400).json({ error: 'Both minPrice and maxPrice are required' });
        }

        const min = parseFloat(minPrice as string);
        const max = parseFloat(maxPrice as string);

        if (isNaN(min) || isNaN(max) || min < 0 || max < min) {
            return res.status(400).json({ error: 'Invalid price range' });
        }

        const tracks = await trackService.getTracksByPriceRange(min, max);
        res.json(tracks);
    } catch (error) {
        console.error('Error in getTracksByPriceRange controller:', error);
        res.status(500).json({ error: 'Internal server error while fetching tracks by price' });
    }
};
