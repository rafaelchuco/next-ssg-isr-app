"use client";

import Link from "next/link";
import { IoAlertCircleOutline, IoRefresh, IoHomeOutline } from "react-icons/io5";

interface PokemonErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PokemonErrorDemoError({ error, reset }: PokemonErrorProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl rounded-3xl border border-yellow-500/20 bg-slate-900/60 p-8 text-center text-white shadow-2xl backdrop-blur-md shadow-yellow-950/5 relative overflow-hidden">
        
        {/* Glow behind */}
        <div className="absolute -top-10 -right-10 -z-10 h-32 w-32 rounded-full bg-yellow-500/10 blur-[50px] pointer-events-none" />

        {/* Warning Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 animate-pulse">
          <IoAlertCircleOutline size={35} />
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Error de Demostración
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-400 max-w-md mx-auto">
          Este componente captura el fallo provocado por la ruta de prueba para validar la convención de manejo de errores.
        </p>

        {/* Tech Specs block */}
        <div className="mt-6 rounded-2xl border border-white/5 bg-slate-950/60 p-4 text-left text-xs font-mono text-slate-400">
          <span className="block font-bold text-yellow-400 mb-1 uppercase tracking-wider text-[10px]">Detalle técnico</span>
          <span className="block break-words">{error.message || "Simulación controlada de excepción"}</span>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-550 border border-yellow-600/30 px-5 py-3 text-sm font-bold text-slate-900 bg-yellow-400 shadow-lg shadow-yellow-950/20 hover:bg-yellow-300 active:scale-95 transition cursor-pointer"
          >
            <IoRefresh size={18} />
            Restablecer error
          </button>

          <Link
            href="/pokemon"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 px-5 py-3 text-sm font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            <IoHomeOutline size={18} />
            Volver a Pokédex
          </Link>
        </div>
      </div>
    </div>
  );
}