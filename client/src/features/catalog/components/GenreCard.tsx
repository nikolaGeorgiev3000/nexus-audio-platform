import { Disc, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Genre } from '../types';

interface GenreCardProps {
    genre: Genre;
}

export const GenreCard = ({ genre }: GenreCardProps) => {
    return (
        <Link
            to={`/genre/${genre.slug}`}
            className="group relative bg-slate-100 dark:bg-slate-900/40 border border-slate-300 dark:border-white/5 rounded-3xl p-8 hover:bg-white dark:hover:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden cursor-pointer shadow-sm hover:shadow-lg block"
        >
            {/* Background Gradient on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:to-purple-600/5 transition-all duration-500"></div>

            <div className="relative z-10">
                <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300 shadow-lg">
                    <Disc className="w-6 h-6 text-slate-700 dark:text-white group-hover:text-white" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{genre.name}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 leading-relaxed border-l-2 border-slate-300 dark:border-slate-800 pl-4 group-hover:border-blue-500 transition-colors line-clamp-3">
                    {genre.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                        Browse
                    </span>
                    <button className="w-10 h-10 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center group-hover:bg-blue-600 dark:group-hover:bg-white group-hover:border-blue-600 dark:group-hover:border-white transition-all">
                        <ArrowRight className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-white dark:group-hover:text-black" />
                    </button>
                </div>
            </div>
        </Link>
    );
};