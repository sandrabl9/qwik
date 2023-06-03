import { component$, useContext } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { PokemonStateContext } from "~/context";
import { usePokemonView } from "~/hooks/use-pokemon-view";

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
  const id = Number(params.id);
  if (isNaN(id)) redirect(301, "/");
  if (id <= 0) redirect(301, "/");
  if (id >= 1000) redirect(301, "/");

  return id;
});
export default component$(() => {
  const pokemonId = usePokemonId();

  const {
    pokeId,
    isVisible,
    showBackImage,
    toggleBackImage,
    toggleVisbleImage,
    toggleInvisbleImage,
  } = usePokemonView();

  return (
    <>
      <spam class="text-2xl">Pokemon: {pokemonId.value}</spam>
      <PokemonImage
        id={pokemonId.value}
        isVisible={isVisible.value}
        backImage={showBackImage.value}
      />
      <div>
        <button onClick$={toggleBackImage} class="btn btn-primary mr-2">
          Voltear
        </button>
        <button onClick$={toggleVisbleImage} class="btn btn-primary mr-2">
          Revelar
        </button>
        <button onClick$={toggleInvisbleImage} class="btn btn-primary">
          Ocultar
        </button>
      </div>
    </>
  );
});
