import Link from "next/link";
import { Metadata } from "next";
import { Pokemon, PokemonListResponse } from "@/types/pokemon";
import Image from "next/image";
import { IoChevronBack, IoChevronForward, IoResize, IoScale, IoSparkles } from "react-icons/io5";

interface PokemonPageProps {
  params: Promise<{
    name: string;
  }>;
}

async function getPokemon(name: string): Promise<Pokemon> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) throw new Error("Pokémon no encontrado");

  return res.json();
}

// Fetch Kanto list to determine navigation
async function getKantoList() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151", {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error("Error al obtener la lista de Kanto");
  const data: PokemonListResponse = await res.json();
  return data.results;
}

export async function generateStaticParams() {
  const list = await getKantoList();
  return list.map((pokemon) => ({
    name: pokemon.name,
  }));
}

export async function generateMetadata({ params }: PokemonPageProps): Promise<Metadata> {
  const { name } = await params;
  const pokemon = await getPokemon(name);

  return {
    title: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} - Pokédex`,
    description: `Detalles completos, tipos, estadísticas y habilidades de ${pokemon.name}`,
  };
}

const typeThemes: Record<string, {
  bg: string;
  border: string;
  glow: string;
  badge: string;
  pill: string;
  statBar: string;
  text: string;
  darkBg: string;
}> = {
  fire: {
    bg: "from-red-600/20 via-orange-600/10 to-transparent",
    border: "border-red-500/30",
    glow: "shadow-red-500/10",
    badge: "bg-red-500 text-white",
    pill: "bg-red-500/10 text-red-400 border-red-500/20",
    statBar: "bg-gradient-to-r from-red-500 to-orange-500",
    text: "text-red-400",
    darkBg: "bg-red-950/20",
  },
  water: {
    bg: "from-blue-600/20 via-cyan-600/10 to-transparent",
    border: "border-blue-500/30",
    glow: "shadow-blue-500/10",
    badge: "bg-blue-500 text-white",
    pill: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    statBar: "bg-gradient-to-r from-blue-500 to-cyan-500",
    text: "text-blue-400",
    darkBg: "bg-blue-950/20",
  },
  grass: {
    bg: "from-emerald-600/20 via-teal-600/10 to-transparent",
    border: "border-emerald-500/30",
    glow: "shadow-emerald-500/10",
    badge: "bg-emerald-500 text-white",
    pill: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    statBar: "bg-gradient-to-r from-emerald-500 to-teal-500",
    text: "text-emerald-400",
    darkBg: "bg-emerald-950/20",
  },
  electric: {
    bg: "from-yellow-500/20 via-amber-500/10 to-transparent",
    border: "border-yellow-500/30",
    glow: "shadow-yellow-500/10",
    badge: "bg-yellow-500 text-slate-950",
    pill: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    statBar: "bg-gradient-to-r from-yellow-400 to-amber-500",
    text: "text-yellow-400",
    darkBg: "bg-yellow-950/10",
  },
  psychic: {
    bg: "from-pink-600/20 via-rose-600/10 to-transparent",
    border: "border-pink-500/30",
    glow: "shadow-pink-500/10",
    badge: "bg-pink-500 text-white",
    pill: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    statBar: "bg-gradient-to-r from-pink-500 to-rose-500",
    text: "text-pink-400",
    darkBg: "bg-pink-950/20",
  },
  ice: {
    bg: "from-cyan-500/20 via-blue-400/10 to-transparent",
    border: "border-cyan-400/30",
    glow: "shadow-cyan-400/10",
    badge: "bg-cyan-400 text-slate-950",
    pill: "bg-cyan-400/10 text-cyan-300 border-cyan-400/20",
    statBar: "bg-gradient-to-r from-cyan-400 to-blue-400",
    text: "text-cyan-300",
    darkBg: "bg-cyan-950/20",
  },
  dragon: {
    bg: "from-indigo-600/20 via-violet-600/10 to-transparent",
    border: "border-indigo-500/30",
    glow: "shadow-indigo-500/10",
    badge: "bg-indigo-600 text-white",
    pill: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    statBar: "bg-gradient-to-r from-indigo-500 to-violet-600",
    text: "text-indigo-400",
    darkBg: "bg-indigo-950/20",
  },
  dark: {
    bg: "from-slate-800/40 via-slate-900/20 to-transparent",
    border: "border-slate-700/50",
    glow: "shadow-slate-700/10",
    badge: "bg-slate-800 text-white border border-slate-700",
    pill: "bg-slate-800/20 text-slate-300 border-slate-700/30",
    statBar: "bg-gradient-to-r from-slate-600 to-slate-800",
    text: "text-slate-400",
    darkBg: "bg-slate-950/30",
  },
  fairy: {
    bg: "from-rose-400/20 via-pink-400/10 to-transparent",
    border: "border-rose-400/30",
    glow: "shadow-rose-400/10",
    badge: "bg-rose-400 text-white",
    pill: "bg-rose-400/10 text-rose-300 border-rose-400/20",
    statBar: "bg-gradient-to-r from-rose-400 to-pink-500",
    text: "text-rose-300",
    darkBg: "bg-rose-950/20",
  },
  normal: {
    bg: "from-slate-500/15 via-slate-600/5 to-transparent",
    border: "border-slate-500/20",
    glow: "shadow-slate-500/5",
    badge: "bg-slate-500 text-white",
    pill: "bg-slate-500/10 text-slate-300 border-slate-500/20",
    statBar: "bg-gradient-to-r from-slate-400 to-slate-500",
    text: "text-slate-300",
    darkBg: "bg-slate-950/10",
  },
  fighting: {
    bg: "from-orange-700/20 via-amber-700/10 to-transparent",
    border: "border-orange-600/30",
    glow: "shadow-orange-600/10",
    badge: "bg-orange-600 text-white",
    pill: "bg-orange-600/10 text-orange-400 border-orange-600/20",
    statBar: "bg-gradient-to-r from-orange-600 to-amber-600",
    text: "text-orange-400",
    darkBg: "bg-orange-950/20",
  },
  flying: {
    bg: "from-violet-500/20 via-purple-400/10 to-transparent",
    border: "border-violet-400/30",
    glow: "shadow-violet-400/10",
    badge: "bg-violet-400 text-white",
    pill: "bg-violet-400/10 text-violet-300 border-violet-400/20",
    statBar: "bg-gradient-to-r from-violet-400 to-purple-400",
    text: "text-violet-300",
    darkBg: "bg-violet-950/20",
  },
  poison: {
    bg: "from-purple-600/20 via-fuchsia-600/10 to-transparent",
    border: "border-purple-500/30",
    glow: "shadow-purple-500/10",
    badge: "bg-purple-500 text-white",
    pill: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    statBar: "bg-gradient-to-r from-purple-500 to-fuchsia-500",
    text: "text-purple-400",
    darkBg: "bg-purple-950/20",
  },
  ground: {
    bg: "from-amber-600/20 via-yellow-600/10 to-transparent",
    border: "border-amber-600/30",
    glow: "shadow-amber-600/10",
    badge: "bg-amber-600 text-white",
    pill: "bg-amber-600/10 text-amber-400 border-amber-600/20",
    statBar: "bg-gradient-to-r from-amber-600 to-yellow-600",
    text: "text-amber-400",
    darkBg: "bg-amber-950/20",
  },
  rock: {
    bg: "from-yellow-800/20 via-amber-800/10 to-transparent",
    border: "border-yellow-700/30",
    glow: "shadow-yellow-700/10",
    badge: "bg-yellow-700 text-white",
    pill: "bg-yellow-700/10 text-yellow-500 border-yellow-700/20",
    statBar: "bg-gradient-to-r from-yellow-700 to-amber-800",
    text: "text-yellow-500",
    darkBg: "bg-yellow-950/20",
  },
  bug: {
    bg: "from-lime-600/20 via-green-600/10 to-transparent",
    border: "border-lime-500/30",
    glow: "shadow-lime-500/10",
    badge: "bg-lime-500 text-white",
    pill: "bg-lime-500/10 text-lime-400 border-lime-500/20",
    statBar: "bg-gradient-to-r from-lime-500 to-green-500",
    text: "text-lime-400",
    darkBg: "bg-lime-950/20",
  },
  ghost: {
    bg: "from-violet-800/20 via-purple-800/10 to-transparent",
    border: "border-violet-700/30",
    glow: "shadow-violet-700/10",
    badge: "bg-violet-700 text-white",
    pill: "bg-violet-700/10 text-violet-400 border-violet-700/20",
    statBar: "bg-gradient-to-r from-violet-700 to-purple-800",
    text: "text-violet-400",
    darkBg: "bg-violet-950/20",
  },
  steel: {
    bg: "from-zinc-600/20 via-slate-600/10 to-transparent",
    border: "border-zinc-500/30",
    glow: "shadow-zinc-500/10",
    badge: "bg-zinc-500 text-white",
    pill: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
    statBar: "bg-gradient-to-r from-zinc-500 to-slate-500",
    text: "text-zinc-400",
    darkBg: "bg-zinc-950/20",
  },
};

export default async function PokemonDetailPage({ params }: PokemonPageProps) {
  const { name } = await params;
  const pokemon = await getPokemon(name);
  const kantoList = await getKantoList();

  // Find index for Prev/Next navigation
  const currentIndex = kantoList.findIndex((p) => p.name === pokemon.name);
  const prevPokemon = currentIndex > 0 ? kantoList[currentIndex - 1] : null;
  const nextPokemon = currentIndex < kantoList.length - 1 ? kantoList[currentIndex + 1] : null;

  const primaryType = pokemon.types[0]?.type.name || "normal";
  const theme = typeThemes[primaryType] || typeThemes.normal;

  // Calculate Base Stat Total
  const bst = pokemon.stats.reduce((acc, curr) => acc + curr.base_stat, 0);

  return (
    <div className="py-8">
      {/* Back button and navigation */}
      <div className="mb-8 flex items-center justify-between">
        <Link
          href="/pokemon"
          className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/5 px-4 py-2.5 text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all duration-300"
        >
          <IoChevronBack size={16} />
          <span>Volver al listado</span>
        </Link>

        {/* Quick Prev / Next top bar controls */}
        <div className="flex gap-2">
          {prevPokemon && (
            <Link
              href={`/pokemon/${prevPokemon.name}`}
              className="inline-flex items-center justify-center p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              title={`Anterior: ${prevPokemon.name}`}
            >
              <IoChevronBack size={18} />
            </Link>
          )}
          {nextPokemon && (
            <Link
              href={`/pokemon/${nextPokemon.name}`}
              className="inline-flex items-center justify-center p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              title={`Siguiente: ${nextPokemon.name}`}
            >
              <IoChevronForward size={18} />
            </Link>
          )}
        </div>
      </div>

      {/* Main Profile Card Container */}
      <div className={`glass-panel overflow-hidden rounded-3xl border shadow-2xl relative ${theme.border} ${theme.glow}`}>
        
        {/* Dynamic Type Gradient Background Overlay */}
        <div className={`absolute top-0 inset-x-0 -z-10 h-80 bg-gradient-to-b ${theme.bg}`} />
        
        {/* Profile Card Header */}
        <div className="p-8 md:p-12 border-b border-white/5 flex flex-col md:flex-row md:items-end md:justify-between gap-6 relative">
          <div>
            <span className="text-sm font-bold tracking-widest text-slate-400 uppercase flex items-center gap-1.5 mb-2">
              <span className={`h-2.5 w-2.5 rounded-full ${theme.text} bg-current`} />
              Pokémon Kanto Nº {pokemon.id.toString().padStart(3, "0")}
            </span>
            <h1 className="text-5xl md:text-6xl font-black capitalize text-white tracking-tight drop-shadow-md">
              {pokemon.name}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Base Stat Total Badge */}
            <div className="glass-card rounded-2xl px-5 py-3 border border-white/10 flex flex-col items-center">
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Total BST</span>
              <span className="text-2xl font-black text-white">{bst}</span>
            </div>
          </div>
        </div>

        {/* Profile Grid content */}
        <div className="p-8 md:p-12">
          <div className="flex flex-col gap-12 lg:flex-row">
            
            {/* Left Column: Interactive 3D/Hover Levitating Artwork */}
            <div className="flex-1 flex flex-col items-center justify-center relative min-h-[350px] lg:border-r lg:border-white/5 lg:pr-8">
              {/* Background glowing sphere matching type */}
              <div className={`absolute h-72 w-72 rounded-full blur-[100px] opacity-20 pointer-events-none ${theme.darkBg}`} />
              
              {/* Spinning Pokeball background element */}
              <svg
                className="absolute h-60 w-60 text-white/2 opacity-30 animate-spin-slow pointer-events-none"
                viewBox="0 0 100 100"
                fill="none"
              >
                <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
              </svg>

              <div className="relative group cursor-zoom-in">
                {/* Under image shadow */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-4 w-32 rounded-full bg-black/60 blur-lg group-hover:w-40 transition-all duration-500" />
                <Image
                  width={280}
                  height={280}
                  src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="object-contain h-64 w-64 md:h-72 md:w-72 drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)] animate-float relative z-10 hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>

              {/* Type tags */}
              <div className="mt-8 flex flex-wrap gap-3 z-10">
                {pokemon.types.map((t) => {
                  const subTheme = typeThemes[t.type.name] || typeThemes.normal;
                  return (
                    <span
                      key={t.type.name}
                      className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-extrabold uppercase tracking-wider border ${subTheme.pill}`}
                    >
                      <span className={`h-2.5 w-2.5 rounded-full bg-current ${subTheme.text}`} />
                      {t.type.name}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Base Stats & Details */}
            <div className="flex-1 flex flex-col justify-between">
              
              {/* Physical details grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="glass-card rounded-2xl p-4 flex items-center gap-4 hover:-translate-y-0 hover:scale-100 border border-white/5">
                  <div className="p-3 rounded-xl bg-white/5 text-slate-300">
                    <IoScale size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase">Peso</span>
                    <span className="text-lg font-extrabold text-white">{pokemon.weight / 10} kg</span>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-4 flex items-center gap-4 hover:-translate-y-0 hover:scale-100 border border-white/5">
                  <div className="p-3 rounded-xl bg-white/5 text-slate-300">
                    <IoResize size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase">Altura</span>
                    <span className="text-lg font-extrabold text-white">{pokemon.height / 10} m</span>
                  </div>
                </div>
              </div>

              {/* Stats Bars Card */}
              <div className="glass-card rounded-2xl p-6 mb-8 hover:-translate-y-0 hover:scale-100 border border-white/5">
                <h3 className="text-lg font-extrabold text-white tracking-tight mb-4 flex items-center gap-2">
                  <IoSparkles className="text-yellow-400" />
                  Estadísticas Base
                </h3>
                
                <div className="space-y-4">
                  {pokemon.stats.map((stat) => {
                    const percent = Math.min((stat.base_stat / 255) * 100, 100);
                    
                    // Style specific stats differently for rich feel
                    let barColor = "bg-gradient-to-r from-red-500 to-orange-500";
                    if (stat.stat.name === "hp") barColor = "bg-gradient-to-r from-emerald-500 to-green-500";
                    else if (stat.stat.name === "defense") barColor = "bg-gradient-to-r from-blue-500 to-indigo-500";
                    else if (stat.stat.name === "speed") barColor = "bg-gradient-to-r from-amber-400 to-yellow-500";
                    else if (stat.stat.name.startsWith("special")) barColor = "bg-gradient-to-r from-purple-500 to-pink-500";

                    return (
                      <div key={stat.stat.name} className="text-sm">
                        <div className="mb-1.5 flex justify-between items-center">
                          <span className="font-semibold capitalize text-slate-300">
                            {stat.stat.name.replace("-", " ")}
                          </span>
                          <span className="font-extrabold text-white">{stat.base_stat}</span>
                        </div>
                        <div className="h-3 w-full rounded-full bg-slate-950/60 overflow-hidden border border-white/5 p-0.5">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ${barColor}`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Abilities details card */}
              <div className="glass-card rounded-2xl p-6 hover:-translate-y-0 hover:scale-100 border border-white/5">
                <h3 className="text-lg font-extrabold text-white tracking-tight mb-3">Habilidades</h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability) => (
                    <span
                      key={ability.ability.name}
                      className={`rounded-xl px-4 py-2 text-xs font-semibold capitalize border ${
                        ability.is_hidden
                          ? "bg-slate-950/50 text-slate-400 border-dashed border-white/10"
                          : "bg-white/5 text-slate-200 border-white/5"
                      }`}
                    >
                      {ability.ability.name.replace("-", " ")}
                      {ability.is_hidden && (
                        <span className="ml-1.5 text-[9px] font-black uppercase text-slate-500">Oculta</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Footer Navigation Cards */}
        <div className="bg-slate-950/50 border-t border-white/5 p-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div>
            {prevPokemon ? (
              <Link
                href={`/pokemon/${prevPokemon.name}`}
                className="group flex items-center gap-3 text-left p-2 rounded-xl hover:bg-white/5 transition"
              >
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/5 text-slate-400 group-hover:bg-red-500/10 group-hover:text-red-400 transition">
                  <IoChevronBack size={18} />
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Anterior</span>
                  <span className="font-extrabold text-sm capitalize text-white group-hover:text-red-400 transition">
                    {prevPokemon.name}
                  </span>
                </div>
              </Link>
            ) : <div />}
          </div>

          <div>
            {nextPokemon ? (
              <Link
                href={`/pokemon/${nextPokemon.name}`}
                className="group flex items-center gap-3 text-right p-2 rounded-xl hover:bg-white/5 transition sm:flex-row-reverse"
              >
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/5 text-slate-400 group-hover:bg-purple-500/10 group-hover:text-purple-400 transition">
                  <IoChevronForward size={18} />
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Siguiente</span>
                  <span className="font-extrabold text-sm capitalize text-white group-hover:text-purple-400 transition">
                    {nextPokemon.name}
                  </span>
                </div>
              </Link>
            ) : <div />}
          </div>
        </div>

      </div>
    </div>
  );
}