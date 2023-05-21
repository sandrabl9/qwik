import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";

export default component$(() => {
  const pokeId = useSignal(1);
  const showBackImagePoke = useSignal(false);
  const isVisibleImagePoke = useSignal(false);

  const changePokemonId = $((value: number) => {
    if (pokeId.value + value <= 0) return;
    pokeId.value += value;
  });

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-5xl">{pokeId}</span>
      <PokemonImage
        id={pokeId.value}
        size={200}
        backImage={showBackImagePoke.value}
        isVisible={isVisibleImagePoke.value}
      />
      <div class="mt-2">
        <button
          onClick$={() => changePokemonId(-1)}
          class="btn btn-primary mr-2"
        >
          Anterior
        </button>
        <button
          onClick$={() => changePokemonId(+1)}
          class="btn btn-primary mr-2"
        >
          Siguiente
        </button>
        <button
          onClick$={() => (showBackImagePoke.value = !showBackImagePoke.value)}
          class="btn btn-primary mr-2"
        >
          Voltear
        </button>
        <button
          onClick$={() => (isVisibleImagePoke.value = true)}
          class="btn btn-primary mr-2"
        >
          Revelar
        </button>
        <button
          onClick$={() => (isVisibleImagePoke.value = false)}
          class="btn btn-primary"
        >
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
