export default function Hero() {
    return (
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
    );
}
