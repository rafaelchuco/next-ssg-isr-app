import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";

export default function PokemonNotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900/60 p-8 text-center text-white shadow-2xl backdrop-blur-md relative overflow-hidden">
        
        {/* Glow behind */}
        <div className="absolute -top-10 -right-10 -z-10 h-32 w-32 rounded-full bg-purple-500/10 blur-[50px] pointer-events-none" />

        {/* Outer Center Ring representing lost pokeball */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-950/50 border border-white/10 text-amber-400 relative">
          <svg className="h-12 w-12 animate-pulse" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="6" strokeDasharray="10 10" />
            <circle cx="50" cy="50" r="10" fill="currentColor" />
          </svg>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Pokémon No Encontrado
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-400 max-w-md mx-auto">
          El Pokémon solicitado o la ruta de consulta no se pudo localizar en nuestros servidores de Kanto. Por favor, verifica la escritura.
        </p>

        {/* Actions */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/pokemon"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-950/20 hover:from-red-600 hover:to-purple-700 active:scale-95 transition cursor-pointer"
          >
            <IoHomeOutline size={18} />
            Volver a Pokédex
          </Link>
        </div>
      </div>
    </div>
  );
}