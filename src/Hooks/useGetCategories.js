import { useEffect } from "react";
import { getHeaders } from "../Utilities/getHeaders";
import { listOfCategories,  setActiveCategory } from "../store/productSlice";
import { useDispatch } from "react-redux";

const useGetCategories = () => {
  const dispatch = useDispatch();
  
    let storeData  = JSON.parse(localStorage.getItem('store'));
    
    const storeId = storeData?.storeId
  
  const fetchCategoriesData = async () => {
    const url = import.meta.env.VITE_PRODUCT_SEARCH+`${storeId}/categories`;
    try {
      const response = await fetch(url, getHeaders());
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const result = await response.json();
      
      dispatch(listOfCategories(result));
      if(result)
        dispatch(setActiveCategory(result[0]["categoryId"]))
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    storeId && fetchCategoriesData();     
  }, [storeId]);
};

export default useGetCategories;
