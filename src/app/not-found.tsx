import Link from "next/link";
import { IoAlertCircleOutline, IoHomeOutline } from "react-icons/io5";

export default function GlobalNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-radial from-slate-900 via-slate-950 to-black text-white px-4 py-16">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900/60 p-8 text-center text-white shadow-2xl backdrop-blur-md relative overflow-hidden">
        
        {/* Glow behind */}
        <div className="absolute -top-10 -right-10 -z-10 h-32 w-32 rounded-full bg-red-500/10 blur-[50px] pointer-events-none" />

        {/* Warning Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20 text-red-400 animate-pulse">
          <IoAlertCircleOutline size={35} />
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Página No Encontrada
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-400 max-w-md mx-auto">
          El recurso solicitado o la ruta URL no existen. Por favor, comprueba que la dirección esté bien escrita o regresa al inicio.
        </p>

        {/* Action Button */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-950/20 hover:from-red-600 hover:to-purple-700 active:scale-95 transition cursor-pointer"
          >
            <IoHomeOutline size={18} />
            Ir al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}