import Cart from "./Cart";
import Categories from "./Categories";
import CustomerViewProducts from "./CustomerViewProducts";
import useGetProducts from "../Hooks/useGetProducts";
import { useSelector } from "react-redux";
import useGetStore from "../Hooks/useGetStore";
import { Outlet } from "react-router-dom";

export default function Home() {
  useGetStore();
  useGetProducts();

  let productsList = useSelector((store) => store.product.products);

  return (
    <>
      <div className="flex w-full flex-1">
        <span className="border-r-2 w-1/4 border-gray-100  ml-40 h-s creen">
          <Categories />
        </span>
        <span className="w-2/4 border-r-2 border-gray-100 mx-5 mb-16">
        {/* productsList &&  */}
        {<CustomerViewProducts />}
        </span>
        <span className="w-1/4  mx-2 mr-40">
          <Cart />
        </span>
      </div>
      <Outlet />
    </>
  );
}
