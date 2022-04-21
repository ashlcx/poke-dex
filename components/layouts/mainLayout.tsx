import React, { Children } from "react";
import { useRouter } from "next/router";
import Link, { LinkProps } from "next/link";
import Navbar from "../navbar";
import Footer from "../footer";
import "../../styles/layout/mainLayout.module.css";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  if (!children) {
    return <p>Error</p>;
  }

  return (
    <>
      <Navbar></Navbar>
      <main>{children}</main>
      <Footer></Footer>
    </>
  );
}
