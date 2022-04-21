import type { NextPage } from "next";
import Head from "next/head";
import MainLayout from "../../components/layouts/mainLayout";

import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <>
      <Head>
        <title>PokeDex</title>
      </Head>
      <div id="HomePage">
        <h1>Pokedex - Generation 1</h1>
      </div>
    </>
  );
};

Home.layout = MainLayout;

export default Home;
