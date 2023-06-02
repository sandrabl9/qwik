import { createContextId } from "@builder.io/qwik";
import type { SinglePokemon } from "~/components/interfaces";

export interface PokemonListState {
  currentPage: number;
  isLoading: boolean;
  pokemons: SinglePokemon[];
}

export const PokemonListStateContext = createContextId<PokemonListState>(
  "pokemon-list-state-context"
);
