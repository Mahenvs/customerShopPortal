import { useEffect } from "react";
import { getHeaders } from "../Utilities/getHeaders";
import { listOfCategories, listOfProducts } from "../store/ProductSlice";
import { useDispatch,useSelector } from "react-redux";

const useGetCategories = () => {
  const dispatch = useDispatch();
  
  const storeId = useSelector((store) => store.store.storeId);
    
  const fetchCategoriesData = async () => {
    const url = import.meta.env.VITE_PRODUCT_CATEGORIES+`${storeId}/categories`;
    try {
      const response = await fetch(url, getHeaders());
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const result = await response.json();
      console.log("categories ",result);
      dispatch(listOfCategories(result));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    storeId && fetchCategoriesData();     
  }, [storeId]);
};

export default useGetCategories;
