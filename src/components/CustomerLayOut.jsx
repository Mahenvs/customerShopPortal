import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Layout = () => {
  const theme = localStorage.getItem("theme");
  let them = useSelector((store) => store.appConfig.theme);

  if (them === null) them = theme;
  console.log(theme);
  useEffect(() => {}, [theme]);
  return (
    <div className={`theme-${them}`}>
      <div className={` flex flex-col h-screen shadow  dark:bg-darkBg`}>
        <ToastContainer style={{ fontSize: "20px" }} />
        <div className="flex flex-col flex-grow  overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
