import { component$, useContext } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { PokemonStateContext } from "~/context";

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
  const id = Number(params.id);
  if (isNaN(id)) redirect(301, "/");
  if (id <= 0) redirect(301, "/");
  if (id >= 1000) redirect(301, "/");

  return id;
});
export default component$(() => {
  const pokemonId = usePokemonId();
  const pokemon = useContext(PokemonStateContext);

  return (
    <div>
      <spam>Pokemon: {pokemonId.value}</spam>
      <PokemonImage
        id={pokemonId.value}
        isVisible={pokemon.isVisibleImagePoke}
        backImage={pokemon.showBackImagePoke}
      />
    </div>
  );
});
