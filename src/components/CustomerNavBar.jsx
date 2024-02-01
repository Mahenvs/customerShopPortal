import { Link, useLocation } from "react-router-dom";
import useGetStore from "../Hooks/useGetStore";
import shop from "../assets/shop.jpg";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Badge from "../UI_Elements/Badge";
import ProductSearch from "./ProductSearch";

const CustomerNavBar = () => {
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  
  const pathArr = location.pathname.split("/");

  const storeDomain = pathArr[pathArr.length - 1];
  
  useGetStore(storeDomain, () => setIsLoading(false));
  
  const storeName = useSelector((store) => store.store.name);
  const cartCnt = useSelector((store) => store.store.noOfProducts);
  
  let storeDomainResource = useSelector((store) => store.store.storeDomain);
  if(!storeDomainResource){
    storeDomainResource  = JSON.parse(localStorage.getItem('store'))?.storeDomain
  }
  useEffect(()=>{

  },[cartCnt])
  
  return (
    <div className="r elative">
      {!isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex h-20 border- b border-b-2  bg-white items-center sticky top-0 z-40 shadow">
          <Link to={"/"+storeDomainResource}
           className="w-1/5 ml-40 mr-10 flex items-center" >
            <img src={shop} width="50px" />
            <span className="px-3 font-medium text-lg">{storeName}</span>
          </Link>
          <section className="w-2/5  mx-14">
            <ProductSearch/>
          </section>
          <section className="font-medium text-lg w-2/5 flex mx-14 gap-10 text-white-500">
            <span className="cursor-pointer">Categories</span>

            <div className="flex cursor-pointer">
              {cartCnt != 0  ? <Badge value={cartCnt} /> : ""}
              <span className="z-10">Cart</span>
            </div>
            <span className="cursor-pointer">Account</span>
          </section>
        </div>
      )}
    </div>
  );
};

export default CustomerNavBar;
