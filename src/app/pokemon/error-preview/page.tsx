"use client";

import PokemonErrorDemoError from "../error-demo/error";

export default function PokemonErrorPreviewPage() {
  return (
    <PokemonErrorDemoError
      error={new Error("Error de prueba para el manejador de errores de Pokédex")}
      reset={() => undefined}
    />
  );
}