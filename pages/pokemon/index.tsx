import type { NextPage } from "next";
import Head from "next/head";
import MainLayout from "../../components/layouts/mainLayout";

const Home = () => {
  return (
    <>
      <Head>
        <title>PokeDex</title>
      </Head>
      <div id="HomePage">
        <h1>Pokedex - Generation 1</h1>
        <p>List of all the pokemans</p>
      </div>
    </>
  );
};

Home.layout = MainLayout;

export default Home;
