import { useEffect, useState } from 'react';
import { Disc, ArrowRight } from 'lucide-react';
import { type Genre } from '../types';

export default function Home() {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/api/genres')
            .then(res => res.json())
            .then(data => {
                setGenres(data);
                setLoading(false);
            })
            .catch(err => console.error("Error:", err));
    }, []);

    return (
        <>
            {/* Hero Section */}
            <header className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
                {/* Abstract Background Glow */}
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
                        <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold border border-slate-700 transition-all w-full sm:w-auto">
                            View Documentation
                        </button>
                    </div>
                </div>
            </header>

            {/* Departments Grid */}
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
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {genres.map((genre) => (
                            <div key={genre.id} className="group relative bg-slate-900/40 border border-white/5 rounded-3xl p-8 hover:bg-slate-900 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                                {/* Background Gradient on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:to-purple-600/5 transition-all duration-500"></div>

                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300 shadow-lg">
                                        <Disc className="w-6 h-6 text-white" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-3">{genre.name}</h3>
                                    <p className="text-slate-400 text-sm mb-8 leading-relaxed border-l-2 border-slate-800 pl-4 group-hover:border-blue-500 transition-colors">
                                        {genre.description}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest group-hover:text-blue-400 transition-colors">
                                            {Math.floor(Math.random() * 50) + 10} Tracks
                                        </span>
                                        <button className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all">
                                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-black" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </>
    );
}
