import { createContextId } from "@builder.io/qwik";

export interface PokemonState {
  pokeId: number;
  showBackImagePoke: boolean;
  isVisibleImagePoke: boolean;
}

export const PokemonStateContext = createContextId<PokemonState>(
  "pokemon-state-context"
);
