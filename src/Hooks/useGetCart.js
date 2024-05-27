import { useEffect } from "react";
import { getHeaders } from "../Utilities/getHeaders";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { cartList } from "../store/storeSlice";

const useGetCart = () => {
  const dispatch = useDispatch();

  let storeId = useSelector((store) => store.store.storeId);
  let customerId = useSelector((store) => store.store.customerId);

  if (!customerId) customerId = localStorage.getItem("customerId");
  if (!storeId) storeId = JSON.parse(localStorage.getItem("store"))?.storeId;

  const fetchCartData = async () => {
    const url =
      import.meta.env.VITE_API_ADD_CART +
      `?storeId=+` +
      storeId +
      `&customerId=` +
      customerId;
    try {
      const response = await axios.get(url, getHeaders());
      dispatch(cartList(response.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    customerId && storeId && fetchCartData();
  }, [storeId, customerId]);
};

export default useGetCart;
