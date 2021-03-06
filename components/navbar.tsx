import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "../styles/layout/mainLayout.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faSun } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";

type props = {
  isDarkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
};

const Navbar = (props: props) => {
  const toggleDarkMode = () => {
    props.setDarkMode(!props.isDarkMode);
  };

  return (
    <>
      <header className={styles.nav}>
        <nav className="full">
          <ul className={styles.nav_ul + " full"}>
            <li className={styles.filler}></li>
            <li className={styles.logo}>
              <Link href="/">
                <a>Pokedex</a>
              </Link>
            </li>
            <li
              onClick={toggleDarkMode}
              className={styles.toggleDarkMode + " icon"}
            >
              <FontAwesomeIcon icon={faSun} />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
