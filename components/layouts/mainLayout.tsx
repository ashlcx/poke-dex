import React, { Children } from "react";
import type { LayoutProps } from "../../types/pageWithLayout";
import { useRouter } from "next/router";
import Link, { LinkProps } from "next/link";
import Navbar from "../navbar";
import Footer from "../footer";
import "../../styles/layout/mainLayout.module.css";

const MainLayout: LayoutProps = ({ children }) => {
  return (
    <>
      <Navbar></Navbar>
      <main>{children}</main>
      <Footer></Footer>
    </>
  );
};

export default MainLayout;
