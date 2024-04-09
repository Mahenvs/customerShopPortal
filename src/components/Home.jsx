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
