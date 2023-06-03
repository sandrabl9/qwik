import { $, component$ } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { usePokemonView } from "~/hooks/use-pokemon-view";

export default component$(() => {
  const nav = useNavigate();

  const {
    pokeId,
    showBackImage,
    isVisible,
    nextPokemon,
    previousPokemon,
    toggleBackImage,
    toggleVisbleImage,
    toggleInvisbleImage,
  } = usePokemonView();

  const goToPokemonSelected = $(() => nav(`/pokemon/${pokeId.value}`));

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-5xl">{pokeId.value}</span>
      <div onClick$={() => goToPokemonSelected()}>
        <PokemonImage
          id={pokeId.value}
          size={200}
          backImage={showBackImage.value}
          isVisible={isVisible.value}
        />
      </div>
      <div class="mt-2">
        <button onClick$={previousPokemon} class="btn btn-primary mr-2">
          Anterior
        </button>
        <button onClick$={nextPokemon} class="btn btn-primary mr-2">
          Siguiente
        </button>
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

export const head: DocumentHead = {
  title: "Learning Qwik",
  meta: [
    {
      name: "description",
      content: "This is my first app learning Qwik",
    },
  ],
};
