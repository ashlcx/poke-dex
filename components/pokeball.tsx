import React, { SVGProps } from "react";

import styles from "../styles/layout/pokeball.module.css";

const pokeball = (props: SVGProps<SVGSVGElement>) => (
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 128 128"
    {...props}
    /* className={styles.svg} */
  >
    <g>
      <circle className={styles.st0} cx="64" cy="64" r="60.5" />
      <path
        d="M64,7c31.43,0,57,25.57,57,57s-25.57,57-57,57S7,95.43,7,64S32.57,7,64,7 M64,0C28.65,0,0,28.65,0,64s28.65,64,64,64
		s64-28.65,64-64S99.35,0,64,0L64,0z"
      />
    </g>
    <circle className={styles.st1} cx="64" cy="64" r="11" />
    <line className={styles.st1} x1="2.5" y1="64.5" x2="53.5" y2="64.5" />
    <line className={styles.st1} x1="75.5" y1="64.5" x2="123.5" y2="64.5" />
  </svg>
);

export default pokeball;
