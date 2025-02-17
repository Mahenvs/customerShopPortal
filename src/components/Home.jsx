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
    <div className="dark:bg-darkBg mb-10">
      <div className="flex w-full  dark:bg-darkBg dark:text-darkWhite overflow-auto ">
        <span className="w-1/4 border-zinc-200 md:ml-10   lg:ml-20 xl:ml-40  dark:border-darkBorder ">
          <Categories />
        </span>
        <span className="w-1/2  border-zinc-200 mx-auto md:px-3 xl:ml-2 mb-16 dark:border-darkBorder overflow-auto">
          <CustomerViewProducts />
        </span>
        <span className="w-1/4  xl:mx-4 lg:mx-1 md:mr-10 lg:mr-20 xl:mr-40">
          <Cart />
        </span>
      </div>
      <Outlet />
    </div>
  );
}
