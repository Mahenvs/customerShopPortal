import { useEffect } from "react";
import { getHeaders } from "../Utilities/getHeaders";
import { useDispatch } from "react-redux";
import { setAddress, setName, setStoreDomain, setStoreId } from "../store/storeSlice";
import {useLocation} from 'react-router-dom';

const useGetStore = (storeDomain) => {
  const dispatch = useDispatch();

  
  const location = useLocation();
  
  const pathArr = location.pathname.split("/");

//  storeDomain = pathArr[pathArr.length - 1];
  storeDomain = pathArr[1];
  const url = "http://192.168.4.21:8764/product-service/units"
  // const url = import.meta.env.VITE_API_GET_STORE_CUST + storeDomain;
  
  const fetchData = async () => {
    try {
      const response = await fetch(url, getHeaders());
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const result = await response.json();
      
      localStorage.setItem('store',JSON.stringify({
        storeDomain: storeDomain,
        storeId: result.id, 
        storeName:result.name
      }))
      dispatch(setStoreDomain(storeDomain))
      dispatch(setStoreId(result.id));
      dispatch(setName(result.name));
      dispatch(setAddress(result.address))
      document.title = result.name;

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [storeDomain]);
};

export default useGetStore;
