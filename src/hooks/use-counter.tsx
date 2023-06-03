import { $, useComputed$, useSignal } from "@builder.io/qwik";

export const useCounter = (initialState: number) => {
  const counter = useSignal(initialState);

  const increase = $(() => {
    counter.value++;
  });

  const decrease = $(() => {
    counter.value--;
  });

  return { counter: useComputed$(() => counter.value), increase, decrease };
};
