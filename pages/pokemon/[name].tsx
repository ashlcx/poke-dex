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

@Properties.Resource
class PokemonType extends BuildableResource {
  public name: string = "";
  public url: string = "";

  // Define a constructor with no arguments.
  constructor() {
    super();
  }
}

@Properties.Resource
class PokemonTypesSlot extends BuildableResource {
  public slot: number = 0;
  public type: PokemonType = new PokemonType();

  // Define a constructor with no arguments.
  constructor() {
    super();
  }
}

const getColourFromType = (type: string): string => {
  var result: string;

  switch (type) {
    case "electric":
      result = "yellow";
      break;
    case "poison":
      result = "purple";
      break;
    case "grass":
      result = "green";
      break;
    default:
      result = "black";
  }
  return result;
};

const Pokemon = ({
  pokemonData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if (!pokemonData) {
    console.log("PAGE DOES NOT EXIST");
    return <p>FAILED...</p>;
  }

  const { name } = router.query;

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  var types: Array<PokemonTypesSlot> = [];

  for (var i = 0; i < pokemonData.types.length; i++) {
    types.push(new PokemonTypesSlot().fromJSON(pokemonData.types[i]));
  }

  if (pokemonData.types.length === 1) {
    var G_PRI = getColourFromType(types[0].type.name);
    var G_ALT = getColourFromType(types[0].type.name);
  } else {
    var G_PRI = getColourFromType(types[0].type.name);
    var G_ALT = getColourFromType(types[1].type.name);
  }

  const sectionStyle = {
    backgroundImage: `linear-gradient(to right, ${G_PRI}, ${G_ALT})`,
  };

  return (
    <>
      <Head>
        <title>PokeDex - {pokemonData.name}</title>
      </Head>
      <section
        id="titleSection"
        className={styles.titleSection}
        style={sectionStyle}
      >
        <h1 className={"capitalize " + styles.h1}>{name}</h1>
        <Image
          className={styles.sprite}
          src={pokemonData.sprites.front_default}
          alt=""
          height="96px"
          width="96px"
        />
      </section>
      <h2>Types</h2>
      {types.map((value) => {
        return <p key={value.type.name}>{value.type.name}</p>;
      })}
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const res = await Axios.get(
      `https://pokeapi.co/api/v2/pokemon/${context.params?.name}/`
    );

    if (res.status == 404 || !res.data) {
      return {
        notFound: true,
      };
    }

    const pokemonData = res.data;

    return {
      props: { pokemonData },
    };
  } catch (Error) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await Axios.get("https://pokeapi.co/api/v2/generation/1/");

  let pokemonGeneration = new PokemonGeneration().fromJSON(data);

  const paths = pokemonGeneration.pokemon_species.map((pokemon_list) => ({
    params: { name: pokemon_list.name, url: pokemon_list.url },
  }));
  return {
    paths,
    fallback: false,
  };
};

Pokemon.layout = MainLayout;

export default Pokemon;
