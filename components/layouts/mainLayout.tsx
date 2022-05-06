import React, { Dispatch, SetStateAction } from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import "../../styles/layout/mainLayout.module.css";

type MainLayoutProps = {
  children: React.ReactNode;
  isDarkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
};

export default function MainLayout({
  children,
  isDarkMode,
  setDarkMode,
}: MainLayoutProps) {
  if (!children) {
    return <p>Error</p>;
  }

  return (
    <>
      <Navbar setDarkMode={setDarkMode} isDarkMode={isDarkMode}></Navbar>
      <main>{children}</main>
      <Footer></Footer>
    </>
  );
}
