import { useEffect, useState } from "react";
import { getHeaders } from "../Utilities/getHeaders";
import { listOfCategories, setActiveCategory } from "../store/productSlice";
import { useDispatch, useSelector } from "react-redux";

const useGetCategories = () => {
  const dispatch = useDispatch();

  let storeData = JSON.parse(localStorage.getItem("store"));
  const activeCategory = useSelector((store) => store.product?.activeCategory);
  const storeId = storeData?.storeId;
  const [error, setError] = useState(null);
  const fetchCategoriesData = async () => {
    const url = import.meta.env.VITE_PRODUCT_SEARCH + `${storeId}/categories`;
    try {
      const response = await fetch(url, getHeaders());
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const result = await response.json();

      dispatch(listOfCategories(result));
      if (result) dispatch(setActiveCategory(result[0]["categoryId"]));
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error); // Store error in state
    }
  };

  useEffect(() => {
    storeId && !activeCategory && fetchCategoriesData();
  }, [storeId]);
};

export default useGetCategories;
