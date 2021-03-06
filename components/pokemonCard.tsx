import Image from "next/image";
import styles from "../styles/pokemon.module.css";
import { capitalize } from "../util/capitalize";

export interface props {
  name: string;
  id: number;
}

const PokemonCard = (props: props): JSX.Element => {
  return (
    <div className={styles.pokemon_pill_grid}>
      <Image
        className={styles.sprite}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`}
        alt=""
        height="96px"
        width="96px"
      />
      <p>{capitalize(props.name)}</p>
    </div>
  );
};

export default PokemonCard;
