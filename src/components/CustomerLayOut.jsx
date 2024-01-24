import React from "react";
import CustomerNavBar from './CustomerNavBar';
import { Outlet } from "react-router-dom";
import Categories from "./Categories";
import Cart from "./Cart";

const Layout = () => {
  return (
    <>
      <CustomerNavBar />
      <div className="w-full flex ">
        <Outlet/>
      </div>

    </>
  );
};

export default Layout;
