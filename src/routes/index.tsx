import { $, component$, useContext } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { PokemonStateContext } from "~/context";

export default component$(() => {
  const nav = useNavigate();
  const pokemons = useContext(PokemonStateContext);

  // const pokeId = useSignal(1);
  // const showBackImagePoke = useSignal(false);
  // const isVisibleImagePoke = useSignal(false);

  const changePokemonId = $((value: number) => {
    if (pokemons.pokeId + value <= 0) return;
    pokemons.pokeId += value;
  });

  const goToPokemonSelected = $(() => nav(`/pokemon/${pokemons.pokeId}`));

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-5xl">{pokemons.pokeId}</span>
      <div onClick$={() => goToPokemonSelected()}>
        <PokemonImage
          id={pokemons.pokeId}
          size={200}
          backImage={pokemons.showBackImagePoke}
          isVisible={pokemons.isVisibleImagePoke}
        />
      </div>
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
          onClick$={() =>
            (pokemons.showBackImagePoke = !pokemons.showBackImagePoke)
          }
          class="btn btn-primary mr-2"
        >
          Voltear
        </button>
        <button
          onClick$={() => (pokemons.isVisibleImagePoke = true)}
          class="btn btn-primary mr-2"
        >
          Revelar
        </button>
        <button
          onClick$={() => (pokemons.isVisibleImagePoke = false)}
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
