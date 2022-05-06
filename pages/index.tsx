import Axios from "axios";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import MainLayout from "../components/layouts/mainLayout";
import PokemonCard from "../components/pokemonCard";
import { PokemonGeneration, species } from "../types/pokemon";

function Home({
  GenerationJSON,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [todaysPokemon, setTodaysPokemon] = useState({
    id: 0,
    name: "",
  });

  useState(() => {
    var listOfPokemon: Array<species> = GenerationJSON;
    var sortedPokemon = listOfPokemon.sort(
      (first, second) => 0 - (first.id > second.id ? -1 : 1)
    );
    const date = new Date();
    const id = (date.getDate() * date.getMonth() * date.getFullYear()) % 151;
    const pokemon = {
      id: id,
      name: sortedPokemon[id - 1].name,
    };
    setTodaysPokemon(pokemon);
  });

  return (
    <>
      <Head>
        <title>PokeDex</title>
      </Head>
      <div id="HomePage" className="page_wrapper text_center">
        <h1>Pokedex - Generation 1</h1>
        <hr></hr>
        <h2>Todays Random Pokemon</h2>
        <PokemonCard id={todaysPokemon.id} name={todaysPokemon.name} />
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

Home.layout = MainLayout;

export default Home;
