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
        <div className="flex h-20 dark:bg-darkBlack dark:text-darkWhite border-b-2 dark:border-b-[1px] dark:border-darkBorder bg-white items-center sticky top-0 z-40 shadow">
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
            {isLoggedIn && (
              <Link
                to={"categories"}
                className="cursor-pointer"
                onClick={() => navigateTo("categories")}
              >
                Categories
              </Link>
            )}

            {!isLoggedIn && <Link to="auth?signin">Sign In</Link>}

            {isLoggedIn && (
              <Link to="cart" className="flex  cursor-pointer items-center ">
                {cartCnt != 0 ? <Badge value={cartCnt} /> : ""}
                <img
                  src={currentTheme !== "dark" ? cartImg : darkShop}
                  width={30}
                />
                <span className="z-10">Cart</span>
              </Link>
            )}
            {isLoggedIn && (
              <span
                className="cursor-pointer"
                onClick={() => setLogOut((val) => !val)}
              >
                Account
              </span>
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
