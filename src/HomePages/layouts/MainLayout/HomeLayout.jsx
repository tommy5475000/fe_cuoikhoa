import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../../HomePages/components/Header";
import Footer from "../../components/Footer/Footer";

export default function HomeLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer/>
    </>
  );
}
