export interface Genre {
    id: number;
    name: string;
    description: string;
    slug?: string;
}

export interface Track {
    id: number;
    title: string;
    artist: string;
    price_basic: number;
    price_pro: number;
    cover_image_url?: string;
}

export interface AudioState {
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    volume: number;
}
