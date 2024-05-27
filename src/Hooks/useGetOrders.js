import { useEffect } from "react";
import { getHeaders } from "../Utilities/getHeaders";
import { useDispatch, useSelector } from "react-redux";
import { setOrdersData } from "../store/cartSlice";

const useGetOrders = () => {
  const dispatch = useDispatch();

  let storeId = useSelector((store) => store.store.storeId);
  let customerId = useSelector((store) => store.store.customerId);

  if (!customerId) customerId = localStorage.getItem("customerId");
  if (!storeId) storeId = JSON.parse(localStorage.getItem("store"))?.storeId;

  const fetchOrdersData = async () => {
    const url =
      import.meta.env.VITE_API_GET_ORDERS +
      "?storeId=" +
      storeId +
      "&customerId=" +
      customerId;
    try {
      const response = await fetch(url, getHeaders());
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const result = await response.json();

      dispatch(setOrdersData(result));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    storeId && fetchOrdersData();
  }, [storeId]);
};

export default useGetOrders;
