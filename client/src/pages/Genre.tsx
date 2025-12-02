import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { ArrowLeft, Music, Play, Pause, Loader2 } from 'lucide-react';

interface Track {
    track_id: number;
    title: string;
    artist: string;
    bpm: number;
    duration_sec: number;
    price_basic: string;
    price_pro: string;
    price_stems: string;
    sub_genre_name: string;
    sub_genre_slug: string;
    genre_name: string;

    // iTunes API data
    itunes_track_id?: number;
    preview_url?: string;
    artwork_url_small?: string;
    artwork_url_large?: string;
    collection_name?: string;
    release_date?: string;

    // Fallback
    demo_url?: string;
    cover_image_url?: string;
}

interface Genre {
    id: number;
    name: string;
    slug: string;
    description: string;
}

export default function Genre() {
    const { slug } = useParams<{ slug: string }>();
    const [genre, setGenre] = useState<Genre | null>(null);
    const [tracks, setTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [playingTrackId, setPlayingTrackId] = useState<number | null>(null);
    const [audioLoading, setAudioLoading] = useState<number | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch all genres to find the one matching the slug
                const genresRes = await fetch('http://localhost:3000/api/genres');
                const genres: Genre[] = await genresRes.json();
                const matchedGenre = genres.find(g => g.slug === slug);

                if (!matchedGenre) {
                    setError('Genre not found');
                    setLoading(false);
                    return;
                }

                setGenre(matchedGenre);

                // Fetch tracks for this genre
                const tracksRes = await fetch(`http://localhost:3000/api/tracks/genre/${matchedGenre.id}`);
                const tracksData: Track[] = await tracksRes.json();
                setTracks(tracksData);

                setLoading(false);
            } catch (err) {
                console.error('Error fetching genre data:', err);
                setError('Failed to load tracks');
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handlePlayPause = (track: Track) => {
        const previewUrl = track.preview_url || track.demo_url;

        if (!previewUrl) {
            console.warn('No preview URL available for this track');
            return;
        }

        // If clicking the same track that's playing, pause it
        if (playingTrackId === track.track_id) {
            audioRef.current?.pause();
            setPlayingTrackId(null);
            return;
        }

        // Stop current audio if any
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }

        // Create new audio element and play
        setAudioLoading(track.track_id);
        const audio = new Audio(previewUrl);
        audioRef.current = audio;

        audio.addEventListener('canplay', () => {
            setAudioLoading(null);
            setPlayingTrackId(track.track_id);
            audio.play().catch(err => {
                console.error('Error playing audio:', err);
                setAudioLoading(null);
                setPlayingTrackId(null);
            });
        });

        audio.addEventListener('ended', () => {
            setPlayingTrackId(null);
        });

        audio.addEventListener('error', () => {
            console.error('Error loading audio');
            setAudioLoading(null);
            setPlayingTrackId(null);
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-32 px-6 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto">
                    <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse mb-8"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-96 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error || !genre) {
        return (
            <div className="min-h-screen pt-32 px-6 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-2xl font-bold text-red-500 mb-4">{error || 'Genre not found'}</h1>
                    <Link to="/" className="text-blue-500 hover:text-blue-600">
                        ← Back to home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 px-6 bg-white dark:bg-slate-950 transition-colors">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumb & Header */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 mb-8 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to home
                </Link>

                <div className="mb-12">
                    <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        {genre.name}
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl">
                        {genre.description}
                    </p>
                    <div className="mt-4 text-sm text-slate-500 dark:text-slate-500">
                        {tracks.length} {tracks.length === 1 ? 'track' : 'tracks'} available
                    </div>
                </div>

                {/* Tracks Grid */}
                {tracks.length === 0 ? (
                    <div className="text-center py-20">
                        <Music className="w-16 h-16 text-slate-400 dark:text-slate-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                            No tracks yet
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            Check back soon for new releases in this genre
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                        {tracks.map((track) => {
                            const artworkUrl = track.artwork_url_large || track.artwork_url_small || track.cover_image_url;
                            const previewUrl = track.preview_url || track.demo_url;
                            const isPlaying = playingTrackId === track.track_id;
                            const isLoading = audioLoading === track.track_id;

                            return (
                                <div
                                    key={track.track_id}
                                    className="group bg-slate-100 dark:bg-slate-900/40 border border-slate-300 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500 dark:hover:border-blue-500/50 transition-all hover:shadow-xl hover:-translate-y-1"
                                >
                                    {/* Track Artwork */}
                                    <div className="aspect-square bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                                        {artworkUrl ? (
                                            <img
                                                src={artworkUrl}
                                                alt={`${track.title} artwork`}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Music className="w-16 h-16 text-white/30" />
                                            </div>
                                        )}

                                        {/* Play/Pause Overlay */}
                                        {previewUrl && (
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                                                <button
                                                    onClick={() => handlePlayPause(track)}
                                                    className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100 shadow-lg"
                                                    aria-label={isPlaying ? 'Pause preview' : 'Play preview'}
                                                >
                                                    {isLoading ? (
                                                        <Loader2 className="w-8 h-8 text-white animate-spin" />
                                                    ) : isPlaying ? (
                                                        <Pause className="w-8 h-8 text-white fill-white" />
                                                    ) : (
                                                        <Play className="w-8 h-8 text-white fill-white ml-1" />
                                                    )}
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Track Info */}
                                    <div className="p-5">
                                        <div className="mb-3">
                                            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1 line-clamp-1">
                                                {track.title}
                                            </h3>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1">
                                                {track.artist}
                                            </p>
                                            {track.collection_name && (
                                                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 line-clamp-1">
                                                    {track.collection_name}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-500 mb-4 flex-wrap">
                                            <span className="px-2 py-1 bg-slate-200 dark:bg-slate-800 rounded">
                                                {track.sub_genre_name}
                                            </span>
                                            {track.bpm > 0 && (
                                                <span>{track.bpm} BPM</span>
                                            )}
                                            <span>{formatDuration(track.duration_sec)}</span>
                                        </div>

                                        {/* Pricing */}
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                                            <div>
                                                <div className="text-xs text-slate-500 dark:text-slate-500 mb-1">
                                                    From
                                                </div>
                                                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                                                    ${track.price_basic}
                                                </div>
                                            </div>
                                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-bold transition-colors">
                                                License
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
