export interface PokemonsResponse {
  count: number;
  next: string;
  previous: string;
  results: PokemonInfo[];
}

export interface PokemonInfo {
  name: string;
  url: string;
}
