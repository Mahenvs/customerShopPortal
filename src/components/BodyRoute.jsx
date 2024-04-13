import { Outlet, useLocation } from "react-router-dom";
import CustomerNavBar from './CustomerNavBar';
import { useDispatch, useSelector } from "react-redux";
import { getHeaders } from "../Utilities/getHeaders";
import axios from "axios";
import { setVerifiedUser } from "../store/appConfigSlice";
import { useEffect } from "react";
import StoreNotExist from "./storeNotExist";

const BodyRoute = () => {
  
  const verifiedUser = useSelector((store)=>store.appConfig.isVerifiedUser);
  const location = useLocation();
  let storeId = JSON.parse(localStorage.getItem("store"))?.storeId;

  let customerId = localStorage.getItem("customerId");

  const url =
    import.meta.env.VITE_GET_CUST + customerId + "?storeId=" + storeId;
  const dispatch = useDispatch();
  let verify = localStorage.getItem("verifiedUser");
    
  const checkUserVerifiedOrNot = async () => {
    const resp = await axios.get(url, getHeaders());
    const result = await resp.data?.[0]?.emailIsVerified;
    localStorage.setItem("verifiedUser",result);
    dispatch(setVerifiedUser(result));
    verify = localStorage.getItem("verifiedUser");
  };
  useEffect(() => {
    localStorage.setItem("verifiedUser",false);
    checkUserVerifiedOrNot();
  }, [customerId,verify]);

  return <>
    <div className="dark:bg-darkGray min-h-screen dark:text-darkWhite  mb-5">
      {!location.pathname.includes("auth") && customerId && !verifiedUser && <div className=" bg-red-300 border-b-2 text-black  text-md text-pretty text-center p-2 dark:text-white font-semibold">{"We have sent an verification email, please verify..."}</div>}
      
        <CustomerNavBar />
        <Outlet/>
    </div>
  </>
}

export default BodyRoute
