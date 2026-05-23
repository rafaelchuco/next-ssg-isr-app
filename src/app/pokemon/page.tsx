import { PokemonListResponse, RichSimplePokemon } from "@/types/pokemon";
import PokemonListClient from "./PokemonListClient";
import { IoPlanetOutline } from "react-icons/io5";

async function getPokemons(): Promise<RichSimplePokemon[]> {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151", {
    next: { revalidate: 86400 },
  });

  if (!res.ok) throw new Error("Error al cargar la lista base de Pokémon");

  const data: PokemonListResponse = await res.json();

  // Fetch details in parallel for each Pokemon
  const richPokemons: RichSimplePokemon[] = await Promise.all(
    data.results.map(async (pokemon, index) => {
      try {
        const detailRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`, {
          next: { revalidate: 86400 },
        });
        if (!detailRes.ok) throw new Error();

        const detail = await detailRes.json();
        return {
          id: detail.id,
          name: detail.name,
          types: detail.types.map((t: { type: { name: string } }) => t.type.name),
          stats: detail.stats.map((s: { stat: { name: string }; base_stat: number }) => ({
            name: s.stat.name,
            value: s.base_stat,
          })),
        };
      } catch {
        // Fallback in case of individual API call failure
        return {
          id: index + 1,
          name: pokemon.name,
          types: ["normal"],
          stats: [],
        };
      }
    })
  );

  return richPokemons.sort((a, b) => a.id - b.id);
}

export default async function PokemonListPage() {
  const pokemons = await getPokemons();

  return (
    <div className="py-8">
      {/* Title section */}
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white flex flex-col sm:flex-row items-center gap-3 justify-center sm:justify-start">
          <IoPlanetOutline size={45} className="text-red-500 animate-pulse" />
          <span>Explorar Pokédex</span>
        </h1>
        <p className="mt-2 text-sm md:text-base text-slate-400 max-w-xl mx-auto sm:mx-0">
          Visualiza, busca y filtra los 151 Pokémon de la región de Kanto en tiempo real con estadísticas y poder de batalla (BST).
        </p>
      </div>

      {/* Render the Client Side List */}
      <PokemonListClient initialPokemons={pokemons} />
    </div>
  );
}