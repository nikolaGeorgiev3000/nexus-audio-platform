import { useState, useEffect } from 'react';
import type { Genre } from '../types';

export const useGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Here is the place for API call
        // In the future we will change it to axios or React Query
        fetch('http://localhost:3000/api/genres')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch genres');
                return res.json();
            })
            .then(data => {
                setGenres(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching genres:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return { genres, loading, error };
};