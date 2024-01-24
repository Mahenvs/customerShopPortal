import { useEffect } from "react";
import { getHeaders } from "../Utilities/getHeaders";
// import { listOfProducts } from "../store/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { setName, setStoreId } from "../store/storeSlice";

const useGetStore = (storeDomain) => {
  const dispatch = useDispatch();

  const url = import.meta.env.VITE_API_GET_STORE_CUST + storeDomain;
  
  const fetchData = async () => {
    try {
      const response = await fetch(url, getHeaders());
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const result = await response.json();

      dispatch(setStoreId(result.id));
      dispatch(setName(result.name));
      document.title = result.name;

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
};

export default useGetStore;
