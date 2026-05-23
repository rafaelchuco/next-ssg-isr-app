"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { RichSimplePokemon } from "@/types/pokemon";
import { IoSearchOutline, IoFilterOutline, IoSwapVerticalOutline } from "react-icons/io5";

interface PokemonListClientProps {
  initialPokemons: RichSimplePokemon[];
}

const typeColorMap: Record<string, { bg: string; text: string; border: string; glow: string; dot: string }> = {
  fire: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20 hover:border-red-500/40", glow: "hover:shadow-red-500/10", dot: "bg-red-500" },
  water: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20 hover:border-blue-500/40", glow: "hover:shadow-blue-500/10", dot: "bg-blue-500" },
  grass: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20 hover:border-emerald-500/40", glow: "hover:shadow-emerald-500/10", dot: "bg-emerald-500" },
  electric: { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/20 hover:border-yellow-500/40", glow: "hover:shadow-yellow-500/10", dot: "bg-yellow-500" },
  psychic: { bg: "bg-pink-500/10", text: "text-pink-400", border: "border-pink-500/20 hover:border-pink-500/40", glow: "hover:shadow-pink-500/10", dot: "bg-pink-500" },
  ice: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20 hover:border-cyan-500/40", glow: "hover:shadow-cyan-500/10", dot: "bg-cyan-500" },
  dragon: { bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/20 hover:border-indigo-500/40", glow: "hover:shadow-indigo-500/10", dot: "bg-indigo-500" },
  dark: { bg: "bg-slate-800/20", text: "text-slate-400", border: "border-slate-700/20 hover:border-slate-700/40", glow: "hover:shadow-slate-700/10", dot: "bg-slate-600" },
  fairy: { bg: "bg-rose-400/10", text: "text-rose-300", border: "border-rose-400/20 hover:border-rose-400/40", glow: "hover:shadow-rose-400/10", dot: "bg-rose-400" },
  normal: { bg: "bg-slate-400/10", text: "text-slate-300", border: "border-slate-400/20 hover:border-slate-400/40", glow: "hover:shadow-slate-400/10", dot: "bg-slate-400" },
  fighting: { bg: "bg-orange-600/10", text: "text-orange-400", border: "border-orange-600/20 hover:border-orange-600/40", glow: "hover:shadow-orange-600/10", dot: "bg-orange-500" },
  flying: { bg: "bg-violet-400/10", text: "text-violet-300", border: "border-violet-400/20 hover:border-violet-400/40", glow: "hover:shadow-violet-400/10", dot: "bg-violet-400" },
  poison: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20 hover:border-purple-500/40", glow: "hover:shadow-purple-500/10", dot: "bg-purple-500" },
  ground: { bg: "bg-amber-600/10", text: "text-amber-400", border: "border-amber-600/20 hover:border-amber-600/40", glow: "hover:shadow-amber-600/10", dot: "bg-amber-600" },
  rock: { bg: "bg-yellow-800/10", text: "text-yellow-600", border: "border-yellow-800/20 hover:border-yellow-800/40", glow: "hover:shadow-yellow-800/10", dot: "bg-yellow-700" },
  bug: { bg: "bg-lime-500/10", text: "text-lime-400", border: "border-lime-500/20 hover:border-lime-500/40", glow: "hover:shadow-lime-500/10", dot: "bg-lime-500" },
  ghost: { bg: "bg-violet-700/10", text: "text-violet-400", border: "border-violet-700/20 hover:border-violet-700/40", glow: "hover:shadow-violet-700/10", dot: "bg-violet-600" },
  steel: { bg: "bg-zinc-500/10", text: "text-zinc-400", border: "border-zinc-500/20 hover:border-zinc-500/40", glow: "hover:shadow-zinc-500/10", dot: "bg-zinc-500" },
};

const allTypes = [
  "all",
  "grass", "poison", "fire", "flying", "water", "bug", "normal",
  "electric", "ground", "fairy", "fighting", "psychic", "rock",
  "steel", "ice", "ghost", "dragon"
];

export default function PokemonListClient({ initialPokemons }: PokemonListClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("id-asc");

  // Get base stat total for a pokemon
  const getBst = (pokemon: RichSimplePokemon) => {
    return pokemon.stats.reduce((acc, curr) => acc + curr.value, 0);
  };

  // Filter & Sort Pokémon
  const filteredPokemons = useMemo(() => {
    let result = [...initialPokemons];

    // Search query filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(query) || p.id.toString() === query
      );
    }

    // Type filter
    if (selectedType !== "all") {
      result = result.filter((p) => p.types.includes(selectedType));
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "id-desc":
          return b.id - a.id;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "bst-desc":
          return getBst(b) - getBst(a);
        case "id-asc":
        default:
          return a.id - b.id;
      }
    });

    return result;
  }, [initialPokemons, searchQuery, selectedType, sortBy]);

  return (
    <div className="py-8">
      {/* Search and Filters Section */}
      <div className="glass-panel rounded-3xl p-6 md:p-8 mb-12 shadow-2xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
              <IoSearchOutline size={20} />
            </div>
            <input
              type="text"
              placeholder="Buscar Pokémon por nombre o número..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:border-red-500/50 focus:outline-hidden focus:ring-1 focus:ring-red-500/30 transition-all duration-300"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 whitespace-nowrap">
              <IoSwapVerticalOutline size={16} />
              Ordenar por:
            </label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 pr-10 text-sm font-semibold text-white focus:border-red-500/50 focus:outline-hidden cursor-pointer"
              >
                <option value="id-asc">Nº Pokémon (Menor a Mayor)</option>
                <option value="id-desc">Nº Pokémon (Mayor a Menor)</option>
                <option value="name-asc">Nombre (A - Z)</option>
                <option value="name-desc">Nombre (Z - A)</option>
                <option value="bst-desc">Poder Total (BST)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Type Filter list */}
        <div className="mt-8 border-t border-white/5 pt-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-4">
            <IoFilterOutline size={14} />
            Filtrar por tipo:
          </span>
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-none">
            {allTypes.map((type) => {
              const isActive = selectedType === type;
              const meta = typeColorMap[type] || { bg: "bg-slate-700/20", text: "text-slate-300", border: "border-slate-700/20", dot: "bg-slate-400" };

              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold capitalize border cursor-pointer transition-all duration-300 active:scale-95 ${
                    isActive
                      ? `bg-white text-slate-900 border-white shadow-[0_0_15px_rgba(255,255,255,0.15)]`
                      : `bg-slate-900/40 text-slate-300 border-white/5 hover:bg-slate-800/60`
                  }`}
                >
                  {type !== "all" && (
                    <span className={`h-2.5 w-2.5 rounded-full ${meta.dot} ${isActive ? 'animate-pulse' : ''}`} />
                  )}
                  {type === "all" ? "Todos" : type}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid count and status */}
      <div className="flex items-center justify-between mb-6 px-2 text-sm text-slate-400">
        <div>
          Mostrando <span className="font-bold text-white">{filteredPokemons.length}</span> Pokémon
        </div>
        {searchQuery || selectedType !== "all" ? (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedType("all");
              setSortBy("id-asc");
            }}
            className="text-xs text-red-400 hover:text-red-300 transition underline decoration-dashed underline-offset-4"
          >
            Restablecer filtros
          </button>
        ) : null}
      </div>

      {/* Pokémon Grid */}
      {filteredPokemons.length === 0 ? (
        <div className="glass-panel rounded-3xl p-16 text-center shadow-xl">
          <p className="text-lg text-slate-400">No se encontraron Pokémon con los filtros actuales.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredPokemons.map((pokemon) => {
            const primaryType = pokemon.types[0] || "normal";
            const colorMeta = typeColorMap[primaryType] || { bg: "bg-white/5", text: "text-slate-300", border: "border-white/5", glow: "", dot: "bg-slate-400" };
            const bst = getBst(pokemon);

            return (
              <Link
                key={pokemon.name}
                href={`/pokemon/${pokemon.name}`}
                className="group block"
              >
                <div className={`glass-card relative overflow-hidden rounded-2xl p-6 flex flex-col h-full border ${colorMeta.border} ${colorMeta.glow}`}>
                  
                  {/* Subtle Background Type Decoration */}
                  <div className="absolute -top-10 -right-10 -z-10 h-32 w-32 rounded-full bg-radial from-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* ID & BST */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-slate-500 tracking-wider">
                      #{pokemon.id.toString().padStart(3, "0")}
                    </span>
                    <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                      BST {bst}
                    </span>
                  </div>

                  {/* Artwork Image Container */}
                  <div className="relative flex h-36 items-center justify-center my-4">
                    {/* Shadow under Pokemon */}
                    <div className="absolute bottom-0 h-2.5 w-20 rounded-full bg-slate-950/60 blur-md group-hover:w-24 group-hover:h-3 transition-all duration-300" />
                    
                    <Image
                      width={110}
                      height={110}
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                      alt={pokemon.name}
                      className="object-contain h-28 w-28 drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)] group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 animate-float"
                      style={{ animationDelay: `${pokemon.id * 0.1}s`, animationDuration: "5s" }}
                      priority={pokemon.id <= 12} // Priority load for first 12 pokemon to prevent LCP issue
                    />
                  </div>

                  {/* Name and Info */}
                  <div className="mt-auto pt-4 border-t border-white/5">
                    <h2 className="text-lg font-bold capitalize text-white tracking-tight group-hover:text-red-400 transition-colors">
                      {pokemon.name}
                    </h2>
                    
                    {/* Types Badges */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {pokemon.types.map((type) => {
                        const typeMeta = typeColorMap[type] || { bg: "bg-white/5", text: "text-slate-300", dot: "bg-slate-400" };
                        return (
                          <span
                            key={type}
                            className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider border border-white/5 ${typeMeta.bg} ${typeMeta.text}`}
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${typeMeta.dot}`} />
                            {type}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
