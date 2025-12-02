import promisePool from '../config/db.js';
import type { Genre, SubGenre } from '../types/index.js';

/**
 * Extended genre interface with sub-genres and track count
 */
export interface GenreWithSubGenres extends Genre {
    sub_genres?: SubGenreWithCount[];
}

export interface SubGenreWithCount extends SubGenre {
    track_count?: number;
}

/**
 * Get all genres (simple list without sub-genres)
 */
export const getAllGenres = async (): Promise<Genre[]> => {
    const [rows] = await promisePool.query<Genre[]>('SELECT * FROM genres');
    return rows;
};

/**
 * Get all genres with their sub-genres and track counts using stored procedure
 */
export const getGenresWithSubGenres = async (): Promise<GenreWithSubGenres[]> => {
    const [rows] = await promisePool.query<any[][]>('CALL GetGenresWithSubGenres()');

    if (!Array.isArray(rows) || !Array.isArray(rows[0])) {
        return [];
    }

    const rawData = rows[0];

    // Group sub-genres by genre
    const genresMap = new Map<number, GenreWithSubGenres>();

    for (const row of rawData) {
        const genreId = row.genre_id;

        // Create genre if it doesn't exist in map
        if (!genresMap.has(genreId)) {
            genresMap.set(genreId, {
                id: row.genre_id,
                name: row.genre_name,
                slug: row.genre_slug,
                description: row.genre_description,
                sub_genres: [],
            });
        }

        const genre = genresMap.get(genreId)!;

        // Add sub-genre if it exists
        if (row.sub_genre_id) {
            genre.sub_genres!.push({
                id: row.sub_genre_id,
                genre_id: row.genre_id,
                name: row.sub_genre_name,
                slug: row.sub_genre_slug,
                description: row.sub_genre_description,
                track_count: row.track_count || 0,
            });
        }
    }

    return Array.from(genresMap.values());
};

/**
 * Get catalog statistics using stored procedure
 */
export interface CatalogStatistics {
    total_genres: number;
    total_sub_genres: number;
    total_tracks: number;
    avg_price_basic: number;
    avg_price_pro: number;
    avg_price_stems: number;
    avg_bpm: number;
    avg_duration_sec: number;
}

export const getCatalogStatistics = async (): Promise<CatalogStatistics> => {
    const [rows] = await promisePool.query<any[][]>('CALL GetCatalogStatistics()');

    if (!Array.isArray(rows) || !Array.isArray(rows[0]) || rows[0].length === 0) {
        throw new Error('Failed to fetch catalog statistics');
    }

    return rows[0][0];
};