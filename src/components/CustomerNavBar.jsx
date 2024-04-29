import { Link, useLocation, useNavigate } from "react-router-dom";
import useGetStore from "../Hooks/useGetStore";
import nightMode from "../assets/nightMode.png";
import lightMode from "../assets/light-mode.png";
import darkShop from "../assets/cartDark.png";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Badge from "../UI_Elements/Badge";
import ProductSearch from "./ProductSearch";
import { resetStore, setCustomerId } from "../store/storeSlice";
import cartImg from "../../src/assets/cartShop.png";
import {
  resetAppConfig,
  setLoggedIn,
  setTheme,
  setVerifiedUser,
} from "../store/appConfigSlice";
import { resetCart } from "../store/cartSlice";
import { resetProduct } from "../store/productSlice";

const CustomerNavBar = () => {
  const [isLoading, setIsLoading] = useState(true);
  let currentTheme = useSelector((store) => store.appConfig.theme);
  const userName = useSelector((store) => store.appConfig.userName);
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
    }else if (flag == "my-profile") {
      navigate("my-profile");
    }
  };

  useEffect(() => {
    const customer = localStorage.getItem("customerId");
    dispatch(setCustomerId(customer));

    if (customer != null) dispatch(setLoggedIn(true));
  }, [cartCnt, isLoggedIn, currentTheme]);
  console.log(currentTheme);

  const changeTheme = () => {
    if(currentTheme == "dark"){
      dispatch(setTheme("light"));
      localStorage.setItem("theme","light");
      document.documentElement.classList.remove('dark')
    }
    else  {
      dispatch(setTheme("dark"));
      localStorage.setItem("theme","dark");
      document.documentElement.classList.add('dark');
    }
    
  };
  return (
    <div className="">
      {!isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex h-20 dark:bg-darkBlack dark:text-darkWhite border-b-2 dark:border-b-[1px] dark:border-darkBorder bg-white items-center sti cky w-full top-0 fixed z-40 shadow">
          <Link
            to={"/" + storeDomainResource}
            className="w-1/5 ml-40 mr-10 flex items-center text-ellipsis"
          >
            <section className="w-1/4 p-1 rounded dark:border-none">
              <img src={storeImg} className="rounded" />
            </section>
            <span
              title={storeName?.toUpperCase()}
              className="px-3 font-medium text-lg truncate"
            >
              {storeName?.toUpperCase()}
            </span>
          </Link>
          <section className="w-2/5  mx-14">
            {isLoggedIn && <ProductSearch />}
          </section>
          <section className="font-medium text-lg w-2/5 flex mx-14 gap-10 text-white-500 items-center">
            {isLoggedIn && (<div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#5a5a5a]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>
            
              <Link
                to={"categories"}
                className="cursor-pointer"
                onClick={() => navigateTo("categories")}
              >
                Categories
              </Link>
              </div>
            )}

            {!isLoggedIn && <Link to="auth?signin">Sign In</Link>}

            {isLoggedIn && (
              <Link to="cart" className="flex  cursor-pointer items-center ">
                {cartCnt != 0 ? <Badge value={cartCnt} /> : ""}
                {/* <img
                  src={currentTheme !== "dark" ? cartImg : darkShop}
                  width={30}
                /> */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>

                <span className="z-10">Cart</span>
              </Link>
            )}
            {isLoggedIn && (
              <div className="flex items-center ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#5a5a5a]">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

              <span
                className="cursor-pointer"
                onClick={() => setLogOut((val) => !val)}
              >
                Account
              </span>
              </div>

            )}
            <div className="font-medium">
              <img
                onClick={() => changeTheme()}
                src={currentTheme != "dark" ? nightMode : lightMode}
                width={25}
              />
            </div>
            {showLogOut && (
              <div
                className="absolute text-start top-12 text-base right-[11rem] p-3 border border-gray-300 z-20 bg-white rounded mt-2 dark:border-darkBorder dark:bg-darkBg dark:text-darkWhite"
                onClick={() => setLogOut((val) => !val)}
              >
                {isLoggedIn ? (
                  <>
                    <div className="flex border-b py-1">User - {userName}</div>
                    <li className="list-none  border-b py-1">
                      <span
                        className="cursor-pointer"
                        onClick={() => navigateTo("myOrders")}
                      >
                        My Orders
                      </span>
                    </li>
                    <li className="list-none border-b py-1">
                      <span
                        className="cursor-pointer"
                        onClick={() => navigateTo("my-profile")}
                      >
                        Switch Theme
                      </span>
                    </li>
                    <li className="list-none ">
                      <button
                        className=" cursor-pointer"
                        onClick={() => navigateTo("logOut")}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <div className="right-2">
                    <button
                      className="left-5 cursor-pointer"
                      onClick={() => navigateTo("auth")}
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default CustomerNavBar;
