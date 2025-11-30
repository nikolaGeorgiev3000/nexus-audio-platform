import { useGenres } from '../features/catalog/hooks/useGenres';
import { GenreCard } from '../features/catalog/components/GenreCard';

export default function Home() {
    // 1. Използваме нашия нов Hook
    const { genres, loading, error } = useGenres();

    return (
        <>
            {/* Hero Section - Тук можеш да изнесеш и Hero компонента по-късно */}
            <header className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -z-10"></div>
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                        System Online v1.0
                    </div>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-8">
                        Sonic <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Architecture</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        The premium marketplace for audiophiles and creators.
                        License high-fidelity stems directly from the source.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/25 w-full sm:w-auto">
                            Start Exploring
                        </button>
                    </div>
                </div>
            </header>

            {/* Departments Grid - Използваме новите компоненти */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Departments</h2>
                        <p className="text-slate-400">Curated collections by genre</p>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-64 bg-slate-900/50 rounded-2xl animate-pulse border border-slate-800"></div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center text-red-400 py-10">
                        System Error: Unable to load catalog data.
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