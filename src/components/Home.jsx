import Cart from "./Cart";
import Categories from "./Categories";
import CustomerViewProducts from "./CustomerViewProducts";
import useGetProducts from "../Hooks/useGetProducts";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useGetStore from "../Hooks/useGetStore";
import { Outlet } from "react-router-dom";
import CustomerNavBar from "./CustomerNavBar";
export default function Home() {
  useGetStore();
  useGetProducts();

  let productsList = useSelector((store) => store.product.products);

  return (
    <>
      <div className="flex w-full flex-1">
        <span className="border-r-[2px] w-1/4  border-gray-300  ml-40">
          <Categories />
        </span>
        <span className="w-2/4 border-r-2 mx-5">
          {productsList && <CustomerViewProducts />}
        </span>
        <span className="w-1/4  mx-2 mr-40">
          <Cart />
        </span>
      </div>
      <Outlet />
    </>
  );
}
