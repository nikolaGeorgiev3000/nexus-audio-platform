import promisePool from '../config/db.js';
import type { RowDataPacket } from 'mysql2';

// Define what the database returns
interface Genre extends RowDataPacket {
    id: number;
    name: string;
    description: string;
    slug: string;
}

export const getAllGenres = async (): Promise<Genre[]> => {
    const [rows] = await promisePool.query<Genre[]>('SELECT * FROM genres');
    return rows;
};

// TODO: Add getGenreById, createGenre and more