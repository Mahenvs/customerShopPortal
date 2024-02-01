import useGetCategories from "../Hooks/useGetCategories";
import { useSelector } from "react-redux";
import Shimmer from "./Shimmer";
import { NavLink } from "react-router-dom";
import { setActiveCategory } from "../store/ProductSlice";
import {useDispatch} from 'react-redux';

const Categories = () => {
  useGetCategories();
  const dispatch = useDispatch();

  const categories = useSelector((store) => store.product.categories);
  const activeCategory = useSelector((store) => store.product.activeCategory);
  
  const handleActiveCategory = (id) =>{
    dispatch(setActiveCategory(id))
    
  }
  return (
    <div className="sticky top-100 h-screen">

      {!categories ? (
        <Shimmer />
      ) : (
        categories.map((item, index) => {
          return (
            <div
              key={index}
              className="list-none py-1 text-base font-medium w-full pl-1"
            >
              <li className={activeCategory === item?.categoryId  ? "p-1 bg-gradient-to-r from-white to-blue-200 w-full" : "bg-white p-1"} 
              onClick={() => handleActiveCategory(item?.categoryId)}>
                <NavLink to={"?categoryId="+item?.categoryId}>
                  {item?.categoryName}({"2"}) 
                </NavLink>
              </li>
              {/* <li className="px-1 py-2 ">Electronics(1)</li> */}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Categories;
