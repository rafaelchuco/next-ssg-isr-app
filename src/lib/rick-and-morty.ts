import { notFound } from "next/navigation";
import { RickAndMortyCharacter, RickAndMortyListResponse } from "@/types/rick-and-morty";

const RICK_AND_MORTY_API = "https://rickandmortyapi.com/api/character";
const LIST_REVALIDATE_SECONDS = 300;
const DETAIL_REVALIDATE_SECONDS = 864000;

async function fetchRickAndMorty<T>(url: string, revalidateSeconds: number): Promise<T> {
  try {
    const cachedResponse = await fetch(url, {
      cache: "force-cache",
      next: { revalidate: revalidateSeconds },
    });

    if (cachedResponse.ok) {
      return cachedResponse.json();
    }
  } catch {
    // If the cached request fails (network/transient), try a live request.
  }

  const liveResponse = await fetch(url, {
    cache: "no-store",
  });

  if (!liveResponse.ok) {
    throw new Error(`Rick and Morty API request failed: ${liveResponse.status}`);
  }

  return liveResponse.json();
}

export async function getFirstPageCharacters(): Promise<RickAndMortyCharacter[]> {
  try {
    const data = await fetchRickAndMorty<RickAndMortyListResponse>(RICK_AND_MORTY_API, LIST_REVALIDATE_SECONDS);
    return data.results;
  } catch {
    return [];
  }
}

export async function getAllCharacters(revalidateSeconds = LIST_REVALIDATE_SECONDS): Promise<RickAndMortyCharacter[]> {
  try {
    const firstPage = await fetchRickAndMorty<RickAndMortyListResponse>(RICK_AND_MORTY_API, revalidateSeconds);
    const characterPages = [firstPage.results];

    for (let pageNumber = 2; pageNumber <= firstPage.info.pages; pageNumber += 1) {
      const pageData = await fetchRickAndMorty<RickAndMortyListResponse>(
        `${RICK_AND_MORTY_API}?page=${pageNumber}`,
        revalidateSeconds,
      );
      characterPages.push(pageData.results);
    }

    return characterPages.flat();
  } catch {
    return [];
  }
}

export async function getCharacter(slug: string): Promise<RickAndMortyCharacter> {
  const normalizedSlug = slug.toLowerCase();
  if (/^\d+$/.test(slug)) {
    try {
      return await fetchRickAndMorty<RickAndMortyCharacter>(
        `${RICK_AND_MORTY_API}/${slug}`,
        DETAIL_REVALIDATE_SECONDS,
      );
    } catch {
      notFound();
    }
  }

  const characters = await getAllCharacters(DETAIL_REVALIDATE_SECONDS);
  const lookupName = normalizedSlug.replace(/-/g, " ");
  const match = characters.find((character) => character.name.toLowerCase() === lookupName);

  if (!match) {
    notFound();
  }

  return match;
}

export async function getStaticRickAndMortyParams() {
  const characters = await getAllCharacters(DETAIL_REVALIDATE_SECONDS);

  return characters.flatMap((character) => [
    { slug: String(character.id) },
    { slug: character.name.toLowerCase().replace(/\s+/g, "-") },
  ]);
}