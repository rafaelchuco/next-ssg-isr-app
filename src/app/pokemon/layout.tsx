import { ReactNode } from "react";
import { Metadata } from "next";
import { IoGameController } from "react-icons/io5";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pokédex - Next.js",
  description: "Explora el mundo Pokémon con una experiencia fluida y rápida",
};

interface PokemonLayoutProps {
  children: ReactNode;
}

export default function PokemonLayout({ children }: PokemonLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative">
      {/* Global background decoration */}
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-red-500/5 blur-[120px] pointer-events-none" />

      {/* Floating Glassmorphic Navbar */}
      <header className="sticky top-0 z-50 px-4 pt-4">
        <nav className="mx-auto max-w-6xl rounded-2xl border border-white/8 bg-slate-900/60 backdrop-blur-md shadow-lg shadow-black/20">
          <div className="px-6 py-4 flex items-center justify-between">
            <Link
              href="/pokemon"
              className="flex items-center gap-3 text-white text-2xl font-black tracking-tight hover:text-red-400 transition-colors group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 group-hover:bg-red-500 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                <IoGameController size={22} className="group-hover:rotate-12 transition-transform" />
              </div>
              <span className="bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent group-hover:to-red-400 transition-all duration-300">
                Pokédex
              </span>
            </Link>

            <Link
              href="/"
              className="text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition px-4 py-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10"
            >
              Inicio
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content Viewport */}
      <main className="max-w-6xl mx-auto px-4 pb-16">
        {children}
      </main>
    </div>
  );
}