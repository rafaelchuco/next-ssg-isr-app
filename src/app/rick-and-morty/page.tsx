import { Metadata } from "next";
import CharacterSearch from "./character-search";
import { getAllCharacters } from "@/lib/rick-and-morty";
import { IoPlanetOutline, IoFlask, IoEye, IoGitNetwork } from "react-icons/io5";

export const metadata: Metadata = {
  title: "Rick and Morty - Personajes",
  description: "Listado, búsqueda y detalle de personajes de Rick and Morty",
};

export const revalidate = 300;

export default async function RickAndMortyPage() {
  const characters = await getAllCharacters();

  return (
    <div className="py-8">
      {/* Hero Header Section */}
      <section className="glass-panel rounded-3xl p-8 md:p-10 mb-12 shadow-2xl relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute -top-20 -right-20 -z-10 h-60 w-60 rounded-full bg-cyan-500/8 blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 -z-10 h-60 w-60 rounded-full bg-green-500/8 blur-[80px] pointer-events-none" />

        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-5">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-cyan-300">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              SSR + SSG cacheado + CSR + ISR
            </p>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl flex items-center gap-4">
              <IoPlanetOutline size={45} className="text-cyan-400 animate-pulse shrink-0" />
              <span>Rick and Morty: Multiverso</span>
            </h1>
            <p className="max-w-2xl text-sm md:text-base leading-7 text-slate-300">
              La lista principal se renderiza en servidor con caché forzado para comportarse como SSG.
              La búsqueda corre en cliente con <strong className="text-white">useState</strong> y <strong className="text-white">useEffect</strong> contra la API,
              y el detalle por id o por nombre se revalida cada 10 días.
            </p>
          </div>

          {/* Strategy Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="glass-card rounded-2xl p-4 border border-white/5 hover:scale-100 hover:-translate-y-0">
              <div className="flex items-center gap-2 mb-2">
                <IoFlask size={16} className="text-cyan-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">Listado</span>
              </div>
              <p className="text-sm font-extrabold text-white">SSR + SSG</p>
              <p className="mt-1 text-[11px] text-slate-400">fetch con caché forzado</p>
            </div>
            <div className="glass-card rounded-2xl p-4 border border-white/5 hover:scale-100 hover:-translate-y-0">
              <div className="flex items-center gap-2 mb-2">
                <IoEye size={16} className="text-green-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-green-300">Búsqueda</span>
              </div>
              <p className="text-sm font-extrabold text-white">CSR</p>
              <p className="mt-1 text-[11px] text-slate-400">Nombre, status, tipo y género</p>
            </div>
            <div className="glass-card rounded-2xl p-4 border border-white/5 hover:scale-100 hover:-translate-y-0">
              <div className="flex items-center gap-2 mb-2">
                <IoPlanetOutline size={16} className="text-purple-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">Detalle</span>
              </div>
              <p className="text-sm font-extrabold text-white">ISR</p>
              <p className="mt-1 text-[11px] text-slate-400">Revalidación cada 10 días</p>
            </div>
            <div className="glass-card rounded-2xl p-4 border border-white/5 hover:scale-100 hover:-translate-y-0">
              <div className="flex items-center gap-2 mb-2">
                <IoGitNetwork size={16} className="text-amber-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">Rutas</span>
              </div>
              <p className="text-sm font-extrabold text-white">Id / Nombre</p>
              <p className="mt-1 text-[11px] text-slate-400">Params estáticos para todos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Results */}
      <CharacterSearch characters={characters} />
    </div>
  );
}