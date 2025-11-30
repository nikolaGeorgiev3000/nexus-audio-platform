export interface Genre {
    id: number;
    name: string;
    description: string;
    slug?: string;
    // Could add image_url later
}

export interface Track {
    id: number;
    title: string;
    artist: string;
    price_basic: number;
    price_pro: number;
    cover_image_url?: string;
}