import { Properties, BuildableResource } from "tapi.js";

@Properties.Resource
export class PokemonSpecies extends BuildableResource {
  public name: string = "unassigned";
  public url: string = "unassigned";

  // Define a constructor with no arguments.
  constructor() {
    super();
  }
}

@Properties.Resource
export class PokemonGeneration extends BuildableResource {
  //@Properties.ListOf(PokemonSpecies)
  public pokemon_species: PokemonSpecies[] = [];

  // Define a constructor with no arguments.
  constructor() {
    super();
  }
}

export type Pokeman = {
  id: number;
  name: string;
  types: Array<type>;
  description: string;
  sprite: string;
  stats: Array<pokemonStat>;
};

export type type = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type pokemonStat = {
  base_stat: number;
  effort: number;
  stat_name: string;
};
