import { $, useComputed$, useContext } from "@builder.io/qwik";
import { PokemonStateContext } from "~/context";

export const usePokemonView = () => {
  const pokemons = useContext(PokemonStateContext);

  const changePokemonId = $((value: number) => {
    if (pokemons.pokeId + value <= 0) return;
    pokemons.pokeId += value;
  });

  const toggleBackImage = $(() => {
    pokemons.showBackImagePoke = !pokemons.showBackImagePoke;
  });
  const toggleVisbleImage = $(() => {
    pokemons.isVisibleImagePoke = true;
  });
  const toggleInvisbleImage = $(() => {
    pokemons.isVisibleImagePoke = false;
  });
  return {
    pokeId: useComputed$(() => pokemons.pokeId),
    showBackImage: useComputed$(() => pokemons.showBackImagePoke),
    isVisible: useComputed$(() => pokemons.isVisibleImagePoke),

    nextPokemon: $(() => changePokemonId(+1)),
    previousPokemon: $(() => changePokemonId(-1)),

    toggleBackImage,
    toggleVisbleImage,
    toggleInvisbleImage,
  };
};
