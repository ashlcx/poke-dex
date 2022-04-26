//pages/pokemon/[name].tsx
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import MainLayout from "../../components/layouts/mainLayout";
import { InferGetStaticPropsType } from "next";

import styles from "../../styles/pokemon.module.css";
import Axios from "axios";

import { capitalize } from "../../util/capitalize";
import { Pokeman, pokemonStat, PokemonGeneration } from "../../types/pokemon";
import { getColourFromType } from "../../util/typeColours";

function Pokemon({
  pokemanDetails,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  var pokemonData: Pokeman = pokemanDetails;

  //console.log(pokemonData.stats);

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

  const stats: JSX.Element[] = [];

  pokemonData.stats.forEach((stat) => {
    const barStyle = {
      width: `${(stat.base_stat / 250) * 100}%`,
    };

    stats.push(
      <tr key={stat.stat_name} className={styles.row}>
        <td>
          {capitalize(
            stat.stat_name.replace("special", "sp.").split("-").join(" ")
          )
            .replace("attack", "Atk")
            .replace("defense", "Def")}
        </td>
        <td>{stat.base_stat}</td>
        <td className={styles.bar_td}>
          <div className={styles.bar} style={barStyle}></div>
        </td>
      </tr>
    );
  });

  return (
    <>
      {
        <Head>
          <title>{capitalize(pokemonData.name)} | PokeDex</title>
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
      <section>
        <h2>PokeDex Data</h2>
        <table>
          <tbody>
            <tr className={styles.row}>
              <td>Number</td>
              <td>{pokemonData.id}</td>
            </tr>
            <tr className={styles.row}>
              <td>Types</td>
              <td>TODO</td>
            </tr>
            <tr className={styles.row}>
              <td>Height</td>
              <td>TODO</td>
            </tr>
            <tr className={styles.row}>
              <td>Weight</td>
              <td>TODO</td>
            </tr>
            <tr className={styles.row}>
              <td>Abilities</td>
              <td>TODO</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <h2>Training</h2>
        <table>
          <tbody>
            <tr className={styles.row}>
              <td>Catch Rate</td>
              <td>TODO</td>
            </tr>
            <tr className={styles.row}>
              <td>Base Friendship</td>
              <td>TODO</td>
            </tr>
            <tr className={styles.row}>
              <td>Base Exp</td>
              <td>TODO</td>
            </tr>
            <tr className={styles.row}>
              <td>Growth Rate</td>
              <td>TODO</td>
            </tr>
            <tr className={styles.row}>
              <td>Abilities</td>
              <td>TODO</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <h2>Base Stats</h2>
        <table>
          <tbody>{stats}</tbody>
        </table>
      </section>
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

  console.log({
    pokemon: pokemonRequest.data,
    species: speciesRequest.data,
  });

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
