"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RickAndMortyCharacter } from "@/types/rick-and-morty";

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

export default function CharacterSearch({ characters }: CharacterSearchProps) {
  const [filters, setFilters] = useState<CharacterFilters>(initialFilters);
  const [filteredCharacters, setFilteredCharacters] = useState<RickAndMortyCharacter[]>(characters);

  useEffect(() => {
    const controller = new AbortController();

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

      const response = await fetch(`https://rickandmortyapi.com/api/character/?${searchParams.toString()}`, {
        signal: controller.signal,
      });

      if (controller.signal.aborted) {
        return;
      }

      if (!response.ok) {
        setFilteredCharacters([]);
        return;
      }

      const data = await response.json();
      setFilteredCharacters(Array.isArray(data.results) ? data.results : []);
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

  return (
    <section className="space-y-8">
      <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm lg:grid-cols-4">
        <label className="space-y-2 text-sm font-semibold text-cyan-50">
          <span>Nombre</span>
          <input
            type="text"
            value={filters.name}
            onChange={(event) => handleChange("name", event.target.value)}
            placeholder="Buscar por nombre"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none ring-0 transition placeholder:text-slate-400 focus:border-cyan-400"
          />
        </label>

        <label className="space-y-2 text-sm font-semibold text-cyan-50">
          <span>Status</span>
          <select
            value={filters.status}
            onChange={(event) => handleChange("status", event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          >
            <option value="">Todos</option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </label>

        <label className="space-y-2 text-sm font-semibold text-cyan-50">
          <span>Tipo</span>
          <input
            type="text"
            value={filters.type}
            onChange={(event) => handleChange("type", event.target.value)}
            placeholder="Human, Alien..."
            className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-400"
          />
        </label>

        <label className="space-y-2 text-sm font-semibold text-cyan-50">
          <span>Género</span>
          <select
            value={filters.gender}
            onChange={(event) => handleChange("gender", event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          >
            <option value="">Todos</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </select>
        </label>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm text-cyan-50">
        <span>
          Mostrando <strong className="text-white">{filteredCharacters.length}</strong> de{" "}
          <strong className="text-white">{characters.length}</strong> personajes
        </span>
        <span className="hidden text-right text-cyan-200 sm:inline">
          Actualización en tiempo real con <strong>useState</strong> y <strong>useEffect</strong>
        </span>
      </div>

      {filteredCharacters.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-10 text-center text-slate-200">
          No hay resultados con esos filtros.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredCharacters.map((character) => (
            <Link
              key={character.id}
              href={`/rick-and-morty/${character.id}`}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/10"
            >
              <div className="relative aspect-square overflow-hidden bg-slate-900/80">
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  sizes="(max-width: 1280px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">{character.name}</h3>
                    <p className="text-sm text-cyan-100/80">#{character.id.toString().padStart(3, "0")}</p>
                  </div>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/80">
                    {character.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 text-xs text-cyan-50/90">
                  <span className="rounded-full bg-cyan-500/15 px-3 py-1">{character.species}</span>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1">
                    {character.gender}
                  </span>
                  <span className="rounded-full bg-fuchsia-500/15 px-3 py-1">
                    {character.type || "No type"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}