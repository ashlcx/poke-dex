import type { AppProps } from "next/app";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

import "../styles/reset.css";
import "../styles/globals.css";
import MainLayout from "../components/layouts/mainLayout";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  // Dark Mode Code - Uses local storage for persitance
  const [isDarkMode, setDarkMode] = useState(false);
  const [gotLS, setGotLS] = useState(false);

  useEffect(() => {
    var json = localStorage.getItem("site-dark-mode");
    if (!json) json = "false";
    const currentMode = JSON.parse(json);
    if (currentMode) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
    setGotLS(true);
  }, []);

  useEffect(() => {
    if (gotLS) {
      if (isDarkMode) {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
      }
      const json = JSON.stringify(isDarkMode);
      localStorage.setItem("site-dark-mode", json);
    }
  }, [gotLS, isDarkMode]);

  return (
    <MainLayout isDarkMode={isDarkMode} setDarkMode={setDarkMode}>
      <Component {...pageProps} />
    </MainLayout>
  );
}
export default MyApp;
