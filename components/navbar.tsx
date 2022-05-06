import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "../styles/layout/mainLayout.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faSun } from "@fortawesome/free-solid-svg-icons";

import Pokeball from "./pokeball";
import Link from "next/link";

type props = {
  isDarkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
};

const Navbar = (props: props) => {
  const toggleDarkMode = () => {
    props.setDarkMode(!props.isDarkMode);
    console.log(`toggling Dark mode to ${props.isDarkMode}`);
  };

  return (
    <>
      <header className={styles.nav}>
        <nav className="full">
          <ul className={styles.nav_ul + " full"}>
            <li>
              <Link href="/pokemon">
                <a>
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className={styles.inline}
                  />
                </a>
              </Link>
            </li>
            <li>
              <Pokeball height="2.5rem" />
            </li>
            <li>
              <FontAwesomeIcon icon={faSun} onClick={toggleDarkMode} />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
