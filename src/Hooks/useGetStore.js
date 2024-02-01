import { useEffect } from "react";
import { getHeaders } from "../Utilities/getHeaders";
// import { listOfProducts } from "../store/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { setName, setStoreDomain, setStoreId } from "../store/storeSlice";

const useGetStore = (storeDomain) => {
  const dispatch = useDispatch();

  if(!storeDomain){
    storeDomain  = JSON.parse(localStorage.getItem('store')).storeDomain
  }
  
  const url = import.meta.env.VITE_API_GET_STORE_CUST + storeDomain;
  console.log(url);
  const fetchData = async () => {
    try {
      const response = await fetch(url, getHeaders());
      console.log("response insss ");
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const result = await response.json();
      console.log(result.id,result.name,storeDomain);
      localStorage.setItem('store',JSON.stringify({
        storeDomain: storeDomain,
        storeId: result.id,
        storeName:result.name
      }))
      dispatch(setStoreDomain(storeDomain))
      dispatch(setStoreId(result.id));
      dispatch(setName(result.name));
      document.title = result.name;

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const resp = fetchData();
    console.log(resp);
  }, []);
};

export default useGetStore;
