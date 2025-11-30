import { useState } from 'react';
import { Search, ShoppingBag, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);

    return (
        <>
            {/* 1. Main Navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 group-hover:border-blue-400 transition-colors">
                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            Nexus<span className="text-blue-500">Audio</span>
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                        <Link to="/" className="hover:text-white transition-colors">Discover</Link>
                        <Link to="/catalog" className="hover:text-white transition-colors">Catalog</Link>
                        <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        {/* Search Trigger */}
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
                        >
                            <Search className="w-5 h-5" />
                        </button>

                        {/* Cart */}
                        <button className="relative p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
                            <ShoppingBag className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
                        </button>

                        {/* Theme Toggle (Visual only for now) */}
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="hidden md:flex p-2 text-slate-400 hover:text-yellow-400 transition-colors"
                        >
                            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* 2. Search Overlay with BLUR Effect */}
            {isSearchOpen && (
                <div className="fixed inset-0 z-[60] flex items-start justify-center pt-32 px-4">

                    {/* Backdrop Blur */}
                    <div
                        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl transition-all duration-300"
                        onClick={() => setIsSearchOpen(false)}
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
                                onClick={() => setIsSearchOpen(false)}
                                className="ml-4 p-1 text-slate-500 hover:text-white bg-slate-800 rounded-md text-xs uppercase font-bold px-2 py-1"
                            >
                                ESC
                            </button>
                        </div>

                        {/* Quick Suggestions */}
                        <div className="p-4 bg-slate-900/50">
                            <p className="text-xs font-bold text-slate-500 uppercase mb-3 px-2">Trending Now</p>
                            <div className="flex flex-wrap gap-2">
                                {['Deep House', 'Cinematic Drums', 'Hans Zimmer Style', 'Trap Beats'].map(tag => (
                                    <button key={tag} className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-sm hover:bg-blue-600 hover:text-white transition-colors">
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}