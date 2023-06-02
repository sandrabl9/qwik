import { component$, Slot, useStyles$ } from "@builder.io/qwik";

import styles from "./styles.css?inline";
import Navbar from "~/components/shared/navbar/navbar";
import { PokemonProvider } from "~/context";

export default component$(() => {
  useStyles$(styles);

  return (
    <PokemonProvider>
      <Navbar />
      <main>
        <Slot />
      </main>
    </PokemonProvider>
  );
});
