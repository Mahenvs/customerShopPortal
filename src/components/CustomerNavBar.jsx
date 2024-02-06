import { Link, useLocation, useNavigate } from "react-router-dom";
import useGetStore from "../Hooks/useGetStore";
import shop from "../assets/shop.jpg";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Badge from "../UI_Elements/Badge";
import ProductSearch from "./ProductSearch";
import { setCustomerId } from "../store/storeSlice";
import cartImg from "../../src/assets/cartShop.png";
const CustomerNavBar = () => {
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  
  const pathArr = location.pathname.split("/");

  const storeDomain = pathArr[pathArr.length - 1];
  const dispatch = useDispatch();

  console.log(location.pathname);
  useGetStore(storeDomain, () => setIsLoading(false));
  
  const storeName = useSelector((store) => store.store.name);
  const cartCnt = useSelector((store) => store.store.noOfProducts);
  
  let storeDomainResource = useSelector((store) => store.store.storeDomain);
  if(!storeDomainResource) {
    storeDomainResource = JSON.parse(
      localStorage.getItem("store")
    )?.storeDomain;
  }
  const [showLogOut, setLogOut] = useState(false);
  const navigate = useNavigate();

  const navigateTo = (flag) => {
    if (flag == "logOut") {
      localStorage.removeItem("customerId");
      navigate("/");
      setLogOut((val) => !val);
    } else {
      navigate("/orders");
      setLogOut((val) => !val);
    }
  };

  useEffect(() => {
    const customer = localStorage.getItem("customerId");
    dispatch(setCustomerId(customer));
  }, [cartCnt]);

  return (
    <div className="">
      {!isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex h-20 border- b border-b-2  bg-white items-center sticky top-0 z-40 shadow">
          <Link
            to={"/" + storeDomainResource}
            className="w-1/5 ml-40 mr-10 flex items-center"
          >
            <img src={shop} width="50px" />
            <span className="px-3 font-medium text-lg">{storeName}</span>
          </Link>
          <section className="w-2/5  mx-14">
            <ProductSearch />
          </section>
          <section className="font-medium text-lg w-2/5 flex mx-14 gap-10 text-white-500 items-center">
            <Link to={"/categories"} className="cursor-pointer">
              Categories
            </Link>

            <Link to="/cart" className="flex cursor-pointer items-center">
              {cartCnt != 0 ? <Badge value={cartCnt} /> : ""}
              <img src={cartImg} width={30} />
              <span className="z-10">Cart</span>
            </Link>
            <span
              className="cursor-pointer"
              onClick={() => setLogOut((val) => !val)}
            >
              Account
            </span>
            {showLogOut && (
              <div className="absolute top-12 right-[11rem] p-3 border border-gray-300 z-20 bg-white rounded mt-2">
                <div className="flex border-b py-3">
                  <span
                    className="cursor-pointer"
                    onClick={() => navigateTo("myOrders")}
                  >
                    My Orders{" "}
                  </span>
                </div>
                <button
                  className="pt-2 cursor-pointer"
                  onClick={() => navigateTo("logOut")}
                >
                  Logout
                </button>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default CustomerNavBar;
