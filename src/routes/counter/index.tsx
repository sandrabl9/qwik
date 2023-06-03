import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useCounter } from "~/hooks/use-counter";

export default component$(() => {
  const { counter, increase, decrease } = useCounter(5);
  return (
    <>
      <div class="text-2xl">Counter</div>
      <span class="text-6xl">{counter.value}</span>

      <div class="mt-3">
        <button onClick$={increase} class="btn btn-primary mr-2">
          +1
        </button>
        <button onClick$={decrease} class="btn btn-primary">
          -1
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Counter",
  meta: [
    {
      name: "description",
      content: "Counter rendering",
    },
  ],
};
