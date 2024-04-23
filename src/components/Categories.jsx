import useGetCategories from "../Hooks/useGetCategories";
import { useSelector } from "react-redux";
import Shimmer from "./Shimmer";
import { NavLink } from "react-router-dom";
import {useDispatch} from 'react-redux';
import { listOfProducts, setActiveCategory } from "../store/productSlice";

const Categories = () => {
  useGetCategories();
  const dispatch = useDispatch();

  const categories = useSelector((store) => store.product.categories);
  const activeCategory = useSelector((store) => store.product.activeCategory);
  
  const handleActiveCategory = (id) =>{
    dispatch(listOfProducts(null));
    dispatch(setActiveCategory(id)) 
  }
  return (
    <div className="sticky top-100  h-s creen borde r-r-2">

      {!categories ? (
        <Shimmer />
      ) : (
        categories?.map((item, index) => {
          return (
            <div
              key={index}
              className="list-none py-1 text-base font-medium w-full pl-1 dark:text-darkText "
            >
              <li className={activeCategory === item?.categoryId  ? "p-1 text-skin-color bg-gradient-to-r from-transparent from-60% via-[rgb(183, 208, 228)] via-95% to-skin-hueF to-100% dark:to-darkModal dark:to-darkLightBlack  w-full" : "bg-white p-1 font-normal text-[#5a5a5a] hover:text-skin-color"} 
              onClick={() => handleActiveCategory(item?.categoryId)}>
                <NavLink to={"?categoryId="+item?.categoryId}>
                  {item?.categoryName}({item?.productCount}) 
                </NavLink>
              </li>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Categories;
