import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
  const id = Number(params.id);
  if (isNaN(id)) redirect(301, "/");
  if (id <= 0) redirect(301, "/");
  if (id >= 1000) redirect(301, "/");

  return id;
});
export default component$(() => {
  const pokemonId = usePokemonId();

  return (
    <div>
      <spam>Pokemon: {pokemonId.value}</spam>
      <PokemonImage id={pokemonId.value} isVisible />
    </div>
  );
});
