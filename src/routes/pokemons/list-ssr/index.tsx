import { component$, useComputed$ } from "@builder.io/qwik";
import {
  DocumentHead,
  Link,
  routeLoader$,
  useLocation,
} from "@builder.io/qwik-city";
import type {
  PokemonInfo,
  PokemonsResponse,
} from "~/components/interfaces/response-pokemon-api";

export const usePokemonList = routeLoader$<PokemonInfo[]>(
  async ({ query, redirect, pathname }) => {
    const offset = Number(query.get("offset")) || 0;
    if (isNaN(offset) || offset < 0) redirect(301, pathname);
    const resp = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`
    );
    const data = (await resp.json()) as PokemonsResponse;

    return data.results;
  }
);
export default component$(() => {
  const location = useLocation();
  const currentOffset = useComputed$<number>(() => {
    const offsetString = new URLSearchParams(location.url.search);
    const offset = Number(offsetString.get("offset") || 0);

    return offset;
  });

  const pokemons = usePokemonList();

  return (
    <>
      <div class="flex flex-col">
        <spam class="my-5 text-5xl">Status</spam>
        <spam>Current page: {currentOffset.value / 10 + 1}</spam>
        <spam class="h-2 text-center">
          {location.isNavigating ? "Loading..." : ""}
        </spam>
      </div>
      <div class="mt-10">
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`}
          class="btn btn-primary mr-2"
        >
          PREVIOUS
        </Link>
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}
          class="btn btn-primary mr-2"
        >
          NEXT
        </Link>
      </div>
      <div class="grid grid-cols-5 mt-5">
        {pokemons.value.map((pokemon) => (
          <div
            key={pokemon.name}
            class="m-5 flex flex-col justify-center items-center"
          >
            <spam class="capitalize">{pokemon.name}</spam>
          </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "SSR-List",
  meta: [
    {
      name: "description",
      content: "Server Side Rendering",
    },
  ],
};
