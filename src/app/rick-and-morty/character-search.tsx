"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RickAndMortyCharacter } from "@/types/rick-and-morty";
import { IoSearchOutline, IoFilterOutline } from "react-icons/io5";

interface CharacterSearchProps {
  characters: RickAndMortyCharacter[];
}

interface CharacterFilters {
  name: string;
  status: string;
  type: string;
  gender: string;
}

const initialFilters: CharacterFilters = {
  name: "",
  status: "",
  type: "",
  gender: "",
};

const statusStyles: Record<string, { dot: string; badge: string }> = {
  Alive: {
    dot: "bg-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  },
  Dead: {
    dot: "bg-red-400",
    badge: "bg-red-500/10 text-red-300 border-red-500/20",
  },
  unknown: {
    dot: "bg-slate-400",
    badge: "bg-slate-500/10 text-slate-300 border-slate-500/20",
  },
};

export default function CharacterSearch({ characters }: CharacterSearchProps) {
  const [filters, setFilters] = useState<CharacterFilters>(initialFilters);
  const [filteredCharacters, setFilteredCharacters] = useState<RickAndMortyCharacter[]>(characters);

  useEffect(() => {
    const controller = new AbortController();

    const fetchAllFilteredCharacters = async (searchParams: URLSearchParams): Promise<RickAndMortyCharacter[]> => {
      const firstResponse = await fetch(`https://rickandmortyapi.com/api/character/?${searchParams.toString()}`, {
        signal: controller.signal,
      });

      if (!firstResponse.ok) {
        return [];
      }

      const firstData = await firstResponse.json();
      const firstPageResults = Array.isArray(firstData.results) ? firstData.results : [];
      const totalPages = typeof firstData.info?.pages === "number" ? firstData.info.pages : 1;

      if (totalPages <= 1) {
        return firstPageResults;
      }

      const pageRequests: Promise<RickAndMortyCharacter[]>[] = [];

      for (let page = 2; page <= totalPages; page += 1) {
        const paramsWithPage = new URLSearchParams(searchParams);
        paramsWithPage.set("page", String(page));

        pageRequests.push(
          fetch(`https://rickandmortyapi.com/api/character/?${paramsWithPage.toString()}`, {
            signal: controller.signal,
          })
            .then(async (response) => {
              if (!response.ok) {
                return [];
              }

              const data = await response.json();
              return Array.isArray(data.results) ? data.results : [];
            })
            .catch(() => []),
        );
      }

      const remainingPages = await Promise.all(pageRequests);
      return [...firstPageResults, ...remainingPages.flat()];
    };

    const loadCharacters = async () => {
      const hasFilters =
        filters.name.trim().length > 0 ||
        filters.status.length > 0 ||
        filters.type.trim().length > 0 ||
        filters.gender.length > 0;

      if (!hasFilters) {
        setFilteredCharacters(characters);
        return;
      }

      const searchParams = new URLSearchParams();

      if (filters.name.trim().length > 0) searchParams.set("name", filters.name.trim());
      if (filters.status.length > 0) searchParams.set("status", filters.status);
      if (filters.type.trim().length > 0) searchParams.set("type", filters.type.trim());
      if (filters.gender.length > 0) searchParams.set("gender", filters.gender);

      if (controller.signal.aborted) {
        return;
      }

      const allFilteredCharacters = await fetchAllFilteredCharacters(searchParams);
      setFilteredCharacters(allFilteredCharacters);
    };

    loadCharacters().catch(() => {
      if (!controller.signal.aborted) {
        setFilteredCharacters([]);
      }
    });

    return () => controller.abort();
  }, [characters, filters]);

  const handleChange = (field: keyof CharacterFilters, value: string) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [field]: value,
    }));
  };

  const hasActiveFilters =
    filters.name.trim() !== "" ||
    filters.status !== "" ||
    filters.type.trim() !== "" ||
    filters.gender !== "";

  return (
    <section className="space-y-8">
      {/* Filters Panel */}
      <div className="glass-panel rounded-3xl p-6 md:p-8 shadow-2xl">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-6">
          <IoFilterOutline size={14} />
          Filtros de búsqueda en tiempo real
        </span>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {/* Name */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Nombre
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-500">
                <IoSearchOutline size={16} />
              </div>
              <input
                type="text"
                value={filters.name}
                onChange={(event) => handleChange("name", event.target.value)}
                placeholder="Buscar por nombre..."
                className="w-full rounded-xl border border-white/10 bg-slate-950/50 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-cyan-500/50 focus:outline-hidden focus:ring-1 focus:ring-cyan-500/30 transition-all duration-300"
              />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Status
            </label>
            <div className="relative">
              <select
                value={filters.status}
                onChange={(event) => handleChange("status", event.target.value)}
                className="w-full appearance-none rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 pr-10 text-sm text-white focus:border-cyan-500/50 focus:outline-hidden cursor-pointer transition-all"
              >
                <option value="">Todos</option>
                <option value="Alive">🟢 Alive</option>
                <option value="Dead">🔴 Dead</option>
                <option value="unknown">⚪ Unknown</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Species/Type */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Tipo / Especie
            </label>
            <input
              type="text"
              value={filters.type}
              onChange={(event) => handleChange("type", event.target.value)}
              placeholder="Human, Alien..."
              className="w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500/50 focus:outline-hidden focus:ring-1 focus:ring-cyan-500/30 transition-all"
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Género
            </label>
            <div className="relative">
              <select
                value={filters.gender}
                onChange={(event) => handleChange("gender", event.target.value)}
                className="w-full appearance-none rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 pr-10 text-sm text-white focus:border-cyan-500/50 focus:outline-hidden cursor-pointer transition-all"
              >
                <option value="">Todos</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Genderless">Genderless</option>
                <option value="unknown">Unknown</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Counter */}
      <div className="flex items-center justify-between px-2 text-sm text-slate-400">
        <div>
          Mostrando <span className="font-bold text-white">{filteredCharacters.length}</span> de{" "}
          <span className="font-bold text-white">{characters.length}</span> personajes
        </div>
        <div className="flex items-center gap-4">
          {hasActiveFilters && (
            <button
              onClick={() => setFilters(initialFilters)}
              className="text-xs text-cyan-400 hover:text-cyan-300 transition underline decoration-dashed underline-offset-4 cursor-pointer"
            >
              Restablecer filtros
            </button>
          )}
          <span className="hidden text-[11px] uppercase tracking-wider text-slate-500 sm:inline">
            Tiempo real · useState + useEffect
          </span>
        </div>
      </div>

      {/* Results Grid */}
      {filteredCharacters.length === 0 ? (
        <div className="glass-panel rounded-3xl p-16 text-center shadow-xl">
          <p className="text-lg text-slate-400">No se encontraron personajes con estos filtros.</p>
          <p className="mt-2 text-sm text-slate-500">Intenta con otros criterios de búsqueda.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCharacters.map((character) => {
            const statusMeta = statusStyles[character.status] || statusStyles.unknown;

            return (
              <Link
                key={character.id}
                href={`/rick-and-morty/${character.id}`}
                className="group block"
              >
                <div className="glass-card overflow-hidden rounded-2xl border border-white/5 hover:border-cyan-500/30 hover:shadow-cyan-500/5 flex flex-col h-full">
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-slate-900/80">
                    <Image
                      src={character.image}
                      alt={character.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-cover transition duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Gradient Overlay on bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/90 to-transparent pointer-events-none" />

                    {/* Status Indicator Floating */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-950/70 backdrop-blur-sm px-3 py-1">
                      <span className={`h-2 w-2 rounded-full ${statusMeta.dot} ${character.status === "Alive" ? "animate-pulse" : ""}`} />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                        {character.status}
                      </span>
                    </div>

                    {/* ID Floating Badge */}
                    <div className="absolute bottom-3 left-3 text-[10px] font-bold text-white/60 tracking-wider">
                      #{character.id.toString().padStart(3, "0")}
                    </div>
                  </div>

                  {/* Character Info */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-base font-extrabold text-white tracking-tight group-hover:text-cyan-400 transition-colors truncate">
                      {character.name}
                    </h3>

                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="flex items-center gap-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                        {character.species}
                      </span>
                      <span className="flex items-center gap-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                        <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                        {character.gender}
                      </span>
                      {character.type && (
                        <span className="flex items-center gap-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                          {character.type}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}