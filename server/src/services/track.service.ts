import promisePool from '../config/db.js';
import type { Track } from '../types/index.js';

/**
 * Extended Track interface with joined genre and sub-genre data
 */
export interface TrackWithDetails extends Track {
    sub_genre_name?: string;
    sub_genre_slug?: string;
    sub_genre_description?: string;
    genre_id?: number;
    genre_name?: string;
    genre_slug?: string;
    genre_description?: string;
    track_count?: number;
}

/**
 * Get all tracks for a specific sub-genre using stored procedure
 */
export const getTracksBySubGenre = async (subGenreId: number): Promise<TrackWithDetails[]> => {
    const [rows] = await promisePool.query<TrackWithDetails[][]>(
        'CALL GetTracksBySubGenre(?)',
        [subGenreId]
    );
    // MySQL stored procedures return an array of result sets
    return Array.isArray(rows) && Array.isArray(rows[0]) ? rows[0] : [];
};

/**
 * Get a single track by ID with full details using stored procedure
 */
export const getTrackById = async (trackId: number): Promise<TrackWithDetails | null> => {
    const [rows] = await promisePool.query<TrackWithDetails[][]>(
        'CALL GetTrackById(?)',
        [trackId]
    );
    const tracks = Array.isArray(rows) && Array.isArray(rows[0]) ? rows[0] : [];
    return tracks.length > 0 ? tracks[0] : null;
};

/**
 * Search tracks with advanced filters using stored procedure
 */
export interface SearchFilters {
    keyword?: string;
    genreId?: number;
    minBpm?: number;
    maxBpm?: number;
}

export const searchTracks = async (filters: SearchFilters): Promise<TrackWithDetails[]> => {
    const { keyword, genreId, minBpm, maxBpm } = filters;

    const [rows] = await promisePool.query<TrackWithDetails[][]>(
        'CALL SearchTracks(?, ?, ?, ?)',
        [
            keyword || null,
            genreId || null,
            minBpm || null,
            maxBpm || null
        ]
    );
    return Array.isArray(rows) && Array.isArray(rows[0]) ? rows[0] : [];
};

/**
 * Get all tracks for a specific genre (across all sub-genres) using stored procedure
 */
export const getTracksByGenre = async (genreId: number): Promise<TrackWithDetails[]> => {
    const [rows] = await promisePool.query<TrackWithDetails[][]>(
        'CALL GetTracksByGenre(?)',
        [genreId]
    );
    return Array.isArray(rows) && Array.isArray(rows[0]) ? rows[0] : [];
};

/**
 * Get featured tracks (latest tracks across all genres) using stored procedure
 */
export const getFeaturedTracks = async (limit: number = 12): Promise<TrackWithDetails[]> => {
    const [rows] = await promisePool.query<TrackWithDetails[][]>(
        'CALL GetFeaturedTracks(?)',
        [limit]
    );
    return Array.isArray(rows) && Array.isArray(rows[0]) ? rows[0] : [];
};

/**
 * Get tracks within a specific price range using stored procedure
 */
export const getTracksByPriceRange = async (
    minPrice: number,
    maxPrice: number
): Promise<TrackWithDetails[]> => {
    const [rows] = await promisePool.query<TrackWithDetails[][]>(
        'CALL GetTracksByPriceRange(?, ?)',
        [minPrice, maxPrice]
    );
    return Array.isArray(rows) && Array.isArray(rows[0]) ? rows[0] : [];
};
