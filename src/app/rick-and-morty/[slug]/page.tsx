import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import { getCharacter, getStaticRickAndMortyParams } from "@/lib/rick-and-morty";

interface RickAndMortyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getStaticRickAndMortyParams();
}

export async function generateMetadata({ params }: RickAndMortyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const character = await getCharacter(slug);

  return {
    title: `${character.name} - Rick and Morty`,
    description: `Información sobre ${character.name} (${character.species})`,
  };
}

const statusColors: Record<string, string> = {
  Alive: "bg-emerald-500/20 text-emerald-200 border-emerald-400/30",
  Dead: "bg-rose-500/20 text-rose-200 border-rose-400/30",
  unknown: "bg-slate-500/20 text-slate-200 border-slate-400/30",
};

export default async function CharacterDetailPage({ params }: RickAndMortyPageProps) {
  const { slug } = await params;
  const character = await getCharacter(slug);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm">
        <div className="grid gap-8 p-6 lg:grid-cols-[0.8fr_1.2fr] lg:p-10">
          <div className="space-y-5">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/60 p-4 shadow-xl">
              <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-slate-900">
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className={`rounded-full border px-4 py-2 text-sm font-semibold ${statusColors[character.status] || statusColors.unknown}`}>
                {character.status}
              </span>
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100">
                {character.species}
              </span>
              <span className="rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-4 py-2 text-sm font-semibold text-fuchsia-100">
                {character.gender}
              </span>
              <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                #{character.id.toString().padStart(3, "0")}
              </span>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">Character</p>
              <h1 className="mt-2 text-4xl font-black text-white sm:text-5xl">{character.name}</h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-cyan-50/80">
                Detalle dinámico generado estáticamente para acceder por id o por nombre.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <h2 className="text-lg font-bold text-white">Origen</h2>
                <p className="mt-2 text-sm text-cyan-50/80">{character.origin.name}</p>
                <p className="break-all text-xs text-cyan-100/60">{character.origin.url || "Sin URL"}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <h2 className="text-lg font-bold text-white">Ubicación</h2>
                <p className="mt-2 text-sm text-cyan-50/80">{character.location.name}</p>
                <p className="break-all text-xs text-cyan-100/60">{character.location.url || "Sin URL"}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <h2 className="text-lg font-bold text-white">Información general</h2>
                <div className="mt-4 space-y-2 text-sm text-cyan-50/80">
                  <p><strong className="text-white">Tipo:</strong> {character.type || "No especificado"}</p>
                  <p><strong className="text-white">Género:</strong> {character.gender}</p>
                  <p><strong className="text-white">Episodios:</strong> {character.episode.length}</p>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <h2 className="text-lg font-bold text-white">Metadatos</h2>
                <div className="mt-4 space-y-2 text-sm text-cyan-50/80">
                  <p><strong className="text-white">URL:</strong> <span className="break-all">{character.url}</span></p>
                  <p><strong className="text-white">Creado:</strong> {new Date(character.created).toLocaleDateString("es-ES")}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
              <h2 className="text-lg font-bold text-white">Episodios</h2>
              <div className="mt-4 grid max-h-72 gap-2 overflow-auto pr-2 sm:grid-cols-2 xl:grid-cols-3">
                {character.episode.map((episodeUrl, index) => (
                  <div key={episodeUrl} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-cyan-50/80">
                    Episodio {index + 1}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Link
                href="/rick-and-morty"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-bold text-slate-900 transition hover:bg-cyan-200"
              >
                ← Volver al listado
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}