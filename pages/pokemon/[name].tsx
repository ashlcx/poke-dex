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
import {
  Pokeman,
  pokemonStat,
  PokemonGeneration,
  evolutionChain,
} from "../../types/pokemon";
import { getColourFromType } from "../../util/typeColours";
import { formatToMetric } from "../../util/convertToMetric";
import Link from "next/link";

function Pokemon({
  pokemanDetails,
  evolutionsData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  var pokemonData: Pokeman = pokemanDetails;

  var evolutionsChain: evolutionChain = evolutionsData;

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
        <td className="bold">
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

  const types: JSX.Element[] = [];

  // TODO Make prettier

  pokemonData.types.forEach((type) => {
    const style = {
      backgroundColor: getColourFromType(type.type.name),
    };

    types.push(
      <div key={type.type.name} className={styles.type} style={style}>
        {capitalize(type.type.name)}
      </div>
    );
  });

  const abilities: JSX.Element[] = [];

  var i = 1;
  pokemonData.abilities.forEach((ability) => {
    var isHidden: JSX.Element = <></>;
    var comma: JSX.Element = <>,&nbsp;</>;

    if (ability.is_hidden) {
      isHidden = <span className={styles.hidden_ability}>(hidden)</span>;
    }

    abilities.push(
      <div key={ability.ability.name} className={styles.ability}>
        {capitalize(ability.ability.name)}
        {isHidden}
        {i != pokemonData.abilities.length ? comma : null}
      </div>
    );
    i++;
  });

  const evolutions: JSX.Element[] = [];

  const path = evolutionsChain.chain.species.url.substring(
    0,
    evolutionsChain.chain.species.url.length - 1
  );
  const root_epid = parseInt(path.substring(path.lastIndexOf("/") + 1));

  var colspanForRoot = 0;

  if (evolutionsChain.chain.evolves_to.length > 1) {
    // If it evolves into Multiple EG. Eevee

    var children: JSX.Element[] = [];
    evolutionsChain.chain.evolves_to.forEach((child) => {
      colspanForRoot++;
      const path = child.species.url.substring(0, child.species.url.length - 1);
      const epid = parseInt(path.substring(path.lastIndexOf("/") + 1));

      if (epid <= 151) {
        children.push(
          <td key={child.species.name}>
            <Link href={`/pokemon/${child.species.name}`}>
              <a>
                <div className={styles.pokemon_pill}>
                  <Image
                    className={styles.sprite}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${epid}.png`}
                    alt=""
                    height="96px"
                    width="96px"
                  />

                  {child.species.name}
                </div>
              </a>
            </Link>
          </td>
        );
      }
    });
    if (root_epid <= 151) {
      evolutions.push(
        <tr className={styles.evo_tr} key={evolutionsChain.chain.species.name}>
          <td colSpan={colspanForRoot}>
            <Link href={`/pokemon/${evolutionsChain.chain.species.name}`}>
              <a>
                <div className={styles.pokemon_pill}>
                  <Image
                    className={styles.sprite}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${root_epid}.png`}
                    alt=""
                    height="96px"
                    width="96px"
                  />

                  {capitalize(evolutionsChain.chain.species.name)}
                </div>
              </a>
            </Link>
          </td>
        </tr>
      );
    }

    evolutions.push(
      <tr key={`children-${evolutionsChain.chain.species.name}`}>{children}</tr>
    );
  } else {
    var colspanForRoot = 1;
    if (root_epid <= 151) {
      evolutions.push(
        <tr className={styles.evo_tr} key={evolutionsChain.chain.species.name}>
          <td colSpan={colspanForRoot}>
            <Link href={`/pokemon/${evolutionsChain.chain.species.name}`}>
              <a>
                <div className={styles.pokemon_pill}>
                  <Image
                    className={styles.sprite}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${root_epid}.png`}
                    alt=""
                    height="96px"
                    width="96px"
                  />
                  {capitalize(evolutionsChain.chain.species.name)}
                </div>
              </a>
            </Link>
          </td>
        </tr>
      );
    }
    // If it evolves into single - EG. Bulbasaur => Ivysaur => Venosaur
    if (evolutionsChain.chain.evolves_to[0]) {
      const path = evolutionsChain.chain.evolves_to[0].species.url.substring(
        0,
        evolutionsChain.chain.evolves_to[0].species.url.length - 1
      );
      const epid = parseInt(path.substring(path.lastIndexOf("/") + 1));
      if (epid <= 151) {
        evolutions.push(
          <tr key={evolutionsChain.chain.evolves_to[0].species.name}>
            <td>
              <Link
                href={`/pokemon/${evolutionsChain.chain.evolves_to[0].species.name}`}
              >
                <a>
                  <div className={styles.pokemon_pill}>
                    <Image
                      className={styles.sprite}
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${epid}.png`}
                      alt=""
                      height="96px"
                      width="96px"
                    />
                    {evolutionsChain.chain.evolves_to[0].species.name}
                  </div>
                </a>
              </Link>
            </td>
          </tr>
        );

        if (evolutionsChain.chain.evolves_to[0].evolves_to[0]) {
          //console.log("Has Child");
          const child = evolutionsChain.chain.evolves_to[0].evolves_to[0];
          const path = child.species.url.substring(
            0,
            child.species.url.length - 1
          );
          const epid = parseInt(path.substring(path.lastIndexOf("/") + 1));

          if (epid <= 151) {
            evolutions.push(
              <tr key={child.species.name}>
                <td>
                  <Link href={`/pokemon/${child.species.name}`}>
                    <a>
                      <div className={styles.pokemon_pill}>
                        <Image
                          className={styles.sprite}
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${epid}.png`}
                          alt=""
                          height="96px"
                          width="96px"
                        />
                        {child.species.name}
                      </div>
                    </a>
                  </Link>
                </td>
              </tr>
            );
          }
        }
      }
    } else {
      // There are No Evolutions
    }
  }

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
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`}
            alt=""
            height="96px"
            width="96px"
          />
        }
        {<p>{pokemonData.description}</p>}
      </section>
      <div className="page_wrapper">
        <section>
          <h2>PokeDex Data</h2>
          <table>
            <tbody>
              <tr className={styles.row}>
                <td className="bold">Number</td>
                <td>{pokemonData.id}</td>
              </tr>
              <tr className={styles.row}>
                <td className="bold">Types</td>
                <td>{types}</td>
              </tr>
              <tr className={styles.row}>
                <td className="bold">Height</td>
                <td>{formatToMetric(pokemonData.height)}m</td>
              </tr>
              <tr className={styles.row}>
                <td className="bold">Weight</td>
                <td>{formatToMetric(pokemonData.weight)}kg</td>
              </tr>
              <tr className={styles.row}>
                <td className="bold">Abilities</td>
                <td>{abilities}</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section>
          <h2>Training</h2>
          <table>
            <tbody>
              <tr className={styles.row}>
                <td className="bold">Catch Rate</td>
                <td>{pokemonData.catchRate}</td>
              </tr>
              <tr className={styles.row}>
                <td className="bold">Base Friendship</td>
                <td>{pokemonData.baseFriendship}</td>
              </tr>
              <tr className={styles.row}>
                <td className="bold">Base Exp</td>
                <td>{pokemonData.baseXP}</td>
              </tr>
              <tr className={styles.row}>
                <td className="bold">Growth Rate</td>
                <td>{capitalize(pokemonData.growthRate)}</td>
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
        <section>
          <h2>Evolution Chain</h2>
          <table className={styles.evo_table}>
            <tbody className={styles.evo_tbody}>{evolutions}</tbody>
          </table>
        </section>
      </div>
    </>
  );
}

// TODO Build Interfaces and reduce to only required details

export const getStaticProps: GetStaticProps = async (context) => {
  const pokemonRequest = await Axios.get(
    `${process.env.API}/api/v2/pokemon/${context.params?.name}/`
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
    `${process.env.API}/api/v2/pokemon-species/${pokemonID}`
  );

  const pokemanDetails: Pokeman = {
    id: pokemonID,
    name: pokemonRequest.data.name,
    description: speciesRequest.data.flavor_text_entries[0].flavor_text
      .replace(/\n/g, " ")
      .replace(/\f/g, " "),
    //sprite: pokemonRequest.data.sprites.front_default,
    types: types,
    stats: stats,
    height: pokemonRequest.data.height,
    weight: pokemonRequest.data.weight,
    baseXP: pokemonRequest.data.base_experience,
    abilities: pokemonRequest.data.abilities,
    baseFriendship: speciesRequest.data.base_happiness,
    catchRate: speciesRequest.data.capture_rate,
    growthRate: speciesRequest.data.growth_rate.name,
  };

  const evolutionChain = await Axios.get(
    speciesRequest.data.evolution_chain.url
  );

  //console.log(evolutionChain.data);

  const evolutionsData = evolutionChain.data;

  /* console.log({
    pokemon: pokemonRequest.data,
    species: speciesRequest.data,
  }); */

  return {
    props: { pokemanDetails, evolutionsData },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await Axios.get(`${process.env.API}/api/v2/generation/1/`);

  let pokemonGeneration = new PokemonGeneration().fromJSON(data);
  //console.log(pokemonGeneration);

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
