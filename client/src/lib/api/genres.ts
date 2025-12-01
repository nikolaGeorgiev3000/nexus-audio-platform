import { apiClient } from './client';
import type { Genre } from '../types';

export const genresApi = {
    getAll: () => apiClient.get<Genre[]>('/genres'),
    getById: (id: number) => apiClient.get<Genre>(`/genres/${id}`),
};
