import Axios from "axios";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, useState } from "react";
import MainLayout from "../components/layouts/mainLayout";
import { PokemonGeneration, PokemonSpecies, species } from "../types/pokemon";
import { InferGetStaticPropsType } from "next";
import List from "../components/list";
import styles from "../styles/pokemon.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function PokemonIndex({
  GenerationJSON,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [inputText, setInputText] = useState("");

  const updateSearch = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    var lowercase = event.target.value.toLowerCase();
    setInputText(lowercase);
    // Form Logic
  };

  var listOfPokemon: Array<species> = GenerationJSON;

  var sortedPokemon = listOfPokemon.sort(
    (first, second) => 0 - (first.id > second.id ? -1 : 1)
  );

  //console.log(sortedPokemon);

  return (
    <>
      <Head>
        <title>PokeDex</title>
      </Head>
      <div id="PokemonPage" className="page_wrapper">
        <div className="text_center">
          <h1>1st Gen Pokemon</h1>
        </div>
        <div className={styles.search_bar}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.icon} />
          <input
            className={styles.search_input}
            onChange={(event) => updateSearch(event)}
            type="text"
            name=""
            id=""
          />
        </div>

        <List species={sortedPokemon} input={inputText} />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { data } = await Axios.get(`${process.env.API}/api/v2/generation/1/`);

  let pokemonGeneration = new PokemonGeneration().fromJSON(data);

  var GenerationJSON: Array<species> = [];

  pokemonGeneration.pokemon_species.forEach(async (pokemon) => {
    const path = pokemon.url.substring(0, pokemon.url.length - 1);
    const epid = parseInt(path.substring(path.lastIndexOf("/") + 1));

    GenerationJSON.push({
      name: pokemon.name,
      url: pokemon.url,
      id: epid,
    });
  });

  return {
    props: { GenerationJSON },
  };
};

PokemonIndex.layout = MainLayout;

export default PokemonIndex;
