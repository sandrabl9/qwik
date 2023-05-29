import { component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import type { SinglePokemon } from "~/components/interfaces";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { getSinglePokemon } from "~/helpers/get-single-pokemon";

interface PokemonState {
  currentPage: number;
  pokemons: SinglePokemon[];
}

export default component$(() => {
  const pokemonState = useStore<PokemonState>({
    currentPage: 0,
    pokemons: [],
  });

  useVisibleTask$(async ({ track }) => {
    track(() => pokemonState.currentPage);
    const pokemons = await getSinglePokemon(pokemonState.currentPage * 10);
    pokemonState.pokemons = pokemons;
  });
  return (
    <>
      <div class="flex flex-col">
        <spam class="my-5 text-5xl">Status</spam>
        <spam>Current page: {pokemonState.currentPage}</spam>
        <spam class="h-2 text-center">Loading...</spam>
      </div>
      <div class="mt-10">
        <button
          onClick$={() => pokemonState.currentPage--}
          class="btn btn-primary mr-2"
        >
          PREVIOUS
        </button>
        <button
          onClick$={() => pokemonState.currentPage++}
          class="btn btn-primary mr-2"
        >
          NEXT
        </button>
      </div>
      <div class="grid grid-cols-5 mt-5">
        {pokemonState.pokemons.map((pokemon) => (
          <div
            key={pokemon.name}
            class="m-5 flex flex-col justify-center items-center"
          >
            <spam class="capitalize">{pokemon.name}</spam>
            <PokemonImage id={Number(pokemon.id)} isVisible />
          </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Client-List",
  meta: [
    {
      name: "description",
      content: "Client rendering",
    },
  ],
};
