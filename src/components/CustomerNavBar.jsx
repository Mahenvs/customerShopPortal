import { useLocation, useNavigate } from "react-router-dom";
import useGetStore from "../Hooks/useGetStore";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import ProductSearch from "./ProductSearch";
import { resetStore, setCustomerId } from "../store/storeSlice";

import {
  resetAppConfig,
  setLoggedIn,
  setTheme,
  setVerifiedUser,
} from "../store/appConfigSlice";
import { resetCart } from "../store/cartSlice";
import { resetProduct } from "../store/productSlice";
import { UserActions } from "./userActions";
import { StoreInfo } from "./StoreInfo";

const CustomerNavBar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const themeIs = localStorage.getItem("theme") || "blue";
  let currentTheme = useSelector((store) => store.appConfig.theme);

  const location = useLocation();

  const pathArr = location.pathname.split("/");

  const storeDomain = pathArr[1];
  const dispatch = useDispatch();

  useGetStore(storeDomain, () => setIsLoading(false));

  const storeName = useSelector((store) => store.store.name);
  const storeImg = useSelector((store) => store.store.image);
  const cartCnt = useSelector((store) => store.store.noOfProducts);

  let storeDomainResource = useSelector((store) => store.store.storeDomain);
  if (!storeDomainResource) {
    storeDomainResource = JSON.parse(
      localStorage.getItem("store")
    )?.storeDomain;
  }
  const [showLogOut, setLogOut] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((store) => store.appConfig.isLoggedIn);

  const navigateTo = (flag) => {
    if (flag == "logOut") {
      localStorage.removeItem("customerId");
      localStorage.removeItem("userVerified");
      localStorage.removeItem("verifiedUser");
      dispatch(setVerifiedUser(false));
      dispatch(resetStore());
      dispatch(resetAppConfig());
      dispatch(resetCart());
      dispatch(resetProduct());
      navigate("auth");
      setLogOut((val) => !val);
      dispatch(setLoggedIn(false));
    } else if (flag == "myOrders") {
      navigate("orders");
    } else if (flag == "auth") {
      navigate("auth");
    } else if (flag == "my-profile") {
      navigate("my-profile");
    }
  };

  useEffect(() => {
    const customer = localStorage.getItem("customerId");
    dispatch(setCustomerId(customer));

    if (customer != null) dispatch(setLoggedIn(true));
  }, [cartCnt, isLoggedIn, currentTheme, dispatch]);

  const changeTheme = () => {
    if (currentTheme == "dark") {
      dispatch(setTheme("light"));
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else {
      dispatch(setTheme("dark"));
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    }
  };
  const logOutRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (logOutRef.current && !logOutRef.current.contains(event.target)) {
        setLogOut(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [logOutRef]);

  return (
    <div className="">
      {!isLoading ? (
        <div>Loading...</div>
      ) : (
        <div
          className=" flex h-20 w-full lg:w-7/12 justify-between items-center  dark:bg-darkBlack
          border-b-2 dark:border-b-[1px]
         dark:text-darkWhite dark:border-darkBorder bg-white 
            top-0 fixed z-40 shadow "
        >
          <StoreInfo
            storeDomainResource={storeDomainResource}
            storeImg={storeImg}
            storeName={storeName}
          />

          <section className="hidden md:block md:w-2/5  item  mx-14">
            {isLoggedIn && <ProductSearch />}
          </section>
          <UserActions
            cartCnt={cartCnt}
            isLoggedIn={isLoggedIn}
            currentTheme={currentTheme}
            changeTheme={changeTheme}
            showLogOut={showLogOut}
            setLogOut={setLogOut}
            logOutRef={logOutRef}
            navigateTo={navigateTo}
          />
        </div>
      )}
    </div>
  );
};

export default CustomerNavBar;
