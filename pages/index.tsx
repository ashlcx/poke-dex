import type { NextPage } from "next";
import MainLayout from "../components/layouts/mainLayout";

import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <div id="HomePage">
      <h1>Pokedex</h1>
    </div>
  );
};

Home.layout = MainLayout;

export default Home;
