import { Search, X, Loader2, Music } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Track {
    track_id: number;
    title: string;
    artist: string;
    genre_name: string;
    sub_genre_name: string;
    bpm: number;
    duration_sec: number;
    price_basic: string;
    artwork_url_large?: string;
}

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Track[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setHasSearched(false);
            return;
        }

        const timeoutId = setTimeout(async () => {
            setLoading(true);
            setHasSearched(true);

            try {
                const response = await fetch('http://localhost:3000/api/tracks/search?q=' + encodeURIComponent(query));
                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error('Search error:', error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
        };

        if (isOpen && !shouldRender) {
            // Opening: set up the component
            setShouldRender(true);
            setIsClosing(true); // Start closed for animation
            window.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
            // Trigger opening animation after render
            requestAnimationFrame(() => {
                setTimeout(() => setIsClosing(false), 10);
            });
        } else if (!isOpen && shouldRender) {
            // Closing: trigger close animation
            setIsClosing(true);
            document.body.style.overflow = 'auto';
            setTimeout(() => {
                setShouldRender(false);
                onClose();
            }, 300);
        } else if (isOpen && shouldRender) {
            // Already open, just add event listener
            window.addEventListener('keydown', handleEsc);
        }

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, shouldRender, onClose]);

    const handleClose = () => {
        setIsClosing(true);
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            setShouldRender(false);
            onClose();
        }, 300);
    };

    if (!shouldRender) return null;

    return (
        <div className="fixed top-20 left-0 right-0 bottom-0 z-40 flex flex-col" onClick={handleClose}>
            <div
                className="absolute inset-0 bg-white/30 dark:bg-slate-950/30 backdrop-blur-lg transition-opacity duration-300 pointer-events-none"
                style={{ opacity: isClosing ? 0 : 1 }}
            />

            <div
                className="relative w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-lg transition-all duration-300 ease-out"
                style={{
                    transform: isClosing ? 'translateY(-100%)' : 'translateY(0)',
                    opacity: isClosing ? 0 : 1,
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center gap-4 mb-4">
                        <Search className="w-6 h-6 text-slate-400 dark:text-slate-500 flex-shrink-0 ml-[10px]" />
                        <input
                            autoFocus
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for tracks, artists, or genres"
                            className="flex-1 bg-transparent text-2xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none"
                        />
                        {query && (
                            <button onClick={() => setQuery('')} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        )}
                        <button onClick={handleClose} className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors">
                            ESC
                        </button>
                    </div>

                    {!query && (
                        <div className="flex flex-wrap gap-2 animate-in fade-in duration-200 ml-[10px]">
                            <span className="text-xs text-slate-500 dark:text-slate-500 mr-2">Quick search:</span>
                            {['Techno', 'Cinematic', 'Hip Hop', '120 BPM'].map((hint) => (
                                <button key={hint} onClick={() => setQuery(hint)} className="px-3 py-1 text-xs rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-500 hover:text-white transition-colors cursor-pointer">
                                    {hint}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="relative flex-1 overflow-y-auto">
                <div className="max-w-7xl mx-auto px-6 py-8" onClick={(e) => e.stopPropagation()}>
                    {loading && (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                        </div>
                    )}

                    {!loading && hasSearched && results.length === 0 && (
                        <div className="text-center py-20">
                            <Music className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No tracks found</h3>
                            <p className="text-slate-600 dark:text-slate-400">Try searching for different keywords</p>
                        </div>
                    )}

                    {!loading && results.length > 0 && (
                        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <p className="text-sm text-slate-500 dark:text-slate-500 mb-4">
                                {results.length} {results.length === 1 ? 'track' : 'tracks'} found
                            </p>
                            {results.map((track) => (
                                <div key={track.track_id} className="group flex items-center gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-500 dark:hover:border-blue-500/50 transition-all cursor-pointer" onClick={() => { window.location.href = '/genre/' + track.genre_name.toLowerCase() + '#track-' + track.track_id; }}>
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex-shrink-0 overflow-hidden">
                                        {track.artwork_url_large ? (
                                            <img src={track.artwork_url_large} alt={track.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Music className="w-6 h-6 text-white/30" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-slate-900 dark:text-white truncate">{track.title}</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 truncate">{track.artist}</p>
                                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 dark:text-slate-500">
                                            <span>{track.genre_name}</span>
                                            <span>•</span>
                                            <span>{track.sub_genre_name}</span>
                                            {track.bpm > 0 && (
                                                <>
                                                    <span>•</span>
                                                    <span>{track.bpm} BPM</span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="text-right flex-shrink-0">
                                        <div className="text-sm text-slate-500 dark:text-slate-500 mb-1">From</div>
                                        <div className="text-lg font-bold text-blue-600 dark:text-blue-400">${track.price_basic}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
