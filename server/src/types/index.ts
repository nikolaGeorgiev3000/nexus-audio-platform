import type { RowDataPacket } from 'mysql2';

// Genre Types - matches client types
export interface Genre extends RowDataPacket {
    id: number;
    name: string;
    description: string;
    slug?: string;
    image_url?: string;
    created_at?: Date;
}

// Track Types - matches client types
export interface Track extends RowDataPacket {
    id: number;
    title: string;
    artist: string;
    price_basic: number;
    price_pro: number;
    price_stems?: number;
    cover_image_url?: string;
    sub_genre_id: number;
    bpm?: number;
    duration_sec?: number;
    demo_url?: string;
    created_at?: Date;
}

// Sub-genre Types
export interface SubGenre extends RowDataPacket {
    id: number;
    genre_id: number;
    name: string;
    slug: string;
    description?: string;
}

// User Types
export interface User extends RowDataPacket {
    id: number;
    email: string;
    password_hash: string;
    full_name?: string;
    role: 'customer' | 'admin';
    created_at?: Date;
}

// API Response Types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// Pagination Types
export interface PaginationParams {
    page?: number;
    limit?: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
