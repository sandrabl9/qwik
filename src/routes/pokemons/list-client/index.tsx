import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return <div>Hello Qwik con render client!</div>;
});

export const head: DocumentHead = {
  title: "Client-List",
  meta: [
    {
      name: "description",
      content: "Client rendering",
    },
  ],
};
