import { useEffect } from "react";
import { header } from "../Utilities/getHeaders";
import { useDispatch } from "react-redux";
import {
  setAddress,
  setImage,
  setName,
  setStoreDomain,
  setStoreId,
} from "../store/storeSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { apiRequest } from "../Utilities/Interceptor";

const useGetStore = (storeDomain) => {
  const dispatch = useDispatch();

  const location = useLocation();

  const pathArr = location.pathname.split("/");

  //  storeDomain = pathArr[pathArr.length - 1];
  storeDomain = pathArr[1];
  const url = import.meta.env.VITE_API_GET_STORE_CUST + storeDomain;
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      // const response = await fetch(url, getHeaders());
      // console.log(header());
      // const head = header();

      const response = await apiRequest(url, "get", null, {}, header());
      console.log(response);

      if (response.status != 200) {
        navigate("/store-not-exist");
        throw new Error("Network response was not ok.");
      }
      const result = response.data;

      localStorage.setItem(
        "store",
        JSON.stringify({
          storeDomain: storeDomain,
          storeId: result.id,
          storeName: result.name,
          storeImgUrl: result.storeImageUrl,
        })
      );
      dispatch(setStoreDomain(storeDomain));
      dispatch(setStoreId(result.id));
      dispatch(setName(result.name));
      dispatch(setImage(result.storeImageUrl));
      dispatch(setAddress(result.address));
      dispatch(setName(result.name));
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
