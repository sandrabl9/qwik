import {
  Slot,
  component$,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  type PokemonState,
  PokemonStateContext,
} from "./pokemon-state.context";
import {
  type PokemonListState,
  PokemonListStateContext,
} from "./pokemon-list.context";

export const PokemonProvider = component$(() => {
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

  useVisibleTask$(() => {
    if (localStorage.getItem("pokemon")) {
      const {
        pokeId = 1,
        showBackImagePoke = false,
        isVisibleImagePoke = true,
      } = JSON.parse(localStorage.getItem("pokemon")!) as PokemonState;

      pokemonInitialState.pokeId = pokeId;
      pokemonInitialState.showBackImagePoke = showBackImagePoke;
      pokemonInitialState.isVisibleImagePoke = isVisibleImagePoke;
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => [
      pokemonInitialState.pokeId,
      pokemonInitialState.showBackImagePoke,
      pokemonInitialState.isVisibleImagePoke,
    ]);
    localStorage.setItem("pokemon", JSON.stringify(pokemonInitialState));
  });
  return <Slot />;
});
