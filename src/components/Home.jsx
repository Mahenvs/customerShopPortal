import Cart from "./Cart";
import Categories from "./Categories";
import CustomerViewProducts from "./CustomerViewProducts";
import useGetProducts from "../Hooks/useGetProducts";
import { useDispatch, useSelector } from "react-redux";
import useGetStore from "../Hooks/useGetStore";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { getHeaders } from "../Utilities/getHeaders";
import { useEffect } from "react";
import { setVerifiedUser } from "../store/appConfigSlice";

export default function Home() {
  useGetStore();
  useGetProducts();

  let productsList = useSelector((store) => store.product.products);

  const verifiedUser = useSelector((store)=>store.appConfig.isVerifiedUser);

  let storeId = JSON.parse(localStorage.getItem("store"))?.storeId;

  let customerId = localStorage.getItem("customerId");

  const url =
    import.meta.env.VITE_GET_CUST + customerId + "?storeId=" + storeId;
  const dispatch = useDispatch();
  let verify = localStorage.getItem("verifiedUser");
    
  const checkUserVerifiedOrNot = async () => {
    const resp = await axios.get(url, getHeaders());
    const result = await resp.data?.[0]?.emailIsVerified;
    // setVerifiedUser(!!result);
    console.log(result);
    localStorage.setItem("verifiedUser",result);
    dispatch(setVerifiedUser(result));
    verify = localStorage.getItem("verifiedUser");
    console.log(verify," verify s");
    // if (result) localStorage.setItem("userVerified", true);
    // else localStorage.setItem("userVerified", false);
  };
  useEffect(() => {
    checkUserVerifiedOrNot();
  }, [customerId,verify]);

  return (
    <div className="dark:bg-darkGray mb-10">      
      <div className="flex w-full flex-1 dark:bg-darkGray h -screen dark:text-darkWhite ">
        <span className="borde r-r-2 w-1/4 border-zinc-200  ml-40 h-s creen dark:border-darkBorder h-screen">
          <Categories />
        </span>
        <span className="w-1/2 borde r-r-2 border-zinc-200 mx-auto ml-2 mb-16 dark:border-darkBorder ">
          {/* productsList &&  */}
          <CustomerViewProducts />
        </span>
        <span className="w-1/4  mx-4 mr-40">
          <Cart />
        </span>
      </div>
      <Outlet />
    </div>
  );
}
