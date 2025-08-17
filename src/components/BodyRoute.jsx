import { Outlet, useLocation } from "react-router-dom";
import CustomerNavBar from "./CustomerNavBar";
import { useDispatch, useSelector } from "react-redux";
import { getHeaders } from "../Utilities/getHeaders";
import axios from "axios";
import {
  resetAppConfig,
  setLoggedIn,
  setUserName,
  setVerifiedUser,
} from "../store/appConfigSlice";
import { useEffect } from "react";
import Footer from "./Footer";
import { resetStore } from "../store/storeSlice";
import { resetCart } from "../store/cartSlice";
import { resetProduct } from "../store/productSlice";
import { BarLoader } from "react-spinners";
// BeatLoader
const BodyRoute = () => {
  const verifiedUser = useSelector((store) => store.appConfig.isVerifiedUser);
  const location = useLocation();
  let storeId = JSON.parse(localStorage.getItem("store"))?.storeId;

  let customerId = localStorage.getItem("customerId");

  const url =
    import.meta.env.VITE_GET_CUST + customerId + "?storeId=" + storeId;
  const dispatch = useDispatch();
  let verify = localStorage.getItem("verifiedUser");
  console.log(verify);

  const checkUserVerifiedOrNot = async () => {
    try {
      const resp = await axios.get(url, {
        method: "GET",
        headers: {
          Authorization: `Basic ${basicAuthToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const res = await resp.data?.[0];
      const result = res?.emailIsVerified;
      const finalName = res?.firstName + " " + res?.lastName;
      localStorage.setItem("verifiedUser", result);
      dispatch(setVerifiedUser(result));
      dispatch(
        setUserName({
          Name: finalName,
          Email: res?.email,
        })
      );
      verify = localStorage.getItem("verifiedUser");
    } catch (error) {
      console.log(error.response.status, " is is error ", error);
      if (error?.response?.status == 404) {
        localStorage.removeItem("customerId");
        localStorage.removeItem("verifiedUser");
        dispatch(setVerifiedUser(false));
        dispatch(resetStore());
        dispatch(resetAppConfig());
        dispatch(resetCart());
        dispatch(resetProduct());

        dispatch(setLoggedIn(false));
        console.log("yguhj");
      }
      console.log("Out");

      throw new Error("Network response was not ok.");
      //
    }
  };
  useEffect(() => {
    localStorage.setItem("verifiedUser", false);
    checkUserVerifiedOrNot();
    console.log(verify, "69", verifiedUser);
  }, [customerId]);
  const color = getComputedStyle(document.documentElement).getPropertyValue(
    "--fill-color"
  );
  return (
    <>
      <div
        className="dark:bg-darkBg  dark:text-darkWhite m b-5 
    flex flex-col flex-grow overflow-auto"
      >
        <div className=" mt-20">
          {!location.pathname.includes("auth") && customerId && verify && (
            <div className=" bg-red-300 border-b-2 text-black  text-md text-pretty text-center p-2 dark:text-white font-semibold">
              {"We have sent an verification email, please verify to order..."}
            </div>
          )}
          <CustomerNavBar />
          <BarLoader
            speedMultiplier={0.6}
            className="mb-4"
            width={"100%"}
            color={color.trim()}
          />

          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default BodyRoute;
