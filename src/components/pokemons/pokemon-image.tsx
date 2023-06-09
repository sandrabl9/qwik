import {
  component$,
  useComputed$,
  useSignal,
  useTask$,
} from "@builder.io/qwik";

interface PokemonImageProps {
  id: number;
  size?: number;
  backImage?: boolean;
  isVisible?: boolean;
}

export const PokemonImage = component$(
  ({
    id,
    size = 200,
    backImage = false,
    isVisible = false,
  }: PokemonImageProps) => {
    const imageUrl = useComputed$(() => {
      return backImage
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    });

    const imageLoaded = useSignal(false);

    useTask$(({ track }) => {
      track(() => id);
      imageLoaded.value = false;
    });

    return (
      <div
        class="flex items-center justify-center"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {!imageLoaded.value && <span>Loading...</span>}
        <img
          src={imageUrl.value}
          alt="pokemon image"
          onLoad$={() => (imageLoaded.value = true)}
          style={{ width: `${size}px` }}
          class={[
            { hidden: !imageLoaded.value, "brightness-0": !isVisible },
            "transition-all",
          ]}
        />
      </div>
    );
  }
);
