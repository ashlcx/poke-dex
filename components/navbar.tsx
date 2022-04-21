import React, { Children, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/layout/mainLayout.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faSun } from "@fortawesome/free-solid-svg-icons";

import Pokeball from "./pokeball";

const Navbar = () => {
  const [showSearchBar, setSearchBar] = useState(false);

  const clickSearchMenu = () => {
    console.log("Clicked");
    setSearchBar(!showSearchBar);
  };

  return (
    <>
      <header className={styles.nav}>
        <nav className="full">
          <ul className={styles.nav_ul + " full"}>
            <li>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                onClick={clickSearchMenu}
                className={styles.inline}
              />
              {showSearchBar ? (
                <form
                  action="#"
                  className={styles.inline + " " + styles.searchForm}
                >
                  <input
                    id="search"
                    className={styles.searchBar}
                    type="text"
                    placeholder="search"
                    name="search"
                  ></input>
                </form>
              ) : null}
            </li>
            <li>
              <Pokeball height="2.5rem" />
            </li>
            <li>
              <FontAwesomeIcon icon={faSun} />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
