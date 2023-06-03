import {
  $,
  component$,
  useComputed$,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import {
  DocumentHead,
  Link,
  routeLoader$,
  useLocation,
} from "@builder.io/qwik-city";
import type { SinglePokemon } from "~/components/interfaces";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { Modal } from "~/components/shared";
import { getSinglePokemon } from "~/helpers/get-single-pokemon";

export const usePokemonList = routeLoader$<SinglePokemon[]>(
  async ({ query, redirect, pathname }) => {
    const offset = Number(query.get("offset")) || 0;
    if (isNaN(offset) || offset < 0) redirect(301, pathname);

    return await getSinglePokemon(offset);
  }
);
export default component$(() => {
  const location = useLocation();
  const isModalVisible = useSignal(false);

  const modalPokemon = useStore({
    id: "",
    name: "",
  });

  const handleOpenModal = $((name: string, id: string) => {
    modalPokemon.name = name;
    modalPokemon.id = id;
    isModalVisible.value = true;
  });

  const handleCloseModal = $(() => {
    isModalVisible.value = false;
  });

  const currentOffset = useComputed$<number>(() => {
    const offsetString = new URLSearchParams(location.url.search);
    const offsetNumber = Number(offsetString.get("offset") || 0);

    return offsetNumber;
  });

  const pokemons = usePokemonList();

  return (
    <>
      <div class="flex flex-col">
        <spam class="my-5 text-5xl">Status</spam>
        <spam>Current page: {currentOffset.value / 10 + 1}</spam>
        <spam class="h-2 text-center">
          {location.isNavigating ? "Loading..." : ""}
        </spam>
      </div>
      <div class="mt-10">
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`}
          class="btn btn-primary mr-2"
        >
          PREVIOUS
        </Link>
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}
          class="btn btn-primary mr-2"
        >
          NEXT
        </Link>
      </div>
      <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
        {pokemons.value.map((pokemon) => (
          <div
            key={pokemon.id}
            class="m-5 flex flex-col justify-center items-center"
            onClick$={() => handleOpenModal(pokemon.name, pokemon.id)}
          >
            <spam class="capitalize">{pokemon.name}</spam>
            <PokemonImage id={Number(pokemon.id)} isVisible />
          </div>
        ))}
      </div>
      <Modal
        showModal={isModalVisible.value}
        onCloseModal={handleCloseModal}
        size="lg"
      >
        <div q:slot="title">{modalPokemon.name}</div>
        <div q:slot="content" class="flex flex-col justify-center items-center">
          <PokemonImage id={Number(modalPokemon.id)} isVisible />
          <span>Obteniedno info...</span>
        </div>
      </Modal>
    </>
  );
});

export const head: DocumentHead = {
  title: "SSR-List",
  meta: [
    {
      name: "description",
      content: "Server Side Rendering",
    },
  ],
};
