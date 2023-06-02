import {
  component$,
  Slot,
  useContextProvider,
  useStore,
  useStyles$,
} from "@builder.io/qwik";

import styles from "./styles.css?inline";
import Navbar from "~/components/shared/navbar/navbar";
import {
  PokemonStateContext,
  type PokemonState,
  type PokemonListState,
  PokemonListStateContext,
} from "~/context";

export default component$(() => {
  useStyles$(styles);
  const pokemonInitialState = useStore<PokemonState>({
    pokeId: 3,
    showBackImagePoke: false,
    isVisibleImagePoke: true,
  });

  const pokemonListInitialState = useStore<PokemonListState>({
    currentPage: 1,
    isLoading: false,
    pokemons: [],
  });
  useContextProvider(PokemonStateContext, pokemonInitialState);
  useContextProvider(PokemonListStateContext, pokemonListInitialState);
  return (
    <>
      <Navbar />
      <main>
        <Slot />
      </main>
    </>
  );
});
