import { ReactNode } from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rick and Morty - Next.js",
  description: "Explora el multiverso de Rick and Morty",
};

interface RickAndMortyLayoutProps {
  children: ReactNode;
}

export default function RickAndMortyLayout({ children }: RickAndMortyLayoutProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-cyan-950 via-slate-950 to-green-950 text-white">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/rick-and-morty" className="text-2xl font-bold tracking-tight text-white transition hover:text-cyan-300">
            Rick and Morty Next.js
          </Link>
          <Link
            href="/"
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Volver al laboratorio
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
}