import Link from "next/link";
import React, { useState } from "react";
import { species } from "../types/pokemon";
import { capitalize } from "../util/capitalize";
import PokemonCard from "./pokemonCard";
import styles from "../styles/pokemon.module.css";

export interface props {
  species: species[];
  input: string;
}

const List = (props: props): JSX.Element => {
  const filteredData = props.species.filter((pokemon) => {
    if (props.input === "") {
      return pokemon;
    } else {
      return pokemon.name.includes(props.input);
    }
  });

  return (
    <div className={styles.pokemon_grid}>
      {filteredData.map((pokemon) => (
        <div key={pokemon.name}>
          <Link href={`/pokemon/${pokemon.name}`}>
            <a>
              <PokemonCard name={pokemon.name} id={pokemon.id} />
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default List;
