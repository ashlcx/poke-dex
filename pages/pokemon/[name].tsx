//pages/pokemon/[name].tsx
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import MainLayout from "../../components/layouts/mainLayout";
import { InferGetStaticPropsType } from "next";

import styles from "../../styles/pokemon.module.css";
import Axios from "axios";

import { BuildableResource, Properties } from "tapi.js";
import { Stats } from "fs";

@Properties.Resource
class PokemonSpecies extends BuildableResource {
  public name: string = "unassigned";
  public url: string = "unassigned";

  // Define a constructor with no arguments.
  constructor() {
    super();
  }
}

@Properties.Resource
class PokemonGeneration extends BuildableResource {
  //@Properties.ListOf(PokemonSpecies)
  public pokemon_species: PokemonSpecies[] = [];

  // Define a constructor with no arguments.
  constructor() {
    super();
  }
}

type Pokeman = {
  id: number;
  name: string;
  types: Array<type>;
  description: string;
  sprite: string;
  stats: Array<pokemonStat>;
};

type type = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

type pokemonStat = {
  base_stat: number;
  effort: number;
  stat_name: string;
};

const getColourFromType = (type: string): string => {
  var result: string;

  switch (type) {
    case "electric":
      result = "#FFFF00";
      break;
    case "poison":
      result = "#9400D3";
      break;
    case "grass":
      result = "#008000";
      break;
    case "fire":
      result = "#FF8C00";
      break;
    case "water":
      result = "#0000FF";
      break;
    case "flying":
      result = "#00BFFF";
      break;
    case "psychic":
      result = "#FF00FF";
      break;
    case "bird":
      result = "#FFFAF0";
      break;
    case "ice":
      result = "#AFEEEE";
      break;
    case "flying":
      result = "#40E0D0";
      break;
    case "normal":
      result = "#708090";
      break;
    case "bug":
      result = "#9ACD32";
      break;
    case "rock":
      result = "#A0522D";
      break;
    case "ghost":
      result = "#778899";
      break;
    case "ground":
      result = "#F4A460";
      break;
    case "fairy":
      result = "#EE82EE";
      break;
    default:
      result = "black";
  }
  return result;
};

function Pokemon({
  pokemanDetails,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  var pokemonData: Pokeman = pokemanDetails;

  console.log(pokemonData.stats);

  if (pokemonData.types.length === 1) {
    var G_PRI = getColourFromType(pokemonData.types[0].type.name);
    var G_ALT = getColourFromType(pokemonData.types[0].type.name);
  } else {
    var G_PRI = getColourFromType(pokemonData.types[0].type.name);
    var G_ALT = getColourFromType(pokemonData.types[1].type.name);
  }

  const sectionStyle = {
    backgroundImage: `linear-gradient(to right, ${G_PRI}, ${G_ALT})`,
  };

  var npid: number = pokemonData.id;
  var pid = npid.toString();
  pid = pid.padStart(3, "0");

  return (
    <>
      {
        <Head>
          <title>{pokemonData.name} | PokeDex</title>
        </Head>
      }
      <section
        id="titleSection"
        className={styles.titleSection}
        style={sectionStyle}
      >
        <h1 className={"capitalize " + styles.h1}>
          {pokemonData.name} - #{pid}
        </h1>
        {
          <Image
            className={styles.sprite}
            src={pokemonData.sprite}
            alt=""
            height="96px"
            width="96px"
          />
        }
        {<p>{pokemonData.description}</p>}
      </section>
      <h2>Profile</h2>
    </>
  );
}

// TODO Build Interfaces and reduce to only required details

export const getStaticProps: GetStaticProps = async (context) => {
  const pokemonRequest = await Axios.get(
    `https://pokeapi.co/api/v2/pokemon/${context.params?.name}/`
  );

  var pokemonID: number = pokemonRequest.data.id;

  var types = [];
  var stats = [];

  for (var i = 0; i < pokemonRequest.data.types.length; i++) {
    types.push(pokemonRequest.data.types[i]);
  }

  for (var i = 0; i < pokemonRequest.data.stats.length; i++) {
    var stat: pokemonStat = {
      base_stat: pokemonRequest.data.stats[i].base_stat,
      effort: pokemonRequest.data.stats[i].effort,
      stat_name: pokemonRequest.data.stats[i].stat.name,
    };
    stats.push(stat);
  }

  const speciesRequest = await Axios.get(
    `https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`
  );

  const pokemanDetails: Pokeman = {
    id: pokemonID,
    name: pokemonRequest.data.name,
    description: speciesRequest.data.flavor_text_entries[0].flavor_text,
    sprite: pokemonRequest.data.sprites.front_default,
    types: types,
    stats: stats,
  };

  return {
    props: { pokemanDetails },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await Axios.get("https://pokeapi.co/api/v2/generation/1/");

  let pokemonGeneration = new PokemonGeneration().fromJSON(data);

  const paths = pokemonGeneration.pokemon_species.map((pokemon_list) => ({
    params: { name: pokemon_list.name },
  }));
  return {
    paths,
    fallback: false,
  };
};

Pokemon.layout = MainLayout;

export default Pokemon;
