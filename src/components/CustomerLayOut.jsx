import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getHeaders } from "../Utilities/getHeaders";
import { useDispatch } from "react-redux";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen shadow overflow-auto dark:bg-darkBg">
      <ToastContainer style={{ fontSize: "20px" }} />
      <div className="h-screen flex flex-col flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
