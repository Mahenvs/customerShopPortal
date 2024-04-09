import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getHeaders } from "../Utilities/getHeaders";

const Layout = () => {
  
  const [verifiedUser, setVerifiedUser] = useState(false);
  const location = useLocation();
  let storeId = JSON.parse(localStorage.getItem("store"))?.storeId;

  console.log(location.pathname.includes("auth"));
  let customerId = localStorage.getItem("customerId");

  const url =
    import.meta.env.VITE_GET_CUST + customerId + "?storeId=" + storeId;

  const checkUserVerifiedOrNot = async () => {
    const resp = await axios.get(url, getHeaders());
    const result = await resp.data?.[0]?.emailIsVerified;
    setVerifiedUser(!!result);

    if (result) localStorage.setItem("userVerified", true);
    else localStorage.setItem("userVerified", false);
  };
  // let verifiedUser = useRef()
  
  useEffect(() => {
    checkUserVerifiedOrNot();
    // const verifiedUser = localStorage.getItem("userVerified");

  }, []);

  // const dispatch = useDispatch();

  // dispatch(setTheme(currentTheme));
  return (
    <div className="flex flex-col h-screen shadow overflow-auto dark:bg-darkGray">
      {!location.pathname.includes("auth") && !verifiedUser && <div className=" bg-maroon-300 border-b-2 text-slate-700 text-md text-pretty text-center p-2 ">{"Hey there, Verify user before ordering:)"}</div>}
      <ToastContainer style={{ fontSize: "20px" }}  />
      <div className="h -screen flex flex-col flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
