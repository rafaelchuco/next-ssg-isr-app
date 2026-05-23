import Link from "next/link";
import { IoGameController, IoStatsChart, IoFlash, IoInformationCircleOutline } from "react-icons/io5";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-radial from-slate-900 via-slate-950 to-black text-white px-4">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-96 w-96 rounded-full bg-purple-600/10 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[130px] animate-pulse-glow" style={{ animationDelay: "-2s" }} />

      {/* Main Content Card */}
      <main className="glass-panel relative z-10 w-full max-w-2xl rounded-3xl p-8 md:p-12 text-center shadow-2xl">
        
        {/* Animated Pokéball SVG */}
        <div className="mx-auto mb-8 flex h-40 w-40 items-center justify-center rounded-full bg-white/5 border border-white/10 shadow-inner relative group">
          <div className="absolute inset-0 rounded-full bg-radial from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <svg
            className="h-28 w-28 animate-spin-slow text-red-500 hover:text-red-400 transition-colors"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Top Half (Red) */}
            <path
              d="M50 10C27.9 10 10 27.9 10 50H26C26 36.7 36.7 26 50 26C63.3 26 74 36.7 74 50H90C90 27.9 72.1 10 50 10Z"
              fill="currentColor"
            />
            {/* Bottom Half (White) */}
            <path
              d="M50 90C72.1 90 90 72.1 90 50H74C74 63.3 63.3 74 50 74C36.7 74 26 63.3 26 50H10C10 72.1 27.9 90 50 90Z"
              fill="#E2E8F0"
            />
            {/* Center Line Divider */}
            <rect x="10" y="47" width="80" height="6" fill="#1E293B" />
            {/* Outer Center Ring */}
            <circle cx="50" cy="50" r="16" fill="#1E293B" />
            {/* Inner Center Button */}
            <circle cx="50" cy="50" r="10" fill="#FFFFFF" className="animate-pulse" />
            <circle cx="50" cy="50" r="6" fill="#E2E8F0" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="bg-gradient-to-r from-red-500 via-purple-400 to-blue-500 bg-clip-text text-4xl md:text-5xl font-extrabold tracking-tight text-transparent drop-shadow-sm">
          Pokédex Next.js
        </h1>
        <p className="mt-4 text-base md:text-lg text-slate-300 max-w-md mx-auto">
          Una aplicación ultra rápida construida con Next.js ISR (Incremental Static Regeneration), cargando la Generación 1 al instante.
        </p>

        {/* Action Button */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/pokemon"
            className="group relative flex h-14 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-red-500 to-purple-600 px-8 text-base font-bold text-white transition-all duration-300 hover:from-red-600 hover:to-purple-700 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] active:scale-95"
          >
            <IoGameController size={22} className="group-hover:rotate-12 transition-transform" />
            Explorar Pokémon
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </Link>

          <Link
            href="/rick-and-morty"
            className="group relative flex h-14 items-center justify-center gap-3 rounded-full border border-cyan-400/30 bg-white/5 px-8 text-base font-bold text-cyan-50 transition-all duration-300 hover:bg-cyan-400/15 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] active:scale-95"
          >
            Explorar Rick and Morty
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/5 pt-8 text-slate-400">
          <div className="flex flex-col items-center">
            <IoStatsChart size={20} className="text-red-400 mb-1" />
            <span className="text-xl font-bold text-white">151</span>
            <span className="text-xs uppercase tracking-wider text-slate-500">Pokémon</span>
          </div>
          <div className="flex flex-col items-center border-x border-white/5">
            <IoFlash size={20} className="text-yellow-400 mb-1" />
            <span className="text-xl font-bold text-white">ISR</span>
            <span className="text-xs uppercase tracking-wider text-slate-500">Revalidate</span>
          </div>
          <div className="flex flex-col items-center">
            <IoInformationCircleOutline size={20} className="text-blue-400 mb-1" />
            <span className="text-xl font-bold text-white">Gen 1</span>
            <span className="text-xs uppercase tracking-wider text-slate-500">Kanto</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-6 text-xs text-slate-600 flex gap-4">
        <a href="https://nextjs.org" target="_blank" rel="noreferrer" className="hover:text-slate-400 transition">
          Next.js Docs
        </a>
        <span>•</span>
        <a href="https://pokeapi.co" target="_blank" rel="noreferrer" className="hover:text-slate-400 transition">
          PokéAPI
        </a>
      </footer>
    </div>
  );
}
