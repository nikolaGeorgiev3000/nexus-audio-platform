import { useState, useEffect } from 'react';
import { genresApi } from '../api';
import type { Genre } from '../types';

export const useGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        genresApi.getAll()
            .then(data => {
                setGenres(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching genres:', err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return { genres, loading, error };
};
