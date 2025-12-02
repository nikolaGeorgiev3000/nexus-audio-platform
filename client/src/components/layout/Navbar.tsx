import { useState } from 'react';
import { Search, ShoppingBag, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import SearchOverlay from '@/components/shared/SearchOverlay';

export default function Navbar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { isDark, toggleTheme } = useTheme();

    return (
        <>
            {/* 1. Main Navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 border-b border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 group-hover:border-blue-400 transition-colors">
                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                            Nexus <span className="text-blue-500">Audio</span>
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
                        <Link to="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Discover</Link>
                        <Link to="/catalog" className="hover:text-slate-900 dark:hover:text-white transition-colors">Catalog</Link>
                        <Link to="/pricing" className="hover:text-slate-900 dark:hover:text-white transition-colors">Pricing</Link>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        {/* Search Trigger */}
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-all cursor-pointer"
                        >
                            <Search className="w-5 h-5" />
                        </button>

                        {/* Cart */}
                        <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-all">
                            <ShoppingBag className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
                        </button>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="hidden md:flex p-2 text-slate-600 dark:text-slate-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors cursor-pointer rounded-full hover:bg-slate-100 dark:hover:bg-white/10"
                            aria-label="Toggle theme"
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Search Overlay */}
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}