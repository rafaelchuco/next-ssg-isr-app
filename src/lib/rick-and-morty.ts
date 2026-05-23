import { cache } from "react";
import { notFound } from "next/navigation";
import { RickAndMortyCharacter, RickAndMortyListResponse } from "@/types/rick-and-morty";

const RICK_AND_MORTY_API = "https://rickandmortyapi.com/api/character";

export const getFirstPageCharacters = cache(async (): Promise<RickAndMortyCharacter[]> => {
  const response = await fetch(RICK_AND_MORTY_API, {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error("No se pudieron cargar los personajes");
  }

  const data: RickAndMortyListResponse = await response.json();
  return data.results;
});

export const getAllCharacters = cache(async (): Promise<RickAndMortyCharacter[]> => {
  const firstPageResponse = await fetch(RICK_AND_MORTY_API, {
    cache: "force-cache",
  });

  if (!firstPageResponse.ok) {
    throw new Error("No se pudieron cargar los personajes");
  }

  const firstPage: RickAndMortyListResponse = await firstPageResponse.json();
  const characterPages = [firstPage.results];

  for (let pageNumber = 2; pageNumber <= firstPage.info.pages; pageNumber += 1) {
    const pageResponse = await fetch(`${RICK_AND_MORTY_API}?page=${pageNumber}`, {
      cache: "force-cache",
    });

    if (!pageResponse.ok) {
      throw new Error("No se pudieron cargar los personajes");
    }

    const pageData: RickAndMortyListResponse = await pageResponse.json();
    characterPages.push(pageData.results);
  }

  return characterPages.flat();
});

export const getCharacter = cache(async (slug: string): Promise<RickAndMortyCharacter> => {
  const normalizedSlug = slug.toLowerCase();
  if (/^\d+$/.test(slug)) {
    const response = await fetch(`${RICK_AND_MORTY_API}/${slug}`, {
      next: { revalidate: 864000 },
    });

    if (!response.ok) {
      notFound();
    }

    return response.json();
  }

  const characters = await getAllCharacters();
  const lookupName = normalizedSlug.replace(/-/g, " ");
  const match = characters.find((character) => character.name.toLowerCase() === lookupName);

  if (!match) {
    notFound();
  }

  return match;
});

export async function getStaticRickAndMortyParams() {
  const characters = await getAllCharacters();

  return characters.flatMap((character) => [
    { slug: String(character.id) },
    { slug: character.name.toLowerCase().replace(/\s+/g, "-") },
  ]);
}