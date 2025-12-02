import { useGenres } from '../features/catalog/hooks/useGenres';
import { GenreCard } from '../features/catalog/components/GenreCard';

export default function Home() {
    // 1. We use our new Hook
    const { genres, loading, error } = useGenres();

    return (
        <>
            {/* Hero Section */}
            <header className="relative pt-32 pb-20 px-6 text-center overflow-hidden bg-white dark:bg-slate-950 transition-colors">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 dark:bg-blue-500/10 rounded-full blur-[120px] -z-10"></div>
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
                        <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse"></span>
                        New Releases Weekly
                    </div>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-slate-900 dark:text-white mb-8">
                        Your Sound, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">Perfected</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        High-quality instrumentals & stems for producers, content creators, and filmmakers.
                        License once, use forever. No subscription BS.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/25 dark:bg-blue-500 dark:hover:bg-blue-400 w-full sm:w-auto">
                            Browse Catalog
                        </button>
                    </div>
                </div>
            </header>

            {/* Departments Grid */}
            <section className="max-w-7xl mx-auto px-6 py-20 transition-colors bg-white/80 dark:bg-slate-900/40 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-xl shadow-blue-500/5 dark:shadow-blue-900/10">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Browse by Genre</h2>
                        <p className="text-slate-600 dark:text-slate-400">Find the perfect sound for your project</p>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-64 bg-slate-200 dark:bg-slate-900/50 rounded-2xl animate-pulse border border-slate-300 dark:border-slate-800"></div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 dark:text-red-400 py-10">
                        Oops! Something went wrong loading the catalog.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {genres.map((genre) => (
                            <GenreCard key={genre.id} genre={genre} />
                        ))}
                    </div>
                )}
            </section>
        </>
    );
}
