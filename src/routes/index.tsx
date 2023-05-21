import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const poke1 = useSignal(1);
  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-8xl">{poke1}</span>
      <div class="mt-2">
        <button class="btn btn-primary mr-2">Anterior</button>
        <button class="btn btn-primary">Siguiente</button>
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
