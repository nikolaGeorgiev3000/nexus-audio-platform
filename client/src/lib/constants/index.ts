export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const APP_VERSION = 'v1.0';
export const APP_NAME = 'NexusAudio';

export const ROUTES = {
    HOME: '/',
    CATALOG: '/catalog',
    PRICING: '/pricing',
} as const;

export const TRENDING_TAGS = [
    'Deep House',
    'Cinematic Drums',
    'Hans Zimmer Style',
    'Trap Beats',
] as const;
