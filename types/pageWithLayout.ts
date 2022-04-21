import { NextPage } from "next";
import type { ReactElement } from "react";
import MainLayout from "../components/layouts/mainLayout";
export type PageWithMainLayoutType = NextPage & { layout: typeof MainLayout };
export type PageWithLayoutType = PageWithMainLayoutType;
export type LayoutProps = ({
  children,
}: {
  children: ReactElement;
}) => ReactElement;
export default PageWithLayoutType;
