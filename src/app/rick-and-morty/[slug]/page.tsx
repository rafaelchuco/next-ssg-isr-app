import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import { getCharacter, getStaticRickAndMortyParams } from "@/lib/rick-and-morty";
import {
  IoChevronBack,
  IoLocationOutline,
  IoEarthOutline,
  IoFilmOutline,
  IoMaleOutline,
  IoTimeOutline,
  IoLinkOutline,
} from "react-icons/io5";

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

const statusThemes: Record<string, {
  dot: string;
  bg: string;
  badge: string;
  glow: string;
  border: string;
}> = {
  Alive: {
    dot: "bg-emerald-400",
    bg: "from-emerald-600/15 via-cyan-600/8 to-transparent",
    badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    glow: "shadow-emerald-500/5",
    border: "border-emerald-500/20",
  },
  Dead: {
    dot: "bg-red-400",
    bg: "from-red-600/15 via-rose-600/8 to-transparent",
    badge: "bg-red-500/10 text-red-300 border-red-500/20",
    glow: "shadow-red-500/5",
    border: "border-red-500/20",
  },
  unknown: {
    dot: "bg-slate-400",
    bg: "from-slate-600/15 via-slate-700/8 to-transparent",
    badge: "bg-slate-500/10 text-slate-300 border-slate-500/20",
    glow: "shadow-slate-500/5",
    border: "border-slate-500/20",
  },
};

export default async function CharacterDetailPage({ params }: RickAndMortyPageProps) {
  const { slug } = await params;
  const character = await getCharacter(slug);
  const theme = statusThemes[character.status] || statusThemes.unknown;

  return (
    <div className="py-8">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/rick-and-morty"
          className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/5 px-4 py-2.5 text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all duration-300"
        >
          <IoChevronBack size={16} />
          <span>Volver al listado</span>
        </Link>
      </div>

      {/* Main Profile Card */}
      <div className={`glass-panel overflow-hidden rounded-3xl border shadow-2xl relative ${theme.border} ${theme.glow}`}>
        {/* Dynamic Status Gradient */}
        <div className={`absolute top-0 inset-x-0 -z-10 h-80 bg-gradient-to-b ${theme.bg}`} />

        <div className="grid gap-0 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Left Column: Image & Badges */}
          <div className="p-8 md:p-10 lg:border-r lg:border-white/5 flex flex-col items-center justify-center relative">
            {/* Background glow */}
            <div className="absolute h-60 w-60 rounded-full bg-cyan-500/5 blur-[80px] pointer-events-none" />

            {/* Image Card */}
            <div className="relative w-full max-w-xs">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/50 p-3 shadow-xl">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-900">
                  <Image
                    src={character.image}
                    alt={character.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                    priority
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Status Badge floating over bottom of card */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border bg-slate-950/80 backdrop-blur-md px-5 py-2 shadow-lg border-white/10">
                <span className={`h-2.5 w-2.5 rounded-full ${theme.dot} ${character.status === "Alive" ? "animate-pulse" : ""}`} />
                <span className="text-xs font-extrabold uppercase tracking-widest text-white">
                  {character.status}
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-2 justify-center">
              <span className="flex items-center gap-1.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/15 px-4 py-2 text-xs font-bold uppercase tracking-wider">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                {character.species}
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/15 px-4 py-2 text-xs font-bold uppercase tracking-wider">
                <span className="h-2 w-2 rounded-full bg-purple-400" />
                {character.gender}
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-white/5 text-slate-300 border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider">
                <span className="h-2 w-2 rounded-full bg-slate-400" />
                #{character.id.toString().padStart(3, "0")}
              </span>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="p-8 md:p-10 space-y-8">
            {/* Name & Header */}
            <div>
              <span className="text-[10px] font-bold tracking-[0.3em] text-cyan-300/60 uppercase flex items-center gap-1.5 mb-2">
                <span className={`h-2 w-2 rounded-full ${theme.dot}`} />
                Personaje del Multiverso
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
                {character.name}
              </h1>
            </div>

            {/* Info Cards Grid */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Origin */}
              <div className="glass-card rounded-2xl p-5 border border-white/5 hover:scale-100 hover:-translate-y-0">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-lg bg-white/5 text-cyan-400">
                    <IoEarthOutline size={18} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Origen</span>
                </div>
                <p className="text-sm font-bold text-white">{character.origin.name}</p>
                {character.origin.url && (
                  <p className="mt-1 text-[11px] text-slate-500 break-all flex items-center gap-1">
                    <IoLinkOutline size={10} />
                    {character.origin.url}
                  </p>
                )}
              </div>

              {/* Location */}
              <div className="glass-card rounded-2xl p-5 border border-white/5 hover:scale-100 hover:-translate-y-0">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-lg bg-white/5 text-green-400">
                    <IoLocationOutline size={18} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Ubicación</span>
                </div>
                <p className="text-sm font-bold text-white">{character.location.name}</p>
                {character.location.url && (
                  <p className="mt-1 text-[11px] text-slate-500 break-all flex items-center gap-1">
                    <IoLinkOutline size={10} />
                    {character.location.url}
                  </p>
                )}
              </div>
            </div>

            {/* Detailed Info Grid */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* General Info */}
              <div className="glass-card rounded-2xl p-5 border border-white/5 hover:scale-100 hover:-translate-y-0">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-lg bg-white/5 text-purple-400">
                    <IoMaleOutline size={18} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Información</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Tipo</span>
                    <span className="font-bold text-white">{character.type || "No especificado"}</span>
                  </div>
                  <div className="border-t border-white/5" />
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Género</span>
                    <span className="font-bold text-white">{character.gender}</span>
                  </div>
                  <div className="border-t border-white/5" />
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Episodios</span>
                    <span className="font-extrabold text-cyan-400">{character.episode.length}</span>
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div className="glass-card rounded-2xl p-5 border border-white/5 hover:scale-100 hover:-translate-y-0">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-lg bg-white/5 text-amber-400">
                    <IoTimeOutline size={18} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Metadatos</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="block text-slate-400 text-xs">URL de API</span>
                    <span className="block font-semibold text-white text-xs break-all mt-0.5">{character.url}</span>
                  </div>
                  <div className="border-t border-white/5" />
                  <div>
                    <span className="block text-slate-400 text-xs">Creado</span>
                    <span className="block font-bold text-white mt-0.5">
                      {new Date(character.created).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Episodes Grid */}
            <div className="glass-card rounded-2xl p-5 border border-white/5 hover:scale-100 hover:-translate-y-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-white/5 text-pink-400">
                    <IoFilmOutline size={18} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Episodios</span>
                </div>
                <span className="text-xs font-extrabold text-cyan-400">{character.episode.length} ep.</span>
              </div>
              <div className="grid max-h-60 gap-2 overflow-auto pr-2 sm:grid-cols-2 xl:grid-cols-3 scrollbar-none">
                {character.episode.map((episodeUrl, index) => {
                  const episodeNumber = episodeUrl.split("/").pop();
                  return (
                    <div
                      key={episodeUrl}
                      className="rounded-xl border border-white/5 bg-slate-950/50 px-3.5 py-2.5 text-xs text-slate-300 flex items-center justify-between"
                    >
                      <span className="font-semibold">Episodio {index + 1}</span>
                      <span className="text-[10px] text-slate-500">E{episodeNumber}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950/50 border-t border-white/5 p-6">
          <Link
            href="/rick-and-morty"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-green-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-950/20 hover:from-cyan-600 hover:to-green-600 active:scale-95 transition"
          >
            <IoChevronBack size={16} />
            Volver al listado
          </Link>
        </div>
      </div>
    </div>
  );
}