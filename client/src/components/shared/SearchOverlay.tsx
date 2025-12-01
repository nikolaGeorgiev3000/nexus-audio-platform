import { Search } from 'lucide-react';
import { TRENDING_TAGS } from '@/lib/constants';

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-32 px-4">
            {/* Backdrop Blur */}
            <div
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl transition-all duration-300"
                onClick={onClose}
            ></div>

            {/* Search Box */}
            <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl shadow-blue-900/20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center px-6 py-4 border-b border-slate-800">
                    <Search className="w-6 h-6 text-blue-500 mr-4" />
                    <input
                        autoFocus
                        type="text"
                        placeholder="Search tracks, artists, or genres..."
                        className="w-full bg-transparent text-xl text-white placeholder-slate-500 focus:outline-none"
                    />
                    <button
                        onClick={onClose}
                        className="ml-4 p-1 text-slate-500 hover:text-white bg-slate-800 rounded-md text-xs uppercase font-bold px-2 py-1"
                    >
                        ESC
                    </button>
                </div>

                {/* Quick Suggestions */}
                <div className="p-4 bg-slate-900/50">
                    <p className="text-xs font-bold text-slate-500 uppercase mb-3 px-2">Trending Now</p>
                    <div className="flex flex-wrap gap-2">
                        {TRENDING_TAGS.map(tag => (
                            <button key={tag} className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-sm hover:bg-blue-600 hover:text-white transition-colors">
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
