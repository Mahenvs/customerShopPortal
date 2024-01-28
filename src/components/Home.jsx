
import Cart from "./Cart";
import Categories from "./Categories";
import CustomerViewProducts from "./CustomerViewProducts";
import useGetProducts from "../Hooks/useGetProducts";
import { useSelector } from "react-redux";

export default function Home() {
  
  useGetProducts(); 

  let productsList = useSelector((store) => store.product.products);

  return ( 
    <div className="flex w-full">
      <span className="border-r-2 w-1/4 h-screen border-gray-500  ml-40">
        <Categories /> 
      </span>
      <span className="w-2/4 border-r-2 mx-5">
     {productsList && <CustomerViewProducts/>}
      </span>
      <span className="w-1/4  mx-2 mr-40">
        <Cart />
      </span>
    </div>
  );
}
