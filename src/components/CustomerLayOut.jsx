import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import {  useDispatch} from "react-redux";
import { setTheme } from "../store/appConfigSlice";
import useGetTheme from "../Hooks/useGetTheme";

const Layout = () => {
  // useGetTheme();

  // let currentTheme = localStorage.getItem("theme");
  // const dispatch = useDispatch();

  // dispatch(setTheme(currentTheme));
  return (
    <div className="flex flex-col h-screen shadow overflow-auto dark:bg-darkGray">
      
      <ToastContainer style={{ fontSize: "20px" }}  />
      <div className="h -screen flex flex-col flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
