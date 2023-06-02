import {
  $,
  component$,
  useContext,
  useOnDocument,
  useStore,
  useTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { PokemonListStateContext } from "~/context";
import { getSinglePokemon } from "~/helpers/get-single-pokemon";

export default component$(() => {
  // const pokemonState = useStore<PokemonState>({
  //   currentPage: 0,
  //   isLoading: false,
  //   pokemons: [],
  // });
  const pokemonState = useContext(PokemonListStateContext);

  useTask$(async ({ track }) => {
    track(() => pokemonState.currentPage);
    const pokemons = await getSinglePokemon(pokemonState.currentPage * 10, 30);
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
    pokemonState.isLoading = false;
  });

  useOnDocument(
    "scroll",
    $((event) => {
      const maxScroll = document.body.scrollHeight;
      const currentScroll = window.scrollY + window.innerHeight;

      if (currentScroll + 200 >= maxScroll && !pokemonState.isLoading) {
        pokemonState.isLoading = true;
        pokemonState.currentPage++;
      }
    })
  );

  return (
    <>
      <div class="flex flex-col">
        <spam class="my-5 text-5xl">Status</spam>
        <spam>Current page: {pokemonState.currentPage}</spam>
        <spam class="h-2 text-center">Loading...</spam>
      </div>
      <div class="mt-10">
        {/* <button
          onClick$={() => pokemonState.currentPage--}
          class="btn btn-primary mr-2"
        >
          PREVIOUS
        </button> */}
        <button
          onClick$={() => pokemonState.currentPage++}
          class="btn btn-primary mr-2"
        >
          NEXT
        </button>
      </div>
      <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
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
