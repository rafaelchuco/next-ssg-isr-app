"use client";

import Link from "next/link";

export default function PokemonErrorDemoClient() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-16 text-center text-white">
      <div className="max-w-md rounded-3xl border border-white/10 bg-black/40 p-8 shadow-2xl backdrop-blur-md">
        <h1 className="text-3xl font-bold">Demo de error</h1>
        <p className="mt-3 text-sm leading-6 text-white/75">
          La vista previa del componente `error.tsx` está disponible sin romper la ruta.
        </p>
        <Link
          href="/pokemon/error-preview"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-5 py-3 font-semibold text-slate-900 transition hover:bg-purple-200"
        >
          Ver preview del error
        </Link>
      </div>
    </div>
  );
}