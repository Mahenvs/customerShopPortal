import Cart from "./Cart";
import Categories from "./Categories";
import CustomerViewProducts from "./CustomerViewProducts";
import useGetProducts from "../Hooks/useGetProducts";
import { Outlet } from "react-router-dom";

export default function Home() {
  
  useGetProducts();
  // This theme configuration is not setup here, check once and remove the code
  // const [thme, setThme] = useState("");
  return (
    <div
      // className={
      //   thme === "green"
      //     ? "theme-green"
      //     : thme === "violet"
      //     ? "theme-violet"
      //     : thme === "cyan"
      //     ? "theme-cyan"
      //     : thme === "slate"
      //     ? "theme-slate"
      //     : thme === "purple"
      //     ? "theme-purple"
      //     : thme === "blue"
      //     ? "theme-blue"
      //     : thme === "navyblue"
      //     ? "theme-navyblue"
      //     : ""
      // }
    >
      <div className="dark:bg-darkBg mb-10">
        <div className="flex w-full  dark:bg-darkBg dark:text-darkWhite overflow-auto ">
          <span className="w-1/4 border-zinc-200  ml-40  dark:border-darkBorder h-s creen">
            <Categories />
          </span>
          <span className="w-1/2  border-zinc-200 mx-auto ml-2 mb-16 dark:border-darkBorder overflow-auto">
            {/* productsList &&  */}
            <CustomerViewProducts />
          </span>
          <span className="w-1/4  mx-4 mr-40 ">
            <Cart />
          </span>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
