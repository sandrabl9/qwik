import type { PokemonsResponse, SinglePokemon } from "~/components/interfaces";

export const getSiglePokemon = async (
  limit: number = 10,
  offset: number = 0
): Promise<SinglePokemon[]> => {
  const resp = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  const data = (await resp.json()) as PokemonsResponse;
  return data.results.map(({ name, url }) => {
    const urlSplit = url.split("/");
    const id = urlSplit?.at(-2)!;

    return { id, name };
  });
};
