import { Metadata } from "next";
import CharacterSearch from "./character-search";
import { getFirstPageCharacters } from "@/lib/rick-and-morty";

export const metadata: Metadata = {
  title: "Rick and Morty - Personajes",
  description: "Listado, búsqueda y detalle de personajes de Rick and Morty",
};

export default async function RickAndMortyPage() {
  const characters = await getFirstPageCharacters();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-5">
            <p className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100">
              SSR + SSG cacheado + CSR + ISR
            </p>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl">
              Rick and Morty: personajes, búsqueda en tiempo real y detalle estático.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-cyan-50/80 sm:text-lg">
              La lista principal se renderiza en servidor con caché forzado para comportarse como SSG,
              la búsqueda corre en cliente con <strong>useState</strong> y <strong>useEffect</strong> contra la API,
              y el detalle por id o por nombre se revalida cada 10 días.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 rounded-3xl border border-white/10 bg-slate-950/60 p-5 text-sm text-cyan-50">
            <div>
              <p className="text-cyan-200">Listado</p>
              <p className="mt-1 font-semibold text-white">SSR + SSG</p>
              <p className="mt-1 text-cyan-50/75">`fetch` con caché forzado</p>
            </div>
            <div>
              <p className="text-cyan-200">Búsqueda</p>
              <p className="mt-1 font-semibold text-white">CSR</p>
              <p className="mt-1 text-cyan-50/75">Filtros por nombre, status, tipo y género</p>
            </div>
            <div>
              <p className="text-cyan-200">Detalle</p>
              <p className="mt-1 font-semibold text-white">ISR</p>
              <p className="mt-1 text-cyan-50/75">Revalidación cada 10 días</p>
            </div>
            <div>
              <p className="text-cyan-200">Rutas</p>
              <p className="mt-1 font-semibold text-white">Id / Nombre</p>
              <p className="mt-1 text-cyan-50/75">Parámetros estáticos para todos los personajes</p>
            </div>
          </div>
        </div>
      </section>

      <CharacterSearch characters={characters} />
    </main>
  );
}