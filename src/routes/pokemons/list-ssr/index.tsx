import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return <div>Hello Qwik con ssr!</div>;
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
